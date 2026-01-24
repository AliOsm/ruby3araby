"use client";

import { Highlight, themes, PrismTheme } from "prism-react-renderer";
import { useTheme } from "@/lib/theme";

interface CodeBlockProps {
  code: string;
  language?: string;
}

/**
 * Syntax-highlighted code block component using prism-react-renderer
 * Supports Ruby and other languages with light/dark theme awareness
 */
export default function CodeBlock({ code, language = "ruby" }: CodeBlockProps) {
  const { resolvedTheme } = useTheme();

  // Use oneDark for dark mode and oneLight for light mode (both are standard Prism themes)
  const theme: PrismTheme =
    resolvedTheme === "dark" ? themes.oneDark : themes.oneLight;

  // Clean up the code (remove trailing newline if present)
  const cleanCode = code.replace(/\n$/, "");

  return (
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
  );
}
