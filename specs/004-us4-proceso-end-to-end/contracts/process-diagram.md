# Contract: Process Diagram Interface

## Purpose
Define the contract for the interactive process diagram component that visualizes the SDD end-to-end flow with handoffs and quality gates.

## Component Interface

### ProcessDiagram (SVG-based)

```
Element: <svg id="process-diagram" ...>
  <g class="nodes"> ... </g>
  <g class="edges"> ... </g>
  <g class="handoffs"> ... </g>
  <g class="quality-gates"> ... </g>
</svg>
```

### Data Attributes (for JS interaction)

| Attribute | Element | Description |
|-----------|----------|-------------|
| `data-phase-id` | `.node` | Phase identifier (specify, clarify, etc.) |
| `data-role-slug` | `.handoff-arrow` | Role slug for filtering |
| `data-case-type` | `.handoff-arrow` | "greenfield", "brownfield", or "both" |
| `data-gate-id` | `.quality-gate` | Quality gate identifier |
| `data-active` | `.node, .handoff-arrow, .quality-gate` | Whether element is currently active |

### Events Dispatched

| Event | Detail | Description |
|-------|---------|-------------|
| `phase:select` | `{ phaseId: string, element: SVGElement }` | Fired when user selects a phase node |
| `phase:hover` | `{ phaseId: string, element: SVGElement }` | Fired when user hovers a phase node |
| `handoff:highlight` | `{ handoffId: string, fromRole: string, toRole: string }` | Fired when handoff is highlighted |
| `gate:toggle` | `{ gateId: string, visible: boolean }` | Fired when quality gate layer is toggled |
| `case:switch` | `{ caseType: string }` | Fired when switching between greenfield/brownfield |

### Events Listened

| Event | Handler | Description |
|-------|----------|-------------|
| `phase:highlight` (from US2) | Highlights corresponding node | Synchronizes with US2 phase cards |
| `role:highlight` (from US3) | Highlights handoffs for that role | Synchronizes with US3 role matrix |
| `walkthrough:step` (from walkthrough) | Highlights current step in diagram | Synchronizes with interactive walkthrough |

## Integration Points

### With US2 (Phases)

- **Import**: Phase data from `phases.js` (or shared `data/phases-enhanced.json`)
- **Sync**: When US2 card is clicked → highlight diagram node
- **Sync**: When diagram node clicked → highlight US2 card
- **Extend**: US2 phase data now includes `handoffs` and `qualityPoints` (see US2 spec update)

### With US3 (Roles)

- **Import**: Role data from `roles.js` (or shared `data/roles.json`)
- **Sync**: When US3 role is selected → highlight handoff arrows involving that role
- **Handoff arrows**: Labeled with `fromRole → toRole` and artifact name

### With Interactive Walkthrough

- **Steps**: Walkthrough progress highlights diagram nodes sequentially
- **Handoffs**: Each walkthrough step shows the relevant handoff arrow
- **Quality gates**: Shown/hidden based on walkthrough step context

## Visual Contract

### Node States

| State | Visual |
|-------|--------|
| Default | Rounded rect, fill: `var(--color-phase-default)`, stroke: `var(--color-border)` |
| Active | Same + `stroke: var(--color-primary)`, `filter: drop-shadow(...)` |
| Completed | Fill: `var(--color-phase-complete)`, checkmark icon |
| Highlighted (by role) | `stroke: var(--color-role-highlight)`, thicker stroke |

### Edge States

| State | Visual |
|-------|--------|
| Default | Line with arrowhead, stroke: `var(--color-edge-default)` |
| Highlighted (active phase) | `stroke: var(--color-primary)`, thicker |
| Dimmed | `opacity: 0.3` |

### Handoff Arrow States

| State | Visual |
|-------|--------|
| Default | Curved arrow, stroke: `var(--color-handoff-default)`, label: artifact name |
| Active (in walkthrough) | `stroke: var(--color-handoff-active)`, `filter: drop-shadow(...)` |
| Filtered out (wrong case type) | `display: none` |

### Quality Gate States

| State | Visual |
|-------|--------|
| Default (hidden) | `opacity: 0`, not interactive |
| Visible | Diamond shape, fill: `var(--color-gate-default)`, label: "Review" |
| Passed (in walkthrough) | Fill: `var(--color-gate-passed)`, checkmark |
| Failed | Fill: `var(--color-gate-failed)`, X mark |

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Focus next diagram element (nodes, then gates) |
| `Shift+Tab` | Focus previous diagram element |
| `Enter` / `Space` | Activate focused element (select phase or toggle gate) |
| `Arrow keys` | Navigate between adjacent nodes (if diagram supports directional navigation) |

## Responsive Behavior

| Breakpoint | Behavior |
|------------|-----------|
| ≥ 1024px (desktop) | Full horizontal diagram with all annotations visible |
| 768px - 1023px (tablet) | Scaled diagram, some labels become tooltips |
| < 768px (mobile) | Vertical stack layout, handoffs shown as list below each phase |

## Data Format Example

```json
{
  "nodes": [
    { "phaseId": "specify", "x": 50, "y": 100, "width": 120, "height": 60 }
  ],
  "edges": [
    { "from": "specify", "to": "clarify", "label": "spec.md" }
  ],
  "handoffs": [
    {
      "id": "spec-writer-to-developer",
      "fromRole": "spec-writer",
      "toRole": "developer",
      "fromPhase": "specify",
      "toPhase": "clarify",
      "artifact": "spec.md",
      "caseType": "both",
      "path": "M150,130 C200,130 200,130 250,100"
    }
  ],
  "gates": [
    { "id": "spec-review", "phaseId": "specify", "x": 150, "y": 70, "label": "Review" }
  ]
}
```

## CSS Classes (Contract with `process.css`)

| Class | Applied to | Description |
|-------|-------------|-------------|
| `.diagram-node` | `<g>` wrapping each phase node | Base node styling |
| `.diagram-node--active` | Same | Active state |
| `.diagram-node--completed` | Same | Completed state |
| `.diagram-edge` | `<path>` (phase connections) | Base edge styling |
| `.diagram-handoff` | `<path>` (handoff arrows) | Base handoff styling |
| `.diagram-handoff--active` | Same | Active handoff |
| `.diagram-gate` | `<g>` (quality gates) | Base gate styling |
| `.diagram-gate--visible` | Same | Visible state |
| `.diagram-gate--passed` | Same | Passed state |

## Accessibility Contract

- Each interactive element has `role="button"` or appropriate ARIA role
- Active element has `aria-pressed="true"` or `aria-selected="true"`
- Diagram has `aria-label="SDD Process Diagram"` and `role="img"` or `role="application"`
- Live region for announcements: `<div aria-live="polite" id="diagram-announcements">`
- Each node has `aria-describedby` pointing to its description element
- Handoff arrows have `aria-label="Handoff: fromRole to toRole, artifact: artifactName"`
