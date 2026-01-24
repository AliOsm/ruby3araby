# PRD: Ruby3araby UI/UX Improvements

## Introduction

This PRD addresses 20 UI/UX issues in the Ruby3araby Arabic Ruby programming course. The improvements focus on proper RTL layout, visual consistency, Ruby-themed branding, Arabic typography in code, and enhanced user interactions. All changes must support modern browsers including mobile devices.

## Goals

- Fix RTL layout to properly display `[Code Editor | Content | Curriculum]` from left to right
- Establish a Ruby-themed color palette (ruby red, pink, burgundy tones)
- Improve Arabic text rendering in code blocks with appropriate monospace fonts
- Enhance button interactions with icon-only controls and completion animations
- Ensure color accessibility in both light and dark themes
- Unify branding terminology across the site
- Add utility features (copy buttons, download, progress access)

## Font Research: Arabic Monospace Recommendations

After researching Arabic monospace fonts, here are the options:

| Font | Pros | Cons |
|------|------|------|
| **Kawkab Mono** | Purpose-built for Arabic code, pairs with Source Code Pro, 3 weights, OFL license | Limited community, narrower glyphs |
| **Vazir Code** | Good Persian/Arabic support, active maintenance | Primarily Persian-focused |
| **IBM Plex Arabic** + **IBM Plex Mono** | Professional, extensive weights, good Latin pairing | Not true monospace for Arabic |
| **Amiri Typewriter** | Beautiful Naskh style | Not designed for code |

**Recommendation:** Use **Kawkab Mono** as the primary Arabic code font with **JetBrains Mono** as the Latin fallback. Kawkab Mono is specifically designed for code editing with Arabic text and is available under OFL license. Self-host the font for reliability.

Font stack: `'Kawkab Mono', 'JetBrains Mono', 'Fira Code', 'Consolas', monospace`

## Ruby Color Palette

Replace emerald/green theme with Ruby gem-inspired colors:

| Purpose | Light Theme | Dark Theme | CSS Variable |
|---------|-------------|------------|--------------|
| Primary | `#9b1c31` (Ruby Red) | `#dc2743` (Bright Ruby) | `--ruby-primary` |
| Secondary | `#7c1d3e` (Burgundy) | `#e85d75` (Rose) | `--ruby-secondary` |
| Accent | `#be3455` (Pink Ruby) | `#f472b6` (Light Pink) | `--ruby-accent` |
| Surface | `#fef2f4` (Ruby Tint) | `#1a0a0e` (Dark Ruby) | `--ruby-surface` |

---

## User Stories

### US-001: Fix RTL Page Layout Structure
**Description:** As an Arabic-speaking user, I want the lesson page to follow proper RTL layout so that navigation feels natural.

**Acceptance Criteria:**
- [ ] Desktop layout (xl+): Code Editor (left) | Content (center) | Sidebar/Curriculum (right)
- [ ] The sidebar appears on the right side of the screen in RTL context
- [ ] Content area remains in the center
- [ ] Code playground/editor appears on the left
- [ ] Mobile layout stacks appropriately: Sidebar toggle → Content → Code Editor
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

**Technical Notes:**
- Modify `app/lessons/[section]/[lesson]/page.tsx` flex direction
- Use `flex-row` instead of `flex-row-reverse` for the main container since RTL reverses it
- Sidebar component positioning in `components/Sidebar.tsx`

---

### US-002: Fix Code Editor Card Height Overflow
**Description:** As a user on lessons with input panels, I want the code editor card to fit within the viewport so I can see the output without scrolling.

**Acceptance Criteria:**
- [ ] Code editor card uses `max-h-[calc(100vh-<header>)]` or similar constraint
- [ ] Input panel, editor, and output are all visible without page scroll on desktop
- [ ] Editor height adjusts dynamically based on available space
- [ ] On pages without input panel, editor can use more vertical space
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill (test on `fundamentals/user-input`)

---

### US-003: Fix Output Box Placeholder RTL Direction
**Description:** As an Arabic user, I want the output placeholder text to display correctly in RTL so it reads naturally.

**Acceptance Criteria:**
- [ ] Output box placeholder "اضغط على تشغيل لرؤية المخرجات" displays RTL
- [ ] Add `dir="rtl"` to placeholder/empty state container
- [ ] Actual code output remains `dir="ltr"` for proper code display
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-004: Fix English Words Reversed in RTL Context
**Description:** As a user reading mixed Arabic/English content, I want English words like `nil?` to display correctly (not as `?nil`).

**Acceptance Criteria:**
- [ ] English/code terms in Arabic text display in correct LTR order
- [ ] Use `<bdi>` tags or `dir="ltr"` spans for inline code/English terms
- [ ] Method names, operators, and symbols render correctly
- [ ] Fix in lesson content markdown rendering (LessonContent.tsx)
- [ ] Fix in any hardcoded UI strings with mixed content
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-005: Add Ruby Syntax Highlighting to Content Code Blocks
**Description:** As a learner, I want code blocks in lesson content to have Ruby syntax highlighting so code is easier to read.

**Acceptance Criteria:**
- [ ] Code blocks in markdown content render with syntax highlighting
- [ ] Ruby keywords, strings, comments, numbers have distinct colors
- [ ] Highlighting works in both light and dark themes
- [ ] Use a lightweight highlighter (e.g., `prism-react-renderer` or `shiki`)
- [ ] Use standard Prism themes (not matching Monaco editor theme)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-006: Add Copy Button to Content Code Blocks
**Description:** As a learner, I want to copy code examples from lesson content with one click.

**Acceptance Criteria:**
- [ ] Each code block in lesson content has a copy button
- [ ] Button appears on hover (desktop) or always visible (mobile)
- [ ] Button shows success feedback (checkmark or "تم النسخ")
- [ ] Button positioned top-right of code block, doesn't obscure code
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-007: Convert Action Buttons to Icon-Only with Tooltips
**Description:** As a user, I want compact action buttons with tooltips showing keyboard shortcuts for a cleaner interface.

**Acceptance Criteria:**
- [ ] Run button: Play icon only, tooltip "تشغيل Ctrl+Enter"
- [ ] Copy button: Copy icon only, tooltip "نسخ الشيفرة Ctrl+C"
- [ ] Reset button: Reset/refresh icon only, tooltip "إعادة تعيين"
- [ ] Tooltips include both Arabic text and English keyboard shortcuts
- [ ] Tooltips appear on hover after 300ms delay
- [ ] Icons are touch-friendly (min 44px tap target)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-008: Move Check Answer Button Below Output
**Description:** As a user, I want the "تحقق من الإجابة" button positioned below the output box for better visual flow.

**Acceptance Criteria:**
- [ ] "تحقق من الإجابة" button moves from the action buttons row
- [ ] Button appears below the output box, full width or centered
- [ ] Button is visually distinct (primary action styling)
- [ ] Validation feedback (correct/incorrect) appears near this button
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-009: Add Run Completion Animation
**Description:** As a user, I want visual feedback when code execution completes, even for instant operations.

**Acceptance Criteria:**
- [ ] Run button shows brief success animation after execution completes
- [ ] Animation duration: minimum 400ms, even if code runs instantly
- [ ] Success state: green flash/pulse or checkmark overlay
- [ ] Error state: red flash/shake animation
- [ ] Animation doesn't block further interactions
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-010: Convert Theme Toggle to Dropdown
**Description:** As a user, I want a dropdown menu to select theme (Light/Dark/System) instead of cycling through.

**Acceptance Criteria:**
- [ ] Theme toggle becomes a dropdown button
- [ ] Options: "فاتح" (Light), "داكن" (Dark), "تلقائي" (System)
- [ ] Current theme is indicated (checkmark or highlight)
- [ ] Each option has an appropriate icon (sun, moon, laptop)
- [ ] Dropdown closes on selection or outside click
- [ ] Accessible with keyboard navigation
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-011: Fix Color Visibility Issues
**Description:** As a user in either theme, I want all text and UI elements to be clearly visible.

**Acceptance Criteria:**
- [ ] Sidebar section numbers visible in dark theme
- [ ] All text meets WCAG AA contrast ratio (4.5:1 for normal text)
- [ ] Interactive elements have visible focus states
- [ ] Code in content blocks readable in both themes
- [ ] Fix any `text-foreground/60` or similar low-contrast utilities
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill (both themes)

---

### US-012: Apply Ruby-Themed Color Scheme
**Description:** As a user, I want the site to use Ruby-inspired colors for brand consistency.

**Acceptance Criteria:**
- [ ] Replace emerald-500/600/700 with ruby red equivalents
- [ ] Primary buttons use ruby red (`#9b1c31` light / `#dc2743` dark)
- [ ] Accent colors use burgundy/pink tones
- [ ] Success states can remain green (semantic meaning)
- [ ] Error states remain red (but distinguish from primary)
- [ ] Update CSS variables in `globals.css`
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill (both themes)

---

### US-013: Fix CodeEditor Loading State Background
**Description:** As a user, I want the editor loading state to match the card background for visual consistency.

**Acceptance Criteria:**
- [ ] Loading spinner container uses same background as parent card
- [ ] No visible background color mismatch during Monaco editor load
- [ ] Use CSS variable `var(--editor-bg)` or inherit from parent
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-014: Add Arabic Monospace Font for Code
**Description:** As an Arabic learner, I want Arabic characters in code to render with a proper monospace font.

**Acceptance Criteria:**
- [ ] Download and self-host Kawkab Mono font (Regular weight minimum)
- [ ] Add font-face declaration in `globals.css`
- [ ] Update Monaco editor font family to include Kawkab Mono
- [ ] Update content code blocks font family
- [ ] Arabic characters align properly in monospace context
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-015: Move Arabic Comments to Separate Lines in Code
**Description:** As a learner, I want Arabic comments in code examples to be on their own lines to avoid RTL rendering issues.

**Acceptance Criteria:**
- [ ] Audit all lesson markdown files in `content/lessons/`
- [ ] Move inline Arabic comments to line above the code they explain
- [ ] Format: `# تعليق عربي` on its own line, then code on next line
- [ ] Ensure no inline mixing of Arabic comments with code
- [ ] This is a content change, not code change

---

### US-016: Add Progress Page Access from Lessons
**Description:** As a learner, I want quick access to my progress page while reading lessons.

**Acceptance Criteria:**
- [ ] Add "تقدمي" link/button in lesson page header or sidebar
- [ ] Link navigates to `/progress`
- [ ] Visually consistent with other navigation elements
- [ ] Visible on both mobile and desktop
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-017: Replace "روبي بالعربي" with "روبي عربي"
**Description:** As a brand consistency measure, update the site name throughout.

**Acceptance Criteria:**
- [ ] Update in `app/page.tsx` (logo, title, footer)
- [ ] Update in `app/layout.tsx` (metadata)
- [ ] Update in `content/course.json` (course title)
- [ ] Update in any other hardcoded occurrences
- [ ] Grep for "روبي بالعربي" returns no results after changes
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-018: Replace "كود" with "شيفرة برمجية"
**Description:** As a terminology consistency measure, use "شيفرة برمجية" (or "شيفرة") instead of "كود".

**Acceptance Criteria:**
- [ ] Update all UI strings: "نسخ الكود" → "نسخ الشيفرة"
- [ ] Update lesson content references
- [ ] Update button labels, tooltips, placeholders
- [ ] Use "شيفرة" for short form, "شيفرة برمجية" for formal references
- [ ] Grep for "كود" returns no results after changes
- [ ] Typecheck passes

---

### US-019: Add Lesson Copy and Download Buttons
**Description:** As a learner, I want to copy or download lesson content as markdown for offline reference.

**Acceptance Criteria:**
- [ ] Add "نسخ الدرس" button that copies full lesson markdown to clipboard
- [ ] Add "تحميل الدرس" button that downloads lesson as `.md` file
- [ ] Downloaded file named: `{section-slug}-{lesson-slug}.md`
- [ ] Content includes: title, explanation, code examples, exercise with hints
- [ ] Use fenced code blocks (```ruby) in exported markdown, not raw HTML
- [ ] Buttons placed in lesson header or near title
- [ ] Success feedback on copy action
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-020: Fix Quoted Text Extra Bottom Padding
**Description:** As a reader, I want blockquotes to have consistent padding without extra space at the bottom.

**Acceptance Criteria:**
- [ ] Identify blockquote styling in `LessonContent.tsx` or `globals.css`
- [ ] Remove or reduce excess `padding-bottom` or `margin-bottom`
- [ ] Blockquotes should have equal padding on all sides (or intentional design)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

## Functional Requirements

- **FR-001:** Page layout follows RTL conventions with sidebar on right, editor on left
- **FR-002:** All code blocks (editor and content) use Kawkab Mono + JetBrains Mono font stack
- **FR-003:** Content code blocks have syntax highlighting via prism-react-renderer or similar
- **FR-004:** Action buttons (run, copy, reset) are icon-only with hover tooltips
- **FR-005:** Theme selection is via dropdown with Light/Dark/System options
- **FR-006:** All text maintains WCAG AA contrast in both themes
- **FR-007:** Primary color palette uses ruby red tones (#9b1c31, #dc2743)
- **FR-008:** Code execution shows completion animation (min 400ms)
- **FR-009:** English text in RTL context uses bidirectional isolation (`<bdi>` or `dir="ltr"`)
- **FR-010:** Lessons can be copied to clipboard or downloaded as markdown files

## Non-Goals (Out of Scope)

- No changes to Ruby WASM execution logic
- No changes to course content structure (sections, lessons)
- No new lessons or exercises
- No backend or API changes (this is a static site)
- No changes to progress tracking logic (only UI access to progress page)
- No internationalization beyond Arabic (no English UI option)
- No print stylesheet optimizations

## Technical Considerations

- **Font Loading:** Use `font-display: swap` for Kawkab Mono to avoid FOIT
- **Syntax Highlighting:** Consider `prism-react-renderer` (small bundle) over `highlight.js`
- **Tooltips:** Use CSS-only tooltips or lightweight library (avoid heavy dependencies)
- **Animation:** Use CSS transitions/animations, avoid JS-heavy solutions
- **Bundle Size:** Monitor for increases; code-split syntax highlighter if needed

## Design Considerations

- **Ruby Color Palette:** See table in introduction for specific hex values
- **Tooltip Style:** Dark background, light text, appears below/above element
- **Animation:** Subtle pulse or flash, not distracting
- **Mobile:** All interactions must work with touch (no hover-only features critical to function)

## Success Metrics

- All 20 issues resolved and verified in browser
- Lighthouse accessibility score ≥ 90
- No visual regressions in existing functionality
- Page load time not significantly impacted (< 10% increase)
- All typecheck and lint passes

## Resolved Decisions

1. **Downloaded markdown format:** Use fenced code blocks (```ruby), not raw HTML
2. **Tooltip format:** Include both Arabic text and English keyboard shortcuts (e.g., "تشغيل Ctrl+Enter")
3. **Syntax highlighting theme:** Use standard Prism themes, not matching Monaco editor theme
