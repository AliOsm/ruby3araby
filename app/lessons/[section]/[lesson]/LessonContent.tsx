"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";

interface LessonContentProps {
  sectionSlug: string;
  lessonSlug: string;
  content?: string;
}

/**
 * Lesson content component that renders markdown with Arabic typography
 */
export default function LessonContent({
  sectionSlug,
  lessonSlug,
  content: initialContent,
}: LessonContentProps) {
  const [content, setContent] = useState<string | null>(initialContent || null);
  const [loading, setLoading] = useState(!initialContent);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialContent) return;

    const loadContent = async () => {
      try {
        const response = await fetch(
          `/api/lesson-content?section=${sectionSlug}&lesson=${lessonSlug}`
        );
        if (!response.ok) {
          throw new Error("فشل تحميل محتوى الدرس");
        }
        const data = await response.json();
        setContent(data.content);
      } catch {
        setError("لم نتمكن من تحميل محتوى الدرس. جرب تحديث الصفحة.");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [sectionSlug, lessonSlug, initialContent]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-foreground/60">جاري تحميل الدرس...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
        <p className="text-yellow-700 dark:text-yellow-400">محتوى الدرس غير متوفر بعد.</p>
      </div>
    );
  }

  return (
    <article className="prose prose-invert dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom heading styles
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-foreground mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold text-foreground mt-6 mb-3 border-b border-foreground/20 pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">
              {children}
            </h3>
          ),
          // Paragraphs with proper Arabic spacing
          p: ({ children }) => (
            <p className="text-foreground/90 leading-relaxed mb-4">{children}</p>
          ),
          // Lists with RTL support
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 text-foreground/90">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="text-foreground/90">{children}</li>,
          // Code blocks with LTR direction
          code: ({ className, children }) => {
            const isInline = !className;
            if (isInline) {
              // Wrap inline code in <bdi> to isolate it from RTL text flow
              // This prevents English words like "nil?" from displaying as "?nil"
              return (
                <bdi>
                  <code
                    className="bg-foreground/10 text-ruby-accent px-1.5 py-0.5 rounded text-sm font-mono"
                    dir="ltr"
                  >
                    {children}
                  </code>
                </bdi>
              );
            }
            return (
              <code
                className="block bg-foreground/10 p-4 rounded-lg overflow-x-auto text-sm font-mono text-foreground/90"
                dir="ltr"
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre
              className="bg-foreground/10 rounded-lg overflow-x-auto mb-4"
              dir="ltr"
            >
              {children}
            </pre>
          ),
          // Strong and emphasis
          strong: ({ children }) => (
            <strong className="text-foreground font-semibold">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-ruby-accent italic">{children}</em>
          ),
          // Blockquotes for notes
          blockquote: ({ children }) => (
            <blockquote className="border-r-4 border-ruby-primary bg-foreground/5 pr-4 py-2 my-4 text-foreground/90 [&>*:last-child]:mb-0">
              {children}
            </blockquote>
          ),
          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-ruby-primary hover:text-ruby-secondary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          // Horizontal rules
          hr: () => <hr className="border-foreground/20 my-6" />,
          // Tables
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse border border-foreground/20">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-foreground/20 bg-foreground/10 px-4 py-2 text-foreground font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-foreground/20 px-4 py-2 text-foreground/90">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
