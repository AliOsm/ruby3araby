import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  getLessonNavigation,
  getAllLessonPaths,
  getCourseStructure,
} from "@/lib/course-loader";
import LessonContent from "./LessonContent";
import LessonPlayground from "./LessonPlayground";
import Sidebar from "@/components/Sidebar";
import LessonActions from "@/components/LessonActions";
import MobileMenuButton from "@/components/MobileMenuButton";

interface LessonPageProps {
  params: Promise<{
    section: string;
    lesson: string;
  }>;
}

/**
 * Generate static params for all lessons
 */
export async function generateStaticParams() {
  return getAllLessonPaths();
}

/**
 * Generate metadata for the lesson page
 */
export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { section, lesson } = await params;
  const nav = getLessonNavigation(section, lesson);

  if (!nav) {
    return {
      title: "الدرس غير موجود | روبي عربي",
    };
  }

  return {
    title: `${nav.current.lesson.title} | روبي عربي`,
    description: `تعلم ${nav.current.lesson.title} في لغة روبي - ${nav.current.section.title}`,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { section, lesson } = await params;
  const nav = getLessonNavigation(section, lesson);
  const course = getCourseStructure();

  if (!nav) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background lg:flex lg:flex-row">
      {/* Sidebar - right side in RTL (flex-row works because RTL reverses flex direction) */}
      <Sidebar course={course} hideToggleButton />

      {/* Main content wrapper */}
      <div className="flex-1">
        {/* Header with breadcrumb - mobile-optimized with wrapping */}
        <header className="border-b border-foreground/10 bg-foreground/5">
          <div className="mx-auto max-w-5xl px-3 py-3 sm:px-4 sm:py-4">
            <div className="flex items-center gap-3">
              {/* Mobile menu button - inside header */}
              <MobileMenuButton />
              <nav className="flex flex-wrap items-center gap-1.5 text-xs text-foreground/60 sm:gap-2 sm:text-sm">
              <Link href="/" className="hover:text-ruby-primary transition-colors shrink-0">
                {course.title}
              </Link>
              <span className="text-foreground/30">/</span>
              <span className="shrink-0">{nav.current.section.title}</span>
              <span className="text-foreground/30">/</span>
              <span className="text-foreground break-words">{nav.current.lesson.title}</span>
              </nav>
            </div>
          </div>
        </header>

        {/* Main content area - split layout on desktop, stacked on mobile */}
        <main className="mx-auto max-w-5xl px-3 py-4 sm:px-4 sm:py-6">
          {/* Lesson title with action buttons - responsive layout */}
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3 sm:mb-6">
            <h1 className="text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
              {nav.current.lesson.title}
            </h1>
            <LessonActions sectionSlug={section} lessonSlug={lesson} />
          </div>

          {/* Split layout: Content on right (RTL), Playground on left */}
          {/* In RTL with flex-row: first child appears on RIGHT, last child on LEFT */}
          <div className="flex flex-col gap-6 xl:flex-row">
            {/* Arabic content panel - appears on right in RTL */}
            <article className="flex-1 xl:max-w-[50%]">
              <LessonContent
                sectionSlug={section}
                lessonSlug={lesson}
              />
            </article>

            {/* Code playground panel - appears on left in RTL */}
            <aside className="min-w-0 flex-1 xl:max-w-[50%] xl:sticky xl:top-4 xl:self-start">
              <div className="flex flex-col rounded-lg border border-foreground/10 bg-foreground/5 p-3 sm:p-4 xl:max-h-[calc(100vh-2rem)]">
                <h2 className="mb-3 shrink-0 text-base font-semibold text-foreground sm:mb-4 sm:text-lg">
                  {nav.current.lesson.exercise ? "التمرين" : "جرب الشيفرة"}
                </h2>
                <div className="min-h-0 flex-1 xl:overflow-y-auto">
                  <LessonPlayground
                    lessonId={`${section}/${lesson}`}
                    exercise={nav.current.lesson.exercise}
                  />
                </div>
              </div>
            </aside>
          </div>

          {/* Navigation buttons - responsive with touch-friendly targets */}
          <nav className="mt-6 flex flex-col gap-3 border-t border-foreground/10 pt-4 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
            {/* Previous lesson button */}
            {nav.previous ? (
              <Link
                href={`/lessons/${nav.previous.section.slug}/${nav.previous.lesson.slug}`}
                className="group flex min-h-[44px] items-center gap-2 rounded-lg border border-foreground/20 bg-foreground/5 px-3 py-2.5 transition-colors hover:border-ruby-primary hover:bg-foreground/10 sm:px-4 sm:py-3"
              >
                <svg
                  className="h-5 w-5 shrink-0 text-foreground/60 transition-transform group-hover:-translate-x-1 group-hover:text-ruby-primary rtl:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <div className="min-w-0 text-right rtl:text-left">
                  <div className="text-xs text-foreground/60">الدرس السابق</div>
                  <div className="truncate text-sm font-medium text-foreground">
                    {nav.previous.lesson.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}

            {/* Next lesson button */}
            {nav.next ? (
              <Link
                href={`/lessons/${nav.next.section.slug}/${nav.next.lesson.slug}`}
                className="group flex min-h-[44px] items-center gap-2 rounded-lg border border-foreground/20 bg-foreground/5 px-3 py-2.5 transition-colors hover:border-ruby-primary hover:bg-foreground/10 sm:px-4 sm:py-3"
              >
                <div className="min-w-0 text-left rtl:text-right">
                  <div className="text-xs text-foreground/60">الدرس التالي</div>
                  <div className="truncate text-sm font-medium text-foreground">
                    {nav.next.lesson.title}
                  </div>
                </div>
                <svg
                  className="h-5 w-5 shrink-0 text-foreground/60 transition-transform group-hover:translate-x-1 group-hover:text-ruby-primary rtl:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                </Link>
            ) : (
              <Link
                href="/"
                className="group flex min-h-[44px] items-center gap-2 rounded-lg border border-green-600 bg-green-600/10 px-3 py-2.5 transition-colors hover:bg-green-600/20 sm:px-4 sm:py-3"
              >
                <div className="min-w-0 text-left rtl:text-right">
                  <div className="text-xs text-green-400">أحسنت!</div>
                  <div className="truncate text-sm font-medium text-foreground">
                    العودة للرئيسية
                  </div>
                </div>
                <svg
                  className="h-5 w-5 shrink-0 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </Link>
            )}
          </nav>
        </main>
      </div>
    </div>
  );
}

