"use client";

import Editor, { OnChange, OnMount, Monaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { useCallback, useRef, useMemo, useEffect } from "react";
import { useTheme } from "@/lib/theme";
import type { SyntaxCheckResult } from "@/lib/ruby-runner";

export interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  height?: string;
  readOnly?: boolean;
  /** Callback when Ctrl/Cmd + Enter is pressed */
  onRun?: () => void;
  /** Callback when Ctrl/Cmd + S is pressed (also triggers auto-save) */
  onSave?: () => void;
  /** Optional function to check syntax and return errors */
  syntaxChecker?: (code: string) => SyntaxCheckResult;
}

export default function CodeEditor({
  value,
  onChange,
  height = "300px",
  readOnly = false,
  onRun,
  onSave,
  syntaxChecker,
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const { resolvedTheme } = useTheme();

  // Store callbacks in refs to avoid re-registering actions
  const onRunRef = useRef(onRun);
  const onSaveRef = useRef(onSave);
  const syntaxCheckerRef = useRef(syntaxChecker);
  const syntaxCheckTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // Update refs when callbacks change
  useEffect(() => {
    onRunRef.current = onRun;
    onSaveRef.current = onSave;
    syntaxCheckerRef.current = syntaxChecker;
  }, [onRun, onSave, syntaxChecker]);

  // Function to check syntax and update markers
  const checkSyntaxAndUpdateMarkers = useCallback((code: string) => {
    const monaco = monacoRef.current;
    const editorInstance = editorRef.current;
    const checker = syntaxCheckerRef.current;

    if (!monaco || !editorInstance || !checker) return;

    const model = editorInstance.getModel();
    if (!model) return;

    const result = checker(code);

    if (result.valid) {
      // Clear any existing markers
      monaco.editor.setModelMarkers(model, "ruby-syntax", []);
    } else if (result.error) {
      // Set error marker
      const { line, column, message } = result.error;
      const lineContent = model.getLineContent(line) || "";

      monaco.editor.setModelMarkers(model, "ruby-syntax", [
        {
          severity: monaco.MarkerSeverity.Error,
          startLineNumber: line,
          startColumn: column,
          endLineNumber: line,
          // Highlight to end of line if column is 1, otherwise just the position
          endColumn: column === 1 ? lineContent.length + 1 : column + 1,
          message: message,
          source: "Ruby",
        },
      ]);
    }
  }, []);

  // Debounced syntax check when value changes
  useEffect(() => {
    if (!syntaxChecker || !monacoRef.current || !editorRef.current) return;

    // Clear previous timeout
    if (syntaxCheckTimeoutRef.current) {
      clearTimeout(syntaxCheckTimeoutRef.current);
    }

    // Debounce syntax checking to avoid excessive calls while typing
    syntaxCheckTimeoutRef.current = setTimeout(() => {
      checkSyntaxAndUpdateMarkers(value);
    }, 500);

    return () => {
      if (syntaxCheckTimeoutRef.current) {
        clearTimeout(syntaxCheckTimeoutRef.current);
      }
    };
  }, [value, syntaxChecker, checkSyntaxAndUpdateMarkers]);

  // Derive Monaco theme from resolved theme (no state needed)
  const monacoTheme = useMemo<"vs-dark" | "light">(
    () => (resolvedTheme === "dark" ? "vs-dark" : "light"),
    [resolvedTheme]
  );

  const handleEditorDidMount: OnMount = useCallback(
    (mountedEditor, monaco: Monaco) => {
      editorRef.current = mountedEditor;
      monacoRef.current = monaco;

      // Initial syntax check if checker is available
      if (syntaxCheckerRef.current) {
        // Use setTimeout to ensure the model is ready
        setTimeout(() => {
          checkSyntaxAndUpdateMarkers(mountedEditor.getValue());
        }, 100);
      }

      // Get KeyMod and KeyCode from the monaco instance to avoid SSR issues
      const { KeyMod, KeyCode } = monaco;

      // Add Ctrl/Cmd + Enter action to run code
      mountedEditor.addAction({
        id: "ruby3araby-run-code",
        label: "Run Code",
        keybindings: [KeyMod.CtrlCmd | KeyCode.Enter],
        run: () => {
          if (onRunRef.current) {
            onRunRef.current();
          }
        },
      });

      // Add Ctrl/Cmd + S action to save (prevent browser save dialog)
      mountedEditor.addAction({
        id: "ruby3araby-save-code",
        label: "Save Code",
        keybindings: [KeyMod.CtrlCmd | KeyCode.KeyS],
        run: () => {
          if (onSaveRef.current) {
            onSaveRef.current();
          }
        },
      });
    },
    [checkSyntaxAndUpdateMarkers]
  );

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
      className="min-w-0 overflow-hidden rounded-lg border border-foreground/20"
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
          // Font settings - Kawkab Mono for Arabic monospace support
          fontFamily:
            "'Kawkab Mono', 'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
          fontSize: 13,
          fontLigatures: true,

          // Editor behavior - optimize for narrow widths
          minimap: { enabled: false },
          lineNumbers: "on",
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: "on",

          // Optimize horizontal scrolling on narrow screens
          scrollbar: {
            horizontal: "auto",
            vertical: "auto",
            useShadows: false,
            horizontalScrollbarSize: 8,
            verticalScrollbarSize: 8,
          },

          // Fold gutter takes space - disable on narrow screens handled by CSS
          folding: true,
          foldingStrategy: "auto",

          // Line numbers gutter - minimal width
          lineNumbersMinChars: 3,

          // Auto-indentation
          autoIndent: "full",
          tabSize: 2,
          insertSpaces: true,

          // Read-only mode
          readOnly,

          // UI improvements - reduced padding for mobile
          padding: { top: 8, bottom: 8 },
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
            className="flex h-full items-center justify-center text-foreground/70"
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
