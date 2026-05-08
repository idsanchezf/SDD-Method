# Implementation Plan: Quality Gates Interactivos

**Branch**: `017-quality-gates` | **Date**: 2026-05-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from US8

## Summary

Extender el diagrama de proceso E2E (US4) para que los quality gates sean interactivos: al hacer clic se abre un panel con detalles del gate, criterios de verificación, roles responsables, modo "Simular fallo" con remediaciones, y persistencia del estado de exploración en localStorage.

## Technical Context

**Language/Version**: HTML5, CSS3, Vanilla JavaScript (ES6+)  
**Primary Dependencies**: Ninguna (sin frameworks ni librerías externas)  
**Storage**: localStorage (clave `sdd-gates-progress`)  
**Testing**: N/A (proyecto estático, sin test suite automatizada)  
**Target Platform**: Navegadores modernos (Chrome, Firefox, Safari, Edge)  
**Project Type**: Static web app (landing page informativa)  
**Performance Goals**: Panel responsive < 200ms de apertura, sin reflows  
**Constraints**: Vanilla JS only, WCAG AA, mobile-first responsive, sin build steps  
**Scale/Scope**: Extiende el SVG diagrama existente (~12 gates)

## Constitution Check

### Gate I: Vanilla-First (NON-NEGOTIABLE)
- **Status**: PASS — toda la interactividad será vanilla JS (ES6+), sin frameworks
- **Evidence**: ProcessDiagram ya usa vanilla JS; el nuevo panel seguirá mismo patrón

### Gate II: Semantic HTML & Accessible by Default
- **Status**: PASS — panel usará `role="dialog"`, `aria-labelledby`, keyboard navigation (Escape para cerrar, Tab trap), `aria-live` para anuncios
- **Evidence**: Patrón existente en walkthrough.js y constitution.js

### Gate III: Professional CSS Architecture
- **Status**: PASS — CSS con custom properties de `variables.css`, BEM naming, responsive con media queries mobile-first
- **Evidence**: process.css ya sigue este patrón

### Gate IV: Feature Branch & PR Workflow (NON-NEGOTIABLE)
- **Status**: PASS — rama `017-quality-gates` existente, PR requerido
- **Note**: Branch `017-quality-gates` deviates from `feat/<description>` per constitution §Governance (amendment required).
  This naming scheme (`###-feature-name`) predates the constitution and is used consistently across all feature branches.
  **Resolution**: File constitution amendment PR to add `###-feature-name` as an accepted alternative pattern.

### Gate V: CI/CD via GitHub Actions
- **Status**: PASS — sin impacto en CI/CD existente

**Result**: ALL GATES PASS — proceder a Phase 0

### Post-Design Re-check

- **Gate I (Vanilla-First)**: GatePanel class en vanilla JS, sin frameworks → PASS
- **Gate II (Accessibility)**: Panel usa `role="dialog"`, `aria-labelledby`, keyboard Escape → PASS
- **Gate III (CSS Architecture)**: Clases BEM en gate-panel.css, custom properties → PASS
- **Gate IV (Branch/PR)**: Rama existente, sin cambios estructurales → PASS
- **Gate V (CI/CD)**: Sin impacto → PASS

## Project Structure

### Documentation (this feature)

```text
specs/017-quality-gates/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (UI contracts — gate panel API)
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── css/
│   ├── process.css          # MODIFY: gate panel + simulación styles
│   └── [variables.css]      # existing
├── js/
│   ├── process-diagram.js   # MODIFY: click handler → dispatch gate:select
│   ├── gate-panel.js        # CREATE: GatePanel + GateProgress classes (merged)
│   ├── data/
│   │   └── quality-points.js # existing (extended with name, roles, remediation, docLinks)
│   └── [section-nav.js]     # NOT MODIFIED (gate-panel is inside #process-end-to-end)
├── index.html               # MODIFY: add script refs, panel container
└── [layout data files]      # existing
```

**Structure Decision**: Single web app — extiende la estructura existente de `src/css/`, `src/js/`, `src/index.html`

## Complexity Tracking

*No violations to justify. All gates pass.*
