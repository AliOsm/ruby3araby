import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

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
    const content = await readFile(contentPath, "utf-8");
    return NextResponse.json(
      { content },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Lesson content not found" },
      { status: 404 }
    );
  }
}
