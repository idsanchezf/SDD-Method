---
description: "Task list for Menú de navegación lateral global"
---

# Tasks: Menú de navegación lateral global

**Input**: Design documents from `/specs/014-section-nav/`
**Prerequisites**: plan.md, spec.md

## Phase 1: Setup (Research)

- [X] T001 Analyze existing section structure (5 sections, sub-sections)
- [X] T002 Identify all sub-sections needing anchor IDs
- [X] T003 Review variables.css for design tokens

## Phase 2: HTML Changes

- [X] T004 Add `id` attributes to Hero sub-sections (5 items)
- [X] T005 Add `id` attributes to Phases sub-sections (3 items)
- [X] T006 Add `id` attributes to Roles sub-sections (3 items)
- [X] T007 Add `id` attributes to Process E2E sub-sections (2 items)
- [X] T008 Add `id` attributes to Guide sub-sections (3 items)
- [X] T009 Add sidebar markup (aside.sidebar + nav + ul with 5 sections + submenus)
- [X] T010 Add sidebar toggle button (.sidebar-toggle)
- [X] T011 Add sidebar overlay div (#sidebar-overlay)

## Phase 3: CSS - Sidebar Styles

- [X] T012 `.sidebar` - Fixed left, 280px, full height, translateX transition
- [X] T013 `.sidebar__header` - Title + close button
- [X] T014 `.sidebar__nav` - Scrollable nav area
- [X] T015 `.sidebar__section-btn` - Section toggle buttons with arrow
- [X] T016 `.sidebar__submenu` - Expandable with max-height transition
- [X] T017 `.sidebar__link` - Sub-section links with hover/active states
- [X] T018 `.sidebar-toggle` - Fixed hamburger button (mobile only)
- [X] T019 `.sidebar-overlay` - Dark overlay for mobile
- [X] T020 Desktop (>1024px) layout: sidebar visible, main content margin-left
- [X] T021 Mobile (<1024px) layout: sidebar hidden, toggle visible, overlay active

## Phase 4: JS - Sidebar Logic

- [X] T022 Sidebar object with init, open, close methods
- [X] T023 Toggle button click handler
- [X] T024 Close button (X) click handler
- [X] T025 Escape key handler
- [X] T026 Overlay click handler
- [X] T027 Section toggle buttons (aria-expanded, expand/collapse submenu)
- [X] T028 Link click handler (close sidebar on mobile)
- [X] T029 Scroll spy via IntersectionObserver
- [X] T030 Desktop auto-open on init
- [X] T031 Resize handler

## Phase 5: Testing & Polish

- [ ] T032 [P] Verify sidebar renders on all 5 main sections
- [ ] T033 [P] Test section expand/collapse
- [ ] T034 [P] Test sub-section link navigation (smooth scroll)
- [ ] T035 [P] Test scroll spy highlights active section
- [ ] T036 [P] Test mobile toggle (hamburger open/close)
- [ ] T037 [P] Test overlay + Escape key close
- [ ] T038 [P] Test keyboard navigation (Tab, Enter, Escape)
- [ ] T039 [P] Test ARIA labels and roles
- [ ] T040 [P] Test responsive: desktop sidebar visible, mobile hidden
- [ ] T041 [P] Verify no layout breakage with progress bar and existing styles

## Notes

- [P] tasks can run in parallel
- Scroll spy rootMargin: -30% 0px -50% 0px
- Sidebar width: 280px
- Breakpoint: 1024px (not 768px - sidebar needs more space)
- All CSS uses variables.css design tokens
