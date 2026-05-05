# Tasks: SDD Phases - Interactive Phase Explorer

**Input**: Design documents from `/specs/003-us2-sdd-phases/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: No automated test tasks requested. Manual verification via quickstart.md validation.

**Organization**: Tasks organized for a single user story (US2). Depends on US1 foundation (variables.css, reset.css).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, root-level `index.html`
- CSS in `src/css/`, JS in `src/js/`
- US1 files reused, not modified

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify US1 foundation exists and is accessible

- [x] T001 Verify `src/css/variables.css` and `src/css/reset.css` exist from US1; if missing, copy from US1 branch
- [x] T002 [P] Verify `src/index.html` exists and has proper HTML5 structure with `<main>` element

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Prepare index.html for US2 section insertion

- [x] T003 Add `<link rel="stylesheet" href="css/phases.css">` to `src/index.html` `<head>` after hero.css link
- [x] T004 Add `<script src="js/phases.js" defer></script>` to `src/index.html` before closing `</body>` after hero.js script

**Checkpoint**: Foundation ready — US2 section can now be added

---

## Phase 3: User Story 2 — Explorar las fases del proceso SDD (Priority: P1) 🎯 MVP

**Goal**: Deliver a complete interactive SDD phases section with 5 phase cards, expandable detail panels, SVG flow diagram with bidirectional linking, and print support.

**Independent Test**: A user can open `index.html`, scroll to the phases section, click each phase card to see details, interact with the flow diagram, and verify understanding of the 5-phase process.

### Content Structure — HTML

- [x] T005 [US2] Add phases section container to `src/index.html` after hero: `<section class="phases-section" id="phases" data-trackable>` with h2 heading "Las 5 Fases de SDD"
- [x] T006 [US2] Add prerequisite banner to `src/index.html` at top of phases section: "¿No sabes qué es SDD? Lee la introducción primero" with anchor link to hero section
- [x] T007 [US2] Build 5 phase cards in `src/index.html` within `<div class="phases-grid">`: each with `.phase-card` containing order number, title, description, duration badge, inputs/outputs list, and `data-phase` attribute (1-5)
- [x] T008 [US2] Build expandable detail panels in `src/index.html` using `<details class="phase-detail" id="phase-detail-{n}">` for each phase with extended description, artifact examples, FAQ items, and tips
- [x] T009 [US2] Build SVG flow diagram in `src/index.html` with `<div class="flow-diagram">` containing inline `<svg>` with 5 `<rect>` nodes, 4 `<path>` arrows, `<marker>` definitions for arrowheads, and text labels
- [x] T010 [US2] Build mobile fallback for flow diagram in `src/index.html` using `<div class="flow-diagram--mobile">` with vertical flex list of phase names and `::before` pseudo-element arrows (hidden on desktop via CSS)
- [x] T011 [US2] Add print button to `src/index.html` with class `.print-button` that calls `window.print()` on click

### Styling — CSS

- [x] T012 [US2] Create `src/css/phases.css` with phases section layout (max-width container, padding, typography hierarchy using CSS custom properties from variables.css)
- [x] T013 [US2] Style prerequisite banner in `src/css/phases.css` (info background, border-left accent, link styling)
- [x] T014 [US2] Style phase card grid in `src/css/phases.css` (CSS Grid with auto-fill, gap, responsive columns)
- [x] T015 [US2] Style individual phase card in `src/css/phases.css` (background, border, border-radius, hover shadow, active state with accent border, number badge with primary background)
- [x] T016 [US2] Style phase card meta info in `src/css/phases.css` (duration badge, inputs/outputs lists with icons or bullet styling)
- [x] T017 [US2] Style detail panels (`<details>`) in `src/css/phases.css` (toggle button styling, smooth open animation, content padding, heading hierarchy)
- [x] T018 [US2] Style SVG flow diagram in `src/css/phases.css` (node fill/stroke, arrow color, label typography, hover and active state animations)
- [x] T019 [US2] Style mobile flow diagram fallback in `src/css/phases.css` (hide SVG on mobile, show flex list, `::before` arrow pseudo-elements, vertical spacing)
- [x] T020 [US2] Style print button in `src/css/phases.css` (positioning, hover state, print icon via CSS content or inline)
- [x] T021 [US2] Add `@media print` styles in `src/css/phases.css` (expand all details, hide progress bar, hide print button, format diagram as simple list, optimize colors for print)
- [x] T022 [US2] Add responsive media queries in `src/css/phases.css` (320px: single column cards, stacked diagram; 768px: 2-column grid; 1024px: full layout with horizontal diagram)

### Interactivity — JavaScript

- [x] T023 [US2] Create `src/js/phases.js` with IIFE pattern and DOMContentLoaded event listener
- [x] T024 [US2] Implement phase card selection logic in `src/js/phases.js`: click handler on `.phase-card` that sets active state, highlights corresponding flow diagram node, and scrolls card into view
- [x] T025 [US2] Implement flow diagram node interaction in `src/js/phases.js`: click handler on `.flow-diagram__node` that highlights corresponding phase card and scrolls to it
- [x] T026 [US2] Implement bidirectional sync in `src/js/phases.js`: shared state object tracking `activePhase`, both card and diagram handlers read/update this state
- [x] T027 [US2] Implement print button handler in `src/js/phases.js`: click handler on `.print-button` that calls `window.print()`
- [x] T028 [US2] Enhance `<details>` animation in `src/js/phases.js`: use `animationstart`/`animationend` events or CSS transition on `max-height` for smooth expand/collapse (native `<details>` has no built-in animation)

### Accessibility & Performance

- [x] T029 [US2] Add ARIA attributes to all interactive elements in `src/index.html` (`role="button"`, `aria-expanded`, `aria-controls` on cards, `role="img"` and `aria-label` on flow diagram, `alt` text alternative for SVG content) — covers FR-007
- [x] T030 [US2] Verify WCAG AA color contrast ratios in `src/css/phases.css` (4.5:1 for body text, 3:1 for large text and UI components) using variables from US1 — covers FR-007
- [x] T031 [US2] Verify added page weight < 50 KB (phases.css + phases.js + HTML additions) — covers SC-002

**Checkpoint**: User Story 2 is fully functional — phase cards selectable, details expandable, flow diagram interactive with bidirectional linking, print works, responsive at all breakpoints, accessible via keyboard and screen reader

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cleanup

- [x] T032 [P] Validate HTML structure: no console errors, semantic elements used correctly, heading hierarchy intact (h1→h2→h3→h4)
- [x] T033 [P] Test in Chrome, Firefox, Safari, Edge — verify phase cards, diagram, and print work without errors
- [x] T034 [P] Test responsive layout at 320px, 768px, 1024px — verify grid reflows and diagram switches to mobile view
- [x] T035 [P] Test with JavaScript disabled: verify all phase content is visible (cards static, `<details>` works natively without animation)
- [x] T036 Run Lighthouse audit: verify Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90 — covers SC-004
- [x] T037 Verify quickstart.md instructions work by opening `src/index.html` locally

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Depends on US1 being implemented — verifies foundation
- **Foundational (Phase 2)**: Depends on Setup — links CSS/JS into HTML
- **User Story 2 (Phase 3)**: Depends on Foundational phase completion
- **Polish (Phase 4)**: Depends on User Story 2 completion

### Within User Story 2

- HTML structure tasks (T005-T011) MUST complete before CSS styling (T012-T022)
- JavaScript (T023-T028) depends on HTML structure being in place
- Accessibility (T029-T030) depends on CSS being complete
- Performance check (T031) depends on all files being created

### Parallel Opportunities

```powershell
# Phase 1: Both tasks can run in parallel
# T001 (verify CSS) | T002 (verify HTML)

# Phase 3: Print button (T011) can be done alongside main HTML
# T005-T010 (main HTML) | T011 (print button)

# Phase 4: All polish tasks can run in parallel
# T032 (HTML validation) | T033 (browser testing) | T034 (responsive) | T035 (no-JS test)
```

---

## Implementation Strategy

### MVP First (User Story 2 Only)

1. Complete Phase 1: Setup → verify US1 foundation
2. Complete Phase 2: Foundational → wire CSS/JS links
3. Complete Phase 3: User Story 2 → full phases section with cards, details, diagram
4. **STOP and VALIDATE**: Open `src/index.html`, verify all 9 functional requirements met
5. Run Lighthouse, verify SC-004 (accessibility ≥ 95)

### Incremental Delivery

US2 extends the page from US1. Once merged:
- `src/index.html` now has two sections: hero + phases
- `src/css/phases.css` follows the same pattern as `hero.css`
- Future sections (US3, US4, US5) add their own CSS/JS pairs
- The shared progress bar tracks all `[data-trackable]` sections
