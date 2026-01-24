"use client";

import { useCallback, useEffect, useState, useRef, useMemo } from "react";
import CodeEditor from "./CodeEditor";
import {
  getRubyRunner,
  ExecutionResult,
  SyntaxCheckResult,
} from "@/lib/ruby-runner";
import {
  ProgressService,
  createDebouncedCodeSaver,
} from "@/lib/progress";

export interface CodePlaygroundProps {
  /** Initial/starter code to display in the editor */
  starterCode?: string;
  /** Height of the code editor */
  editorHeight?: string;
  /** Default simulated input values (newline-separated for multiple gets calls) */
  defaultInput?: string;
  /** Whether to show the input panel (default: true when defaultInput is provided) */
  showInputPanel?: boolean;
  /** Expected output for validation (when provided, shows Check Answer button) */
  expectedOutput?: string;
  /** Hints to show when answer is incorrect */
  hints?: string[];
  /** Lesson ID for code persistence (format: "section-slug/lesson-slug") */
  lessonId?: string;
  /** Whether to enable auto-save (default: true if lessonId provided) */
  enableAutoSave?: boolean;
}

/** Validation result state */
type ValidationState =
  | { status: "idle" }
  | { status: "correct" }
  | { status: "incorrect"; hintIndex: number };

/** Normalize output for comparison (trim whitespace, normalize newlines) */
function normalizeOutput(text: string): string {
  return text
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();
}

export default function CodePlayground({
  starterCode = '# اكتب شيفرة روبي هنا\nputs "مرحبا بالعالم!"',
  editorHeight = "250px",
  defaultInput = "",
  showInputPanel,
  expectedOutput,
  hints = [],
  lessonId,
  enableAutoSave,
}: CodePlaygroundProps) {
  // Determine initial code: load saved code if lessonId provided, otherwise use starterCode
  const [code, setCode] = useState(starterCode);
  const [input, setInput] = useState(defaultInput);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [isRunning, setIsRunning] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [validation, setValidation] = useState<ValidationState>({
    status: "idle",
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiRef = useRef<HTMLDivElement>(null);

  // Auto-save is enabled by default when lessonId is provided
  const shouldAutoSave = enableAutoSave ?? !!lessonId;

  // Create debounced code saver (memoized to prevent re-creation on every render)
  const debouncedSaveCode = useMemo(() => {
    if (lessonId && shouldAutoSave) {
      return createDebouncedCodeSaver(lessonId, 1000);
    }
    return null;
  }, [lessonId, shouldAutoSave]);

  // Load saved code and track last lesson on mount
  useEffect(() => {
    if (lessonId) {
      // Track this as the last visited lesson
      ProgressService.setLastLesson(lessonId);

      // Load saved code if available
      const savedCode = ProgressService.loadCode(lessonId);
      if (savedCode !== null) {
        setCode(savedCode);
      }
    }
  }, [lessonId]);

  // Show input panel if explicitly set, or if defaultInput is provided
  const shouldShowInputPanel = showInputPanel ?? defaultInput.length > 0;

  // Handle code changes with auto-save
  const handleCodeChange = useCallback(
    (newCode: string) => {
      setCode(newCode);
      // Trigger debounced save if enabled
      if (debouncedSaveCode) {
        debouncedSaveCode(newCode);
      }
    },
    [debouncedSaveCode]
  );

  // Initialize RubyRunner on first run
  const initializeRunner = useCallback(async () => {
    const runner = getRubyRunner();
    if (!runner.initialized) {
      setIsInitializing(true);
      try {
        await runner.initialize();
      } finally {
        setIsInitializing(false);
      }
    }
    return runner;
  }, []);

  // Syntax checker function for real-time error highlighting
  // Only checks when Ruby VM is already initialized (doesn't trigger initialization)
  const syntaxChecker = useCallback((codeToCheck: string): SyntaxCheckResult => {
    const runner = getRubyRunner();
    if (!runner.initialized) {
      // Don't check syntax if not initialized - avoid blocking
      return { valid: true };
    }
    return runner.checkSyntax(codeToCheck);
  }, []);

  // Run the code
  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setOutput("");
    setError(undefined);
    setValidation({ status: "idle" });

    try {
      const runner = await initializeRunner();
      const result: ExecutionResult = await runner.executeCode(code, input);

      if (result.error) {
        setError(result.error);
        setOutput(result.output);
      } else {
        setOutput(result.output);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsRunning(false);
    }
  }, [code, input, initializeRunner]);

  // Check answer against expected output
  const handleCheckAnswer = useCallback(async () => {
    if (!expectedOutput) return;

    setIsRunning(true);
    setOutput("");
    setError(undefined);

    try {
      const runner = await initializeRunner();
      const result: ExecutionResult = await runner.executeCode(code, input);

      if (result.error) {
        setError(result.error);
        setOutput(result.output);
        setValidation({ status: "idle" });
      } else {
        setOutput(result.output);

        // Compare normalized outputs
        const normalizedActual = normalizeOutput(result.output);
        const normalizedExpected = normalizeOutput(expectedOutput);

        if (normalizedActual === normalizedExpected) {
          setValidation({ status: "correct" });
          setShowConfetti(true);
          // Mark lesson as complete if lessonId is provided
          if (lessonId) {
            ProgressService.markComplete(lessonId);
          }
          // Stop confetti after 3 seconds
          setTimeout(() => setShowConfetti(false), 3000);
        } else {
          setValidation((prev) => ({
            status: "incorrect",
            hintIndex:
              prev.status === "incorrect"
                ? Math.min(prev.hintIndex + 1, hints.length - 1)
                : 0,
          }));
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setValidation({ status: "idle" });
    } finally {
      setIsRunning(false);
    }
  }, [code, input, expectedOutput, hints.length, initializeRunner, lessonId]);

  // Copy code to clipboard
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  }, [code]);

  // Reset to starter code and default input
  const handleReset = useCallback(() => {
    setCode(starterCode);
    setInput(defaultInput);
    setOutput("");
    setError(undefined);
    setValidation({ status: "idle" });
    setShowConfetti(false);
    // Clear saved code when resetting
    if (lessonId) {
      ProgressService.clearCode(lessonId);
    }
  }, [starterCode, defaultInput, lessonId]);

  // Handle Ctrl/Cmd + S to prevent browser save and trigger auto-save
  const handleSave = useCallback(() => {
    // Trigger immediate save if auto-save is enabled
    if (lessonId && shouldAutoSave) {
      ProgressService.saveCode(lessonId, code);
    }
  }, [lessonId, shouldAutoSave, code]);

  // Update code and input when props change
  useEffect(() => {
    setCode(starterCode);
    setInput(defaultInput);
    setOutput("");
    setError(undefined);
    setValidation({ status: "idle" });
    setShowConfetti(false);
  }, [starterCode, defaultInput]);

  // Check if exercise has validation enabled
  const hasValidation = !!expectedOutput;

  const isLoading = isRunning || isInitializing;
  const loadingText = isInitializing
    ? "جارٍ تحميل Ruby..."
    : "جارٍ تنفيذ الشيفرة...";

  return (
    <div className="flex flex-col gap-3">
      {/* Simulated Input Panel */}
      {shouldShowInputPanel && (
        <div
          className="overflow-hidden rounded-lg border border-foreground/20"
          style={{ backgroundColor: "var(--editor-bg)" }}
        >
          <div className="border-b border-foreground/20 bg-foreground/5 px-3 py-2">
            <span className="text-sm font-medium text-foreground/80">
              المدخلات المحاكاة
            </span>
          </div>
          <div className="p-3">
            <p className="mb-2 text-xs text-foreground/60" dir="rtl">
              أدخل القيم التي سيتم استخدامها عند استدعاء{" "}
              <code className="rounded bg-foreground/10 px-1 font-mono">gets</code>.
              كل سطر يمثل قيمة إدخال واحدة.
            </p>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="أدخل قيمة لكل سطر..."
              className="w-full resize-none rounded border border-foreground/20 bg-foreground/5 px-3 py-2 font-mono text-sm text-foreground placeholder-foreground/40 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              rows={3}
              dir="ltr"
              disabled={isRunning || isInitializing}
            />
          </div>
        </div>
      )}

      {/* Code Editor */}
      <CodeEditor
        value={code}
        onChange={handleCodeChange}
        height={editorHeight}
        onRun={handleRun}
        onSave={handleSave}
        syntaxChecker={syntaxChecker}
      />

      {/* Control Buttons - touch-friendly with 44px min tap targets */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Run Button */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={handleRun}
            disabled={isLoading}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-2 sm:text-base"
          >
            {isLoading ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin sm:h-5 sm:w-5"
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
                <span className="hidden xs:inline">{loadingText}</span>
                <span className="xs:hidden">...</span>
              </>
            ) : (
              <>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>تشغيل</span>
              </>
            )}
          </button>
          <span className="hidden text-xs text-foreground/40 sm:block" dir="ltr">
            Ctrl+Enter
          </span>
        </div>

        {/* Check Answer Button - only shown when expectedOutput is provided */}
        {hasValidation && (
          <button
            onClick={handleCheckAnswer}
            disabled={isLoading}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-2 sm:text-base"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden xs:inline">تحقق من الإجابة</span>
            <span className="xs:hidden">تحقق</span>
          </button>
        )}

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          disabled={isLoading}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg border border-foreground/20 bg-foreground/10 px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/20 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-2 sm:text-base"
        >
          {copySuccess ? (
            <>
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden xs:inline">تم النسخ!</span>
            </>
          ) : (
            <>
              <svg
                className="h-5 w-5"
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
              <span className="hidden xs:inline">نسخ الشيفرة</span>
            </>
          )}
        </button>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          disabled={isLoading}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg border border-foreground/20 bg-foreground/10 px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/20 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-2 sm:text-base"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span className="hidden xs:inline">إعادة تعيين</span>
        </button>

        {/* Keyboard Shortcut Hint for Save */}
        {shouldAutoSave && (
          <span className="mr-auto hidden text-xs text-foreground/40 sm:block" dir="ltr">
            Ctrl+S لحفظ الشيفرة
          </span>
        )}
      </div>

      {/* Validation Feedback */}
      {validation.status === "correct" && (
        <div
          ref={confettiRef}
          className="relative overflow-hidden rounded-lg border-2 border-green-500 bg-green-500/10 p-4"
        >
          {/* Confetti Animation */}
          {showConfetti && (
            <div className="pointer-events-none absolute inset-0">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 0.5}s`,
                    backgroundColor: [
                      "#10b981",
                      "#3b82f6",
                      "#f59e0b",
                      "#ef4444",
                      "#8b5cf6",
                      "#ec4899",
                    ][Math.floor(Math.random() * 6)],
                    width: `${Math.random() * 8 + 4}px`,
                    height: `${Math.random() * 8 + 4}px`,
                  }}
                />
              ))}
            </div>
          )}
          <div className="flex items-center gap-3" dir="rtl">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <svg
                className="h-6 w-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-400">
                🎉 أحسنت! إجابة صحيحة
              </h3>
              <p className="text-sm text-green-300">
                لقد حللت التمرين بنجاح. استمر في التعلم!
              </p>
            </div>
          </div>
        </div>
      )}

      {validation.status === "incorrect" && (
        <div className="space-y-3">
          <div
            className="rounded-lg border-2 border-orange-500 bg-orange-500/10 p-4"
            dir="rtl"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-orange-400">
                  حاول مرة أخرى
                </h3>
                <p className="text-sm text-orange-300">
                  الإجابة ليست صحيحة بعد. راجع الشيفرة وحاول مجدداً.
                </p>
              </div>
            </div>
          </div>

          {/* Show hint if available */}
          {hints.length > 0 && validation.hintIndex >= 0 && (
            <div
              className="rounded-lg border border-blue-500/50 bg-blue-500/10 p-4"
              dir="rtl"
            >
              <div className="mb-2 flex items-center gap-2 text-blue-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <span className="font-medium">
                  تلميح {validation.hintIndex + 1} من {hints.length}:
                </span>
              </div>
              <p className="text-sm text-blue-300">
                {hints[validation.hintIndex]}
              </p>
              {validation.hintIndex < hints.length - 1 && (
                <p className="mt-2 text-xs text-blue-400/70">
                  💡 حاول مرة أخرى للحصول على تلميح إضافي
                </p>
              )}
            </div>
          )}

          {/* Expected vs Actual diff */}
          {expectedOutput && output && (
            <div className="rounded-lg border border-foreground/20 bg-foreground/5 p-4">
              <h4 className="mb-3 text-sm font-medium text-foreground/70" dir="rtl">
                مقارنة المخرجات:
              </h4>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <div className="mb-2 text-xs font-medium text-red-400">
                    المخرجات الفعلية:
                  </div>
                  <pre
                    className="max-h-[150px] overflow-auto rounded border border-red-500/30 bg-red-500/5 p-2 font-mono text-xs text-foreground/80"
                    dir="ltr"
                  >
                    {output || "(فارغ)"}
                  </pre>
                </div>
                <div>
                  <div className="mb-2 text-xs font-medium text-green-400">
                    المخرجات المتوقعة:
                  </div>
                  <pre
                    className="max-h-[150px] overflow-auto rounded border border-green-500/30 bg-green-500/5 p-2 font-mono text-xs text-foreground/80"
                    dir="ltr"
                  >
                    {expectedOutput}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Output Panel */}
      <div
        className="overflow-hidden rounded-lg border border-foreground/20"
        style={{ backgroundColor: "var(--editor-bg)" }}
      >
        <div className="border-b border-foreground/20 bg-foreground/5 px-3 py-2">
          <span className="text-sm font-medium text-foreground/80">المخرجات</span>
        </div>
        <div className="min-h-[100px] p-3 font-mono text-sm" dir="ltr">
          {isLoading ? (
            <div className="flex items-center gap-2 text-foreground/60">
              <svg
                className="h-4 w-4 animate-spin"
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
              <span>{loadingText}</span>
            </div>
          ) : error ? (
            <div className="space-y-2">
              {output && (
                <pre className="whitespace-pre-wrap text-foreground/80">{output}</pre>
              )}
              <pre className="whitespace-pre-wrap text-red-400">{error}</pre>
            </div>
          ) : output ? (
            <pre className="whitespace-pre-wrap text-foreground/80">{output}</pre>
          ) : (
            <span className="text-foreground/50">
              اضغط على &quot;تشغيل&quot; لرؤية المخرجات
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
