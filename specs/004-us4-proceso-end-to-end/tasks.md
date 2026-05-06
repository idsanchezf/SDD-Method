---
description: "Task list for End-to-End SDD Process - Greenfield & Brownfield"
---

# Tasks: End-to-End SDD Process - Greenfield & Brownfield

**Input**: Design documents from `/specs/004-us4-proceso-end-to-end/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/process-diagram.md
**Dependencies**: US2 (phases.js, phases.css), US3 (roles.js, roles.css), US1 (variables.css, reset.css)

**Note**: US1, US2, US3 must be completed before US4 implementation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify prerequisites and prepare data files

- [X] T001 Verify US2 artifacts exist: `src/js/phases.js`, `src/css/phases.css`
- [X] T002 Verify US3 artifacts exist: `src/js/roles.js`, `src/css/roles.css`
- [X] T003 Verify US1 design system: `src/css/variables.css`, `src/css/reset.css`
- [X] T004 [P] Create directory `src/js/data/` for JSON data files
- [X] T005 [P] Create directory `src/assets/diagrams/` for SVG assets

---

## Phase 2: Foundational (Data Layer)

**Purpose**: Create all data files that US4 depends on

**⚠️ CRITICAL**: US4 implementation cannot begin until this phase is complete

- [X] T006 Create `src/js/data/phases-enhanced.js` with ProcessPhase entities (include handoffs and qualityPoints arrays)
- [X] T007 [P] Create `src/js/data/handoffs.js` with Handoff entities (from US2 spec updates)
- [X] T008 [P] Create `src/js/data/quality-points.js` with QualityPoint entities
- [X] T009 Create `src/js/data/case-studies.js` with CaseStudy and CasePhase entities (greenfield + brownfield)
- [X] T010 [P] Create `src/js/data/diagram-layout.js` with ProcessDiagram layout coordinates (nodes, edges, handoffArrows, gates)
- [X] T011 Create `src/js/data/roles-integration.js` mapping US3 roles to handoff participants

**Checkpoint**: All data files created - US4 implementation can now begin

---

## Phase 3: User Story 4 - End-to-End SDD Process (Priority: P2) 🎯

**Goal**: Visualize complete SDD flow with interactive diagram, handoffs, quality gates, and guided walkthrough for greenfield and brownfield cases

**Independent Test**: User can view process diagram, activate quality gates, and complete interactive walkthrough for both greenfield and brownfield cases

### Implementation for User Story 4

#### Subphase 3A: Process Diagram Rendering

- [ ] T012 [P] [US4] Create `src/js/process-diagram.js` with ProcessDiagram class (SVG rendering, node creation)
- [ ] T013 [P] [US4] Implement `renderNodes()` method in ProcessDiagram (use `diagram-layout.js` coordinates)
- [ ] T014 [P] [US4] Implement `renderEdges()` method (phase connections with arrows)
- [ ] T015 [US4] Implement `renderHandoffs()` method (curved arrows with role labels, artifact names)
- [ ] T016 [US4] Implement `renderQualityGates()` method (diamond shapes, toggle visibility)
- [ ] T017 [US4] Add event listeners: `phase:select`, `phase:hover`, `handoff:highlight` (depends on T012-T016)

#### Subphase 3B: Interactive Walkthrough

- [ ] T018 [US4] Create `src/js/walkthrough.js` with InteractiveWalkthrough class (state machine: currentCase, currentPhaseIndex, userDecisions)
- [ ] T019 [US4] Implement `start(caseType)` method (initialize greenfield or brownfield walkthrough)
- [ ] T020 [US4] Implement `showCurrentStep()` method (highlight node, show handoff, display artifact example)
- [ ] T021 [US4] Implement `next()` and `previous()` methods for navigation
- [ ] T022 [US4] Implement `promptUserDecision(phase)` method (render decision buttons, capture choice, show feedback)
- [ ] T023 [US4] Add walkthrough event integration: `walkthrough:step` events to highlight diagram (depends on T017, T018)

#### Subphase 3C: CSS Styling

- [X] T024 [P] [US4] Create `src/css/process.css` with base styles for `#process-diagram` (SVG container, responsive)
- [X] T025 [P] [US4] Style `.diagram-node` states: default, active, completed, highlighted (use CSS custom properties from `variables.css`)
- [X] T026 [P] [US4] Style `.diagram-handoff` arrows: default, active, filtered states
- [X] T027 [US4] Style `.diagram-gate` markers: default, visible, passed, failed states
- [X] T028 [US4] Style walkthrough UI: `.walkthrough-controls`, `.walkthrough-btn`, progress indicator
- [X] T029 [US4] Add responsive breakpoints: desktop (≥1024px), tablet (768-1023px), mobile (<768px)

#### Subphase 3D: HTML Integration

- [X] T030 [US4] Add US4 section to `src/index.html` after US3 section (id="process", heading, diagram container)
- [X] T031 [US4] Add controls: quality gate toggle button, greenfield/brownfield case selector
- [X] T032 [US4] Add walkthrough section: container, start buttons, decision UI, progress bar
- [X] T033 [US4] Import scripts in `index.html`: `process-diagram.js`, `walkthrough.js`, data files (depends on T006-T011)
- [X] T034 [US4] Import `process.css` in `index.html`

#### Subphase 3E: Cross-Story Integration

- [ ] T035 [US4] Implement US2 sync: When US2 phase card clicked → highlight diagram node (listen for `phase:highlight` event)
- [ ] T036 [US4] Implement US3 sync: When US3 role selected → highlight handoff arrows for that role (listen for `role:highlight` event)
- [ ] T037 [US4] Implement diagram → US2 sync: When diagram node clicked → highlight US2 phase card (dispatch `phase:highlight` event)
- [ ] T038 [US4] Implement diagram → US3 sync: When handoff arrow clicked → highlight US3 role card

**Checkpoint**: At this point, US4 should be fully functional with all integrations working

---

## Phase 4: Testing & Validation

**Purpose**: Verify US4 meets all requirements from spec.md

### Manual Testing (No automated test framework per constitution)

- [ ] T039 [P] [US4] Test diagram rendering: Verify 5 phase nodes render correctly with proper coordinates
- [ ] T040 [P] [US4] Test diagram interaction: Click node → highlight, hover → tooltip
- [ ] T041 [P] [US4] Test quality gates: Toggle visibility, verify all gates appear at correct phases
- [ ] T042 [US4] Test handoff arrows: Verify arrows show fromRole → toRole with artifact labels
- [ ] T043 [US4] Test case switching: Greenfield → Brownfield → Greenfield, verify data changes
- [ ] T044 [US4] Test walkthrough start: Click "Iniciar Greenfield", verify step 1 displays
- [ ] T045 [US4] Test walkthrough navigation: Next, Previous, jump to phase
- [ ] T046 [US4] Test walkthrough decisions: Select decision, verify feedback (correct/incorrect)
- [ ] T047 [US4] Test walkthrough completion: Complete all 5 phases, verify completion state
- [ ] T048 [US4] Test US2 integration: Click US2 phase card → diagram node highlights
- [ ] T049 [US4] Test US3 integration: Click US3 role → handoff arrows highlight

### Accessibility Testing

- [ ] T050 [US4] Run Lighthouse accessibility audit: Target ≥ 95/100
- [ ] T051 [US4] Test keyboard navigation: Tab through diagram nodes, handoff arrows, gates
- [ ] T052 [US4] Test screen reader: NVDA/Narrator reads diagram with proper ARIA labels
- [ ] T053 [US4] Verify color contrast ≥ 4.5:1 for all diagram elements (use `variables.css` tokens)
- [ ] T054 [US4] Test `aria-live` region: Walkthrough announcements work correctly

### Performance Testing

- [ ] T055 [US4] Test page load: Verify < 2 seconds on 3G throttling (Chrome DevTools)
- [ ] T056 [US4] Test diagram interaction: Click response < 100ms on mid-range device (DevTools CPU throttling 4x)
- [ ] T057 [US4] Test bundle size: Verify US4 adds < 50 KB to total site size
- [ ] T058 [US4] Optimize SVGs: Remove unnecessary metadata, minimize file sizes

**Checkpoint**: All tests pass - US4 ready for demo/deployment

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements and documentation

- [ ] T059 [P] [US4] Update `quickstart.md` with actual file paths and lessons learned during implementation
- [ ] T060 [P] [US4] Add comments to `process-diagram.js` and `walkthrough.js` for maintainability
- [ ] T061 [US4] Code cleanup: Remove console.logs, unused variables, verify vanilla JS best practices
- [ ] T062 [US4] Browser compatibility: Test on Chrome, Firefox, Edge, Safari (latest versions)
- [ ] T063 [US4] Responsive testing: Verify diagram and walkthrough work on mobile (320px width)
- [ ] T064 [US4] Final Lighthouse run: Verify all scores (Performance, Accessibility, Best Practices, SEO)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - can start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 completion - BLOCKS US4 implementation
- **Phase 3 (US4)**: Depends on Phase 2 completion
  - Subphases 3A, 3B, 3C, 3D can run in parallel (different files)
  - Subphase 3E (Integration) depends on 3A, 3B, 3C, 3D completion
- **Phase 4 (Testing)**: Depends on Phase 3 completion
  - All tests marked [P] can run in parallel
- **Phase 5 (Polish)**: Depends on Phase 4 completion

### Parallel Opportunities

- All Phase 1 tasks marked [P] can run in parallel
- All Phase 2 tasks marked [P] can run in parallel
- Within Phase 3:
  - T012-T017 (3A: Diagram) can run in parallel
  - T018-T023 (3B: Walkthrough) can run in parallel
  - T024-T029 (3C: CSS) can run in parallel
  - T030-T034 (3D: HTML) should run sequentially
  - T035-T038 (3E: Integration) must run after 3A, 3B, 3D complete
- All Phase 4 tests marked [P] can run in parallel
- Phase 5 tasks marked [P] can run in parallel

---

## Implementation Strategy

### Incremental Delivery

1. Complete Phase 1: Setup → Verify prerequisites
2. Complete Phase 2: Foundational → Data layer ready
3. Complete Phase 3A: Diagram rendering → Visual diagram works
4. Complete Phase 3B: Walkthrough → Interactive guide works
5. Complete Phase 3C + 3D: Styling + HTML → Integrated in page
6. Complete Phase 3E: Integration → Works with US2 & US3
7. **STOP and VALIDATE**: Test US4 independently
8. Complete Phase 4: Testing → All tests pass
9. Complete Phase 5: Polish → Ready for PR

### Commit Strategy

- Commit Phase 1: `git commit -m "[Spec Kit] Setup US4 prerequisites"`
- Commit Phase 2: `git commit -m "[Spec Kit] Add US4 data layer"`
- Commit Phase 3A: `git commit -m "[Spec Kit] Implement US4 process diagram"`
- Commit Phase 3B: `git commit -m "[Spec Kit] Add US4 interactive walkthrough"`
- Commit Phase 3C+D: `git commit -m "[Spec Kit] Style and integrate US4 in page"`
- Commit Phase 3E: `git commit -m "[Spec Kit] Integrate US4 with US2 and US3"`
- Commit Phase 4: `git commit -m "[Spec Kit] Add US4 tests and validation"`
- Commit Phase 5: `git commit -m "[Spec Kit] Polish US4 implementation"`

---

## Notes

- [P] tasks = different files, no dependencies
- [US4] label maps task to User Story 4
- Verify diagram works with both greenfield and brownfield data
- Test keyboard navigation early (accessibility is mandatory per constitution)
- Performance budget: US4 adds < 50 KB to total bundle
- Integration with US2/US3 is critical - test thoroughly
- Avoid: modifying US2/US3 files directly (extend via events)

