# Data Model: Constitución SDD

**Phase**: 1 - Design
**Date**: 2026-05-07
**Status**: Complete

## Entities

### ConstitutionalPrinciple

Represents one of the 5 constitutional principles.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (e.g., `vanilla-first`, `semantic-html`) |
| name | string | Display name (e.g., "Vanilla-First") |
| shortName | string | Short name for badges (e.g., "Vanilla First") |
| description | string | One-line description of the principle |
| purpose | string | Why this principle exists |
| appliesTo | string[] | Array of phase IDs where this principle applies |
| violationConsequences | string | What happens if the principle is violated |
| complianceExamples | string[] | Examples of compliance |
| icon | string | SVG or emoji identifier |
| accentColor | string | CSS color variable for the principle |

### PhasePrinciple

Association between a phase and its applicable principles (denormalized for checker).

| Field | Type | Description |
|-------|------|-------------|
| phaseId | string | Phase identifier (`specify`, `clarify`, `plan`, `tasks`, `implement`) |
| principleId | string | Principle identifier |
| checked | boolean | Whether user has marked this principle as fulfilled |

### ConstitutionState

Persistent state of the Constitution Checker.

| Field | Type | Description |
|-------|------|-------------|
| phases | Map<string, Map<string, boolean>> | Phase ID → { principleId: checked } |
| activePhase | string | Currently selected phase in the checker |
| lastUpdated | timestamp | When state was last modified |

## Validation Rules

- A phase PASSES if ALL its applicable principles are checked
- A phase FAILS if ANY applicable principle is unchecked
- A phase is PENDING if no principles have been checked yet
- Global progress = (total checked principles across all phases) / (total applicable principles across all phases)

## State Transitions

```
IDLE → CHECKING (user selects phase)
CHECKING → VERIFIED (user clicks verify)
VERIFIED → CHECKING (user toggles a checkbox after verification)
any → RESET (user clicks reset)
```
