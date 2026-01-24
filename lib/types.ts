/**
 * Course Content Types for Ruby3araby
 *
 * These types define the structure for lessons, exercises, sections, and the overall course.
 */

/**
 * Exercise within a lesson
 * Contains practice problems with optional validation
 */
export interface Exercise {
  /** Unique identifier for the exercise */
  id: string;
  /** Arabic instructions for the exercise */
  instructions: string;
  /** Initial code to display in the editor */
  starterCode: string;
  /** Expected output for validation (optional - if not provided, no validation) */
  expectedOutput?: string;
  /** Pre-populated input for simulated gets calls (optional) */
  defaultInput?: string;
  /** Array of hints to help learners (displayed progressively) */
  hints: string[];
}

/**
 * Code example that can be shown in lessons
 */
export interface CodeExample {
  /** Title or description of the example */
  title: string;
  /** Ruby code to display */
  code: string;
  /** Expected output when running the code */
  output?: string;
}

/**
 * Individual lesson within a section
 */
export interface Lesson {
  /** Unique identifier for the lesson */
  id: string;
  /** URL-friendly slug */
  slug: string;
  /** Arabic title for the lesson */
  title: string;
  /** Markdown content with Arabic explanations */
  content: string;
  /** Code examples to display in the lesson */
  codeExamples: CodeExample[];
  /** Exercises for the lesson */
  exercises: Exercise[];
}

/**
 * Section grouping related lessons
 */
export interface Section {
  /** Unique identifier for the section */
  id: string;
  /** URL-friendly slug */
  slug: string;
  /** Arabic title for the section */
  title: string;
  /** Ordered list of lessons in this section */
  lessons: Lesson[];
}

/**
 * Complete course structure
 */
export interface Course {
  /** Unique identifier for the course */
  id: string;
  /** Arabic title for the course */
  title: string;
  /** Arabic description of the course */
  description: string;
  /** Ordered list of sections */
  sections: Section[];
}

/**
 * Lesson stub for course.json
 * Used in course.json to reference lessons without full content
 * (content is stored in separate markdown files)
 */
export interface LessonStub {
  /** Unique identifier for the lesson */
  id: string;
  /** URL-friendly slug */
  slug: string;
  /** Arabic title for the lesson */
  title: string;
  /** Path to markdown file containing lesson content */
  contentPath: string;
}

/**
 * Section stub for course.json
 * Used in course.json to define course structure with lesson references
 */
export interface SectionStub {
  /** Unique identifier for the section */
  id: string;
  /** URL-friendly slug */
  slug: string;
  /** Arabic title for the section */
  title: string;
  /** Ordered list of lesson stubs */
  lessons: LessonStub[];
}

/**
 * Course structure for course.json
 * This is the format stored in /content/course.json
 */
export interface CourseStructure {
  /** Unique identifier for the course */
  id: string;
  /** Arabic title for the course */
  title: string;
  /** Arabic description of the course */
  description: string;
  /** Ordered list of section stubs */
  sections: SectionStub[];
}
