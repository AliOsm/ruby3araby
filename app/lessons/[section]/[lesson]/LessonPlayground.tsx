"use client";

import CodePlayground from "@/components/CodePlayground";

/**
 * Client-side code playground wrapper for lesson pages
 * Separated to avoid SSR issues with Monaco editor
 */
export default function LessonPlayground() {
  return (
    <CodePlayground
      starterCode={`# اكتب كود روبي هنا
puts "مرحبا بالعالم!"`}
      editorHeight="300px"
    />
  );
}
