# Implementation Plan: Menú de navegación interna por sección

**Branch**: `014-section-nav` | **Date**: 2026-05-07 | **Spec**: `specs/014-section-nav/spec.md`
**Input**: Feature specification from `/specs/014-section-nav/spec.md`

**Note**: This template follows the Spec Kit workflow.

## Summary

Agregar un menú de navegación interna dentro de cada sección principal (Hero, Phases, Roles, Process E2E, Guide) que detecte sub-secciones mediante `data-section` attributes y permita saltar entre ellas con scroll spy, scroll suave, y adaptación a móvil como selector desplegable.

## Technical Context

**Language/Version**: HTML5, CSS3, Vanilla JavaScript (ES6+)
**Primary Dependencies**: Ninguna (vanilla web technologies per constitution)
**Storage**: N/A (static site, no persistence needed)
**Testing**: Manual testing
**Target Platform**: Web browser (GitHub Pages static hosting)
**Project Type**: Web application (static site - enhancement)
**Performance Goals**: No changes to existing performance profile
**Constraints**: No frameworks (React/Vue/Angular), solo vanilla JS; semantic HTML; CSS custom properties; WCAG AA
**Scale/Scope**: 3 archivos nuevos (section-nav.js, section-nav.css), modificaciones en index.html

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Constitution Principle | Status | Notes |
|------------------------|--------|-------|
| I. Vanilla-First | ✓ PASS | Solo HTML5, CSS3, Vanilla JS (ES6+) - sin frameworks |
| II. Semantic HTML & Accessible | ✓ PASS | Usar `nav` ARIA landmark, `role="list"`, `role="link"`, scroll spy accesible |
| III. Professional CSS Architecture | ✓ PASS | CSS custom properties en variables.css, mobile-first responsive |
| IV. Feature Branch & PR Workflow | ✓ PASS | Branch: `014-section-nav`, PR requerido para merge |
| V. CI/CD via GitHub Actions | ✓ PASS | GitHub Actions workflow para linting y despliegue a GitHub Pages |

## Project Structure

### Documentation (this feature)

```text
specs/014-section-nav/
├── spec.md              # Feature specification
└── plan.md              # This file
└── tasks.md             # Task breakdown
```

### Source Code (repository root)

```text
src/
├── index.html           # Add data-section attributes to sub-sections
├── css/
│   └── section-nav.css  # NEW: Section navigation menu styles
└── js/
    └── section-nav.js   # NEW: Section navigation menu logic
```

## Complexity Tracking

No constitution violations detected.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |

## Phase 0: Research Complete

✓ Research completed — explored all 5 main sections and their sub-sections
✓ Technology decisions documented with rationale

### Sub-section inventory for data-section attributes

**Hero** (`#hero`, class `.hero`):
- `hero__definition` → "¿Qué es SDD?"
- `hero__principles` → "Principios"
- `hero__benefits` → "Beneficios"
- `hero__comparison` → "Comparación"
- `hero__checklist` → "Verifica tu comprensión"

**Phases** (`#phases`):
- `phases-container > h2` → "Las 5 Fases" (section title)
- `.phases-grid` → "Fases" (the 5 phase cards)
- `.phase-details` → "Detalle de fases"
- `.flow-diagram` → "Diagrama de flujo"

**Roles** (`#roles`):
- `.roles-subsection__header--human` → "Roles Humanos"
- `.roles-subsection__header--ai` → "Roles de IA"
- `.collab-matrix` → "Matriz de Colaboración"

**Process E2E** (`#process-end-to-end`):
- `#process-heading` → "Proceso End-to-End"
- `#process-diagram-container` → "Diagrama de proceso"
- `.walkthrough-section` → "Recorrido Interactivo"

**Guide** (`#guide`):
- `#start-guide` → "Guía interactiva"
- `.guide__examples` → "Ejemplos Prácticos"
- `.guide__templates` → "Plantillas Descargables"

## Phase 1: Design Complete

### Data Model

- **SectionNav**: Class managing one section's menu. Properties: `sectionEl`, `items[]`, `currentActive`, `observer`, `isMobile`.
- **SectionNavConfig**: `{ sections: NodeList, mobileBreakpoint: 768 }`

### Key Design Decisions

1. **Sticky positioning**: Menu sticks to the left side of each section container on desktop
2. **Mobile adaptation**: `<select>` dropdown replaces vertical list below 768px
3. **Scroll spy**: Uses `IntersectionObserver` with `rootMargin` to detect active sub-section
4. **Data attributes**: Sub-sections marked with `data-section-nav="section-id"` and `data-section-title="Display Title"`
5. **Accessibility**: `nav` landmark with `aria-label`, `role="list"` and `role="link"` for items

## Phase 2: Implementation Tasks

See `tasks.md` for detailed task breakdown.
