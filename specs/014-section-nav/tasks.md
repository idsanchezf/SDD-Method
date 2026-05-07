---
description: "Task list for Menú de navegación interna por sección"
---

# Tasks: Menú de navegación interna por sección

**Input**: Design documents from `/specs/014-section-nav/`
**Prerequisites**: plan.md, spec.md
**Dependencies**: index.html (existing sections), variables.css (design tokens)

**Note**: This feature adds intra-section navigation menus to all 5 main sections.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Research & Analysis)

**Purpose**: Analyze existing code to understand implementation requirements

- [ ] T001 [P] Analyze `src/index.html` to identify all sub-sections and their HTML structure
- [ ] T002 [P] Analyze `src/css/variables.css` to identify design tokens to reuse
- [ ] T003 Analyze existing scroll behavior (hero.js progress bar IntersectionObserver) for scroll spy pattern

---

## Phase 2: Data Attributes in HTML

**Purpose**: Mark sub-sections with data-section-nav attributes for auto-detection

- [ ] T004 Mark Hero sub-sections: `hero__definition`, `hero__principles`, `hero__benefits`, `hero__comparison`, `hero__checklist`
- [ ] T005 Mark Phases sub-sections: phase cards container, phase details, flow diagram
- [ ] T006 Mark Roles sub-sections: roles humanos, roles IA, matriz de colaboración
- [ ] T007 Mark Process E2E sub-sections: diagrama, walkthrough
- [ ] T008 Mark Guide sub-sections: guía interactiva, ejemplos, plantillas
- [ ] T009 Add `src/css/section-nav.css` link and `src/js/section-nav.js` script to index.html

---

## Phase 3: CSS - Section Navigation Styles

**Purpose**: Create responsive styles for the section navigation menu

**Independent Test**: Menu renders correctly on desktop (vertical list) and mobile (select dropdown)

### Implementation

- [ ] T010 [P] Create `src/css/section-nav.css` - Base container and layout styles
- [ ] T011 [P] `src/css/section-nav.css` - Desktop vertical list styles (position: sticky, left side)
- [ ] T012 [P] `src/css/section-nav.css` - Active/completed item states using `var(--color-accent)`
- [ ] T013 [P] `src/css/section-nav.css` - Mobile select dropdown styles (< 768px)
- [ ] T014 `src/css/section-nav.css` - Scrollable menu when items exceed viewport height
- [ ] T015 `src/css/section-nav.css` - Focus and hover states for keyboard accessibility

---

## Phase 4: JS - SectionNav Class

**Purpose**: Implement the core SectionNav logic

**Independent Test**: SectionNav detects sub-sections, renders menu, handles click navigation and scroll spy

### Implementation

- [ ] T016 [P] Create `src/js/section-nav.js` - `SectionNav` class constructor and initialization
- [ ] T017 [P] `src/js/section-nav.js` - `detectSubsections()` method: read `data-section-nav` attributes
- [ ] T018 [P] `src/js/section-nav.js` - `render()` method: create DOM elements for menu (list or select)
- [ ] T019 [P] `src/js/section-nav.js` - `handleClick()` method: smooth scroll to sub-section + set active
- [ ] T020 [P] `src/js/section-nav.js` - `initScrollSpy()` method: IntersectionObserver for active tracking
- [ ] T021 [P] `src/js/section-nav.js` - `handleResize()` method: switch between list and select based on viewport
- [ ] T022 [P] `src/js/section-nav.js` - `init()` orchestrator: detect → render → scroll spy → resize handler
- [ ] T023 `src/js/section-nav.js` - Initialize SectionNav for all 5 sections on DOMContentLoaded

---

## Phase 5: Integration & Polish

**Purpose**: Ensure all components work together and meet quality standards

### Cross-Section Integration

- [ ] T024 [P] Test Hero section: Verify all 5 sub-sections appear in menu
- [ ] T025 [P] Test Phases section: Verify all sub-sections appear in menu
- [ ] T026 [P] Test Roles section: Verify all sub-sections appear in menu
- [ ] T027 [P] Test Process E2E section: Verify all sub-sections appear in menu
- [ ] T028 [P] Test Guide section: Verify all sub-sections appear in menu

### Scroll Spy Testing

- [ ] T029 [P] Test scroll spy: Scroll through sub-sections, verify active item updates
- [ ] T030 [P] Test click navigation: Click each item, verify smooth scroll + active state

### Mobile Testing

- [ ] T031 [P] Test mobile: Resize to < 768px, verify select dropdown appears
- [ ] T032 [P] Test mobile: Select option from dropdown, verify navigation works

### Accessibility Testing

- [ ] T033 [P] Test keyboard: Tab through menu items, verify focus visibility
- [ ] T034 [P] Test ARIA: Verify `nav` landmark, `aria-label`, `role="list"`, `role="link"` present
- [ ] T035 [P] Test screen reader: Verify sub-section list is announced

### Visual Consistency

- [ ] T036 [P] Verify menu uses design tokens from variables.css
- [ ] T037 [P] Verify no layout breakage on desktop, tablet, mobile
- [ ] T038 [P] Verify menu does not overlap with existing sidebar/progress bar

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies
- **Phase 2 (HTML)**: Depends on Phase 1
- **Phase 3 (CSS)**: Depends on Phase 2 (needs HTML structure for selectors)
- **Phase 4 (JS)**: Depends on Phase 2 (needs data-section-nav attributes)
- **Phase 5 (Integration)**: Depends on Phases 3-4

### Parallel Opportunities

- Phase 1 tasks T001-T002 can run in parallel
- Phase 3 tasks T010-T013 can run in parallel
- Phase 4 tasks T016-T022 can run in parallel

## Implementation Strategy

### Incremental Delivery

1. Complete Phase 1: Setup → Analysis complete
2. Complete Phase 2: HTML → All data attributes in place
3. Complete Phase 3: CSS → Menu styling complete
4. **STOP and VALIDATE**: Verify CSS renders correctly with HTML attributes
5. Complete Phase 4: JS → SectionNav class complete
6. Complete Phase 5: Integration → Full feature verified

### Commit Strategy

- Commit Phase 1-2: `git commit -m "[US14] Add data-section-nav attributes to index.html"`
- Commit Phase 3: `git commit -m "[US14] Add section-nav.css responsive styles"`
- Commit Phase 4: `git commit -m "[US14] Add SectionNav class with scroll spy"`
- Commit Phase 5: `git commit -m "[US14] Integration and polish"`

---

## Notes

- [P] tasks = different files, no dependencies
- All styling must use CSS custom properties from variables.css
- IntersectionObserver pattern already exists in hero.js for progress bar - reuse pattern
- Must not interfere with sidebar navigation (global menu)
- Accessibility is mandatory per constitution (WCAG AA)
- Scroll spy rootMargin: `-20% 0px -40% 0px` for reliable detection
