"use client";

import CodePlayground from "@/components/CodePlayground";

interface LessonPlaygroundProps {
  /** Lesson ID for code persistence (format: "section-slug/lesson-slug") */
  lessonId: string;
}

/**
 * Client-side code playground wrapper for lesson pages
 * Separated to avoid SSR issues with Monaco editor
 */
export default function LessonPlayground({ lessonId }: LessonPlaygroundProps) {
  return (
    <CodePlayground
      starterCode={`# اكتب كود روبي هنا
puts "مرحبا بالعالم!"`}
      editorHeight="300px"
      lessonId={lessonId}
    />
  );
}
