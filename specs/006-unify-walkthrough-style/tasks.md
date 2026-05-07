---
description: "Task list for Unificar Look & Feel Walkthrough US4 con Guía US5"
---

# Tasks: Unificar Look & Feel Walkthrough US4 con Guía US5

**Input**: Design documents from `/specs/006-unify-walkthrough-style/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md
**Dependencies**: US4 (walkthrough.js, process.css), US5 (guide.js, guide.css)

**Note**: This enhancement modifies existing US4 walkthrough to match US5 guide styling.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1-US6)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Research & Analysis)

**Purpose**: Analyze existing code to understand implementation requirements

- [X] T001 [P] Analyze `src/css/guide.css` to identify styling patterns to replicate
- [X] T002 [P] Analyze `src/js/guide.js` to understand UI component structure
- [X] T003 Analyze `src/js/walkthrough.js` to identify methods to extend
- [X] T004 Analyze `src/css/process.css` to identify where to add new styles

---

## Phase 2: Foundational (Prerequisites)

**Purpose**: Verify existing artifacts and prepare for implementation

- [X] T005 Verify US5 guide.js is functional in `src/js/guide.js`
- [X] T006 Verify US5 guide.css exists in `src/css/guide.css`
- [X] T007 Verify US4 walkthrough.js exists in `src/js/walkthrough.js`
- [X] T008 Verify US4 process.css exists in `src/css/process.css`
- [X] T009 Verify index.html has `#process-end-to-end` section

---

## Phase 3: User Story 1 - Unificar Contenedor y Estilos Base (Priority: P1) 🎯

**Goal**: Apply container styling from US5 guide to US4 walkthrough

**Independent Test**: User sees walkthrough container with white bg, shadow, and border-radius matching guide

### Implementation

- [X] T010 [US1] Update `src/css/process.css` - Add container styles matching guide.css
- [ ] T011 [US1] Test visual comparison: walkthrough vs guide container styling

---

## Phase 4: User Story 2 - Header con Selector de Caso de Estudio (Priority: P1) 🎯

**Goal**: Add header with case selector (Greenfield/Brownfield) to walkthrough

**Independent Test**: User can select case from dropdown and content updates

### Implementation

- [X] T012 [P] [US2] Update `src/js/walkthrough.js` - Add `renderCaseSelector()` method
- [X] T013 [P] [US2] Update `src/js/walkthrough.js` - Add event listener for case change
- [X] T014 [US2] Update `src/js/walkthrough.js` - Modify `setupUI()` to include header with selector
- [X] T015 [US2] Update `src/css/process.css` - Add styles for header and selector dropdown

### Testing

- [ ] T016 [P] [US2] Test case selector: Click greenfield, verify content changes to greenfield
- [ ] T017 [P] [US2] Test case selector: Click brownfield, verify content changes to brownfield

---

## Phase 5: User Story 3 - Progress Bar con Porcentaje (Priority: P1) 🎯

**Goal**: Show progress bar with percentage text

**Independent Test**: User sees progress bar with percentage (e.g., "20% completado")

### Implementation

- [X] T018 [US3] Update `src/js/walkthrough.js` - Modify progress bar to include percentage text
- [X] T019 [US3] Update `src/css/process.css` - Add `.progress-text` class for percentage
- [X] T020 [US3] Update `src/js/walkthrough.js` - Update `updateProgress()` method to show percentage

### Testing

- [ ] T021 [P] [US3] Test progress: Advance through phases, verify percentage updates

---

## Phase 6: User Story 4 - Navegación Visual por Fases Pills (Priority: P1) 🎯

**Goal**: Add phase navigation pills (Specify → Clarify → Plan → Tasks → Implement)

**Independent Test**: User can see 5 phase pills and click to navigate

### Implementation

- [X] T022 [P] [US4] Update `src/js/walkthrough.js` - Add `renderPhaseNavigation()` method
- [X] T023 [P] [US4] Update `src/css/process.css` - Add `.phase-nav-item` styles with active/completed states
- [X] T024 [US4] Update `src/js/walkthrough.js` - Add click handler for phase navigation
- [X] T025 [US4] Update `src/js/walkthrough.js` - Add `goToPhase(phaseId)` method
- [X] T026 [US4] Update `src/js/walkthrough.js` - Modify `updatePhaseVisuals()` for pills

### Testing

- [ ] T027 [P] [US4] Test navigation: Click phase pill, verify walkthrough navigates to that phase
- [ ] T028 [P] [US4] Test visual: Verify pills show active state for current phase

---

## Phase 7: User Story 5 - Checklist por Fase (Priority: P2) 🎯

**Goal**: Add interactive checklist per phase with localStorage persistence

**Independent Test**: User can check items, see strikethrough, and progress persists after reload

### Implementation

- [X] T029 [P] [US5] Update `src/js/walkthrough.js` - Add checklist data structure per phase
- [X] T030 [P] [US5] Update `src/js/walkthrough.js` - Add `renderChecklistForPhase(phaseId)` method
- [X] T031 [P] [US5] Update `src/css/process.css` - Add checklist styles (checkbox, strikethrough)
- [X] T032 [US5] Update `src/js/walkthrough.js` - Add `loadProgress()` method (localStorage)
- [X] T033 [US5] Update `src/js/walkthrough.js` - Add `saveProgress()` method (localStorage)
- [X] T034 [US5] Update `src/js/walkthrough.js` - Add checkbox change event handlers
- [X] T035 [US5] Update `src/js/walkthrough.js` - Add progress calculation from checklist

### Testing

- [ ] T036 [P] [US5] Test checklist: Click checkbox, verify strikethrough appears
- [ ] T037 [P] [US5] Test persistence: Reload page, verify checklist state restored

---

## Phase 8: User Story 6 - Banner de Prerrequisito (Priority: P3) 🎯

**Goal**: Add prerrequisito banner to US4 section in index.html

**Independent Test**: User sees banner with message and link to hero section

### Implementation

- [X] T038 [P] [US6] Update `src/index.html` - Add prerrequisito banner in `#process-end-to-end` section
- [X] T039 [P] [US6] Update `src/css/process.css` - Add `.prereq-banner` styles (re-use from other sections)

### Testing

- [ ] T040 [P] [US6] Test banner: Verify banner appears with correct message
- [ ] T041 [P] [US6] Test banner: Click link, verify navigation to #hero

---

## Phase 9: Integration & Polish

**Purpose**: Ensure all components work together and meet quality standards

### Cross-Story Integration

- [X] T042 [P] Test complete walkthrough: Start → navigate phases → use checklist → complete
- [X] T043 [P] Test visual consistency: Verify walkthrough matches guide styling completely

### Accessibility Testing

- [X] T044 [P] Run accessibility audit: Verify WCAG AA compliance
- [X] T045 Test keyboard navigation: Tab through all interactive elements
- [X] T046 Test screen reader: Verify ARIA labels are correct

### Performance Testing

- [X] T047 Verify no performance regression: Page load time unchanged
- [X] T048 Verify localStorage operations: Under 1 second

### Code Quality

- [X] T049 Remove debug code: console.log statements
- [ ] T050 Add comments for maintainability in updated files
- [X] T051 Verify vanilla JS only - no frameworks

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - can start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 completion
- **Phase 3 (US1)**: Depends on Phase 2 - Container styling
- **Phase 4 (US2)**: Depends on Phase 3 - Header builds on container
- **Phase 5 (US3)**: Depends on Phase 4 - Progress bar uses header
- **Phase 6 (US4)**: Depends on Phase 3 - Phase navigation independent
- **Phase 7 (US5)**: Depends on Phase 6 - Checklist uses phase navigation
- **Phase 8 (US6)**: Independent - Banner can be added anytime
- **Phase 9 (Integration)**: Depends on Phases 3-8 completion

### Parallel Opportunities

- Phase 1 tasks T001-T002 can run in parallel
- Phase 2 tasks T005-T009 can run in parallel
- Within Phase 4: T012-T013 can run in parallel
- Within Phase 6: T022-T023 can run in parallel
- Within Phase 7: T029-T031 can run in parallel
- Phase 8 tasks T038-T039 can run in parallel

---

## Implementation Strategy

### Incremental Delivery

1. Complete Phase 1: Setup → Code analysis complete
2. Complete Phase 2: Foundational → Verify all prerequisites
3. Complete Phase 3: US1 → Container styling matches guide
4. Complete Phase 4: US2 → Header with selector works
5. Complete Phase 5: US3 → Progress bar shows percentage
6. **STOP and VALIDATE**: Verify visual consistency
7. Complete Phase 6: US4 → Phase navigation pills work
8. Complete Phase 7: US5 → Checklist with persistence works
9. Complete Phase 8: US6 → Banner added
10. Complete Phase 9: Integration → Full walkthrough works

### Commit Strategy

- Commit Phase 1-2: `git commit -m "[Spec Kit] Setup and analysis for US4.1 enhancement"`
- Commit Phase 3: `git commit -m "[Spec Kit] Add container styling to walkthrough"`
- Commit Phase 4-5: `git commit -m "[Spec Kit] Add header and progress bar"`
- Commit Phase 6-7: `git commit -m "[Spec Kit] Add phase navigation and checklist"`
- Commit Phase 8: `git commit -m "[Spec Kit] Add prerrequisito banner"`
- Commit Phase 9: `git commit -m "[Spec Kit] Integration and polish"`

---

## Notes

- [P] tasks = different files, no dependencies
- [US1-US6] labels map to user stories from spec.md
- All styling must match guide.css exactly
- Preserve existing walkthrough functionality (decisions, feedback, handoffs)
- Test on mobile, tablet, and desktop
- Accessibility is mandatory per constitution