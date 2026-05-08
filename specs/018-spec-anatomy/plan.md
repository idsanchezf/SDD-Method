# Implementation Plan: Anatomía y escritura de Specs SDD

**Branch**: `019-spec-anatomy` | **Date**: 2026-05-08 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/018-spec-anatomy/spec.md`

## Summary

Crear una nueva sección educativa en el sitio SDD Method que enseñe la estructura completa de un spec.md (anatomía), el formato Given/When/Then para acceptance criteria, técnicas sistemáticas de descubrimiento de edge cases, y ejemplos anotados de specs bien y mal escritas. Se implementa como HTML semántico + CSS + Vanilla JS, siguiendo la misma arquitectura de cards unificadas del resto del sitio.

## Technical Context

**Language/Version**: Vanilla JavaScript ES6+  
**Primary Dependencies**: Ninguna (Vanilla-First por constitución)  
**Storage**: N/A (contenido estático, sin backend)  
**Testing**: Verificación visual manual + validación de accesibilidad WCAG AA + Lighthouse  
**Target Platform**: Navegadores modernos (Chrome, Firefox, Safari, Edge última versión)  
**Project Type**: Sección educativa estática en sitio web existente  
**Performance Goals**: Carga completa en <2s (ya especificado en SC-005)  
**Constraints**: WCAG AA, mobile-first responsive, sin frameworks JS, sin librerías externas  
**Scale/Scope**: Una nueva sección HTML + archivo CSS + archivo JS dentro del sitio existente

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Vanilla-First (NON-NEGOTIABLE) | ✅ PASS | Sin frameworks; Vanilla JS para expandir/colapsar, tabs y vista side-by-side |
| II. Semantic HTML & Accessible | ✅ PASS | Uso de `section`, `article`, `details`/`summary`, `figure`, `figcaption`, roles ARIA |
| III. Professional CSS Architecture | ✅ PASS | CSS modular con custom properties, mobile-first, sin inline styles |
| IV. Feature Branch & PR Workflow (NON-NEGOTIABLE) | ✅ PASS | Rama `019-spec-anatomy`, PR con revisión |
| V. CI/CD via GitHub Actions | ✅ PASS | Validación estándar del proyecto |

**Gate Result**: ✅ PASS — Todas las verificaciones constitucionales pasan sin necesidad de justificaciones de complejidad.

## Project Structure

### Documentation (this feature)

```text
specs/018-spec-anatomy/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── index.html           # ← Nueva sección: <section class="spec-anatomy-section">
├── css/
│   └── spec-anatomy.css # ← Nuevo archivo: estilos de la sección
└── js/
    └── spec-anatomy.js  # ← Nuevo archivo: interactividad (expand/colapsar, tabs, side-by-side)
```

**Structure Decision**: Se sigue el mismo patrón del sitio existente: una sección en `index.html`, su CSS en `src/css/`, su JS en `src/js/`. Consistente con constitution, phases, roles, etc.

## Complexity Tracking

No se requiere — Constitution Check pasó sin violaciones.
