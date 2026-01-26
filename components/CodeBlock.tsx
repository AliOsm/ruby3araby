"use client";

import { memo, useState, useCallback, useEffect, useSyncExternalStore } from "react";
import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  language?: string;
}

/**
 * Add per-line bidi support for output blocks (language="text")
 * Each line gets dir="auto" so Arabic lines display RTL
 */
function addBidiSupport(html: string): string {
  return html.replace(
    /(<code[^>]*>)([\s\S]*?)(<\/code>)/,
    (_, open, content, close) => {
      const lines = content.split('\n');
      const wrapped = lines.map((line: string) =>
        `<div class="bidi-line" dir="auto">${line || '\u200B'}</div>`
      ).join('');
      return `${open}${wrapped}${close}`;
    }
  );
}

// Module-level cache for highlighted code to avoid redundant shiki calls
const highlightCache = new Map<string, string>();

function getCacheKey(code: string, language: string, theme: string): string {
  return `${theme}:${language}:${code}`;
}

// Get the actual theme from the DOM (most reliable source of truth)
function getThemeFromDOM(): "light" | "dark" {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

// Subscribe to theme changes via class mutations
function subscribeToTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === "class") {
        callback();
      }
    }
  });

  observer.observe(document.documentElement, { attributes: true });
  window.addEventListener("themeChange", callback);

  return () => {
    observer.disconnect();
    window.removeEventListener("themeChange", callback);
  };
}

/**
 * Syntax-highlighted code block component using shiki
 * Uses VS Code's Dark+/Light+ themes to match Monaco editor
 * Includes a copy button that appears on hover (desktop) or always visible (mobile)
 * Wrapped in memo() with highlight caching to minimize re-renders
 */
const CodeBlock = memo(function CodeBlock({ code, language = "ruby" }: CodeBlockProps) {
  // Use useSyncExternalStore to reliably get theme from DOM
  const resolvedTheme = useSyncExternalStore(
    subscribeToTheme,
    getThemeFromDOM,
    () => "dark" // Server snapshot
  );

  const [copySuccess, setCopySuccess] = useState(false);
  const [highlightedHtml, setHighlightedHtml] = useState<string>("");

  // Clean up the code (remove trailing newline if present)
  const cleanCode = code.replace(/\n$/, "");

  // Highlight code with shiki (check cache first)
  useEffect(() => {
    const theme = resolvedTheme === "dark" ? "dark-plus" : "light-plus";
    const cacheKey = getCacheKey(cleanCode, language, theme);

    // Check cache first
    const cached = highlightCache.get(cacheKey);
    if (cached) {
      setHighlightedHtml(cached);
      return;
    }

    const highlight = async () => {
      try {
        // Use VS Code themes to match Monaco editor
        let html = await codeToHtml(cleanCode, {
          lang: language,
          theme,
        });
        // For output blocks (text), add per-line bidi support
        if (language === 'text') {
          html = addBidiSupport(html);
        }
        highlightCache.set(cacheKey, html);
        setHighlightedHtml(html);
      } catch {
        // Fallback to plain text if highlighting fails
        const fallback = `<pre class="shiki"><code>${cleanCode.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
        highlightCache.set(cacheKey, fallback);
        setHighlightedHtml(fallback);
      }
    };
    highlight();
  }, [cleanCode, language, resolvedTheme]);

  // Copy code to clipboard
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = cleanCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  }, [cleanCode]);

  return (
    <div className="group relative min-w-0">
      <div
        className="overflow-x-auto rounded-lg [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:text-sm [&>pre]:font-mono [&>pre]:p-4 [&>pre]:border [&>pre]:border-gray-200 [&>pre]:dark:border-transparent"
        dir="ltr"
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
      {/* Copy Button - always visible on mobile, hover on desktop */}
      <button
        onClick={handleCopy}
        aria-label={copySuccess ? "تم النسخ" : "نسخ الشيفرة"}
        className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-md bg-foreground/10 text-foreground/70 opacity-100 backdrop-blur-sm transition-all hover:bg-foreground/20 hover:text-foreground sm:opacity-0 sm:group-hover:opacity-100"
      >
        {copySuccess ? (
          <svg
            className="h-4 w-4 text-green-500"
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
    </div>
  );
});

export default CodeBlock;
