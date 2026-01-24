import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getLessonBySlug } from "@/lib/course-loader";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const section = searchParams.get("section");
  const lesson = searchParams.get("lesson");

  if (!section || !lesson) {
    return NextResponse.json(
      { error: "Missing section or lesson parameter" },
      { status: 400 }
    );
  }

  // Validate section and lesson slugs to prevent path traversal
  const slugPattern = /^[a-z0-9-]+$/;
  if (!slugPattern.test(section) || !slugPattern.test(lesson)) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const contentPath = path.join(
    process.cwd(),
    "content",
    "lessons",
    section,
    `${lesson}.md`
  );

  try {
    // Read the markdown content
    const content = fs.readFileSync(contentPath, "utf-8");

    // Get lesson data from course.json for exercise hints
    const lessonData = getLessonBySlug(section, lesson);

    // If there's an exercise with hints, append them to the content
    let exportContent = content;

    if (lessonData?.lesson.exercise?.hints && lessonData.lesson.exercise.hints.length > 0) {
      const hints = lessonData.lesson.exercise.hints;

      // Check if the content already has hints section
      const hasHintsSection = /##\s*(تلميحات|Hints)/i.test(content);

      if (!hasHintsSection) {
        // Add hints section at the end
        exportContent += "\n\n## تلميحات\n\n";
        hints.forEach((hint, index) => {
          exportContent += `${index + 1}. ${hint}\n`;
        });
      }
    }

    // Add exercise starter code if available
    if (lessonData?.lesson.exercise?.starterCode) {
      const hasStarterCodeSection = /##\s*(الشيفرة الأولية|Starter Code)/i.test(content);

      if (!hasStarterCodeSection) {
        // Check if there's already a code block at the end for the exercise
        // Only add if not redundant
        const starterCode = lessonData.lesson.exercise.starterCode;

        // Add starter code section
        exportContent += "\n\n## الشيفرة الأولية للتمرين\n\n```ruby\n" + starterCode + "```\n";
      }
    }

    // Add expected output if available
    if (lessonData?.lesson.exercise?.expectedOutput) {
      const hasExpectedOutputSection = /##\s*(الناتج المتوقع|Expected Output)/i.test(content);

      if (!hasExpectedOutputSection) {
        exportContent += "\n\n## الناتج المتوقع\n\n```\n" + lessonData.lesson.exercise.expectedOutput + "\n```\n";
      }
    }

    return NextResponse.json({ content: exportContent });
  } catch {
    return NextResponse.json(
      { error: "Lesson content not found" },
      { status: 404 }
    );
  }
}
