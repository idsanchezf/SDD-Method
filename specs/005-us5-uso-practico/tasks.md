---
description: "Task list template for feature implementation"
---

# Tasks: Uso Práctico de SDD

**Input**: Design documents from `/specs/005-us5-uso-practico/`
**Prerequisites**: plan.md (required), spec.md (user stories), research.md, data-model.md, quickstart.md

**Tests**: Not requested in feature specification. Manual testing only (keyboard, screen reader, mobile).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ ] [TaskID] [P?] [Story?] Description with file path`

- **[P] marker**: Task is parallelizable (different files, no dependencies)
- **[Story] label**: US5-1, US5-2, US5-3 (maps to user stories from spec.md)
- **Setup phase**: NO story label
- **Foundational phase**: NO story label  
- **User Story phases**: MUST have story label
- **Polish phase**: NO story label

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `src/js/`, `src/css/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create US5 section in `src/index.html` with container `<div id="guide-section">`
- [ ] T002 [P] Create `src/js/guide.js` - Interactive guide logic (Vanilla JS ES6+)
- [ ] T003 [P] Create `src/js/download-manager.js` - Template download functionality  
- [ ] T004 [P] Create `src/css/guide.css` - Styles for interactive guide
- [ ] T005 [P] Import US4 data in `src/js/guide.js`: `import { caseStudies } from './data/case-studies.js'`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [ ] T006 Implement InteractiveGuide entity (from data-model.md): localStorage key `sdd-guide-progress`
- [ ] T007 [P] Implement Phase Checklist rendering in `src/js/guide.js` (from InteractiveGuide entity)
- [ ] T008 [P] Add WCAG AA features to guide: keyboard nav, ARIA labels, `aria-live="polite"`

**Checkpoint**: Foundational phase complete - User Stories can start in parallel

---

## Phase 3: User Story 1 - Guía paso a paso interactiva (Priority: P1) 🎯 MVP

**Goal**: Interactive step-by-step guide showing SDD phases (Specify → Clarify → Plan → Tasks → Implement)

**Independent Test**: Can be fully tested by navigating guide and verifying user completes SDD cycle successfully.

### Implementation for User Story 1

- [ ] T009 [US5-1] Render phase navigation in `src/js/guide.js` (Next/Back buttons)
- [ ] T010 [US5-1] Implement phase rendering (Specify, Clarify, Plan, Tasks, Implement) in `src/js/guide.js`
- [ ] T011 [US5-1] Add checklist verification per phase in `src/js/guide.js` (auto-check items)
- [ ] T012 [US5-1] Implement progress saving to localStorage in `src/js/guide.js` (`sdd-guide-progress`)
- [ ] T013 [US5-1] Add "¡Metodología Completada!" summary at end of guide in `src/js/guide.js`
- [ ] T014 [US5-1] Style guide UI in `src/css/guide.css` (reuse US2/US4 CSS variables)
- [ ] T015 [US5-1] Add WCAG AA: keyboard Tab/Enter/Space, screen reader announcements

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Ejemplos prácticos (Priority: P2)

**Goal**: Show practical examples applied to Greenfield/Brownfield projects using US4 caseStudies data

**Independent Test**: Can be tested by navigating to examples and verifying phases are applied correctly.

### Implementation for User Story 2

- [ ] T016 [US5-2] Render example selector in `src/js/guide.js` ("Ver Ejemplo Greenfield/Brownfield" buttons)
- [ ] T017 [US5-2] Implement Greenfield example view in `src/js/guide.js` (reuse US4 caseStudies[0])
- [ ] T018 [US5-2] Implement Brownfield example view in `src/js/guide.js` (reuse US4 caseStudies[1])
- [ ] T019 [US5-2] Add "Ver artefactos generados" links in `src/js/guide.js` (Blob API download)
- [ ] T020 [US5-2] Style example views in `src/css/guide.css` (consistent with guide)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Plantillas descargables (Priority: P3)

**Goal**: Allow users to download SDD document templates (spec.md, plan.md, tasks.md) as .md or .zip

**Independent Test**: Can be tested by clicking "Descargar Plantillas" and verifying .zip downloads with templates.

### Implementation for User Story 3

- [ ] T021 [US5-3] Create `src/js/download-manager.js` - Download manager class
- [ ] T022 [US5-3] Implement individual .md downloads in `src/js/download-manager.js` (Blob + `createObjectURL()`)
- [ ] T023 [US5-3] Implement .zip download in `src/js/download-manager.js` (JSZip - requires PR approval per Constitution)
- [ ] T024 [US5-3] Create template content: `spec-template.md` (follow US2 spec-template.md structure)
- [ ] T025 [US5-3] Create template content: `plan-template.md` (follow US4 plan.md structure)
- [ ] T026 [US5-3] Create template content: `tasks-template.md` (follow US4 tasks.md structure)
- [ ] T027 [US5-3] Add "Descargar Plantillas SDD" button in `src/index.html` linking to download manager

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T028 [P] Test keyboard-only navigation: Tab through entire guide, verify Enter/Space activation
- [ ] T029 [P] Test screen reader compatibility: NVDA/JAWS announces phase changes via `aria-live`
- [ ] T030 [P] Test mobile responsiveness: Chrome DevTools, verify US2 CSS variables work
- [ ] T031 [P] Run GitHub Actions validation: `npm run lint` passes, no console errors
- [ ] T032 [P] Optimize performance: Guide loads in <2s (SC-002), localStorage reads <100ms
- [ ] T033 Update `src/index.html`: Add US5 section after US4, reference US4 diagram

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User Story 1 (P1): Can start after Foundational → MVP
  - User Story 2 (P2): Can start after Foundational, integrate with US1 if desired
  - User Story 3 (P3): Can start after Foundational, integrate with US1/US2 if desired
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Foundation only (no dependencies on other stories)
- **User Story 2 (P2)**: Foundation only, references US4 `caseStudies` data
- **User Story 3 (P3)**: Foundation only, uses Blob API + JSZip

### Within Each User Story

- Tests (if included) → Models → Services → Endpoints → Integration
- Each phase should be a complete, independently testable increment

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational is done:
  - User Story 1 (P1) → Start first (MVP)
  - User Story 2 (P2) → Can run in parallel with US1 (if staffed)
  - User Story 3 (P3) → Can run in parallel with US1/US2 (if staffed)
- All [P] tasks within a story can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1 (MVP)

```bash
# Launch all [P] tasks for User Story 1 together:
Task: "Render phase navigation in src/js/guide.js" (T009)
Task: "Implement phase rendering in src/js/guide.js" (T010)
Task: "Add checklist verification per phase in src/js/guide.js" (T011)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (P1)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (P1)
   - Developer B: User Story 2 (P2)
   - Developer C: User Story 3 (P3)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- JSZip is third-party library: Requires PR approval per Constitution Principle I
- Reuse US4 `caseStudies` data: Already loaded globally from `js/data/case-studies.js`
- Follow US2/US4 patterns: CSS variables, WCAG AA, Vanilla JS (ES6+)
