/**
 * Course Loader Utilities
 *
 * Helper functions to load course structure and lesson data
 */

import courseData from "@/public/course.json";
import { CourseStructure, LessonStub, SectionStub } from "./types";

/**
 * Get the full course structure
 */
export function getCourseStructure(): CourseStructure {
  return courseData as CourseStructure;
}

/**
 * Find a section by its slug
 */
export function getSectionBySlug(
  sectionSlug: string
): SectionStub | undefined {
  const course = getCourseStructure();
  return course.sections.find((s) => s.slug === sectionSlug);
}

/**
 * Find a lesson by section and lesson slug
 */
export function getLessonBySlug(
  sectionSlug: string,
  lessonSlug: string
): { section: SectionStub; lesson: LessonStub } | undefined {
  const section = getSectionBySlug(sectionSlug);
  if (!section) return undefined;

  const lesson = section.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return undefined;

  return { section, lesson };
}

/**
 * Navigation helper to get previous/next lessons
 */
export interface LessonNavigation {
  current: { section: SectionStub; lesson: LessonStub };
  previous: { section: SectionStub; lesson: LessonStub } | null;
  next: { section: SectionStub; lesson: LessonStub } | null;
}

/**
 * Get navigation data for a lesson (previous/next)
 */
export function getLessonNavigation(
  sectionSlug: string,
  lessonSlug: string
): LessonNavigation | undefined {
  const course = getCourseStructure();

  // Flatten all lessons with their sections
  const allLessons: { section: SectionStub; lesson: LessonStub }[] = [];
  for (const section of course.sections) {
    for (const lesson of section.lessons) {
      allLessons.push({ section, lesson });
    }
  }

  // Find current lesson index
  const currentIndex = allLessons.findIndex(
    (item) =>
      item.section.slug === sectionSlug && item.lesson.slug === lessonSlug
  );

  if (currentIndex === -1) return undefined;

  return {
    current: allLessons[currentIndex],
    previous: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
    next:
      currentIndex < allLessons.length - 1
        ? allLessons[currentIndex + 1]
        : null,
  };
}

/**
 * Get all lesson paths for static generation
 */
export function getAllLessonPaths(): {
  section: string;
  lesson: string;
}[] {
  const course = getCourseStructure();
  const paths: { section: string; lesson: string }[] = [];

  for (const section of course.sections) {
    for (const lesson of section.lessons) {
      paths.push({
        section: section.slug,
        lesson: lesson.slug,
      });
    }
  }

  return paths;
}
