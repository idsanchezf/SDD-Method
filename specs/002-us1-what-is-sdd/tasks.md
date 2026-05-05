# Tasks: What is SDD - Hero Section

**Input**: Design documents from `/specs/002-us1-what-is-sdd/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: No automated test tasks requested. Manual verification via quickstart.md validation.

**Organization**: Tasks organized for a single user story (US1). All tasks contribute to the same deliverable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, root-level `index.html`
- CSS in `src/css/`, JS in `src/js/`, assets in `src/assets/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project directory structure and base files

- [x] T001 Create directory structure: `src/css/`, `src/js/`, `src/assets/icons/`
- [x] T002 [P] Create empty `src/index.html` with HTML5 boilerplate and meta tags
- [x] T003 [P] Create `src/css/variables.css` with all CSS custom properties from design system contract (colors, typography, spacing, layout, shadows, transitions)
- [x] T004 [P] Create `src/css/reset.css` with minimal CSS normalize (box-sizing, margin/preset removal, font inheritance)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before any content work

**⚠️ CRITICAL**: No content work can begin until this phase is complete

- [x] T005 Link `src/css/variables.css` and `src/css/reset.css` into `src/index.html` `<head>`
- [x] T006 Create skip-navigation link at top of `<body>` for accessibility (`href="#main-content"`)
- [x] T007 Create reading progress bar HTML structure in `src/index.html` with ARIA attributes (`role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`)

**Checkpoint**: Foundation ready — content and styling can now begin

---

## Phase 3: User Story 1 — Comprender qué es SDD (Priority: P1) 🎯 MVP

**Goal**: Deliver a complete "What is SDD?" hero section with definition, principles, benefits, comparison table, interactive checklist, and reading progress indicator.

**Independent Test**: A user can open `index.html`, read the section, interact with the checklist, and verify comprehension. The page works without JavaScript (content visible, interactions non-functional).

### Content Structure — HTML

- [x] T008 [US1] Build hero definition section in `src/index.html` with `<section class="hero__definition" data-trackable>` containing h1 title, subtitle, and definition paragraph (max 150 words) — covers FR-001
- [x] T009 [US1] Build principles section in `src/index.html` with `<section class="hero__principles" data-trackable>` containing h2 heading and 5 principle cards (each with icon placeholder, title, 2-3 line description) — covers FR-002
- [x] T010 [US1] Build benefits section in `src/index.html` with `<section class="hero__benefits" data-trackable>` containing h2 heading and 4 benefit cards (icon + title + description) — covers FR-003
- [x] T011 [US1] Build comparison table section in `src/index.html` with `<section class="hero__comparison" data-trackable>` containing h2 heading and responsive `<table>` with 3+ comparison rows (SDD vs Waterfall, SDD vs Agile sin specs, SDD vs Sin documentación) — covers FR-004
- [x] T012 [US1] Build interactive checklist section in `src/index.html` with `<section class="hero__checklist" data-trackable>` containing h2 heading and 5 checklist items using accordion pattern (`<button>` with `aria-expanded`, `aria-controls`, answer `<div>` with `hidden` attribute) — covers FR-005

### Styling — CSS

- [x] T013 [US1] Create `src/css/hero.css` with hero section layout styles (max-width container, padding, typography hierarchy using CSS custom properties)
- [x] T014 [US1] Style definition section in `src/css/hero.css` (heading sizes, paragraph styling, subtitle muted text color)
- [x] T015 [US1] Style principle cards in `src/css/hero.css` (grid layout, card background, border, shadow, hover state, icon sizing)
- [x] T016 [US1] Style benefit cards in `src/css/hero.css` (grid layout matching principles, consistent card component styles)
- [x] T017 [US1] Style comparison table in `src/css/hero.css` (table borders, header background, alternating row colors, responsive stacking on mobile)
- [x] T018 [US1] Style checklist accordion in `src/css/hero.css` (toggle button states, answer expansion animation via CSS transitions, icon rotation)
- [x] T019 [US1] Style reading progress bar in `src/css/hero.css` (fixed position at top, fill bar width transition, color accent)
- [x] T020 [US1] Add mobile-first responsive media queries in `src/css/hero.css` (320px: single column, 768px: 2-column grid, 1024px: 3-4 column grid, min 16px font size)

### Assets — Icons

- [x] T021 [P] [US1] Create 5 inline SVG icons for principles in `src/assets/icons/` (one per principle: specs-first, clarity, iteration, collaboration, quality)
- [x] T022 [P] [US1] Create 4 inline SVG icons for benefits in `src/assets/icons/` (one per benefit: faster-delivery, fewer-bugs, better-alignment, easier-onboarding)

### Interactivity — JavaScript

- [x] T023 [US1] Create `src/js/hero.js` with IIFE/module pattern and DOMContentLoaded event listener
- [x] T024 [US1] Implement checklist accordion toggle logic in `src/js/hero.js`: click handler on `.checklist__toggle` that toggles `aria-expanded`, toggles `hidden` on answer, updates icon — covers contract behavior
- [x] T025 [US1] Implement keyboard navigation for checklist in `src/js/hero.js`: Enter and Space key handlers on toggle buttons — covers accessibility contract
- [x] T026 [US1] Implement reading progress indicator in `src/js/hero.js`: IntersectionObserver tracking `[data-trackable]` sections at 50% threshold, updating progress bar `aria-valuenow` and fill width — covers contract behavior
- [x] T027 [US1] Link `src/js/hero.js` in `src/index.html` before closing `</body>` tag with `defer` attribute

### Accessibility & Performance

- [x] T028 [US1] Add ARIA labels and roles to all interactive elements in `src/index.html` (`aria-label` on icons, `role="list"` on card grids, semantic HTML5 structure h1→h2→h3) — covers FR-007
- [x] T029 [US1] Verify WCAG AA color contrast ratios in `src/css/variables.css` (4.5:1 for body text, 3:1 for large text and UI components) — covers FR-007, SC-004
- [x] T030 [US1] Verify total page weight < 150 KB uncompressed by checking combined size of HTML + CSS + JS + SVG assets — covers SC-003

**Checkpoint**: User Story 1 is fully functional — section loads, all content visible, checklist works, progress bar updates, responsive at all breakpoints, accessible via keyboard and screen reader

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cleanup

- [x] T031 [P] Validate HTML structure: no console errors, semantic elements used correctly, heading hierarchy intact
- [x] T032 [P] Test in Chrome, Firefox, Safari, Edge — verify checklist and progress bar work without errors — covers SC-005
- [x] T033 [P] Test with JavaScript disabled: verify all content is visible and readable (progressive enhancement) — covers edge case
- [x] T034 Run Lighthouse audit: verify Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90 — covers SC-004
- [x] T035 Verify quickstart.md instructions work by opening `src/index.html` locally — covers FR-008

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all content work
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion
- **Polish (Phase 4)**: Depends on User Story 1 completion

### Within User Story 1

- HTML structure tasks (T008–T012) MUST complete before CSS styling (T013–T020)
- Icon creation (T021, T022) can proceed in parallel with HTML and CSS
- JavaScript (T023–T027) depends on HTML structure being in place
- Accessibility verification (T028–T029) depends on CSS being complete
- Performance check (T030) depends on all assets being created

### Parallel Opportunities

```powershell
# Phase 1: All tasks can run in parallel
# T001 (directories) | T002 (HTML) | T003 (variables.css) | T004 (reset.css)

# Phase 3: Icons can be created while HTML/CSS is being built
# T021 (principle icons) | T022 (benefit icons)

# Phase 4: All polish tasks can run in parallel
# T031 (HTML validation) | T032 (browser testing) | T033 (no-JS test) | T034 (Lighthouse)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup → directories, base files created
2. Complete Phase 2: Foundational → structure wired, progress bar skeleton ready
3. Complete Phase 3: User Story 1 → full hero section with content, styles, interactivity
4. **STOP and VALIDATE**: Open `src/index.html`, verify all 8 functional requirements met
5. Run Lighthouse, verify SC-004 (accessibility ≥ 95)

### Incremental Delivery

This is the first section of the site. Once complete and merged:
- `src/css/variables.css` serves as the foundation for all future sections
- `src/css/reset.css` applies globally
- Future sections add their own `section-*.css` and `section-*.js` pairs
- The project structure scales naturally as US2, US3, US4, US5 are implemented
