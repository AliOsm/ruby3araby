"use client";

import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useCallback, useRef, useMemo } from "react";
import { useTheme } from "@/lib/theme";

export interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  height?: string;
  readOnly?: boolean;
}

export default function CodeEditor({
  value,
  onChange,
  height = "300px",
  readOnly = false,
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const { resolvedTheme } = useTheme();

  // Derive Monaco theme from resolved theme (no state needed)
  const monacoTheme = useMemo<"vs-dark" | "light">(
    () => (resolvedTheme === "dark" ? "vs-dark" : "light"),
    [resolvedTheme]
  );

  const handleEditorDidMount: OnMount = useCallback((mountedEditor) => {
    editorRef.current = mountedEditor;
  }, []);

  const handleChange: OnChange = useCallback(
    (newValue) => {
      if (onChange && newValue !== undefined) {
        onChange(newValue);
      }
    },
    [onChange]
  );

  return (
    <div
      className="overflow-hidden rounded-lg border border-foreground/20"
      dir="ltr"
    >
      <Editor
        height={height}
        language="ruby"
        theme={monacoTheme}
        value={value}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        options={{
          // Font settings
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
          fontSize: 14,
          fontLigatures: true,

          // Editor behavior
          minimap: { enabled: false },
          lineNumbers: "on",
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: "on",

          // Auto-indentation
          autoIndent: "full",
          tabSize: 2,
          insertSpaces: true,

          // Read-only mode
          readOnly,

          // UI improvements
          padding: { top: 12, bottom: 12 },
          renderLineHighlight: "line",
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          smoothScrolling: true,

          // Bracket matching
          bracketPairColorization: { enabled: true },
          guides: {
            bracketPairs: true,
            indentation: true,
          },
        }}
        loading={
          <div
            className="flex h-full items-center justify-center text-foreground/60"
            style={{ backgroundColor: "var(--editor-bg)" }}
          >
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>جارٍ تحميل المحرر...</span>
            </div>
          </div>
        }
      />
    </div>
  );
}
