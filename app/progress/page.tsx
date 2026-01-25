"use client";

import { useMemo, memo, useState } from "react";
import Link from "next/link";
import { useCompletedLessons } from "@/lib/useProgress";
import { getCourseStructure } from "@/lib/course-loader";
import { SectionStub, LessonStub } from "@/lib/types";

// Section progress data structure
interface SectionProgress {
  section: SectionStub;
  completedLessons: LessonStub[];
  remainingLessons: LessonStub[];
  completionPercentage: number;
}

export default function ProgressPage() {
  // Use hydration-safe hook for completed lessons (no setTimeout workaround needed)
  const completedLessonIds = useCompletedLessons();

  // Get course structure
  const course = getCourseStructure();

  // Calculate total lessons
  const totalLessons = course.sections.reduce(
    (acc, section) => acc + section.lessons.length,
    0
  );

  // Create Set for O(1) lookups instead of O(n) array.includes()
  const completedSet = useMemo(
    () => new Set(completedLessonIds),
    [completedLessonIds]
  );

  // Calculate section progress with memoization
  const sectionsProgress: SectionProgress[] = useMemo(() => {
    return course.sections.map((section) => {
      const completedLessons = section.lessons.filter((lesson) =>
        completedSet.has(`${section.slug}/${lesson.slug}`)
      );
      const remainingLessons = section.lessons.filter(
        (lesson) => !completedSet.has(`${section.slug}/${lesson.slug}`)
      );
      const completionPercentage =
        section.lessons.length > 0
          ? Math.round((completedLessons.length / section.lessons.length) * 100)
          : 0;

      return {
        section,
        completedLessons,
        remainingLessons,
        completionPercentage,
      };
    });
  }, [course.sections, completedSet]);

  // Calculate overall progress
  const completedCount = completedLessonIds.length;
  const overallPercentage =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Find next incomplete lesson
  // Using a helper function that the React Compiler can optimize
  const findNextIncompleteLesson = (): {
    section: SectionStub;
    lesson: LessonStub;
  } | null => {
    for (const section of course.sections) {
      for (const lesson of section.lessons) {
        const lessonId = `${section.slug}/${lesson.slug}`;
        if (!completedSet.has(lessonId)) {
          return { section, lesson };
        }
      }
    }
    return null;
  };
  const nextLesson = findNextIncompleteLesson();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-foreground/10 bg-gradient-to-b from-ruby-surface to-background">
        <div className="mx-auto max-w-4xl px-6 py-8">
          {/* Back to Home */}
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-foreground/60 transition-colors hover:text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 rtl:rotate-180"
            >
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                clipRule="evenodd"
              />
            </svg>
            <span>العودة للرئيسية</span>
          </Link>

          <h1 className="mb-4 text-3xl font-bold lg:text-4xl">تقدمك في الدورة</h1>
          <p className="text-foreground/70">
            تابع تقدمك في تعلم لغة روبي واستمر من حيث توقفت
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        {/* Overall Progress Card */}
        <div className="mb-10 rounded-xl border border-foreground/10 bg-foreground/5 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">التقدم الإجمالي</h2>
            <span className="text-2xl font-bold text-ruby-primary">
              {overallPercentage}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-4 h-4 overflow-hidden rounded-full bg-foreground/10">
            <div
              className="h-full rounded-full bg-ruby-primary transition-all duration-500"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-foreground/70">
            <span>
              أكملت {completedCount} من {totalLessons} درس
            </span>
            <span>متبقي {totalLessons - completedCount} درس</span>
          </div>
        </div>

        {/* Continue Learning Button */}
        {nextLesson && (
          <div className="mb-10">
            <Link
              href={`/lessons/${nextLesson.section.slug}/${nextLesson.lesson.slug}`}
              className="flex items-center justify-between rounded-xl border border-ruby-primary/30 bg-ruby-primary/10 p-6 transition-colors hover:border-ruby-primary/50 hover:bg-ruby-primary/20"
            >
              <div>
                <p className="mb-1 text-sm text-ruby-primary">الدرس التالي</p>
                <p className="text-lg font-semibold">{nextLesson.lesson.title}</p>
                <p className="text-sm text-foreground/60">
                  في قسم: {nextLesson.section.title}
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-ruby-primary px-4 py-2 text-white">
                <span>أكمل التعلم</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 rtl:rotate-180"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </Link>
          </div>
        )}

        {/* All Completed Message */}
        {!nextLesson && completedCount === totalLessons && (
          <div className="mb-10 rounded-xl border border-green-500/30 bg-green-500/10 p-6 text-center">
            <div className="mb-3 text-4xl">🎉</div>
            <h3 className="mb-2 text-xl font-semibold text-green-400">
              مبروك! أكملت جميع الدروس
            </h3>
            <p className="text-foreground/70">
              لقد أنهيت دورة روبي عربي بنجاح. استمر في الممارسة وبناء المشاريع!
            </p>
          </div>
        )}

        {/* Sections Progress */}
        <h2 className="mb-6 text-xl font-semibold">التقدم حسب القسم</h2>
        <div className="space-y-4">
          {sectionsProgress.map((sp, index) => (
            <SectionProgressCard key={sp.section.id} sectionProgress={sp} index={index} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-foreground/10 py-8">
        <div className="mx-auto max-w-4xl px-6 text-center text-sm text-foreground/60">
          <p>روبي عربي © 2026 - تعلم البرمجة باللغة العربية</p>
        </div>
      </footer>
    </div>
  );
}

// Section Progress Card Component
// Memoize to prevent re-renders when other sections' progress updates
const SectionProgressCard = memo(function SectionProgressCard({
  sectionProgress,
  index,
}: {
  sectionProgress: SectionProgress;
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { section, completedLessons, remainingLessons, completionPercentage } =
    sectionProgress;
  const isComplete = completionPercentage === 100;

  return (
    <div className="overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5">
      {/* Section Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4 text-right transition-colors hover:bg-foreground/5"
      >
        <div className="flex items-center gap-3">
          {/* Section Number */}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/15 text-sm font-medium text-foreground">
            {index + 1}
          </span>

          {/* Section Info */}
          <div className="text-right">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{section.title}</h3>
              {isComplete && (
                <span className="text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </div>
            <p className="text-sm text-foreground/60">
              {completedLessons.length} من {section.lessons.length} دروس
            </p>
          </div>
        </div>

        {/* Progress and Expand */}
        <div className="flex items-center gap-4">
          {/* Mini Progress Bar */}
          <div className="hidden h-2 w-24 overflow-hidden rounded-full bg-foreground/10 sm:block">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isComplete ? "bg-green-500" : "bg-ruby-primary/70"
              }`}
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          {/* Percentage */}
          <span
            className={`text-sm font-medium ${
              isComplete ? "text-green-500" : "text-foreground/70"
            }`}
          >
            {completionPercentage}%
          </span>

          {/* Expand Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-5 w-5 text-foreground/60 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>

      {/* Lessons List (Expanded) */}
      {isExpanded && (
        <div className="border-t border-foreground/10 bg-background/50">
          {/* Completed Lessons */}
          {completedLessons.length > 0 && (
            <div className="p-4">
              <h4 className="mb-3 text-sm font-medium text-green-500">
                الدروس المكتملة ({completedLessons.length})
              </h4>
              <ul className="space-y-2">
                {completedLessons.map((lesson) => (
                  <li key={lesson.id}>
                    <Link
                      href={`/lessons/${section.slug}/${lesson.slug}`}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-foreground/5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4 text-green-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-foreground/80">{lesson.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Remaining Lessons */}
          {remainingLessons.length > 0 && (
            <div className={`p-4 ${completedLessons.length > 0 ? "border-t border-foreground/10" : ""}`}>
              <h4 className="mb-3 text-sm font-medium text-foreground/60">
                الدروس المتبقية ({remainingLessons.length})
              </h4>
              <ul className="space-y-2">
                {remainingLessons.map((lesson) => (
                  <li key={lesson.id}>
                    <Link
                      href={`/lessons/${section.slug}/${lesson.slug}`}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-foreground/5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4 text-foreground/30"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-foreground/60">{lesson.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
});
