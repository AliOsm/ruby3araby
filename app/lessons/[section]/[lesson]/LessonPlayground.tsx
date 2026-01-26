"use client";

import { useEffect } from "react";
import CodePlayground from "@/components/CodePlayground";
import { ExerciseConfig } from "@/lib/types";
import { preloadMonacoEditor } from "@/components/CodeEditor";
import { preloadRubyWasm } from "@/lib/ruby-runner";

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
  // Preload heavy resources on mount to reduce perceived latency
  useEffect(() => {
    preloadMonacoEditor();
    // Slight delay for WASM to prioritize Monaco loading first
    const timeoutId = setTimeout(preloadRubyWasm, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  // Default starter code for lessons without exercises
  const defaultStarterCode = `# اكتب شيفرة روبي هنا
puts "مرحباً بالعالم!"`;

  return (
    <CodePlayground
      starterCode={exercise?.starterCode ?? defaultStarterCode}
      expectedOutput={exercise?.expectedOutput}
      defaultInput={exercise?.defaultInput}
      hints={exercise?.hints}
      editorHeight="200px"
      lessonId={lessonId}
    />
  );
}
