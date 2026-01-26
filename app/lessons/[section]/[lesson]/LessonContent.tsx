import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "@/components/CodeBlock";

interface LessonContentProps {
  content: string;
}

/**
 * Markdown component configurations hoisted to module level
 * This prevents recreation of the component object on every render
 */
const markdownComponents = {
  // Custom heading styles
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-2xl font-bold text-foreground mb-4">{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-xl font-bold text-foreground mt-6 mb-3 border-b border-foreground/20 pb-2">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">
      {children}
    </h3>
  ),
  // Paragraphs with proper Arabic spacing
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-foreground/90 leading-relaxed mb-4">{children}</p>
  ),
  // Lists with RTL support
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-foreground/90">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-foreground/90">{children}</li>
  ),
  // Inline code with LTR direction
  code: ({
    className,
    children,
  }: {
    className?: string;
    children?: React.ReactNode;
  }) => {
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
    // Block code is handled by the pre component with syntax highlighting
    return <>{children}</>;
  },
  // Code blocks with syntax highlighting
  pre: ({ children }: { children?: React.ReactNode }) => {
    // Extract the code and language from the children
    // ReactMarkdown wraps code in: <pre><code className="language-xxx">...</code></pre>
    const codeElement = children as React.ReactElement<{
      className?: string;
      children?: string;
    }>;
    const className = codeElement?.props?.className || "";
    const code = codeElement?.props?.children || "";

    // Extract language from className (e.g., "language-ruby" -> "ruby")
    // Default to "text" for output blocks (no language) to enable RTL support
    const languageMatch = className.match(/language-(\w+)/);
    const language = languageMatch ? languageMatch[1] : "text";

    // Get the code string
    const codeString = typeof code === "string" ? code : String(code || "");

    return (
      <div className="mb-4">
        <CodeBlock code={codeString} language={language} />
      </div>
    );
  },
  // Strong and emphasis
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="text-foreground font-semibold">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="text-ruby-accent italic">{children}</em>
  ),
  // Blockquotes for notes
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-r-4 border-ruby-primary bg-foreground/5 pr-4 py-2 my-4 text-foreground/90 [&>*:last-child]:mb-0">
      {children}
    </blockquote>
  ),
  // Links
  a: ({
    href,
    children,
  }: {
    href?: string;
    children?: React.ReactNode;
  }) => (
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
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border-collapse border border-foreground/20">
        {children}
      </table>
    </div>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="border border-foreground/20 bg-foreground/10 px-4 py-2 text-foreground font-semibold">
      {children}
    </th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="border border-foreground/20 px-4 py-2 text-foreground/90">
      {children}
    </td>
  ),
};

/**
 * Lesson content component that renders markdown with Arabic typography
 * Content is loaded server-side and passed as a prop (eliminates client-side waterfall)
 * Wrapped in memo() to prevent re-renders when parent state changes
 */
const LessonContent = memo(function LessonContent({ content }: LessonContentProps) {
  // Handle empty content gracefully
  if (!content) {
    return (
      <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
        <p className="text-yellow-700 dark:text-yellow-400">
          محتوى الدرس غير متوفر بعد.
        </p>
      </div>
    );
  }

  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});

export default LessonContent;
