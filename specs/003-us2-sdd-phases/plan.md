# Implementation Plan: SDD Phases - Interactive Phase Explorer

**Branch**: `003-us2-sdd-phases` | **Date**: 2026-05-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-us2-sdd-phases/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Implement the "SDD Phases" section — an interactive phase explorer showing the 5 phases of Spec Driven Development (Specify, Clarify, Plan, Tasks, Implement). Each phase has a selectable card with summary info, an expandable detail panel with artifact examples and tips, and a connected SVG flow diagram. Reuses the US1 design system and integrates into `src/index.html`.

## Technical Context

**Language/Version**: HTML5, CSS3, Vanilla JavaScript (ES6+)
**Primary Dependencies**: None — reuses `src/css/variables.css`, `src/css/reset.css` from US1
**Storage**: None — session-only state via in-memory JS variables
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge — last 2 versions)
**Project Type**: Static web application (additional section on existing page)
**Performance Goals**: < 50 KB additional bundle, < 2s load on 3G, Lighthouse accessibility ≥ 95
**Constraints**: No third-party libraries; SVG inline for diagram; CSS animations for flow; shares index.html with US1
**Scale/Scope**: Single section — extends the page built in US1

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Vanilla-First | ✅ Pass | Native DOM APIs, SVG inline — no frameworks |
| II. Semantic HTML & Accessible | ✅ Pass | HTML5 semantic elements, ARIA labels, keyboard nav, diagram text alternative |
| III. Professional CSS Architecture | ✅ Pass | Reuses variables.css, new phases.css with BEM-like naming |
| IV. Feature Branch & PR Workflow | ✅ Pass | Working on `003-us2-sdd-phases`, PR required for merge |
| V. CI/CD via GitHub Actions | ✅ Pass | Workflow will validate on PR; this feature complies |

## Project Structure

### Documentation (this feature)

```text
specs/003-us2-sdd-phases/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── css/
│   ├── variables.css        # [US1] Design system — reused
│   ├── reset.css            # [US1] Reset — reused
│   ├── hero.css             # [US1] Hero section — unchanged
│   └── phases.css           # [US2] Phases section styles (NEW)
├── js/
│   ├── hero.js              # [US1] Hero interactivity — unchanged
│   └── phases.js            # [US2] Phase cards + flow diagram logic (NEW)
├── assets/
│   └── icons/               # [US1] Icons — reused for phase indicators
└── index.html               # [US1+US2] Page — phases section appended
```

**Structure Decision**: Extends the existing single-project static web structure. New files: `phases.css`, `phases.js`. `index.html` gets a new `<section>` appended after the hero. This pattern scales for US3, US4, US5 — each adds its own CSS/JS pair.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations. All constitution principles are satisfied.
