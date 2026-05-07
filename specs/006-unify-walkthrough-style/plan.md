# Implementation Plan: Unificar Look & Feel Walkthrough US4 con Guía US5

**Branch**: `006-unify-walkthrough-style` | **Date**: 2026-05-07 | **Spec**: `specs/006-unify-walkthrough-style/spec.md`
**Input**: Feature specification from `/specs/006-unify-walkthrough-style/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Actualizar el walkthrough de US4 para adoptar el look & feel de la guía US5, logrando consistencia visual entre ambas secciones. Incluye: banner de prerrequisito, header con selector de caso, progress bar con porcentaje, navegación por fases pills, y checklist por fase.

## Technical Context

**Language/Version**: HTML5, CSS3, Vanilla JavaScript (ES6+)  
**Primary Dependencies**: Ninguna (vanilla web technologies per constitution)  
**Storage**: N/A (static site, localStorage for progress)  
**Testing**: Manual testing  
**Target Platform**: Web browser (GitHub Pages static hosting)  
**Project Type**: Web application (static site - enhancement)  
**Performance Goals**: No changes to existing performance profile  
**Constraints**: No frameworks (React/Vue/Angular), solo vanilla JS; semantic HTML; CSS custom properties; accesible WCAG AA  
**Scale/Scope**: 3 archivos modificados (HTML/CSS/JS), sin nueva dependencia

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Constitution Principle | Status | Notes |
|------------------------|--------|-------|
| I. Vanilla-First | ✓ PASS | Solo HTML5, CSS3, Vanilla JS (ES6+) - sin frameworks |
| II. Semantic HTML & Accessible | ✓ PASS | Usar semantic HTML5, ARIA cuando necesario, WCAG AA |
| III. Professional CSS Architecture | ✓ PASS | CSS custom properties en variables.css, mobile-first responsive |
| IV. Feature Branch & PR Workflow | ✓ PASS | Branch: `006-unify-walkthrough-style`, PR requerido para merge |
| V. CI/CD via GitHub Actions | ✓ PASS | GitHub Actions workflow para linting y despliegue a GitHub Pages |

## Project Structure

### Documentation (this feature)

```text
specs/006-unify-walkthrough-style/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── css/
│   ├── variables.css    # Design system (existing)
│   ├── reset.css       # CSS reset (existing)
│   ├── guide.css       # US5 guide styles (reference)
│   └── process.css     # US4 process styles (TO UPDATE)
├── js/
│   ├── guide.js        # US5 guide logic (reference)
│   └── walkthrough.js  # US4 walkthrough logic (TO UPDATE)
└── index.html          # Main HTML (TO UPDATE)
```

**Structure Decision**: Modificar archivos existentes en lugar de crear nuevos. Reutilizar guide.js y guide.css como referencia visual. Extender walkthrough.js con nuevos métodos.

## Complexity Tracking

No constitution violations detected. All design decisions align with Constitution Principles I-V.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |

## Phase 0: Research Complete

✓ Research completed and documented in `research.md`
✓ No NEEDS CLARIFICATION required - spec was complete
✓ Technology decisions documented with rationale

## Phase 1: Design Complete

✓ Data model defined in `data-model.md` with entities: WalkthroughState, PhaseChecklist, WalkthroughUI
✓ Quickstart guide created in `quickstart.md` with step-by-step implementation instructions
✓ Agent context updated (AGENTS.md points to this plan)

## Next Steps (Phase 2 - Tasks)

Run `/speckit.tasks` to generate task breakdown for implementation.

Tasks will include:
1. Analyze existing guide.js and walkthrough.js code
2. Add prerrequisito banner to index.html
3. Update walkthrough.js with new UI methods (header, phase nav, checklist, localStorage)
4. Update process.css with new walkthrough styles
5. Integration testing with existing walkthrough features
6. Accessibility audit
7. Visual consistency verification