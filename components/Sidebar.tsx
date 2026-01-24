"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CourseStructure, SectionStub } from "@/lib/types";
import { ProgressService } from "@/lib/progress";
import ThemeToggle from "./ThemeToggle";

interface SidebarProps {
  course: CourseStructure;
}

/**
 * Sidebar component for navigating course sections and lessons
 * Features:
 * - Collapsible/expandable sections (accordion)
 * - Current lesson highlighting
 * - Scrollable for long curriculum
 * - Mobile hamburger menu toggle
 */
export default function Sidebar({ course }: SidebarProps) {
  const pathname = usePathname();

  // Extract current section and lesson from pathname
  const pathParts = pathname.split("/");
  const currentSectionSlug = pathParts[2]; // /lessons/[section]/[lesson]
  const currentLessonSlug = pathParts[3];

  // Track the previous pathname to detect navigation
  const prevPathnameRef = useRef(pathname);

  // Track completed lessons from ProgressService
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  // Load completed lessons on mount and listen for changes
  useEffect(() => {
    const loadCompletedLessons = () => {
      const completed = ProgressService.getCompletedLessons();
      setCompletedLessons(new Set(completed));
    };

    // Initial load
    loadCompletedLessons();

    // Listen for storage changes (other tabs) and custom progress events
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.startsWith("ruby3araby_")) {
        loadCompletedLessons();
      }
    };

    const handleProgressUpdate = () => {
      loadCompletedLessons();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("progressUpdate", handleProgressUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("progressUpdate", handleProgressUpdate);
    };
  }, []);

  // Function to check if a lesson is completed
  const isLessonCompleted = useCallback(
    (sectionSlug: string, lessonSlug: string) => {
      const lessonId = `${sectionSlug}/${lessonSlug}`;
      return completedLessons.has(lessonId);
    },
    [completedLessons]
  );

  // Calculate section completion stats
  const getSectionCompletionStats = useCallback(
    (section: SectionStub) => {
      const completedCount = section.lessons.filter((lesson) =>
        completedLessons.has(`${section.slug}/${lesson.slug}`)
      ).length;
      return { completed: completedCount, total: section.lessons.length };
    },
    [completedLessons]
  );

  // Initialize open sections with current section already expanded
  const initialOpenSections = useMemo(
    () => (currentSectionSlug ? new Set([currentSectionSlug]) : new Set<string>()),
    // Only compute on mount - currentSectionSlug changes handled in state update
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [openSections, setOpenSections] = useState<Set<string>>(initialOpenSections);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Handle navigation changes - close mobile sidebar and expand new section
  // Using a ref-based approach to avoid setState in useEffect
  if (pathname !== prevPathnameRef.current) {
    prevPathnameRef.current = pathname;
    if (isMobileOpen) {
      // Schedule state update during render (React 18+ supported pattern)
      setTimeout(() => setIsMobileOpen(false), 0);
    }
    // Auto-expand new section if changed
    if (currentSectionSlug && !openSections.has(currentSectionSlug)) {
      setTimeout(() => {
        setOpenSections((prev) => new Set(prev).add(currentSectionSlug));
      }, 0);
    }
  }

  const toggleSection = (sectionSlug: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionSlug)) {
        next.delete(sectionSlug);
      } else {
        next.add(sectionSlug);
      }
      return next;
    });
  };

  const isCurrentLesson = (sectionSlug: string, lessonSlug: string) => {
    return sectionSlug === currentSectionSlug && lessonSlug === currentLessonSlug;
  };

  return (
    <>
      {/* Mobile hamburger button - fixed position, touch-friendly (44px min) */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-3 right-3 z-50 flex h-11 w-11 items-center justify-center rounded-lg bg-foreground/10 text-foreground shadow-lg backdrop-blur-sm lg:hidden"
        aria-label={isMobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
      >
        {isMobileOpen ? (
          // Close icon (X)
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          // Hamburger icon
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-40 h-full w-72 transform overflow-y-auto border-l border-foreground/10 bg-background transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:z-0 lg:h-screen lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="sticky top-0 z-10 border-b border-foreground/10 bg-background p-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="block text-xl font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              {course.title}
            </Link>
            <ThemeToggle />
          </div>
          <p className="mt-1 text-sm text-foreground/60">دورة تعلم روبي</p>
        </div>

        {/* Scrollable sections list */}
        <nav className="p-4">
          <ul className="space-y-2">
            {course.sections.map((section, sectionIndex) => (
              <SectionAccordion
                key={section.id}
                section={section}
                sectionIndex={sectionIndex}
                isOpen={openSections.has(section.slug)}
                onToggle={() => toggleSection(section.slug)}
                isCurrentLesson={isCurrentLesson}
                currentSectionSlug={currentSectionSlug}
                isLessonCompleted={isLessonCompleted}
                completionStats={getSectionCompletionStats(section)}
              />
            ))}
          </ul>

          {/* Glossary link - touch-friendly */}
          <div className="mt-6 border-t border-foreground/10 pt-4">
            <Link
              href="/glossary"
              className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground"
            >
              <svg
                className="h-5 w-5 text-foreground/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span>قاموس المصطلحات</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}

interface SectionAccordionProps {
  section: SectionStub;
  sectionIndex: number;
  isOpen: boolean;
  onToggle: () => void;
  isCurrentLesson: (sectionSlug: string, lessonSlug: string) => boolean;
  currentSectionSlug: string;
  isLessonCompleted: (sectionSlug: string, lessonSlug: string) => boolean;
  completionStats: { completed: number; total: number };
}

function SectionAccordion({
  section,
  sectionIndex,
  isOpen,
  onToggle,
  isCurrentLesson,
  currentSectionSlug,
  isLessonCompleted,
  completionStats,
}: SectionAccordionProps) {
  const isCurrentSection = section.slug === currentSectionSlug;
  const isSectionComplete = completionStats.completed === completionStats.total;

  return (
    <li>
      {/* Section header (accordion toggle) - touch-friendly */}
      <button
        onClick={onToggle}
        className={`flex min-h-[44px] w-full items-center justify-between rounded-lg px-3 py-2.5 text-right transition-colors ${
          isCurrentSection
            ? "bg-emerald-900/30 text-emerald-400"
            : "text-foreground/70 hover:bg-foreground/10 hover:text-foreground"
        }`}
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
              isSectionComplete
                ? "bg-emerald-600 text-white"
                : "bg-foreground/20 text-foreground/70"
            }`}
          >
            {isSectionComplete ? (
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              sectionIndex + 1
            )}
          </span>
          <span className="font-medium">{section.title}</span>
          <span className="text-xs text-foreground/50">
            ({completionStats.completed}/{completionStats.total})
          </span>
        </span>
        {/* Chevron indicator */}
        <svg
          className={`h-4 w-4 text-foreground/50 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Lessons list (collapsible content) */}
      <ul
        className={`mt-1 mr-4 space-y-1 overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {section.lessons.map((lesson, lessonIndex) => {
          const isCurrent = isCurrentLesson(section.slug, lesson.slug);
          const isCompleted = isLessonCompleted(section.slug, lesson.slug);
          return (
            <li key={lesson.id}>
              <Link
                href={`/lessons/${section.slug}/${lesson.slug}`}
                className={`flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isCurrent
                    ? "bg-emerald-600 text-white font-medium"
                    : isCompleted
                      ? "text-emerald-400 hover:bg-foreground/10 hover:text-emerald-300"
                      : "text-foreground/60 hover:bg-foreground/10 hover:text-foreground"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center text-xs ${
                    isCompleted && !isCurrent ? "text-emerald-500" : "text-foreground/50"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    `${lessonIndex + 1}.`
                  )}
                </span>
                <span className="flex-1">{lesson.title}</span>
                {isCurrent && (
                  <span className="h-2 w-2 rounded-full bg-white" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
