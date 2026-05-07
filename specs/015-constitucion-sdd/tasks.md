---
description: "Task list for Constitución SDD"
---

# Tasks: Constitución SDD

**Input**: Design documents from `/specs/015-constitucion-sdd/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md
**Dependencies**: Secciones existentes del sitio (hero.css, guide.js, patrones de navegación)

**Note**: Esta feature agrega una nueva sección al sitio existente siguiendo los mismos patrones de las secciones previas.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1-US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Research & Analysis)

**Purpose**: Analyze existing code to understand implementation patterns

- [X] T001 [P] Analyze `src/index.html` to identify section structure and insertion point for constitution section
- [X] T002 [P] Analyze `src/js/guide.js` phase navigation pills pattern for reuse in checker phase selector
- [X] T003 Analyze `src/js/walkthrough.js` localStorage pattern for checklist persistence

---

## Phase 2: Foundational (HTML + File Structure)

**Purpose**: Create the new section in index.html and register CSS/JS files

- [X] T004 Add constitution section markup in `src/index.html` (after guide section): title, intro, placeholder containers
- [X] T005 Add `<link rel="stylesheet" href="css/constitution.css">` to `src/index.html` head
- [X] T006 Add `<script src="js/constitution.js" defer></script>` before `</body>` in `src/index.html`

---

## Phase 3: User Story 1 - Conocer los principios constitucionales (Priority: P1) 🎯 MVP

**Goal**: 5 principle cards con explicación expandible

**Independent Test**: Un usuario puede ver los 5 principios en cards, expandir cada uno para ver detalle (fases, consecuencias, ejemplos).

### Implementation

- [X] T007 [P] [US1] Add principle cards HTML in `src/index.html` constitution section: 5 cards with icon, name, description, `<details>/<summary>` for expandable detail
- [X] T008 [P] [US1] Create `src/css/constitution.css` - Principle card grid layout, accent color borders, expandable detail styles
- [X] T009 [US1] Add principle card styles: hover states, active/expanded indicator, icon sizing, responsive grid
- [X] T010 [US1] Create `src/js/constitution.js` - `PRINCIPLES` array data with all 5 principles (id, name, description, purpose, appliesTo, violationConsequences, complianceExamples, icon, accentColor)

**Checkpoint**: 5 principle cards visibles y expansibles

---

## Phase 4: User Story 2 - Constitution Checker interactivo (Priority: P1)

**Goal**: Selector de fase + checkboxes + veredicto PASS/FAIL

**Independent Test**: Un usuario puede seleccionar una fase, marcar/desmarcar principios, hacer clic en "Verificar" y recibir PASS o FAIL según corresponda.

### Implementation

- [X] T011 [P] [US2] Add phase selector pills HTML in `src/index.html` checker container (Specify, Clarify, Plan, Tasks, Implement)
- [X] T012 [P] [US2] Add phase selector pill styles in `src/css/constitution.css` (reuse pattern from guide.css `.phase-nav-item`)
- [X] T013 [P] [US2] Add checker phase selector pills: highlight active phase, support click to switch
- [X] T014 [P] [US2] Add checker phase selector: show checklist for active phase (checkboxes with labels)
- [X] T015 [P] [US2] Add checker `selectPhase(phaseId)`, `togglePrinciple(id)`, `verify()` methods in `src/js/constitution.js`
- [X] T016 [P] [US2] Add checkbox styles in `src/css/constitution.css`: custom checkbox, strikethrough on checked
- [X] T017 [P] [US2] Add PASS/FAIL verdict display in `src/css/constitution.css`: green badge for PASS, red badge for FAIL
- [X] T018 [P] [US2] Add `save()` and `load()` methods in `src/js/constitution.js` for localStorage persistence
- [X] T019 [US2] Add verify button HTML in `src/index.html` and wire click handler in `src/js/constitution.js`
- [X] T020 [US2] Add FAIL -> principle explanation links: when a principle is unchecked, provide link to its card `id`

**Checkpoint**: Checker funcional con verificación y persistencia

---

## Phase 5: User Story 3 - Resumen de progreso constitucional (Priority: P2)

**Goal**: Panel resumen con estado por fase y porcentaje global

**Independent Test**: Un usuario puede ver las 5 fases con estado PASS/FAIL/PENDING, el porcentaje total, y hacer clic en una fase FAIL para ir al checker.

### Implementation

- [X] T021 [P] [US3] Add summary panel HTML in `src/index.html`: phase status grid + progress bar + reset button
- [X] T022 [P] [US3] Add summary panel styles in `src/css/constitution.css`: phase cards with status badges, progress bar
- [X] T023 [P] [US3] Add `getSummary()` method in `src/js/constitution.js`: compute per-phase status and global percentage
- [X] T024 [P] [US3] Add `reset()` method in `src/js/constitution.js`: clear all state + localStorage
- [X] T025 [P] [US3] Add summary progress bar styles in `src/css/constitution.css`: fill color transitions, percentage text
- [X] T026 [US3] Wire summary panel to checker: click FAIL phase -> select that phase in checker with pending principles highlighted
- [X] T027 [US3] Wire reset button: confirm dialog, clear all, update UI

**Checkpoint**: Resumen funcional con navegación a checker

---

## Phase 6: Integration & Polish

**Purpose**: Ensure all components work together and meet quality standards

### Cross-Story Integration

- [ ] T028 [P] Test US1: Verify 5 principle cards render, expand/collapse detail works
- [ ] T029 [P] Test US2: Select each phase, mark principles, verify PASS/FAIL verdicts
- [ ] T030 [P] Test US2: Reload page, verify checker state restored from localStorage
- [ ] T031 [P] Test US3: Verify summary shows correct status after various checker combinations
- [ ] T032 [P] Test US3: Click FAIL phase in summary, verify checker navigates and highlights pending principles
- [ ] T033 [P] Test reset: Click reset, verify all phases show PENDING, progress is 0%
- [ ] T034 [P] Test navigation: Verify sidebar and scroll spy work with new section

### Accessibility Testing

- [ ] T035 [P] Test keyboard: Tab through principle cards (details/summary), checker checkboxes, verify button, reset
- [ ] T036 [P] Test ARIA: Verify `aria-expanded` on details, `aria-label` on phase selector, badge text for screen readers
- [ ] T037 [P] Test focus management: Verify focus moves to verdict panel after clicking verify

### Responsive Testing

- [ ] T038 [P] Test desktop: Principle cards in grid, inline checker, summary panel
- [ ] T039 [P] Test mobile (<768px): Principle cards stack, checker full width, summary compact

### Visual Consistency

- [ ] T040 [P] Verify principle accent colors use CSS custom properties
- [ ] T041 [P] Verify checker pills match guide.css phase navigation pattern
- [ ] T042 [P] Verify no layout breakage with existing sidebar and progress bar

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - can start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1
- **Phase 3 (US1)**: Depends on Phase 2 - Principle cards (MVP)
- **Phase 4 (US2)**: Depends on Phase 3 - Checker builds on principle data
- **Phase 5 (US3)**: Depends on Phase 4 - Summary depends on checker state
- **Phase 6 (Integration)**: Depends on Phases 3-5 completion

### Parallel Opportunities

- Phase 1 tasks T001-T002 can run in parallel
- Phase 3 tasks T007-T008 can run in parallel (HTML + CSS)
- Phase 4 tasks T011-T018 can run in parallel (HTML, CSS, JS)
- Phase 5 tasks T021-T025 can run in parallel (HTML, CSS, JS)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup → Analysis complete
2. Complete Phase 2: Foundational → HTML section + file references
3. Complete Phase 3: US1 → 5 principle cards with expandable detail
4. **STOP and VALIDATE**: Verify principle cards render correctly with styles
5. Continue with Phase 4: US2 → Constitution Checker
6. Continue with Phase 5: US3 → Summary panel
7. Complete Phase 6: Integration → Full feature verified

### Commit Strategy

- Phase 1-2: `git commit -m "[US6] Add constitution section structure to index.html"`
- Phase 3: `git commit -m "[US6] Add 5 constitutional principle cards with expandable detail"`
- Phase 4: `git commit -m "[US6] Add Constitution Checker with phase selector and verify"`
- Phase 5: `git commit -m "[US6] Add constitutional compliance summary panel"`
- Phase 6: `git commit -m "[US6] Integration, accessibility, and polish"`

---

## Notes

- [P] tasks = different files, no dependencies
- Principle card accent colors: Vanilla-First (#2563eb), Semantic HTML (#0ea5e9), CSS Architecture (#8b5cf6), Branch & PR (#22c55e), CI/CD (#f59e0b)
- localStorage key: `sdd-constitution-progress`
- Phase IDs: `specify`, `clarify`, `plan`, `tasks`, `implement`
- Principle IDs: `vanilla-first`, `semantic-html`, `css-architecture`, `branch-pr`, `cicd`
- All styles must use CSS custom properties from variables.css
- Accessibility is mandatory per constitution (WCAG AA)
