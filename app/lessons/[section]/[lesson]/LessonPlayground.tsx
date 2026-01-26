"use client";

import { useEffect, useState, useCallback } from "react";
import CodePlayground from "@/components/CodePlayground";
import { ExerciseConfig } from "@/lib/types";
import { preloadMonacoEditor } from "@/components/CodeEditor";
import { preloadRubyWasm } from "@/lib/ruby-runner";
import { ProgressService } from "@/lib/progress";

interface LessonPlaygroundProps {
  /** Lesson ID for code persistence (format: "section-slug/lesson-slug") */
  lessonId: string;
  /** Exercise configuration (optional - not all lessons have exercises) */
  exercise?: ExerciseConfig;
}

/**
 * Client-side code playground wrapper for lesson pages
 * Separated to avoid SSR issues with Monaco editor
 */
export default function LessonPlayground({
  lessonId,
  exercise,
}: LessonPlaygroundProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  // Preload heavy resources on mount to reduce perceived latency
  useEffect(() => {
    preloadMonacoEditor();
    // Slight delay for WASM to prioritize Monaco loading first
    const timeoutId = setTimeout(preloadRubyWasm, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  // Check if lesson is already completed
  useEffect(() => {
    setIsCompleted(ProgressService.isComplete(lessonId));
  }, [lessonId]);

  // Handle mark as complete for lessons without exercises
  const handleMarkComplete = useCallback(() => {
    ProgressService.markComplete(lessonId);
    setIsCompleted(true);
  }, [lessonId]);

  // Default starter code for lessons without exercises
  const defaultStarterCode = `# اكتب شيفرة روبي هنا
puts "مرحباً بالعالم!"`;

  const hasExercise = !!exercise?.expectedOutput;

  return (
    <div className="flex flex-col gap-4">
      <CodePlayground
        starterCode={exercise?.starterCode ?? defaultStarterCode}
        expectedOutput={exercise?.expectedOutput}
        defaultInput={exercise?.defaultInput}
        hints={exercise?.hints}
        editorHeight="200px"
        lessonId={lessonId}
      />

      {/* Mark as Complete button for lessons without exercises */}
      {!hasExercise && (
        <button
          onClick={handleMarkComplete}
          disabled={isCompleted}
          className={`flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-base font-medium transition-colors ${
            isCompleted
              ? "border-2 border-green-500 bg-green-500/10 text-green-400 cursor-default"
              : "bg-ruby-primary text-white hover:bg-ruby-secondary"
          }`}
        >
          {isCompleted ? (
            <>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>تم إكمال الدرس</span>
            </>
          ) : (
            <>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>إكمال الدرس</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
