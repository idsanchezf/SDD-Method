# Implementation Plan: Flujo de Colaboración Humano-IA

**Branch**: `016-collaboration-flow` | **Date**: 2026-05-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/016-collaboration-flow/spec.md`

## Summary

Nueva sección interactiva "Flujo de Colaboración" que visualiza cómo humanos y asistentes de IA colaboran en las 5 fases de SDD. Incluye diagrama de fases con panel de detalle, biblioteca de prompts recomendados y panel de supervisión requerida con persistencia en localStorage.

## Technical Context

**Language/Version**: Vanilla JavaScript ES6+, HTML5, CSS3 (Custom Properties)  
**Primary Dependencies**: Ninguna — mismo stack que el resto del sitio  
**Storage**: localStorage (progreso de supervisión y prompts explorados)  
**Testing**: Verificación manual en navegador  
**Target Platform**: Navegadores modernos (Chrome, Firefox, Safari, Edge) con soporte ES6+  
**Project Type**: Sección de sitio web estático (frontend-only) — mismo patrón que constitution (US6)  
**Performance Goals**: Sin metas específicas — mismo estándar que el sitio existente  
**Constraints**: Stack constitucional (Vanilla JS, HTML semántico, CSS3, sin frameworks)  
**Scale/Scope**: Una nueva sección con 3 sub-componentes (diagrama, prompts, supervisión)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| I. Vanilla-First | ✅ PASS | Sin frameworks — toda lógica con vanilla JS |
| II. Semantic HTML & Accessible | ⚠️ GATE | Markup semántico y WCAG AA requeridos |
| III. CSS Architecture | ✅ PASS | CSS con custom properties, mobile-first |
| IV. Feature Branch & PR | ✅ PASS | Rama `016-collaboration-flow`, PR requerido |
| V. CI/CD | ✅ PASS | GitHub Actions validará en PR |

**Gate II note**: Diagrama interactivo debe ser accesible: keyboard navigation, aria-labels en SVG, screen-reader friendly.

## Project Structure

### Documentation (this feature)

```text
specs/016-collaboration-flow/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (not applicable — no external interfaces)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── index.html                   # Nueva sección + sidebar entry
├── css/
│   ├── variables.css
│   ├── reset.css
│   ├── hero.css
│   ├── phases.css
│   ├── roles.css
│   ├── process.css
│   ├── guide.css
│   ├── section-nav.css
│   ├── constitution.css
│   └── collab-flow.css          # NEW — estilos de la sección
├── js/
│   ├── hero.js
│   ├── phases.js
│   ├── roles.js
│   ├── data/
│   │   ├── case-studies.js
│   │   ├── phases-enhanced.js
│   │   ├── diagram-layout.js
│   │   ├── handoffs.js
│   │   ├── quality-points.js
│   │   └── roles-integration.js
│   ├── download-manager.js
│   ├── guide.js
│   ├── process-diagram.js
│   ├── walkthrough.js
│   ├── section-nav.js
│   ├── constitution.js
│   └── collab-flow.js           # NEW — lógica de diagrama, prompts, supervisión
```

**Structure Decision**: Misma estructura que las secciones existentes. Un nuevo CSS (`collab-flow.css`) y un nuevo JS (`collab-flow.js`). Sección insertada tras Constitución en el orden de navegación.

## Complexity Tracking

Sin violaciones constitucionales. No aplica.
