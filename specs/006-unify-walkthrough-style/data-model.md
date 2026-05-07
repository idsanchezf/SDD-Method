# Data Model: Unificar Look & Feel Walkthrough US4 con Guía US5

**Date**: 2026-05-07

## Entities

### WalkthroughState
Representa el estado actual del walkthrough interactivo.

| Field | Type | Description |
|-------|------|-------------|
| currentCase | string | "greenfield" or "brownfield" |
| currentPhaseIndex | number | 0-4 (Specify to Implement) |
| progress | number | 0-100 percentage |
| userDecisions | object | Map of phaseId → selectedOption |
| visitedPhases | array | List of phaseIds visited |
| isComplete | boolean | Walkthrough finished flag |

**Validation**:
- currentPhaseIndex must be 0-4
- progress must be 0-100

### PhaseChecklist
Representa el checklist de verificación por cada fase.

| Field | Type | Description |
|-------|------|-------------|
| phaseId | string | Phase identifier (specify/clarify/plan/tasks/implement) |
| phaseName | string | Human-readable name |
| completed | boolean | Phase fully completed |
| items | array | List of checklist items |

**Checklist Item**:
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| text | string | Description |
| checked | boolean | Completion status |

### WalkthroughUI
Configuración de la interfaz visual del walkthrough.

| Field | Type | Description |
|-------|------|-------------|
| headerVisible | boolean | Show header with case selector |
| progressTextVisible | boolean | Show percentage text |
| phaseNavVisible | boolean | Show phase pills navigation |
| checklistVisible | boolean | Show checklist per phase |
| containerStyle | object | CSS properties for container |

## State Transitions

### Phase Navigation
```
Specify (0) → Clarify (1) → Plan (2) → Tasks (3) → Implement (4)
     ↑___________|___________|___________|___________↓
```

### Progress Calculation
- Progress updates based on: currentPhaseIndex, visitedPhases.length, checklist completion

## Relationships

- WalkthroughState → contains PhaseChecklist (per phase)
- WalkthroughState → uses WalkthroughUI (for styling config)
- Both persist to localStorage with key `sdd-walkthrough-progress`