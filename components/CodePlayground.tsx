"use client";

import { useCallback, useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import { getRubyRunner, ExecutionResult } from "@/lib/ruby-runner";

export interface CodePlaygroundProps {
  /** Initial/starter code to display in the editor */
  starterCode?: string;
  /** Height of the code editor */
  editorHeight?: string;
}

export default function CodePlayground({
  starterCode = '# اكتب كود روبي هنا\nputs "مرحبا بالعالم!"',
  editorHeight = "250px",
}: CodePlaygroundProps) {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [isRunning, setIsRunning] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

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

  // Run the code
  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setOutput("");
    setError(undefined);

    try {
      const runner = await initializeRunner();
      const result: ExecutionResult = await runner.executeCode(code);

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
  }, [code, initializeRunner]);

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

  // Reset to starter code
  const handleReset = useCallback(() => {
    setCode(starterCode);
    setOutput("");
    setError(undefined);
  }, [starterCode]);

  // Update code when starterCode prop changes
  useEffect(() => {
    setCode(starterCode);
    setOutput("");
    setError(undefined);
  }, [starterCode]);

  const isLoading = isRunning || isInitializing;
  const loadingText = isInitializing
    ? "جارٍ تحميل Ruby..."
    : "جارٍ تنفيذ الكود...";

  return (
    <div className="flex flex-col gap-3">
      {/* Code Editor */}
      <CodeEditor value={code} onChange={setCode} height={editorHeight} />

      {/* Control Buttons */}
      <div className="flex flex-wrap gap-2">
        {/* Run Button */}
        <button
          onClick={handleRun}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <>
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
            </>
          ) : (
            <>
              <svg
                className="h-4 w-4"
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

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-lg bg-gray-600 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copySuccess ? (
            <>
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>تم النسخ!</span>
            </>
          ) : (
            <>
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
              <span>نسخ الكود</span>
            </>
          )}
        </button>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-lg bg-gray-600 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>إعادة تعيين</span>
        </button>
      </div>

      {/* Output Panel */}
      <div className="overflow-hidden rounded-lg border border-gray-700 bg-[#1e1e1e]">
        <div className="border-b border-gray-700 bg-gray-800 px-3 py-2">
          <span className="text-sm font-medium text-gray-300">المخرجات</span>
        </div>
        <div
          className="min-h-[100px] p-3 font-mono text-sm"
          dir="ltr"
        >
          {isLoading ? (
            <div className="flex items-center gap-2 text-gray-400">
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
                <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
              )}
              <pre className="whitespace-pre-wrap text-red-400">{error}</pre>
            </div>
          ) : output ? (
            <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
          ) : (
            <span className="text-gray-500">
              اضغط على &quot;تشغيل&quot; لرؤية المخرجات
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
