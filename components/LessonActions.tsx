"use client";

import { useState, useCallback } from "react";

interface LessonActionsProps {
  sectionSlug: string;
  lessonSlug: string;
}

/**
 * Copy and download buttons for lesson content
 */
export default function LessonActions({
  sectionSlug,
  lessonSlug,
}: LessonActionsProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the markdown content for export (includes exercise hints)
  const fetchContent = useCallback(async (): Promise<string | null> => {
    try {
      const response = await fetch(
        `/api/lesson-export?section=${sectionSlug}&lesson=${lessonSlug}`
      );
      if (!response.ok) {
        throw new Error("فشل تحميل محتوى الدرس");
      }
      const data = await response.json();
      return data.content;
    } catch {
      return null;
    }
  }, [sectionSlug, lessonSlug]);

  // Copy lesson content to clipboard
  const handleCopy = useCallback(async () => {
    setIsLoading(true);
    try {
      const content = await fetchContent();
      if (!content) {
        console.error("Failed to fetch content for copy");
        return;
      }

      // Copy to clipboard
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(content);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = content;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } finally {
      setIsLoading(false);
    }
  }, [fetchContent]);

  // Download lesson content as markdown file
  const handleDownload = useCallback(async () => {
    setIsLoading(true);
    try {
      const content = await fetchContent();
      if (!content) {
        console.error("Failed to fetch content for download");
        return;
      }

      // Create blob and download
      const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${sectionSlug}-${lessonSlug}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setIsLoading(false);
    }
  }, [fetchContent, sectionSlug, lessonSlug]);

  return (
    <div className="flex items-center gap-2">
      {/* Copy lesson button */}
      <div className="group relative">
        <button
          onClick={handleCopy}
          disabled={isLoading}
          className="flex min-h-[36px] min-w-[36px] items-center justify-center rounded-md border border-foreground/20 bg-foreground/5 p-2 text-foreground/70 transition-colors hover:border-ruby-primary hover:bg-foreground/10 hover:text-ruby-primary disabled:opacity-50"
          aria-label={copyStatus === "copied" ? "تم النسخ" : "نسخ الدرس"}
        >
          {copyStatus === "copied" ? (
            // Checkmark icon
            <svg
              className="h-4 w-4 text-green-500"
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
          ) : (
            // Copy icon
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </button>
        {/* Tooltip */}
        <span
          className="pointer-events-none absolute top-full right-1/2 z-10 mt-2 translate-x-1/2 whitespace-nowrap rounded bg-foreground/90 px-2 py-1 text-xs text-background opacity-0 transition-opacity delay-300 group-hover:opacity-100"
          dir="rtl"
        >
          {copyStatus === "copied" ? "تم النسخ!" : "نسخ الدرس"}
          <span className="absolute bottom-full right-1/2 translate-x-1/2 border-4 border-transparent border-b-foreground/90"></span>
        </span>
      </div>

      {/* Download lesson button */}
      <div className="group relative">
        <button
          onClick={handleDownload}
          disabled={isLoading}
          className="flex min-h-[36px] min-w-[36px] items-center justify-center rounded-md border border-foreground/20 bg-foreground/5 p-2 text-foreground/70 transition-colors hover:border-ruby-primary hover:bg-foreground/10 hover:text-ruby-primary disabled:opacity-50"
          aria-label="تحميل الدرس"
        >
          {/* Download icon */}
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </button>
        {/* Tooltip */}
        <span
          className="pointer-events-none absolute top-full right-1/2 z-10 mt-2 translate-x-1/2 whitespace-nowrap rounded bg-foreground/90 px-2 py-1 text-xs text-background opacity-0 transition-opacity delay-300 group-hover:opacity-100"
          dir="rtl"
        >
          تحميل الدرس
          <span className="absolute bottom-full right-1/2 translate-x-1/2 border-4 border-transparent border-b-foreground/90"></span>
        </span>
      </div>
    </div>
  );
}
