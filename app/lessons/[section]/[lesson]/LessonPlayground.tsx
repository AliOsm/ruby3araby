"use client";

import CodePlayground from "@/components/CodePlayground";
import { ExerciseConfig } from "@/lib/types";

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
  // Default starter code for lessons without exercises
  const defaultStarterCode = `# اكتب كود روبي هنا
puts "مرحبا بالعالم!"`;

  return (
    <CodePlayground
      starterCode={exercise?.starterCode ?? defaultStarterCode}
      expectedOutput={exercise?.expectedOutput}
      defaultInput={exercise?.defaultInput}
      hints={exercise?.hints}
      editorHeight="300px"
      lessonId={lessonId}
    />
  );
}
