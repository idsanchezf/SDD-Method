# Implementation Plan: Constitución SDD

**Branch**: `015-constitucion-sdd` | **Date**: 2026-05-07 | **Spec**: `specs/015-constitucion-sdd/spec.md`
**Input**: Feature specification from `/specs/015-constitucion-sdd/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Agregar sección "Constitución SDD" que explica los 5 principios constitucionales con detalle expandible, e implementar Constitution Checker interactivo con verificación por fase, resumen global de progreso y persistencia en localStorage.

## Technical Context

**Language/Version**: HTML5, CSS3, Vanilla JavaScript (ES6+)
**Primary Dependencies**: Ninguna (vanilla web technologies per constitution)
**Storage**: localStorage para estado del checker
**Testing**: Manual testing
**Target Platform**: Web browser (GitHub Pages static hosting)
**Project Type**: Web application (static site - new section + interactive component)
**Performance Goals**: No changes to existing performance profile
**Constraints**: No frameworks; solo vanilla JS; semantic HTML; CSS custom properties; WCAG AA
**Scale/Scope**: 3-4 archivos nuevos (HTML section, CSS, JS), modificación de index.html

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Constitution Principle | Status | Notes |
|------------------------|--------|-------|
| I. Vanilla-First | ✓ PASS | Solo HTML5, CSS3, Vanilla JS (ES6+) - sin frameworks |
| II. Semantic HTML & Accessible | ✓ PASS | Secciones semánticas, `aria-expanded` para checkboxes, keyboard nav |
| III. Professional CSS Architecture | ✓ PASS | CSS custom properties desde variables.css, mobile-first responsive |
| IV. Feature Branch & PR Workflow | ✓ PASS | Branch: `015-constitucion-sdd`, PR requerido para merge |
| V. CI/CD via GitHub Actions | ✓ PASS | GitHub Actions workflow para linting y despliegue a GitHub Pages |

## Project Structure

### Documentation (this feature)

```text
specs/015-constitucion-sdd/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── index.html           # ADD constitution section markup
├── css/
│   └── constitution.css # NEW: Constitution section + checker styles
└── js/
    └── constitution.js  # NEW: Constitution checker logic
```

**Structure Decision**: Nuevos archivos específicos para la funcionalidad (constitution.css, constitution.js) + modificación de index.html para agregar la sección. Sigue el patrón de secciones existentes (hero.css/hero.js, phases.css/phases.js, etc.).

## Complexity Tracking

No constitution violations detected. All design decisions align with Constitution Principles I-V.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |

## Phase 0: Research Complete

✓ No NEEDS CLARIFICATION required - spec was complete
✓ Principles-per-phase mapping defined
✓ localStorage pattern confirmed (same as walkthrough checklist)
✓ Design decisions documented with rationale

## Phase 1: Design Complete

✓ Data model defined in `data-model.md` with entities: ConstitutionalPrinciple, ConstitutionState, PhasePrinciple
✓ Quickstart guide created in `quickstart.md` with step-by-step implementation instructions
✓ Agent context updated (AGENTS.md points to this plan)

## Next Steps (Phase 2 - Tasks)

Run `/speckit.tasks` to generate task breakdown for implementation.

Tasks will include:
1. Create constitution section HTML in index.html (5 principle cards)
2. Create constitution.css with principle cards, checker, and summary styles
3. Create constitution.js with PrincipleMap data, checker logic, localStorage persistence
4. Constitution Checker: phase selector, checkboxes, verify button, PASS/FAIL verdict
5. Summary panel: global progress, phase status indicators
6. Integration testing with existing site navigation
7. Accessibility audit
