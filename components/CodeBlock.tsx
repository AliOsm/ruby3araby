"use client";

import { useState, useCallback } from "react";
import { Highlight, themes, PrismTheme } from "prism-react-renderer";
import { useTheme } from "@/lib/theme";

interface CodeBlockProps {
  code: string;
  language?: string;
}

/**
 * Syntax-highlighted code block component using prism-react-renderer
 * Supports Ruby and other languages with light/dark theme awareness
 * Includes a copy button that appears on hover (desktop) or always visible (mobile)
 */
export default function CodeBlock({ code, language = "ruby" }: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const [copySuccess, setCopySuccess] = useState(false);

  // Use oneDark for dark mode and oneLight for light mode (both are standard Prism themes)
  const theme: PrismTheme =
    resolvedTheme === "dark" ? themes.oneDark : themes.oneLight;

  // Clean up the code (remove trailing newline if present)
  const cleanCode = code.replace(/\n$/, "");

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
    <div className="group relative">
      <Highlight theme={theme} code={cleanCode} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} rounded-lg overflow-x-auto text-sm font-mono p-4`}
            style={style}
            dir="ltr"
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      {/* Copy Button - always visible on mobile, hover on desktop */}
      <button
        onClick={handleCopy}
        aria-label={copySuccess ? "تم النسخ" : "نسخ الشيفرة"}
        className="absolute top-2 left-2 flex h-8 w-8 items-center justify-center rounded-md bg-foreground/10 text-foreground/70 opacity-100 backdrop-blur-sm transition-all hover:bg-foreground/20 hover:text-foreground sm:opacity-0 sm:group-hover:opacity-100"
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
}
