# Data Model: SDD Phases - Interactive Phase Explorer

## Entities

### Phase

Each of the 5 SDD process stages.

| Field | Type | Description |
|-------|------|-------------|
| `order` | Number | Sequence position (1-5) |
| `name` | String | Display name (e.g., "Specify") |
| `slug` | String | URL-safe identifier (e.g., "specify") |
| `description` | String | Short description (2-3 lines) |
| `descriptionLong` | String | Extended description for detail panel |
| `inputs` | String[] | Required inputs/artifacts (1-3 items) |
| `outputs` | String[] | Produced artifacts (1-3 items) |
| `duration` | String | Estimated time (e.g., "1-2 days") |
| `roles` | String[] | Primary roles involved (1-3 items) |
| `tips` | String[] | Practical tips (2-3 items) |
| `faq` | FAQItem[] | Frequently asked questions for this phase |

### FAQItem

Question and answer pair within a phase's detail panel.

| Field | Type | Description |
|-------|------|-------------|
| `question` | String | The FAQ question |
| `answer` | String | The answer (1-2 paragraphs) |

### FlowDiagram

Visual representation of phase sequence.

| Field | Type | Description |
|-------|------|-------------|
| `nodes` | DiagramNode[] | One node per phase, positioned horizontally |
| `connections` | Connection[] | Arrows between consecutive nodes |
| `activeNode` | Number | Index of currently highlighted node (0-4, or -1 for none) |

### DiagramNode

Single node in the flow diagram SVG.

| Field | Type | Description |
|-------|------|-------------|
| `phaseRef` | Number | Index of the phase it represents |
| `label` | String | Short label displayed in the node |
| `x`, `y` | Number | SVG coordinates |
| `width`, `height` | Number | SVG dimensions |

### Connection

Arrow linking two diagram nodes.

| Field | Type | Description |
|-------|------|-------------|
| `from` | Number | Source node index |
| `to` | Number | Target node index |
| `path` | String | SVG path data (d attribute) |

## State Management

### Session State

| Field | Type | Description |
|-------|------|-------------|
| `activePhase` | Number | Currently selected phase index (-1 = none) |
| `expandedDetails` | Set | Set of phase orders with open detail panels |
| `viewedSections` | Set | Phase sections scrolled into view (for progress) |

State is held in JavaScript objects in memory. No persistence across sessions.
