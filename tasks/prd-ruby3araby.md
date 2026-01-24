# PRD: Ruby3araby - Arabic Interactive Ruby Course

## Introduction

Ruby3araby is an interactive website that teaches beginners how to program in Ruby, with all content presented in Arabic. The platform provides a browser-based code editor where learners can write, run, and experiment with Ruby code directly without any local setup. The curriculum covers Ruby fundamentals through object-oriented programming, with exercises to reinforce each concept.

The platform uses ruby.wasm (WebAssembly) to execute Ruby code directly in the browser, providing an authentic Ruby experience. Progress is saved locally, allowing learners to track their journey through the curriculum.

## Goals

- Provide a fully Arabic-language Ruby programming course accessible to Arabic speakers
- Enable running real Ruby code in the browser using ruby.wasm (WebAssembly)
- Deliver an excellent code editing experience with syntax highlighting, auto-indentation, and error feedback
- Cover the complete Ruby curriculum from basics to OOP and mini challenges
- Track user progress locally without requiring account creation
- Validate exercises through output matching for immediate feedback

## User Stories

### US-001: Project Setup and Infrastructure
**Description:** As a developer, I need the foundational project structure so that development can begin.

**Acceptance Criteria:**
- [ ] Initialize Next.js 14+ project with TypeScript and App Router
- [ ] Configure Tailwind CSS with RTL (right-to-left) support for Arabic
- [ ] Set up ESLint and Prettier with consistent code style
- [ ] Create basic folder structure: `/app`, `/components`, `/lib`, `/content`, `/public`
- [ ] Typecheck and lint pass

---

### US-002: Integrate ruby.wasm Runtime
**Description:** As a developer, I need ruby.wasm integrated so that Ruby code can execute in the browser.

**Acceptance Criteria:**
- [ ] Install and configure ruby.wasm package
- [ ] Create `RubyRunner` service class that initializes the WASM runtime
- [ ] Implement `executeCode(code: string): Promise<{ output: string, error?: string }>` method
- [ ] Handle runtime errors gracefully and return user-friendly error messages
- [ ] Support capturing `puts`, `print`, and `p` output
- [ ] Typecheck passes

---

### US-003: Integrate Monaco Editor
**Description:** As a learner, I want a professional code editor so that I can write Ruby code comfortably.

**Acceptance Criteria:**
- [ ] Install and configure Monaco Editor for React
- [ ] Enable Ruby syntax highlighting
- [ ] Configure editor theme (dark mode preferred for code)
- [ ] Set appropriate font size and font family (monospace)
- [ ] Enable line numbers and auto-indentation
- [ ] Editor is responsive and works on different screen sizes
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-004: Create Code Playground Component
**Description:** As a learner, I want to write code, run it, and see the output so that I can learn interactively.

**Acceptance Criteria:**
- [ ] Create `CodePlayground` component with Monaco Editor
- [ ] Add "Run" button that executes code using RubyRunner
- [ ] Add "Copy Code" button to copy current code to clipboard
- [ ] Display output panel below the editor
- [ ] Show loading state while code is executing
- [ ] Display errors distinctly (red text) from normal output
- [ ] Add "Reset" button to restore original code
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-005: Create Simulated Input System
**Description:** As a learner, I want to provide input for programs that use `gets` so that I can practice user input exercises.

**Acceptance Criteria:**
- [ ] Add input field(s) above the editor for simulated user input
- [ ] Pre-populate input when lesson requires specific test values
- [ ] Inject input values when `gets` is called in the Ruby code
- [ ] Support multiple inputs (one per line or multiple fields)
- [ ] Clear instructions in Arabic on how to use the input system
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-006: Design Arabic RTL Layout System
**Description:** As a learner, I want the interface in proper Arabic layout so that I can read and navigate comfortably.

**Acceptance Criteria:**
- [ ] Configure HTML `dir="rtl"` and `lang="ar"`
- [ ] Choose appropriate Arabic font (e.g., Cairo, Tajawal, or IBM Plex Arabic)
- [ ] Ensure all UI text flows right-to-left
- [ ] Code editor remains LTR (code is always left-to-right)
- [ ] Navigation and buttons are positioned for RTL
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-007: Create Lesson Content Schema
**Description:** As a developer, I need a structured format for lesson content so that content can be easily authored and rendered.

**Acceptance Criteria:**
- [ ] Define TypeScript interfaces for `Lesson`, `Section`, `Exercise`
- [ ] Lesson includes: id, title (Arabic), content (Arabic markdown), code examples, exercises
- [ ] Exercise includes: id, instructions, starter code, expected output, hints
- [ ] Create JSON or MDX structure for storing lessons
- [ ] Typecheck passes

---

### US-008: Build Lesson Page Layout
**Description:** As a learner, I want a clear lesson layout so that I can read explanations and practice code.

**Acceptance Criteria:**
- [ ] Create lesson page with split/stacked layout
- [ ] Left/top section: Arabic explanation content (rendered markdown)
- [ ] Right/bottom section: Code playground
- [ ] Smooth scrolling between explanation sections
- [ ] Responsive: stacks vertically on mobile
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-009: Build Navigation Sidebar
**Description:** As a learner, I want to navigate between lessons and sections so that I can find topics easily.

**Acceptance Criteria:**
- [ ] Sidebar lists all sections and lessons from curriculum
- [ ] Sections are collapsible/expandable
- [ ] Current lesson is highlighted
- [ ] Completed lessons show checkmark indicator
- [ ] Sidebar is scrollable for long curriculum
- [ ] Hamburger menu toggle on mobile
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-010: Implement Exercise Validation
**Description:** As a learner, I want immediate feedback on exercises so that I know if my solution is correct.

**Acceptance Criteria:**
- [ ] Compare user's program output to expected output
- [ ] Trim whitespace and normalize line endings before comparison
- [ ] Show success message (green) with congratulatory animation when output matches
- [ ] Play a subtle celebration animation (confetti, checkmark burst, or similar) on success
- [ ] Show "try again" message with hints when output differs
- [ ] Display expected vs actual output for debugging
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-011: Implement Local Progress Storage
**Description:** As a learner, I want my progress saved so that I can continue where I left off.

**Acceptance Criteria:**
- [ ] Save completed lessons to localStorage
- [ ] Save last visited lesson for "Continue" functionality
- [ ] Save user's code for each exercise (auto-save on change)
- [ ] Create `ProgressService` with methods: `markComplete()`, `isComplete()`, `getLastLesson()`, `saveCode()`, `loadCode()`
- [ ] Handle localStorage unavailable gracefully
- [ ] Typecheck passes

---

### US-012: Create Homepage
**Description:** As a visitor, I want an attractive homepage so that I understand what the site offers.

**Acceptance Criteria:**
- [ ] Hero section with site title and tagline in Arabic
- [ ] Brief description of what Ruby is and why learn it
- [ ] "Start Learning" button linking to first lesson
- [ ] "Continue" button if user has progress (links to last lesson)
- [ ] Visual preview of the code editor experience
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-013: Create Section - Getting Started
**Description:** As a learner, I want to complete the "Getting Started" section to begin my Ruby journey.

**Acceptance Criteria:**
- [ ] Lesson: What is Ruby and why learn it (Arabic content, no code exercise)
- [ ] Lesson: Running your first Ruby program - Hello World exercise
- [ ] Lesson: Using comments - exercise with # and =begin/=end
- [ ] Lesson: puts vs print vs p - exercise comparing all three
- [ ] All lessons have Arabic explanations referencing wiki.hsoub.com terminology
- [ ] Each lesson with code has working exercises with output validation
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-014: Create Section - Fundamentals (Part 1)
**Description:** As a learner, I want to learn Ruby variables, types, and operators.

**Acceptance Criteria:**
- [ ] Lesson: Variables and data types
- [ ] Lesson: Constants
- [ ] Lesson: Symbols
- [ ] Lesson: Basic operators
- [ ] Lesson: Boolean logic (and, or, not)
- [ ] Lesson: Truthiness and falsiness
- [ ] All lessons have Arabic content and interactive exercises
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-015: Create Section - Fundamentals (Part 2)
**Description:** As a learner, I want to learn string manipulation and user input in Ruby.

**Acceptance Criteria:**
- [ ] Lesson: String manipulation and interpolation
- [ ] Lesson: String concatenation vs interpolation
- [ ] Lesson: Common string methods
- [ ] Lesson: Bang methods (!) and predicate methods (?)
- [ ] Lesson: Getting user input (with simulated input note)
- [ ] Lesson: Type conversion
- [ ] Lesson: Multiple assignment
- [ ] Lesson: Nil handling and safe navigation operator
- [ ] All lessons have Arabic content and interactive exercises
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-016: Create Section - Control Flow
**Description:** As a learner, I want to learn how to make decisions in Ruby code.

**Acceptance Criteria:**
- [ ] Lesson: Conditionals (if, elsif, else, unless)
- [ ] Lesson: Case/when statements
- [ ] Lesson: Ternary operator
- [ ] All lessons have Arabic content and interactive exercises
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-017: Create Section - Loops
**Description:** As a learner, I want to learn how to repeat code in Ruby.

**Acceptance Criteria:**
- [ ] Lesson: While and until loops
- [ ] Lesson: For loops
- [ ] Lesson: Loop control (break, next)
- [ ] All lessons have Arabic content and interactive exercises
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-018: Create Section - Collections
**Description:** As a learner, I want to learn how to work with arrays and hashes.

**Acceptance Criteria:**
- [ ] Lesson: Arrays (creating, accessing, modifying)
- [ ] Lesson: Common array methods
- [ ] Lesson: Hashes (symbols as keys)
- [ ] Lesson: Ranges
- [ ] Lesson: Common enumerable methods (each, map, select, find)
- [ ] All lessons have Arabic content and interactive exercises
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-019: Create Section - Methods
**Description:** As a learner, I want to learn how to create reusable code with methods.

**Acceptance Criteria:**
- [ ] Lesson: Defining and calling methods
- [ ] Lesson: Parameters and arguments
- [ ] Lesson: Default arguments
- [ ] Lesson: Splat operators (* and **)
- [ ] Lesson: Return values
- [ ] All lessons have Arabic content and interactive exercises
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-020: Create Section - Blocks, Procs, and Lambdas
**Description:** As a learner, I want to learn Ruby's powerful block features.

**Acceptance Criteria:**
- [ ] Lesson: Block syntax (do...end and curly braces)
- [ ] Lesson: Using blocks with iterators
- [ ] Lesson: Yield
- [ ] Lesson: Procs and how to use them
- [ ] Lesson: Lambdas and differences from procs
- [ ] All lessons have Arabic content and interactive exercises
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-021: Create Section - Object-Oriented Programming
**Description:** As a learner, I want to learn OOP fundamentals in Ruby.

**Acceptance Criteria:**
- [ ] Lesson: Classes and objects
- [ ] Lesson: Instance variables and methods
- [ ] Lesson: Accessors (attr_reader, attr_writer, attr_accessor)
- [ ] Lesson: Initialize method
- [ ] Lesson: Inheritance basics
- [ ] All lessons have Arabic content and interactive exercises
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-022: Create Section - Modules
**Description:** As a learner, I want to learn how to organize code with modules.

**Acceptance Criteria:**
- [ ] Lesson: Creating modules
- [ ] Lesson: Namespacing
- [ ] Lesson: Mixins (include and extend)
- [ ] All lessons have Arabic content and interactive exercises
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-023: Create Section - Error Handling
**Description:** As a learner, I want to learn how to handle errors in Ruby.

**Acceptance Criteria:**
- [ ] Lesson: Begin, rescue, raise basics
- [ ] Lesson has Arabic content and interactive exercise
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-024: Create Section - Mini Challenges
**Description:** As a learner, I want to practice with fun coding challenges.

**Acceptance Criteria:**
- [ ] Challenge: FizzBuzz with full instructions and validation
- [ ] Challenge: Simple calculator with simulated input
- [ ] Challenge: Number guessing game with simulated input
- [ ] Each challenge has hints available
- [ ] Arabic instructions explain the challenge clearly
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-025: Add Progress Dashboard
**Description:** As a learner, I want to see my overall progress through the course.

**Acceptance Criteria:**
- [ ] Progress page showing completion percentage
- [ ] Visual progress bar for each section
- [ ] List of completed vs remaining lessons
- [ ] "Continue Learning" button to resume
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-026: Implement Dark/Light Theme Toggle
**Description:** As a learner, I want to choose between dark and light themes for comfortable reading.

**Acceptance Criteria:**
- [ ] Theme toggle button in header
- [ ] Persist theme preference in localStorage
- [ ] Default to system preference
- [ ] Smooth transition between themes
- [ ] Editor theme matches site theme
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-027: Add Keyboard Shortcuts
**Description:** As a learner, I want keyboard shortcuts to run code quickly.

**Acceptance Criteria:**
- [ ] Ctrl/Cmd + Enter to run code
- [ ] Ctrl/Cmd + S to save (prevent browser save, auto-save code)
- [ ] Display shortcut hints in UI
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-028: Performance Optimization
**Description:** As a learner, I want the site to load quickly even with ruby.wasm.

**Acceptance Criteria:**
- [ ] Lazy-load ruby.wasm only when code playground is visible
- [ ] Show loading indicator while WASM initializes
- [ ] Cache WASM binary in browser for faster subsequent loads
- [ ] Optimize images and fonts
- [ ] Lighthouse performance score > 80
- [ ] Typecheck passes

---

### US-029: Mobile Responsiveness Polish
**Description:** As a learner, I want to use the site comfortably on mobile devices.

**Acceptance Criteria:**
- [ ] Editor is usable on mobile (minimum 300px width)
- [ ] Touch-friendly run/reset buttons
- [ ] Collapsible navigation
- [ ] Readable font sizes on small screens
- [ ] Test on iOS Safari and Android Chrome
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-030: SEO and Metadata
**Description:** As a site owner, I want good SEO so that Arabic speakers can find the course.

**Acceptance Criteria:**
- [ ] Proper meta tags (title, description in Arabic)
- [ ] Open Graph tags for social sharing
- [ ] Semantic HTML structure
- [ ] Sitemap generation
- [ ] Arabic keywords in metadata
- [ ] Typecheck passes

---

### US-031: Create Arabic Programming Glossary
**Description:** As a learner, I want a glossary of programming terms in Arabic so that I can understand technical vocabulary.

**Acceptance Criteria:**
- [ ] Create dedicated glossary page at `/glossary`
- [ ] Include all Ruby/programming terms used in the course
- [ ] Each term has: English term, Arabic translation, brief Arabic definition
- [ ] Terms are alphabetically organized (by Arabic or English, with toggle)
- [ ] Search/filter functionality to find terms quickly
- [ ] Link to glossary from navigation and relevant lessons
- [ ] Source terminology from wiki.hsoub.com for consistency
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-032: Add Syntax Error Highlighting (Optional Enhancement)
**Description:** As a learner, I want to see syntax errors highlighted before running code so that I can fix mistakes early.

**Acceptance Criteria:**
- [ ] Integrate Monaco's built-in error markers for Ruby syntax
- [ ] Show red squiggly underlines for syntax errors
- [ ] Display error tooltip on hover
- [ ] Errors update as user types (debounced)
- [ ] Note: This is optional if Monaco Ruby support is limited; skip if complex to implement
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

## Functional Requirements

- FR-1: The system must execute Ruby code in the browser using ruby.wasm WebAssembly runtime
- FR-2: The code editor must provide Ruby syntax highlighting and basic IDE features (line numbers, auto-indent)
- FR-3: The system must capture and display output from `puts`, `print`, and `p` statements
- FR-4: The system must display Ruby runtime errors in a user-friendly format
- FR-5: The system must support simulated user input for lessons requiring `gets`
- FR-6: All instructional content must be displayed in Arabic with proper RTL layout
- FR-7: Code and output areas must remain LTR regardless of content language
- FR-8: The system must validate exercise solutions by comparing output to expected results
- FR-9: The system must store user progress in browser localStorage
- FR-10: The system must auto-save user code changes for each exercise
- FR-11: Users must be able to reset code to the original starter code
- FR-12: The navigation must show all sections and lessons with completion status
- FR-13: The system must work on modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
- FR-14: The system must be responsive and functional on mobile devices
- FR-15: The system must provide a "Copy Code" button for all code examples
- FR-16: The system must display a congratulatory animation when exercises are completed successfully
- FR-17: The system must provide a glossary page with Arabic programming terminology
- FR-18: Code execution must timeout after 60 seconds to prevent infinite loops

## Non-Goals

- No user accounts or server-side authentication
- No backend server or database (fully static site)
- No multiplayer or collaborative coding features
- No AI-powered code suggestions or hints (beyond static hints)
- No video content or audio narration
- No certificate generation upon completion
- No integration with external Ruby gems (standard library only)
- No support for Internet Explorer or legacy browsers
- No offline support (PWA) in initial version
- No translation to languages other than Arabic
- No "Report Issue" button for lessons (keep scope minimal)

## Design Considerations

- **Color Scheme:** Professional and calm colors suitable for learning. Consider purple/ruby-red accent colors to reference Ruby branding
- **Typography:**
  - Arabic content: Cairo, Tajawal, or IBM Plex Arabic
  - Code: JetBrains Mono, Fira Code, or similar monospace
- **Editor Theme:** Dark theme by default (Monokai, One Dark, or similar)
- **Layout Pattern:**
  - Desktop: Side-by-side (content left, editor right for RTL)
  - Mobile: Stacked (content top, editor bottom)
- **Reference Site:** Use https://wiki.hsoub.com/Ruby for Arabic terminology consistency

## Technical Considerations

- **Framework:** Next.js 14+ with App Router and TypeScript
- **Styling:** Tailwind CSS with RTL plugin
- **Editor:** Monaco Editor (same as VS Code)
- **Ruby Runtime:** ruby.wasm (WebAssembly)
- **Content Format:** MDX for lessons (allows embedding React components)
- **Deployment:** Vercel or similar static hosting (fully static export)
- **Bundle Size:** Monitor and optimize ruby.wasm loading (~20-40MB initial)
- **Browser Support:** Modern browsers with WebAssembly support

### ruby.wasm Considerations
- Initialize WASM runtime once, reuse for multiple code executions
- Implement 60-second execution timeout to prevent infinite loops
- Clear/reset state between code runs if needed
- Handle memory limits gracefully

## Success Metrics

- Users can run their first Ruby code within 30 seconds of landing
- All 47 lessons load and execute code correctly
- Exercise validation provides correct feedback in >99% of cases
- Site achieves Lighthouse accessibility score >90
- Page load time <3 seconds on 4G connection (excluding WASM)
- Zero critical bugs blocking lesson completion

## Resolved Questions

1. ~~Should we add a "Copy Code" button to code examples?~~ **Yes** - Added to US-004
2. ~~Should completed exercises show a congratulatory animation?~~ **Yes** - Added to US-010
3. ~~Should we add a glossary page for Arabic programming terms?~~ **Yes** - Added as US-031
4. ~~Should we include a "Report Issue" button for lessons?~~ **No** - Added to Non-Goals
5. ~~What is the exact timeout duration for code execution?~~ **60 seconds** - Updated in Technical Considerations
6. ~~Should we add syntax error highlighting before running code?~~ **Yes, if easy** - Added as optional US-032
