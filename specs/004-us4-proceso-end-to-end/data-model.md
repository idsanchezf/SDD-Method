# Data Model: End-to-End SDD Process

## Entities

### ProcessPhase (Extends US2 Fase SDD)

Represents a phase in the SDD process with enhanced handoff and quality data.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Phase identifier (specify, clarify, plan, tasks, implement) |
| order | number | Order in process (1-5) |
| name | string | Display name |
| description | string | Brief description (2-3 lines) |
| longDescription | string | Detailed description for expanded view |
| inputs | string[] | Required inputs for the phase |
| outputs | string[] | Produced outputs from the phase |
| duration | object | Estimated duration `{ greenfield: string, brownfield: string }` |
| roles | string[] | Participating roles (slugs matching US3) |
| tips | string[] | Practical tips for the phase |
| artifacts | string[] | Example artifact names |
| qualityPoints | QualityPoint[] | Quality checkpoints for the phase |
| handoffs | Handoff[] | Handoffs from this phase to next |

### QualityPoint

Represents a quality checkpoint within a phase.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (e.g., "spec-review-complete") |
| description | string | What this quality point checks |
| verificationCriteria | string | How to verify this quality point passes |
| mandatory | boolean | Whether this is mandatory for phase completion |
| phaseId | string | Reference to parent phase |

### Handoff

Represents a transition of work between roles.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (e.g., "spec-writer-to-developer") |
| fromPhase | string | Source phase ID |
| toPhase | string | Target phase ID (null if same phase) |
| fromRole | string | Role delivering work (slug from US3) |
| toRole | string | Role receiving work (slug from US3) |
| artifact | string | Artifact being handed off |
| acceptanceCriteria | string[] | Criteria for accepting the handoff |
| caseType | string | "greenfield", "brownfield", or "both" |

### CaseStudy

Represents a complete case study (greenfield or brownfield).

| Field | Type | Description |
|-------|------|-------------|
| id | string | "greenfield" or "brownfield" |
| title | string | Display title |
| description | string | Brief description of the case |
| projectContext | string | Background about the project |
| phases | CasePhase[] | Phase walkthrough data |
| highlights | string[] | Key differences from other case |

### CasePhase

Represents a phase within a case study walkthrough.

| Field | Type | Description |
|-------|------|-------------|
| phaseId | string | Reference to ProcessPhase |
| situation | string | Context for this phase in the case |
| artifactExample | object | `{ name: string, content: string }` Example artifact content |
| decisions | string[] | Simulated decisions user can make |
| feedback | object | `{ correct: string, incorrect: string[] }` Feedback for decisions |
| handoffDemo | Handoff | Demonstrated handoff for this phase |

### InteractiveWalkthrough

Represents the state and configuration of the interactive walkthrough.

| Field | Type | Description |
|-------|------|-------------|
| currentCase | string | "greenfield" or "brownfield" |
| currentPhaseIndex | number | Current phase in walkthrough (0-4) |
| userDecisions | object | `{ [phaseId]: string }` User's decisions per phase |
| visitedPhases | string[] | Phases the user has visited |
| isComplete | boolean | Whether walkthrough is finished |

### ProcessDiagram

Represents the visual diagram of the SDD process.

| Field | Type | Description |
|-------|------|-------------|
| nodes | DiagramNode[] | Phase nodes in diagram |
| edges | DiagramEdge[] | Connections between phases |
| handoffArrows | HandoffArrow[] | Visual handoff representations |
| qualityGates | QualityGate[] | Visual quality gate markers |
| activeNode | string | Currently selected/highlighted phase |

### DiagramNode

| Field | Type | Description |
|-------|------|-------------|
| phaseId | string | Reference to ProcessPhase |
| x | number | SVG x coordinate |
| y | number | SVG y coordinate |
| width | number | Node width |
| height | number | Node height |
| label | string | Display label |

### DiagramEdge

| Field | Type | Description |
|-------|------|-------------|
| fromNode | string | Source node phaseId |
| toNode | string | Target node phaseId |
| label | string | Optional edge label |

### HandoffArrow

| Field | Type | Description |
|-------|------|-------------|
| fromRole | string | Source role |
| toRole | string | Target role |
| fromPhase | string | Source phase |
| toPhase | string | Target phase (may be same) |
| path | string | SVG path data for arrow |
| label | string | Arrow label (artifact name) |

### QualityGate

| Field | Type | Description |
|-------|------|-------------|
| phaseId | string | Phase this gate belongs to |
| x | number | SVG x coordinate |
| y | number | SVG y coordinate |
| label | string | Gate label (e.g., "Review") |
| passed | boolean | Visual state (default null = not yet) |

## Relationships

```
ProcessPhase (1) ──(has)──> QualityPoint (many)
ProcessPhase (1) ──(has)──> Handoff (many)

Handoff (many) ──(references)──> ProcessPhase (from/to)
Handoff (many) ──(references)──> Role (from US3)

CaseStudy (1) ──(has)──> CasePhase (many)
CasePhase (many) ──(references)──> ProcessPhase
CasePhase (many) ──(demonstrates)──> Handoff

InteractiveWalkthrough (1) ──(uses)──> CaseStudy
InteractiveWalkthrough (1) ──(tracks)──> CasePhase[]

ProcessDiagram (1) ──(contains)──> DiagramNode (many)
ProcessDiagram (1) ──(contains)──> DiagramEdge (many)
ProcessDiagram (1) ──(contains)──> HandoffArrow (many)
ProcessDiagram (1) ──(contains)──> QualityGate (many)
```

## Validation Rules

1. **ProcessPhase.order**: Must be unique integers 1-5
2. **Handoff.fromRole/toRole**: Must match role slugs defined in US3 (`specs/003-us3-roles-responsibilities`)
3. **Handoff.artifact**: Must match an output in source phase's `outputs` array
4. **QualityPoint.phaseId**: Must reference valid ProcessPhase
5. **CasePhase.phaseId**: Must reference valid ProcessPhase
6. **CaseStudy.id**: Must be "greenfield" or "brownfield"
7. **InteractiveWalkthrough.currentPhaseIndex**: Must be 0-4 (within phase count)

## State Transitions

### InteractiveWalkthrough State Machine

```
[Start] → currentCase: "greenfield" | "brownfield"
        → currentPhaseIndex: 0
        → isComplete: false

[Navigate] → currentPhaseIndex: ±1 (bounded 0-4)
          → visitedPhases: append currentPhaseId

[Decision] → userDecisions[phaseId]: set to selected option

[Complete] → isComplete: true (when all phases visited and all decisions made)
```

## Data Files

Data will be stored in static JSON files for easy maintenance:

- `src/js/data/phases-enhanced.json` - ProcessPhase array with qualityPoints and handoffs
- `src/js/data/handoffs.json` - Handoff array
- `src/js/data/case-studies.json` - CaseStudy array with CasePhase details
- `src/js/data/diagram-layout.json` - ProcessDiagram layout coordinates

These files are loaded by `process.js` at runtime.
