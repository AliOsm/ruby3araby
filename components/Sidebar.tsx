"use client";

import { useState, useMemo, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CourseStructure, SectionStub } from "@/lib/types";
import { useCompletedLessons } from "@/lib/useProgress";
import ThemeToggle from "./ThemeToggle";

interface SidebarProps {
  course: CourseStructure;
  /** Hide the fixed toggle button (when button is in the header instead) */
  hideToggleButton?: boolean;
}

/**
 * Sidebar component for navigating course sections and lessons
 * Features:
 * - Collapsible/expandable sections (accordion)
 * - Current lesson highlighting
 * - Scrollable for long curriculum
 * - Mobile hamburger menu toggle
 */
export default function Sidebar({ course, hideToggleButton = false }: SidebarProps) {
  const pathname = usePathname();

  // Extract current section and lesson from pathname
  const pathParts = pathname.split("/");
  const currentSectionSlug = pathParts[2]; // /lessons/[section]/[lesson]
  const currentLessonSlug = pathParts[3];

  // Track completed lessons using hydration-safe hook
  const completedLessonsList = useCompletedLessons();
  const completedLessons = useMemo(
    () => new Set(completedLessonsList),
    [completedLessonsList]
  );

  // Function to check if a lesson is completed
  const isLessonCompleted = useCallback(
    (sectionSlug: string, lessonSlug: string) => {
      const lessonId = `${sectionSlug}/${lessonSlug}`;
      return completedLessons.has(lessonId);
    },
    [completedLessons]
  );

  // Pre-compute all section completion stats - avoids recalculating during render
  const sectionStats = useMemo(() => {
    return new Map(
      course.sections.map((section) => [
        section.slug,
        {
          completed: section.lessons.filter((lesson) =>
            completedLessons.has(`${section.slug}/${lesson.slug}`)
          ).length,
          total: section.lessons.length,
        },
      ])
    );
  }, [completedLessons, course.sections]);

  // Initialize open sections with current section already expanded
  const initialOpenSections = useMemo(
    () => (currentSectionSlug ? new Set([currentSectionSlug]) : new Set<string>()),
    // Only compute on mount - currentSectionSlug changes handled in state update
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [openSections, setOpenSections] = useState<Set<string>>(initialOpenSections);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Listen for toggle-sidebar event from external buttons (e.g., in header)
  useEffect(() => {
    const handleToggle = () => setIsMobileOpen((prev) => !prev);
    document.addEventListener("toggle-sidebar", handleToggle);
    return () => document.removeEventListener("toggle-sidebar", handleToggle);
  }, []);

  // Handle navigation changes - close mobile sidebar and expand new section
  useEffect(() => {
    // Close mobile sidebar on navigation
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
    // Auto-expand new section if not already open
    if (currentSectionSlug && !openSections.has(currentSectionSlug)) {
      setOpenSections((prev) => new Set(prev).add(currentSectionSlug));
    }
    // Only pathname as dependency - we want this to run on navigation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
      {!hideToggleButton && (
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
      )}

      {/* Mobile overlay - always rendered, animated with opacity */}
      <div
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 lg:pointer-events-none lg:hidden ${
          isMobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMobileOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsMobileOpen(false);
          }
        }}
        role="button"
        tabIndex={isMobileOpen ? 0 : -1}
        aria-label="إغلاق القائمة"
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-40 h-full w-72 overflow-y-auto border-l border-foreground/10 bg-background transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:z-0 lg:h-screen lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="sticky top-0 z-10 border-b border-foreground/10 bg-background p-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-ruby-primary hover:text-ruby-secondary transition-colors"
            >
              <img src="/ruby-logo.svg" alt="Ruby" className="h-7 w-7" />
              <span>{course.title}</span>
            </Link>
            <ThemeToggle />
          </div>
          <p className="mt-1 text-sm text-foreground/70">تعلّم البرمجة بأناقة</p>
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
                completionStats={sectionStats.get(section.slug)!}
              />
            ))}
          </ul>

          {/* Quick links - touch-friendly */}
          <div className="mt-6 space-y-1 border-t border-foreground/10 pt-4">
            <Link
              href="/progress"
              className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground"
            >
              <svg
                className="h-5 w-5 text-foreground/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span>تقدمي</span>
            </Link>
            <Link
              href="/glossary"
              className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground"
            >
              <svg
                className="h-5 w-5 text-foreground/60"
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
            <a
              href="https://github.com/AliOsm/ruby3araby"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground"
            >
              <svg
                className="h-5 w-5 text-foreground/60"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
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

// Memoize SectionAccordion to prevent re-renders when other sections' progress updates
const SectionAccordion = memo(function SectionAccordion({
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
            ? "bg-ruby-primary/20 text-ruby-primary"
            : "text-foreground/70 hover:bg-foreground/10 hover:text-foreground"
        }`}
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
              isSectionComplete
                ? "bg-green-500 text-white"
                : "bg-foreground/15 text-foreground"
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
          <span className="text-xs text-foreground/70">
            ({completionStats.completed}/{completionStats.total})
          </span>
        </span>
        {/* Chevron indicator */}
        <svg
          className={`h-4 w-4 text-foreground/70 transition-transform duration-200 ${
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
                    ? "bg-ruby-primary text-white font-medium"
                    : isCompleted
                      ? "text-green-500 hover:bg-foreground/10 hover:text-green-400"
                      : "text-foreground/60 hover:bg-foreground/10 hover:text-foreground"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center text-xs ${
                    isCompleted && !isCurrent ? "text-green-500" : "text-foreground/70"
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
});
