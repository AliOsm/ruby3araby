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
      title: "الدرس غير موجود | روبي بالعربي",
    };
  }

  return {
    title: `${nav.current.lesson.title} | روبي بالعربي`,
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
    <div className="min-h-screen bg-gray-950 lg:flex lg:flex-row-reverse">
      {/* Sidebar - right side in RTL */}
      <Sidebar course={course} />

      {/* Main content wrapper */}
      <div className="flex-1">
        {/* Header with breadcrumb */}
        <header className="border-b border-gray-800 bg-gray-900">
          <div className="mx-auto max-w-5xl px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-emerald-400 transition-colors">
                {course.title}
              </Link>
              <span className="text-gray-600">/</span>
              <span>{nav.current.section.title}</span>
              <span className="text-gray-600">/</span>
              <span className="text-white">{nav.current.lesson.title}</span>
            </nav>
          </div>
        </header>

        {/* Main content area - split layout on desktop, stacked on mobile */}
        <main className="mx-auto max-w-5xl px-4 py-6">
          {/* Lesson title */}
          <h1 className="mb-6 text-3xl font-bold text-white">
            {nav.current.lesson.title}
          </h1>

          {/* Split layout: Content on right (RTL), Playground on left */}
          <div className="flex flex-col gap-6 xl:flex-row-reverse">
            {/* Arabic content panel - right side in RTL */}
            <div className="flex-1 xl:max-w-[50%]">
              <LessonContent
                sectionSlug={section}
                lessonSlug={lesson}
              />
            </div>

            {/* Code playground panel - left side in RTL */}
            <div className="flex-1 xl:max-w-[50%] xl:sticky xl:top-4 xl:self-start">
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
                <h2 className="mb-4 text-lg font-semibold text-white">
                  {nav.current.lesson.exercise ? "التمرين" : "جرب الكود"}
                </h2>
                <LessonPlayground
                  lessonId={`${section}/${lesson}`}
                  exercise={nav.current.lesson.exercise}
                />
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <nav className="mt-8 flex items-center justify-between border-t border-gray-800 pt-6">
            {/* Previous lesson button */}
            {nav.previous ? (
              <Link
                href={`/lessons/${nav.previous.section.slug}/${nav.previous.lesson.slug}`}
                className="group flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 transition-colors hover:border-emerald-600 hover:bg-gray-700"
              >
                <svg
                  className="h-5 w-5 text-gray-400 transition-transform group-hover:-translate-x-1 group-hover:text-emerald-400 rtl:rotate-180"
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
                <div className="text-right rtl:text-left">
                  <div className="text-xs text-gray-400">الدرس السابق</div>
                  <div className="text-sm font-medium text-white">
                    {nav.previous.lesson.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {/* Next lesson button */}
            {nav.next ? (
              <Link
                href={`/lessons/${nav.next.section.slug}/${nav.next.lesson.slug}`}
                className="group flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 transition-colors hover:border-emerald-600 hover:bg-gray-700"
              >
                <div className="text-left rtl:text-right">
                  <div className="text-xs text-gray-400">الدرس التالي</div>
                  <div className="text-sm font-medium text-white">
                    {nav.next.lesson.title}
                  </div>
                </div>
                <svg
                  className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-400 rtl:rotate-180"
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
                className="group flex items-center gap-2 rounded-lg border border-emerald-600 bg-emerald-600/10 px-4 py-3 transition-colors hover:bg-emerald-600/20"
              >
                <div className="text-left rtl:text-right">
                  <div className="text-xs text-emerald-400">أحسنت!</div>
                  <div className="text-sm font-medium text-white">
                    العودة للرئيسية
                  </div>
                </div>
                <svg
                  className="h-5 w-5 text-emerald-400"
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

