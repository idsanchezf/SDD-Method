# Component Contracts: SDD Phases Section

## Phase Card Component

### Input (HTML Structure)

```html
<div class="phase-card" data-phase="1" tabindex="0" role="button" aria-expanded="false" aria-controls="phase-detail-1">
  <span class="phase-card__number">1</span>
  <h3 class="phase-card__title">Specify</h3>
  <p class="phase-card__desc">Define the feature specification with user stories and acceptance criteria.</p>
  <div class="phase-card__meta">
    <span class="phase-card__duration">⏱ 1-2 days</span>
  </div>
</div>
```

### Behavior Contract

| Event | Trigger | Action |
|-------|---------|--------|
| `click` | User clicks `.phase-card` | Set card as active, highlight corresponding flow diagram node, toggle detail panel |
| `keydown` (Enter/Space) | User focuses card and presses Enter/Space | Same as click |

### Accessibility Requirements

- Card must have `tabindex="0"`, `role="button"`, `aria-expanded`
- Detail panel must have `id` matching `aria-controls`
- Active state must be visible via CSS (`:focus-visible` and `.is-active`)

## Detail Panel Component

### Input (HTML Structure)

```html
<details class="phase-detail" id="phase-detail-1">
  <summary class="phase-detail__toggle">Ver detalle</summary>
  <div class="phase-detail__content">
    <h4>Descripción</h4>
    <p>Extended description text...</p>
    <h4>Artefactos de ejemplo</h4>
    <ul>
      <li>spec.md</li>
      <li>research.md</li>
    </ul>
    <h4>Consejos</h4>
    <ul>
      <li>Tip 1</li>
      <li>Tip 2</li>
    </ul>
  </div>
</details>
```

### Behavior Contract

| Event | Trigger | Action |
|-------|---------|--------|
| `toggle` | Native `<details>` toggle event | Animate open/close via CSS, update JS state |
| `click` | JS triggers open | Call `details.open = true`, CSS handles animation |

## Flow Diagram Component

### Input (HTML Structure)

```html
<div class="flow-diagram" role="img" aria-label="Diagrama de flujo de las 5 fases de SDD">
  <svg class="flow-diagram__svg" viewBox="0 0 900 120">
    <rect class="flow-diagram__node" data-diagram-node="1" x="10" y="20" width="140" height="80" rx="8"/>
    <text class="flow-diagram__label" x="80" y="65" text-anchor="middle">1. Specify</text>
    <path class="flow-diagram__arrow" d="M160 60 L200 60" marker-end="url(#arrowhead)"/>
    <!-- Repeat for each phase and connection -->
  </svg>
</div>
```

### Behavior Contract

| Event | Trigger | Action |
|-------|---------|--------|
| `click` | User clicks `.flow-diagram__node` | Highlight corresponding phase card, scroll card into view |
| `hover` | User hovers over node | Subtle visual highlight (CSS) |

### Configuration

- Desktop: horizontal SVG layout
- Mobile: SVG hidden, replaced with vertical flex list via CSS

## CSS Design System Reuse

All variables from `src/css/variables.css` (US1) are reused:

```css
/* Phases section uses existing tokens */
.phases-section {
  --phase-card-bg: var(--color-surface);
  --phase-active-border: var(--color-primary);
  --phase-number-bg: var(--color-primary);
  --phase-duration-color: var(--color-text-muted);
}
```

## Print Stylesheet Contract

```css
@media print {
  .phase-detail { display: block !important; }
  .phase-detail__content { display: block !important; }
  .flow-diagram { display: none; }
  .progress-bar { display: none; }
  .print-button { display: none; }
}
```
