---
description: "Task list for End-to-End SDD Process Visualization"
---

# Tasks: End-to-End SDD Process Visualization

**Input**: Design documents from `/specs/004-us4-proceso-end-to-end/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Organization**: Tasks for User Story 4 (P2) - Process visualization with interactive diagram

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: [US4] for all tasks (User Story 4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify project structure is ready for US4 implementation

- [X] T001 Verify existing src/ directory structure matches plan.md (src/css/, src/js/, src/assets/)
- [X] T002 [P] Verify src/index.html includes required CSS/JS placeholders for process section

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core components that US4 depends on

**⚠️ CRITICAL**: US4 requires understanding of phases (US2) and roles (US3) to render correctly

- [X] T003 [US4] Review US2 phase data structure in src/js/phases.js for integration
- [X] T004 [US4] Review US3 roles data structure in src/js/roles.js for integration
- [X] T005 [P] [US4] Create src/js/process-data.js with SDD process phases data (Specify, Clarify, Plan, Tasks, Implement) including inputs, outputs, roles, artifacts, duration
- [X] T006 [P] [US4] Create src/js/case-studies-data.js with greenfield and brownfield case study data including phases, artifacts, challenges, lessons learned

**Checkpoint**: Data structures ready - US4 implementation can now begin

---

## Phase 3: User Story 4 - End-to-End Process Visualization (Priority: P2) 🎯

**Goal**: Visualizar el flujo completo de SDD desde la concepción de una feature hasta su entrega, incluyendo handoffs entre roles y puntos de control de calidad.

**Independent Test**: Un usuario puede describir el flujo end-to-end de SDD, identificar al menos 3 puntos de control de calidad y explicar qué sucede si una spec no pasa revisión.

### Implementation for User Story 4

#### 3.1: Process Diagram CSS Styles

- [X] T007 [P] [US4] Create process section styles in src/css/process.css (`.process`, `.process__container`, `.process__diagram`, `.process__controls`)
- [X] T008 [P] [US4] Create diagram node styles in src/css/process.css (`.diagram-node`, `.diagram-node.active`, `.diagram-node:focus`, `.diagram-node:hover`)
- [X] T009 [P] [US4] Create quality gate styles in src/css/process.css (`.quality-gate`, `.quality-gate.visible`, `.quality-gate__marker`)
- [X] T010 [P] [US4] Create phase detail panel styles in src/css/process.css (`.process__detail`, `.process__detail--empty`, `.detail__title`, `.detail__content`)
- [X] T011 [P] [US4] Create responsive breakpoints for process section in src/css/process.css (mobile: font-size, layout adjustments)
- [X] T012 [P] [US4] Create handoff arrow styles in src/css/process.css (`.handoff-arrow`, `.handoff-arrow__label`)
- [X] T013 [P] [US4] Create case studies section styles in src/css/process.css (`.case-studies`, `.case-study-card`, `.case-study-card__header`)

#### 3.2: Process Diagram SVG Rendering

- [X] T014 [US4] Create ProcessDiagram class skeleton in src/js/process.js with constructor accepting svgId parameter
- [X] T015 [US4] Implement renderPhases() method in src/js/process.js to render PhaseNode elements from process-data.js (id, name, x, y, description)
- [X] T016 [US4] Implement renderConnectors() method in src/js/process.js to draw SVG path connectors between phases with arrow markers
- [X] T017 [US4] Implement renderQualityGates() method in src/js/process.js to render quality gate overlays (Review, Code Review, UAT) at correct positions
- [X] T018 [US4] Implement renderHandoffs() method in src/js/process.js to render handoff arrows between roles (Spec Writer → Developer, etc.)

#### 3.3: Process Diagram Interactivity

- [X] T019 [US4] Implement bindEvents() method in src/js/process.js with click event delegation on `.diagram-node` elements
- [X] T020 [US4] Implement selectPhase(phaseId) method in src/js/process.js to update active state and trigger `phase-selected` CustomEvent
- [X] T021 [US4] Implement updateDetailPanel(phaseData) method in src/js/process.js to populate `#phase-detail` with phase info (inputs, outputs, roles, artifacts)
- [X] T022 [US4] Implement toggleQualityGates() method in src/js/process.js to toggle `.visible` class on `.quality-gate` elements and trigger `quality-gates-toggled` event
- [X] T023 [US4] Implement keyboard navigation in src/js/process.js (tabindex="0", Enter/Space key handlers for `.diagram-node`)
- [X] T024 [US4] Add event listener for `#toggle-quality-gates` button in src/js/process.js to call toggleQualityGates()

#### 3.4: HTML Integration

- [X] T025 [US4] Add process section HTML structure to src/index.html after existing sections (`.process` with `#process`, `.process__diagram` with `#sdd-flow-svg`, `.process__detail` with `#phase-detail`)
- [X] T026 [US4] Add case studies section HTML structure to src/index.html (`.case-studies` with greenfield and brownfield cards)
- [X] T027 [US4] Add process.css link tag to src/index.html head section after existing CSS links
- [X] T028 [US4] Add process-data.js script tag to src/index.html before process.js
- [X] T029 [US4] Add case-studies-data.js script tag to src/index.html before process.js
- [X] T030 [US4] Add process.js script tag to src/index.html after all data script tags

#### 3.5: Case Studies Implementation

- [X] T031 [US4] Implement renderCaseStudies() method in src/js/process.js to create expandable case study cards from case-studies-data.js
- [X] T032 [US4] Implement expandCaseStudy(caseId) method in src/js/process.js to show/hide case study details with phase walkthrough
- [X] T033 [US4] Add event listeners for case study card clicks in src/js/process.js to trigger expandCaseStudy()

#### 3.6: Accessibility Implementation

- [X] T034 [P] [US4] Add ARIA attributes to SVG diagram in src/js/process.js (`role="img"`, `aria-label="Diagrama de flujo SDD"`)
- [X] T035 [P] [US4] Add ARIA attributes to phase nodes in src/js/process.js (`aria-label` with phase name and description)
- [X] T036 [P] [US4] Add `aria-live="polite"` to `#phase-detail` panel in src/index.html
- [X] T037 [P] [US4] Add `aria-pressed` toggle state to `#toggle-quality-gates` button in src/js/process.js
- [X] T038 [P] [US4] Add `aria-hidden="true"` to quality gates overlay when hidden in src/js/process.js
- [X] T039 [P] [US4] Verify keyboard tab order flows correctly through diagram nodes and controls

#### 3.7: Error Handling & Edge Cases

- [X] T040 [US4] Add error handling in src/js/process.js constructor to throw Error if SVG element not found
- [X] T041 [US4] Add error handling in src/js/process.js selectPhase() to warn and no-op on invalid phaseId
- [X] T042 [US4] Implement "Datos no disponibles" empty state in updateDetailPanel() when phase data missing
- [X] T043 [US4] Add error message display in src/index.html for spec review failure scenario (edge case from spec)

**Checkpoint**: At this point, User Story 4 should be fully functional and testable independently

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect US4 implementation

- [X] T044 [P] [US4] Run accessibility audit on process section using browser DevTools or axe
- [X] T045 [P] [US4] Optimize SVG rendering performance (minimize DOM operations, use DocumentFragment)
- [X] T046 [US4] Test diagram on mobile viewport (320px width) and adjust font sizes/ spacing
- [X] T047 [US4] Verify diagram prints correctly (print media query in src/css/process.css)
- [X] T048 [US4] Add CSS transitions for phase selection and quality gate toggle in src/css/process.css
- [X] T049 [US4] Validate all acceptance scenarios from spec.md are met

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS US4 implementation
- **User Story 4 (Phase 3)**: Depends on Foundational (Phase 2) completion
- **Polish (Phase 4)**: Depends on User Story 4 completion

### Task Dependencies Within US4

- T005-T006 (data files) → T014-T018 (SVG rendering) → T019-T024 (interactivity)
- T025-T030 (HTML integration) can run parallel with T014-T024 after T005-T006
- T031-T033 (case studies) depends on T014+ (ProcessDiagram class)
- T034-T039 (accessibility) can run in parallel, depends on T014-T030 being complete
- T040-T043 (error handling) can run in parallel, depends on T014-T024
- T044-T049 (polish) depends on all US4 tasks being complete

### Parallel Opportunities

- All CSS tasks (T007-T013) can run in parallel [P]
- Data JS files (T005-T006) can run in parallel [P]
- SVG rendering methods (T015-T018) can run in parallel after T014 [P]
- HTML structure (T025-T026) and script tags (T027-T030) can run in parallel [P]
- Accessibility tasks (T034-T039) can run in parallel [P]
- Error handling tasks (T040-T043) can run in parallel [P]

---

## Parallel Example: User Story 4

```bash
# Launch all CSS tasks for US4 together:
Task: "Create process section styles in src/css/process.css"
Task: "Create diagram node styles in src/css/process.css"
Task: "Create quality gate styles in src/css/process.css"
Task: "Create phase detail panel styles in src/css/process.css"
Task: "Create responsive breakpoints for process section in src/css/process.css"
Task: "Create handoff arrow styles in src/css/process.css"
Task: "Create case studies section styles in src/css/process.css"

# Launch all data JS tasks for US4 together:
Task: "Create src/js/process-data.js with SDD process phases data"
Task: "Create src/js/case-studies-data.js with case study data"

# Launch all accessibility tasks for US4 together:
Task: "Add ARIA attributes to SVG diagram in src/js/process.js"
Task: "Add ARIA attributes to phase nodes in src/js/process.js"
Task: "Add aria-live to phase-detail panel in src/index.html"
```

---

## Implementation Strategy

### MVP for User Story 4

1. Complete Phase 1: Setup (verify structure)
2. Complete Phase 2: Foundational (data files T005-T006)
3. Complete Phase 3.1: CSS styles (T007-T013)
4. Complete Phase 3.2: SVG rendering (T014-T018)
5. Complete Phase 3.3: Basic interactivity (T019-T024)
6. Complete Phase 3.4: HTML integration (T025-T030)
7. **STOP and VALIDATE**: Test acceptance scenarios 1 and 2

### Incremental Delivery for US4

1. Basic diagram renders (T014-T018 + T025-T030) → Visual validation
2. Add interactivity (T019-T024) → Test scenario 1 (click phases)
3. Add quality gates (T022, T024) → Test scenario 2 (toggle gates)
4. Add case studies (T031-T033) → Test scenario 3 (case studies)
5. Add accessibility (T034-T039) → Accessibility audit
6. Add polish (T044-T049) → Final validation

---

## Notes

- [P] tasks = different files, no dependencies
- [US4] label maps task to User Story 4 for traceability
- Each acceptance scenario should be independently testable
- Verify diagram works on desktop (Chrome, Firefox, Edge) and mobile (320px+)
- Commit after each logical group (CSS, JS methods, HTML)
- All tasks follow Vanilla-First principle (no frameworks)

---

## Task Summary

- **Total Tasks**: 49
- **US4 Tasks**: 47 (T003-T049)
- **Setup Tasks**: 2 (T001-T002)
- **Parallel Tasks**: 28 tasks marked [P]
- **Independent Test**: User can describe end-to-end flow, identify 3+ quality controls, explain spec review failure
