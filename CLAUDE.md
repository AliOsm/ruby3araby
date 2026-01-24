# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ruby3araby is an interactive Arabic Ruby programming course that runs entirely in the browser. It uses ruby.wasm to execute Ruby code client-side without a backend server.

## Development Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run lint      # Run ESLint
npm run typecheck # Run TypeScript type checking
```

## Architecture

### Core Technologies
- **Next.js 16** with App Router
- **Ruby WASM** (@ruby/wasm-wasi) for browser-based Ruby execution
- **Monaco Editor** for the code editor
- **Tailwind CSS 4** with RTL support (tailwindcss-rtl)

### Directory Structure

```
app/
├── page.tsx                          # Homepage
├── layout.tsx                        # Root layout with ThemeProvider
├── lessons/[section]/[lesson]/       # Dynamic lesson pages
│   ├── page.tsx                      # Lesson page (server component)
│   ├── LessonContent.tsx             # Markdown content renderer
│   └── LessonPlayground.tsx          # Code editor wrapper
├── glossary/                         # Programming terminology glossary
└── progress/                         # Progress tracking page

components/
├── CodePlayground.tsx    # Main interactive code editor with run/validate
├── CodeEditor.tsx        # Monaco editor wrapper with syntax highlighting
├── Sidebar.tsx           # Course navigation sidebar
└── ThemeToggle.tsx       # Dark/light theme switcher

lib/
├── ruby-runner.ts        # RubyRunner singleton for WASM-based Ruby execution
├── course-loader.ts      # Course structure and navigation helpers
├── progress.ts           # ProgressService for localStorage persistence
├── theme.tsx             # ThemeProvider React context
└── types.ts              # TypeScript types for course content

content/
├── course.json           # Course structure definition
├── glossary.json         # Programming terms glossary
└── lessons/              # Markdown lesson files organized by section
```

### Key Patterns

**Ruby Execution Flow:**
1. `RubyRunner` is a singleton that lazy-loads the Ruby WASM module
2. WASM binary is cached using Cache API for faster subsequent loads
3. Code execution captures stdout/stderr and handles simulated `gets` input
4. Syntax checking uses `RubyVM::InstructionSequence.compile` without execution

**Course Content Structure:**
- `course.json` defines sections → lessons hierarchy with slugs
- Lesson content is stored in markdown files under `content/lessons/`
- Exercises have `starterCode`, `expectedOutput`, and progressive `hints`
- Output validation normalizes whitespace before comparison

**Progress Persistence:**
- Uses localStorage with `ruby3araby_` prefix
- Tracks completed lessons, last visited lesson, and saved code per lesson
- Auto-saves code changes with 1-second debounce
- Dispatches `progressUpdate` custom event for UI synchronization

**Theming:**
- Supports light/dark/system themes via `ThemeProvider`
- Theme stored in localStorage as `ruby3araby_theme`
- Monaco editor theme syncs with app theme

### RTL (Right-to-Left) Considerations

- Arabic content uses `dir="rtl"`
- Code editor and output panels use `dir="ltr"`
- Navigation arrows rotate 180° in RTL context via `rtl:rotate-180`
- Tailwind RTL plugin provides `rtl:` variants

### Static Generation

Lesson pages are statically generated at build time:
- `generateStaticParams()` returns all lesson paths from `course.json`
- `generateMetadata()` creates Arabic SEO metadata per lesson

## Path Alias

Use `@/` to import from project root (configured in tsconfig.json):
```typescript
import { RubyRunner } from "@/lib/ruby-runner";
```
