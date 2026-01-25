"use client";

import Link from "next/link";
import { getCourseStructure } from "@/lib/course-loader";
import { useLastLesson, useCompletedCount } from "@/lib/useProgress";
import ThemeToggle from "@/components/ThemeToggle";

// Static code preview for the mockup
const previewCode = `# مرحبا بك في روبي!
name = "أحمد"
puts "مرحبا يا #{name}!"

# حلقة بسيطة
3.times do |i|
  puts "العد: #{i + 1}"
end`;

const previewOutput = `مرحبا يا أحمد!
العد: 1
العد: 2
العد: 3`;

export default function Home() {
  // Use hydration-safe hooks from useProgress
  const lastLesson = useLastLesson();
  const completedCount = useCompletedCount();

  // Get course structure for total lesson count
  const course = getCourseStructure();
  const totalLessons = course.sections.reduce(
    (acc, section) => acc + section.lessons.length,
    0
  );

  // First lesson path
  const firstLessonPath = "/lessons/getting-started/what-is-ruby";

  // Build continue path from last lesson
  const continuePath = lastLesson ? `/lessons/${lastLesson}` : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header with theme toggle */}
      <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="text-xl font-bold text-ruby-primary hover:text-ruby-secondary transition-colors"
          >
            روبي عربي
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/progress"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              تقدمي
            </Link>
            <Link
              href="/glossary"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              المصطلحات
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-foreground/10 bg-linear-to-b from-ruby-surface to-background">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-32">
          <div className="text-center">
            {/* Main Title */}
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground lg:text-7xl">
              روبي عربي
            </h1>

            {/* Tagline */}
            <p className="mx-auto mb-8 max-w-2xl text-xl text-foreground/80 lg:text-2xl">
              تعلم لغة البرمجة روبي باللغة العربية من خلال دروس تفاعلية ومحرر شيفرة
              مباشر في المتصفح
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={firstLessonPath}
                className="inline-flex items-center gap-2 rounded-lg bg-ruby-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-ruby-secondary"
              >
                <span>ابدأ التعلم</span>
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
              </Link>

              {/* Continue Button - Only show if user has progress */}
              {continuePath && (
                <Link
                  href={continuePath}
                  className="inline-flex items-center gap-2 rounded-lg border border-foreground/20 bg-foreground/5 px-8 py-4 text-lg font-semibold text-foreground transition-colors hover:bg-foreground/10"
                >
                  <span>أكمل من حيث توقفت</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 rtl:rotate-180"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              )}
            </div>

            {/* Progress indicator if user has some progress */}
            {completedCount > 0 && (
              <div className="mt-8 text-sm text-foreground/60">
                أكملت {completedCount} من {totalLessons} درس
              </div>
            )}
          </div>
        </div>

        {/* Decorative gradient blob */}
        <div className="absolute top-0 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ruby-primary/10 blur-3xl" />
      </section>

      {/* About Ruby Section */}
      <section className="border-b border-foreground/10 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Text Content */}
            <div>
              <h2 className="mb-6 text-3xl font-bold lg:text-4xl">
                ما هي لغة روبي؟
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-foreground/80">
                <p>
                  روبي هي لغة برمجة ديناميكية وأنيقة صُممت في اليابان لتكون سهلة
                  القراءة والكتابة. تجمع بين البساطة والقوة، مما يجعلها مثالية
                  للمبتدئين والمحترفين على حد سواء.
                </p>
                <p>
                  تُستخدم روبي على نطاق واسع في تطوير الويب من خلال إطار العمل
                  الشهير Rails، وكذلك في الأتمتة وكتابة السكربتات وتحليل البيانات.
                </p>
              </div>

              {/* Feature List */}
              <ul className="mt-8 space-y-3">
                <li className="flex items-center gap-3 text-foreground/80">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ruby-primary/20 text-ruby-primary">
                    ✓
                  </span>
                  <span>قواعد نحوية واضحة وسهلة التعلم</span>
                </li>
                <li className="flex items-center gap-3 text-foreground/80">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ruby-primary/20 text-ruby-primary">
                    ✓
                  </span>
                  <span>مجتمع نشط ومكتبات غنية</span>
                </li>
                <li className="flex items-center gap-3 text-foreground/80">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ruby-primary/20 text-ruby-primary">
                    ✓
                  </span>
                  <span>مثالية لتطوير الويب والأتمتة</span>
                </li>
                <li className="flex items-center gap-3 text-foreground/80">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ruby-primary/20 text-ruby-primary">
                    ✓
                  </span>
                  <span>برمجة كائنية بالكامل</span>
                </li>
              </ul>
            </div>

            {/* Code Editor Preview/Mockup */}
            <div className="lg:pt-8">
              <div className="overflow-hidden rounded-xl border border-foreground/10 bg-zinc-900 shadow-2xl">
                {/* Editor Header */}
                <div className="flex items-center gap-2 border-b border-foreground/10 bg-zinc-800/50 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <span className="mr-auto font-mono text-sm text-zinc-400">
                    example.rb
                  </span>
                </div>

                {/* Code Preview */}
                <div dir="ltr" className="p-4">
                  <pre className="font-mono text-sm leading-relaxed">
                    {previewCode.split("\n").map((line, i) => (
                      <div key={i} className="flex">
                        <span className="w-8 select-none text-left text-zinc-600">
                          {i + 1}
                        </span>
                        <code className="flex-1 whitespace-pre">
                          {line.startsWith("#") ? (
                            <span className="text-zinc-500">{line}</span>
                          ) : line.trimStart().startsWith("puts") ? (
                            <>
                              <span className="text-zinc-300">{line.match(/^\s*/)?.[0]}</span>
                              <span className="text-purple-400">puts</span>
                              <span className="text-zinc-300">
                                {line.trimStart().replace("puts", "")}
                              </span>
                            </>
                          ) : line.includes("times") ? (
                            <>
                              <span className="text-orange-400">3</span>
                              <span className="text-zinc-300">.times </span>
                              <span className="text-purple-400">do</span>
                              <span className="text-zinc-300"> |i|</span>
                            </>
                          ) : line.includes("end") ? (
                            <span className="text-purple-400">end</span>
                          ) : line.includes("=") && !line.includes("#{") ? (
                            <>
                              <span className="text-blue-400">
                                {line.split("=")[0].trim()}
                              </span>
                              <span className="text-zinc-300"> = </span>
                              <span className="text-ruby-accent">
                                {line.split("=")[1].trim()}
                              </span>
                            </>
                          ) : (
                            <span className="text-zinc-300">{line}</span>
                          )}
                        </code>
                      </div>
                    ))}
                  </pre>
                </div>

                {/* Output Section */}
                <div className="border-t border-foreground/10 bg-zinc-950 p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs text-zinc-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5zm1.5 0a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75v-7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>المخرجات</span>
                  </div>
                  <pre
                    dir="ltr"
                    className="font-mono text-sm leading-relaxed text-ruby-accent"
                  >
                    {previewOutput}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Features Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold lg:text-4xl">
            ماذا ستتعلم؟
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature Cards */}
            {[
              {
                icon: "📝",
                title: "الأساسيات",
                description:
                  "تعلم المتغيرات وأنواع البيانات والعمليات الحسابية والمنطقية",
              },
              {
                icon: "🔄",
                title: "التحكم في التدفق",
                description: "الشروط والحلقات التكرارية للتحكم في مسار البرنامج",
              },
              {
                icon: "📦",
                title: "المجموعات",
                description:
                  "المصفوفات والقواميس لتخزين وإدارة البيانات بفعالية",
              },
              {
                icon: "⚡",
                title: "الدوال والكتل",
                description:
                  "إنشاء شيفرة قابلة لإعادة الاستخدام مع الدوال والكتل البرمجية",
              },
              {
                icon: "🏗️",
                title: "البرمجة الكائنية",
                description: "الأصناف والكائنات والوراثة لبناء برامج منظمة",
              },
              {
                icon: "🎯",
                title: "تحديات عملية",
                description:
                  "تمارين تفاعلية لتطبيق ما تعلمته وتعزيز مهاراتك",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-xl border border-foreground/10 bg-foreground/5 p-6 transition-colors hover:border-ruby-primary/30 hover:bg-ruby-primary/5"
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-foreground/10 bg-linear-to-b from-ruby-surface to-background py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-bold lg:text-4xl">
            ابدأ رحلتك في البرمجة اليوم
          </h2>
          <p className="mb-8 text-lg text-foreground/80">
            لا تحتاج إلى تثبيت أي برامج. اكتب وشغّل شيفرة روبي مباشرة في المتصفح
            مع شروحات عربية واضحة.
          </p>
          <Link
            href={firstLessonPath}
            className="inline-flex items-center gap-2 rounded-lg bg-ruby-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-ruby-secondary"
          >
            <span>ابدأ الآن مجاناً</span>
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
          </Link>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-foreground/10 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-foreground/60">
          <p>روبي عربي © 2026 - تعلم البرمجة باللغة العربية</p>
        </div>
      </footer>
    </div>
  );
}
