# Implementation Plan: Uso Práctico de SDD

**Branch**: `005-us5-uso-practico` | **Date**: 2026-05-06 | **Spec**: [spec.md](../spec.md)

**Input**: Feature specification from `/specs/005-us5-uso-practico/spec.md`

## Summary

Implementar una guía interactiva paso a paso para aplicar la metodología SDD, ejemplos prácticos (Greenfield/Brownfield) basados en US4, y plantillas descargables. Todo en Vanilla JS (Constitución Principio I) con accesibilidad WCAG AA (Principio II).

## Technical Context

<!--
  ACTION REQUIRED: Technical details for US5
-->

**Language/Version**: Vanilla JavaScript (ES6+), HTML5, CSS3  
**Primary Dependencies**: Reuse US4 `js/data/case-studies.js` (caseStudies data)  
**Storage**: localStorage (native Web Storage API)  
**Testing**: Manual (keyboard, screen reader, mobile) + GitHub Actions (linting)  
**Target Platform**: Static web application (GitHub Pages)  
**Project Type**: Web application (frontend only, no backend)  
**Performance Goals**: Guide loads in <2s, downloads in <5s (SC-002)  
**Constraints**: No frameworks (Constitución I), WCAG AA compliance (Constitución II), JSZip as approved 3rd-party library  
**Scale/Scope**: 100 concurrent users (SC-004), 90% completion in 15min (SC-001)  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|-----------|-------|--------|
| I. Vanilla JS | No frameworks (React/Vue/etc.) - Blob, localStorage native | ✅ PASS |
| II. Semantic HTML | `<button>`, `<section>`, ARIA labels, keyboard access | ✅ PASS (follows US2/US4) |
| III. CSS Architecture | Reuse US2/US4 custom properties, mobile-first | ✅ PASS |
| IV. Feature Branch | Branch `005-us5-uso-practico` | ✅ PASS |
| V. CI/CD | GitHub Actions validates linting | ✅ PASS |

## Project Structure

### Documentation (this feature)

```
specs/005-us5-uso-practico/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```
src/
├── js/
│   ├── guide.js           # Interactive guide logic (NEW)
│   ├── download-manager.js # Template download functionality (NEW)
│   └── data/
│       └── case-studies.js # Reused from US4 (caseStudies data)
└── css/
    └── guide.css          # Styles for interactive guide (NEW)
```

**Structure Decision**: Single project (static web app). Reuses US4 infrastructure.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|------------|------------|-------------------------------------|
| JSZip (3rd party) | Required for .zip download (FR-004) | Individual .md downloads poor UX (multiple downloads) |
| localStorage | Progress tracking across sessions | sessionStorage cleared on tab close, cookies complex |

## Phase 0: Research ✅ COMPLETE

See [research.md](../specs/005-us5-uso-practico/research.md) for full findings.

**Key Decisions Made**:
1. **Downloads**: Blob API (individual .md) + JSZip (combined .zip)
2. **Progress Storage**: localStorage (`sdd-guide-progress`)
3. **WCAG AA**: Follow US2/US4 patterns (keyboard nav, ARIA, color contrast)

## Phase 1: Design ✅ COMPLETE

See [data-model.md](../specs/005-us5-uso-practico/data-model.md) for entity definitions.

**Entities Defined**:
1. **InteractiveGuide**: currentPhase, progress, checklists, localStorage persistence
2. **PracticalExample**: Greenfield/Brownfield types, reuses US4 caseStudies
3. **Template**: spec/plan/tasks types, .md/.zip download formats

**Contracts**: Not needed (static site, no external APIs)

See [quickstart.md](../specs/005-us5-uso-practico/quickstart.md) for developer guide.

## Phase 2: Implementation Tasks

<!--
  ACTION REQUIRED: Create tasks.md with `/speckit.tasks` command
  This section will be filled automatically by the tasks command.
-->

### Task Generation Notes:
- Tasks will be created with `/speckit.tasks` command
- Follow US4 patterns (process-diagram.js, walkthrough.js)
- Prioritize: P1 (Guide) → P2 (Examples) → P3 (Templates)

### Estimated Task Breakdown:

**P1: Interactive Guide (Priority 1)**
- [ ] T001: Create `js/guide.js` - Interactive guide logic (Vanilla JS)
- [ ] T002: Create `css/guide.css` - Guide styles (reuse US2/US4 variables)
- [ ] T003: Implement phase navigation (Next/Back buttons)
- [ ] T004: Implement localStorage progress saving (`sdd-guide-progress`)
- [ ] T005: Add WCAG AA features (keyboard nav, ARIA labels, `aria-live`)

**P2: Practical Examples (Priority 2)**
- [ ] T006: Integrate US4 `caseStudies` data (import from `js/data/case-studies.js`)
- [ ] T007: Render Greenfield/Brownfield examples (reuse US4 render patterns)
- [ ] T008: Add "Ver artefactos generados" download links (Blob API)

**P3: Template Downloads (Priority 3)**
- [ ] T009: Create `js/download-manager.js` - Download functionality
- [ ] T010: Implement individual .md downloads (Blob + `createObjectURL()`)
- [ ] T011: Implement .zip download (JSZip - requires PR approval per Constitution)
- [ ] T012: Create template content (spec-template.md, plan-template.md, tasks-template.md)

**Testing & Polish**
- [ ] T013: Test keyboard-only navigation (Tab, Enter, Space)
- [ ] T014: Test screen reader compatibility (NVDA/JAWS)
- [ ] T015: Test mobile responsiveness (Chrome DevTools)
- [ ] T016: Run GitHub Actions validation (linting, no console errors)

## Integration with US4

- **Data Reuse**: Import `caseStudies` from `js/data/case-studies.js` (already loaded globally)
- **Visual Reference**: Use US4 `process-diagram.js` SVG as visual guide in background
- **Accessibility**: Copy ARIA patterns from `process-diagram.js` and `walkthrough.js`
- **CSS Variables**: Reuse `--color-*`, `--spacing-*`, `--typography-*` from US2/US4

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| JSZip approval delay | P3 templates blocked | Implement individual .md downloads first (FR-004 partially met) |
| localStorage quota exceeded | Progress lost | Graceful fallback, inform user |
| WCAG AA complexity | Development time | Reuse US2/US4 patterns, test early |

## Success Criteria Mapping

| Criterion | Measurement | Implementation |
|------------|-------------|----------------|
| SC-001: 90% users complete in <15min | Analytics/stopwatch test | Guide must be simple, clear Next/Back |
| SC-002: Downloads in <5s | Browser DevTools Network tab | Optimize .md content, lazy load JSZip |
| SC-003: 85% understand SDD application | Post-example survey | Clear examples, easy artifact downloads |
| SC-004: 100 concurrent users | Load testing (if needed) | Static site, minimal JS, efficient DOM updates |
| SC-005: WCAG AA compliance | Accessibility audit (axe, Lighthouse) | Follow US2/US4 patterns, test keyboard/screen reader |

---

**Plan Version**: 1.0.0 | **Created**: 2026-05-06 | **Author**: AI Assistant  
**Next Step**: Run `/speckit.tasks` to generate detailed task list in `tasks.md`
