---

description: "Task list for Quality Gates Interactivos (US8)"
---

# Tasks: Quality Gates Interactivos

**Input**: Design documents from `specs/017-quality-gates/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: No tests requested in spec. This is a static web app with no automated test suite.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/` at repository root
- Static web app: `src/css/`, `src/js/`, `src/js/data/`, `src/index.html`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Add panel container and asset references to index.html

- [X] T001 Add `<div id="gate-panel">` container after process diagram in `src/index.html:1001`
- [X] T002 [P] Add `<link rel="stylesheet" href="css/gate-panel.css">` to `<head>` of `src/index.html:23`
- [X] T003 [P] Add `<script src="js/gate-panel.js" defer></script>` before `</body>` in `src/index.html`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Data layer and CSS infrastructure that MUST be complete before any user story

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Extend `quality-points.js` with new fields (name, roles, remediationSteps, docLinks) for all 12 gates in `src/js/data/quality-points.js`
- [X] T005 Add CSS custom properties for gate states (`--color-gate-explored`, `--color-gate-explored-border`) in `src/css/variables.css`
- [X] T006 Add `.diagram-gate--explored` CSS class in `src/css/process.css` (after line 212)

**Checkpoint**: Foundation ready — quality-points data includes all required fields for both US1 and US2

---

## Phase 3: User Story 1 - Inspeccionar quality gates en el diagrama (Priority: P1) 🎯 MVP

**Goal**: User clicks any quality gate diamond in the SVG diagram → panel opens with gate details (name, description, criteria, phase, mandatory, roles)

**Independent Test**: User clicks each quality gate in the diagram → panel shows correct name, description, verification criteria, phase, mandatory badge, and role names. Panel closes on X button or Escape key. Reopened gates show "explored" indicator on the SVG diamond.

### Implementation for User Story 1

- [X] T007 [P] [US1] Implement GateProgress persistence class (localStorage save/load, key `sdd-gates-progress`) in `src/js/gate-panel.js`
- [X] T008 [P] [US1] Create GatePanel class with `init()`, `openGate(gateId)`, `close()`, `renderPanel()` methods in `src/js/gate-panel.js`
- [X] T009 [P] [US1] Render panel header section (name, mandatory badge, phase) in `GatePanel.renderPanel()` in `src/js/gate-panel.js`
- [X] T010 [P] [US1] Render panel info section (description, verification criteria, roles) in `GatePanel.renderPanel()` in `src/js/gate-panel.js`
- [X] T011 [US1] Modify `renderGates()` in `process-diagram.js` to add `role="button"`, `tabindex="0"`, dispatch `gate:select` event on click/keydown
- [X] T012 [US1] Wire `gate:select` event listener in GatePanel to `openGate()` in `src/js/gate-panel.js`
- [X] T013 [US1] Wire "explored" marking on panel close: save state, dispatch `gate:explored`, add `.diagram-gate--explored` class to gate element in `process-diagram.js`
- [X] T014 [US1] Add responsive CSS for gate panel (desktop lateral 350px, mobile full-screen overlay) in `src/css/gate-panel.css`
- [X] T015 [US1] Add keyboard accessibility: Escape closes panel, focus trap inside panel, Tab navigation in `src/js/gate-panel.js`

**Checkpoint**: At this point, clicking any gate opens a panel with full details. Explored gates are visually marked. Works on desktop and mobile. Keyboard accessible.

---

## Phase 4: User Story 2 - Simular fallo de quality gate (Priority: P2)

**Goal**: User activates "Simular fallo" toggle in the panel → gate shows FAILED state (red diamond), failed criteria list, remediation steps, doc links. Deactivating restores neutral state without losing explored marking.

**Independent Test**: User opens any gate panel, clicks "Simular fallo" → gate diamond turns red on diagram, panel shows failed criteria list, remediation steps, and doc links. Clicking again restores neutral color. Closing/reopening panel preserves simulation state.

### Implementation for User Story 2

- [X] T016 [P] [US2] Add simulation toggle button and FAILED state sections (failed criteria, remediation, doc links) to `GatePanel.renderPanel()` in `src/js/gate-panel.js`
- [X] T017 [P] [US2] Add CSS for simulation state sections in `gate-panel.css` (failed-criteria list, remediation ordered list, doc links list)
- [X] T018 [P] [US2] Add simulation toggle logic (`toggleSimulation()`) to GateProgress (persist simulationActive flag) in `src/js/gate-panel.js`
- [X] T019 [US2] Wire `gate:simulation` event: toggle `.diagram-gate--failed` class on gate SVG diamond
- [X] T020 [US2] Handle edge case: no docLinks available → show fallback text "No hay documentación adicional disponible para este gate." in `gate-panel.js`
- [X] T021 [US2] Handle edge case: closing panel with simulation active preserves state on reopen in `gate-panel.js`

**Checkpoint**: At this point, both US1 and US2 work. Gates show nominal info, failed simulation with remediation, and all states persist in localStorage.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Integration, accessibility, and edge case hardening

- [X] T022 [P] Update `getSectionTarget()` in `src/js/section-nav.js` — not needed, gate-panel is inside #process-end-to-end section
- [X] T023 [P] Add `aria-live` announcements for gate panel open/close and simulation toggle in `gate-panel.js`
- [ ] T024 Add responsive testing breakpoints: verify panel renders correctly at 320px, 768px, 1024px+ (MANUAL — open index.html, resize browser, check gate-panel rendering at each breakpoint)
- [ ] T025 [P] Verify no console errors when clicking non-gate areas of the diagram (MANUAL — open browser DevTools Console, click diagram areas outside gates, verify 0 errors)
- [X] T026 [P] Verify localStorage quota failure is handled gracefully (try/catch in save)
- [X] T027 Verify all 12 quality gates have complete data (name, roles, remediationSteps, docLinks) in `quality-points.js`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories (data must be extended first)
- **User Story 1 (Phase 3)**: Depends on Foundational completion
- **User Story 2 (Phase 4)**: Depends on Foundational completion (extends the GatePanel from US1 but should be independently testable)
- **Polish (Phase 5)**: Depends on US1 and US2 completion

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational — no dependencies on other stories
- **User Story 2 (P2)**: Depends on GatePanel class from US1 but the simulation feature is independently testable (toggle → FAILED state → restore)

### Within Each Phase

- Foundational: Data before CSS
- US1: Progress persistence class before panel rendering, panel rendering before ProcessDiagram events
- US2: Panel simulation UI before event wiring

### Parallel Opportunities

- T002 and T003 (CSS + JS refs) can run in parallel
- T004 (data extension) is sequential
- T007, T008, T009, T010 (GatePanel methods) can run in parallel as they target different methods
- T016, T017, T018 (US2: rendering + CSS + persistence) can run in parallel
- T022 and T023 (Polish: section-nav + aria-live) can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch GateProgress + GatePanel methods together:
Task: "Implement GateProgress class in src/js/gate-panel.js"
Task: "Implement GatePanel class with openGate/close/renderPanel in src/js/gate-panel.js"
Task: "Render header section in GatePanel.renderPanel() in src/js/gate-panel.js"
Task: "Render info section in GatePanel.renderPanel() in src/js/gate-panel.js"
```

```bash
# After GatePanel is complete, wire events:
Task: "Modify renderGates in process-diagram.js to dispatch gate:select"
Task: "Wire gate:select listener in GatePanel in src/js/gate-panel.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T006)
3. Complete Phase 3: User Story 1 (T007-T015)
4. **STOP and VALIDATE**: Click each gate → panel opens with correct info → close → gate shows explored → persists after reload
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready (data extended, container in DOM)
2. Add User Story 1 → Gate panel with info + explored state → Deploy/Demo (MVP!)
3. Add User Story 2 → Simulation toggle + FAILED state → Deploy/Demo
4. Add Polish → Accessibility, edge cases → Deploy/Demo

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (GatePanel + Progress + ProcessDiagram events)
   - Developer B: User Story 2 (simulation UI + CSS + event wiring)
3. Polish can be split: accessibility (T023) by Dev A, section-nav (T022) by Dev B

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
