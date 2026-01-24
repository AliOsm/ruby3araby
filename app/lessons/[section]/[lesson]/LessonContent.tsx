"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface LessonContentProps {
  sectionSlug: string;
  lessonSlug: string;
}

/**
 * Lesson content component that renders markdown with Arabic typography
 * For now, shows a placeholder until lesson markdown files are created
 */
export default function LessonContent({
  sectionSlug,
  lessonSlug,
}: LessonContentProps) {
  // Placeholder content until lesson markdown files are created
  const placeholderContent = `
## محتوى الدرس

هذا الدرس في قسم **${sectionSlug}** بعنوان **${lessonSlug}**.

سيتم إضافة محتوى الدرس الكامل قريباً. في الوقت الحالي، يمكنك تجربة كتابة كود روبي في المحرر على اليسار.

### مثال بسيط

\`\`\`ruby
# هذا تعليق في روبي
puts "مرحبا بالعالم!"

# المتغيرات
name = "أحمد"
puts "مرحبا يا #{name}!"
\`\`\`

### جرب بنفسك

اكتب الكود في المحرر واضغط على زر "تشغيل" لرؤية النتيجة.
`;

  return (
    <article className="prose prose-invert prose-emerald max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom heading styles
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-white mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold text-white mt-6 mb-3 border-b border-gray-700 pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-white mt-4 mb-2">
              {children}
            </h3>
          ),
          // Paragraphs with proper Arabic spacing
          p: ({ children }) => (
            <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
          ),
          // Lists with RTL support
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-300">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="text-gray-300">{children}</li>,
          // Code blocks with LTR direction
          code: ({ className, children }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-gray-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code
                className="block bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm font-mono text-gray-300"
                dir="ltr"
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre
              className="bg-gray-800 rounded-lg overflow-x-auto mb-4"
              dir="ltr"
            >
              {children}
            </pre>
          ),
          // Strong and emphasis
          strong: ({ children }) => (
            <strong className="text-white font-semibold">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-emerald-300 italic">{children}</em>
          ),
          // Blockquotes for notes
          blockquote: ({ children }) => (
            <blockquote className="border-r-4 border-emerald-500 bg-gray-800/50 pr-4 py-2 my-4 text-gray-300">
              {children}
            </blockquote>
          ),
          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-emerald-400 hover:text-emerald-300 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          // Horizontal rules
          hr: () => <hr className="border-gray-700 my-6" />,
          // Tables
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse border border-gray-700">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-gray-700 bg-gray-800 px-4 py-2 text-white font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-700 px-4 py-2 text-gray-300">
              {children}
            </td>
          ),
        }}
      >
        {placeholderContent}
      </ReactMarkdown>
    </article>
  );
}
