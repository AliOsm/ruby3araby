"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CourseStructure, SectionStub } from "@/lib/types";

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
      {/* Mobile hamburger button - fixed position */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 text-white shadow-lg lg:hidden"
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
        className={`fixed top-0 right-0 z-40 h-full w-72 transform overflow-y-auto border-l border-gray-800 bg-gray-900 transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:z-0 lg:h-screen lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="sticky top-0 z-10 border-b border-gray-800 bg-gray-900 p-4">
          <Link
            href="/"
            className="block text-xl font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            {course.title}
          </Link>
          <p className="mt-1 text-sm text-gray-400">دورة تعلم روبي</p>
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
              />
            ))}
          </ul>
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
}

function SectionAccordion({
  section,
  sectionIndex,
  isOpen,
  onToggle,
  isCurrentLesson,
  currentSectionSlug,
}: SectionAccordionProps) {
  const isCurrentSection = section.slug === currentSectionSlug;

  return (
    <li>
      {/* Section header (accordion toggle) */}
      <button
        onClick={onToggle}
        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-right transition-colors ${
          isCurrentSection
            ? "bg-emerald-900/30 text-emerald-400"
            : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }`}
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-xs font-medium text-gray-300">
            {sectionIndex + 1}
          </span>
          <span className="font-medium">{section.title}</span>
        </span>
        {/* Chevron indicator */}
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
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
          return (
            <li key={lesson.id}>
              <Link
                href={`/lessons/${section.slug}/${lesson.slug}`}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isCurrent
                    ? "bg-emerald-600 text-white font-medium"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="flex h-5 w-5 items-center justify-center text-xs text-gray-500">
                  {lessonIndex + 1}.
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
