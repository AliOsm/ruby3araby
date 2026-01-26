# PRD: Content Proofreading & Editing for Ruby3araby

## Introduction

Ruby3araby is an Arabic Ruby programming course with 37 lesson files, 60+ glossary terms, and multiple UI components. This feature provides comprehensive proofreading of all Arabic content to ensure grammatical correctness, verify that programming term translations are accurate by cross-referencing with established Arabic programming resources online, and apply corrections to fix all identified issues.

## Goals

- Validate grammatical correctness of all Arabic text across lessons, glossary, and UI
- Verify programming term translations against authoritative Arabic resources (Hsoub Academy, Arabic Wikipedia, official documentation)
- Identify inconsistencies in terminology usage across the codebase
- Generate a comprehensive report of all issues found with suggested corrections
- **Apply corrections to fix grammar issues across all content files**
- **Standardize terminology to ensure consistent Arabic translations throughout the course**
- Ensure consistent Arabic technical vocabulary throughout the course

## User Stories

### US-001: Scan lesson markdown files for grammar issues
**Description:** As a content maintainer, I want to scan all 37 lesson markdown files for Arabic grammar issues so that learners receive high-quality educational content.

**Acceptance Criteria:**
- [ ] Read all files in `content/lessons/**/*.md`
- [ ] Identify spelling errors in Arabic text
- [ ] Identify grammatical errors (verb conjugation, gender agreement, etc.)
- [ ] Skip code blocks (``` fenced sections) from grammar checking
- [ ] Record file path, line number, original text, and issue description for each finding
- [ ] Typecheck passes

### US-002: Scan glossary terms and definitions
**Description:** As a content maintainer, I want to validate all glossary entries for grammatical correctness so that the terminology reference is reliable.

**Acceptance Criteria:**
- [ ] Read `content/glossary.json`
- [ ] Check each `arabic` field for spelling/grammar
- [ ] Check each `definition` field for spelling/grammar
- [ ] Verify term consistency (same English term should have same Arabic translation)
- [ ] Record term ID and issue description for each finding
- [ ] Typecheck passes

### US-003: Scan UI text in components and pages
**Description:** As a content maintainer, I want to validate Arabic text in React components so that the user interface is grammatically correct.

**Acceptance Criteria:**
- [ ] Scan all `.tsx` files in `app/` and `components/` directories
- [ ] Extract Arabic text from JSX (string literals, template literals)
- [ ] Check extracted text for spelling/grammar issues
- [ ] Record file path, line number, and issue for each finding
- [ ] Typecheck passes

### US-004: Scan course.json for grammar issues
**Description:** As a content maintainer, I want to validate all text in course.json including section titles, lesson titles, exercise instructions, and hints.

**Acceptance Criteria:**
- [ ] Read `public/course.json`
- [ ] Check section `title` fields
- [ ] Check lesson `title` fields
- [ ] Check exercise `starterCode` comments (lines starting with #)
- [ ] Check exercise `hints` arrays
- [ ] Check exercise `expectedOutput` for Arabic text
- [ ] Record section/lesson path and issue for each finding
- [ ] Typecheck passes

### US-005: Verify programming term translations against online resources
**Description:** As a content maintainer, I want to verify that programming term translations match established Arabic programming resources so that the course uses industry-standard terminology.

**Acceptance Criteria:**
- [ ] For each glossary term, search authoritative sources:
  - Hsoub Academy (academy.hsoub.com)
  - Arabic Wikipedia programming articles
  - Official Arabic documentation where available
- [ ] Compare course translation with found translations
- [ ] Flag terms where course translation differs from common usage
- [ ] Provide source URLs for suggested alternatives
- [ ] Record term ID, current translation, suggested translation, and sources
- [ ] Typecheck passes

### US-006: Detect terminology inconsistencies across content
**Description:** As a content maintainer, I want to find cases where the same English programming term is translated differently in different places.

**Acceptance Criteria:**
- [ ] Build a map of English term → Arabic translations used across all content
- [ ] Identify terms with multiple different Arabic translations
- [ ] List all locations where each variant appears
- [ ] Recommend which translation to standardize on (based on glossary or frequency)
- [ ] Typecheck passes

### US-007: Generate comprehensive proofreading report
**Description:** As a content maintainer, I want a single report file listing all issues found so that I can review them before applying fixes.

**Acceptance Criteria:**
- [ ] Generate report at `tasks/proofreading-report.md`
- [ ] Organize by category: Grammar Issues, Translation Issues, Inconsistencies
- [ ] Within each category, group by file/source
- [ ] Include for each issue:
  - Location (file:line or term ID)
  - Original text
  - Issue description
  - Suggested correction (if available)
  - Source reference (for translation issues)
- [ ] Include summary statistics at the top (total issues by category)
- [ ] Typecheck passes

### US-008: Fix grammar issues in lesson markdown files
**Description:** As a content maintainer, I want to apply grammar corrections to all lesson markdown files so that the content is error-free.

**Acceptance Criteria:**
- [ ] For each grammar issue identified in US-001, apply the correction
- [ ] Preserve markdown formatting (headings, lists, links, etc.)
- [ ] Preserve code blocks unchanged
- [ ] Preserve RTL text direction
- [ ] Log each correction made (file, line, before, after)
- [ ] Typecheck passes

### US-009: Fix grammar issues in glossary
**Description:** As a content maintainer, I want to apply grammar corrections to glossary terms and definitions so that the terminology reference is polished.

**Acceptance Criteria:**
- [ ] For each grammar issue identified in US-002, apply the correction
- [ ] Update `content/glossary.json` with corrected text
- [ ] Maintain valid JSON structure
- [ ] Log each correction made (term ID, field, before, after)
- [ ] Typecheck passes

### US-010: Fix grammar issues in UI components
**Description:** As a content maintainer, I want to apply grammar corrections to Arabic text in React components so that the UI is error-free.

**Acceptance Criteria:**
- [ ] For each grammar issue identified in US-003, apply the correction
- [ ] Preserve JSX syntax and component structure
- [ ] Maintain proper string escaping
- [ ] Log each correction made (file, line, before, after)
- [ ] Typecheck passes

### US-011: Fix grammar issues in course.json
**Description:** As a content maintainer, I want to apply grammar corrections to course.json content so that all exercise text is polished.

**Acceptance Criteria:**
- [ ] For each grammar issue identified in US-004, apply the correction
- [ ] Update `public/course.json` with corrected text
- [ ] Maintain valid JSON structure
- [ ] Preserve code examples in starterCode (only fix Arabic comments)
- [ ] Log each correction made (section/lesson path, field, before, after)
- [ ] Typecheck passes

### US-012: Update glossary with verified translations
**Description:** As a content maintainer, I want to update glossary terms with verified translations from authoritative sources so that the course uses industry-standard terminology.

**Acceptance Criteria:**
- [ ] For each term flagged in US-005 with a better translation, update the glossary
- [ ] Add source reference as a comment or metadata if structure allows
- [ ] Maintain alphabetical or logical ordering of terms
- [ ] Log each update made (term ID, old translation, new translation, source)
- [ ] Typecheck passes

### US-013: Standardize terminology across all content
**Description:** As a content maintainer, I want to replace inconsistent terminology with the standardized translation so that the course uses consistent vocabulary.

**Acceptance Criteria:**
- [ ] For each inconsistency identified in US-006, determine the canonical translation (prefer glossary term)
- [ ] Replace all variant translations with the canonical one across:
  - Lesson markdown files
  - Course.json (titles, hints, starterCode comments)
  - UI components
- [ ] Skip replacements inside code blocks or English text
- [ ] Log each replacement (file, line, old term, new term)
- [ ] Typecheck passes

### US-014: Generate editing summary report
**Description:** As a content maintainer, I want a summary of all changes made so that I can review the edits applied.

**Acceptance Criteria:**
- [ ] Generate report at `tasks/proofreading-changes.md`
- [ ] Organize by file with list of changes
- [ ] Include total counts: files modified, corrections applied, terms standardized
- [ ] Include git-diff-style before/after for each change
- [ ] Typecheck passes

## Functional Requirements

- FR-1: The system must read and parse all markdown files in `content/lessons/`
- FR-2: The system must read and parse `content/glossary.json`
- FR-3: The system must read and parse `public/course.json`
- FR-4: The system must scan all `.tsx` files in `app/` and `components/` directories
- FR-5: The system must skip code blocks when checking markdown files
- FR-6: The system must extract Arabic text from JSX string literals
- FR-7: The system must perform web searches to verify translations against authoritative Arabic programming resources
- FR-8: The system must detect when the same English term has multiple Arabic translations
- FR-9: The system must generate a structured markdown report at `tasks/proofreading-report.md`
- FR-10: The system must provide line numbers for issues in source files
- FR-11: The system must include source URLs when suggesting alternative translations
- FR-12: The system must edit markdown files to apply grammar corrections while preserving formatting
- FR-13: The system must edit JSON files to apply corrections while maintaining valid structure
- FR-14: The system must edit TSX files to apply corrections while preserving JSX syntax
- FR-15: The system must replace terminology variants with canonical translations across all content
- FR-16: The system must generate a changes summary report at `tasks/proofreading-changes.md`
- FR-17: The system must log all changes made for audit purposes

## Non-Goals

- Creating new content or adding new lessons
- Translating English content that isn't already translated
- Style guide enforcement beyond grammar and terminology
- Checking English text or code syntax
- Continuous integration or automated re-checking
- Creating GitHub issues (reports only)
- Changing code logic or functionality

## Technical Considerations

- Use web search to query Arabic programming resources for translation verification
- Parse markdown with awareness of code block boundaries
- Parse JSON files for glossary and course structure
- Extract text from TSX files using pattern matching for Arabic strings
- When editing files, preserve exact formatting and only change the identified text
- Create backup or use git for rollback capability
- Reports should be valid markdown for easy reading

## Content Scope Summary

| Content Type | Location | Count |
|-------------|----------|-------|
| Lesson files | `content/lessons/**/*.md` | 37 files |
| Glossary | `content/glossary.json` | 60+ terms |
| Course structure | `public/course.json` | 1 file (12 sections, 37 lessons) |
| Components | `components/*.tsx` | 11 files |
| App pages | `app/**/*.tsx` | 9 files |

## Authoritative Sources for Translation Verification

1. **Hsoub Academy** (academy.hsoub.com) - Established Arabic programming tutorials
2. **Arabic Wikipedia** - Programming and computer science articles
3. **Official Arabic documentation** - When available for Ruby/programming concepts
4. **Arabic technical communities** - Stack Overflow Arabic, Arabic programming forums

## Workflow

1. **Phase 1: Scanning** - Execute US-001 through US-006 to identify all issues
2. **Phase 2: Reporting** - Execute US-007 to generate the proofreading report
3. **Phase 3: Review** - User reviews the report and approves changes
4. **Phase 4: Editing** - Execute US-008 through US-013 to apply corrections
5. **Phase 5: Summary** - Execute US-014 to generate the changes report

## Success Metrics

- All Arabic text validated for grammar correctness
- All 60+ glossary terms verified against at least 2 online sources
- All terminology inconsistencies identified and resolved
- All identified grammar issues corrected across all files
- Consistent terminology used throughout all content
- Two comprehensive reports generated (issues + changes)
- Zero regressions in code functionality after edits
- All files pass typecheck after modifications

## Open Questions

- Should dialectal Arabic variations be flagged or accepted?
- What is the threshold for flagging a translation discrepancy (e.g., if 1 source differs vs. majority differ)?
- Should user approve each edit individually or batch approve by category?
- Should original text be preserved in comments for reference?
