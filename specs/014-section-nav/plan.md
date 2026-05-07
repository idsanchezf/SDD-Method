# Implementation Plan: Menú de navegación lateral global

**Branch**: `014-section-nav` | **Date**: 2026-05-07 | **Spec**: `specs/014-section-nav/spec.md`
**Input**: Feature specification from `/specs/014-section-nav/spec.md`

## Summary

Reemplazar los menús internos por sección con un **menú lateral global colapsable** (sidebar) que lista las 5 secciones principales. Cada sección tiene un submenú expandible con sus sub-secciones. El sidebar es visible permanentemente en desktop y se oculta detrás de un toggle hamburger en móvil. Incluye scroll spy para resaltar la sección activa.

## Technical Context

**Language/Version**: HTML5, CSS3, Vanilla JavaScript (ES6+)
**Primary Dependencies**: Ninguna (vanilla web technologies)
**Storage**: N/A (static site)
**Testing**: Manual testing
**Target Platform**: Web browser (GitHub Pages static hosting)
**Constraints**: No frameworks, vanilla JS, semantic HTML, CSS custom properties, WCAG AA

## Constitution Check

| Constitution Principle | Status | Notes |
|------------------------|--------|-------|
| I. Vanilla-First | ✓ PASS | Solo HTML5, CSS3, Vanilla JS |
| II. Semantic HTML & Accessible | ✓ PASS | `aside` landmark, `nav` ARIA, `aria-expanded`, keyboard navigable |
| III. Professional CSS Architecture | ✓ PASS | CSS custom properties desde variables.css, diseño responsive |
| IV. Feature Branch & PR Workflow | ✓ PASS | Branch: `014-section-nav`, PR requerido |
| V. CI/CD via GitHub Actions | ✓ PASS | Sin cambios en CI existente |

## Project Structure

### Documentation

```text
specs/014-section-nav/
├── spec.md       # Feature specification (updated)
├── plan.md       # This file (updated)
└── tasks.md      # Task breakdown (updated)
```

### Source Code

```text
src/
├── index.html              # + Sidebar markup, + IDs a sub-secciones
├── css/
│   └── section-nav.css     # REWRITTEN: Sidebar styles
└── js/
    └── section-nav.js      # REWRITTEN: Sidebar logic
```

## Phases

### Phase 0: Research
- Analyzed 5 main sections and their sub-sections
- IDs added to all sub-sections for anchor navigation
- Sidebar breakpoint: 1024px

### Phase 1: Design
- Sidebar: fixed left, 280px wide, full height
- Desktop: always visible, main content gets margin-left: 280px
- Mobile: hidden behind hamburger toggle, overlay closes on click
- Sub-menus: expand/collapse with rotate arrow animation
- Scroll spy: IntersectionObserver highlights active section

### Phase 2: HTML + CSS + JS
All implemented in a single iteration.

## Complexity Tracking

No constitution violations detected.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |

## Next Steps

1. Review and test sidebar behavior in browser
2. Commit changes and create PR
3. Verify scroll spy works across all sections
4. Verify mobile toggle, overlay, and keyboard navigation
