# Component Contracts: Hero Section

## Checklist Component

### Input (HTML Structure)

```html
<div class="checklist" id="comprehension-checklist">
  <div class="checklist__item" data-concept="concept-1">
    <button class="checklist__toggle" aria-expanded="false" aria-controls="concept-1-answer">
      <span class="checklist__question">¿Cuál es el principio central de SDD?</span>
      <span class="checklist__icon" aria-hidden="true">+</span>
    </button>
    <div class="checklist__answer" id="concept-1-answer" hidden>
      Las especificaciones definen el comportamiento antes de implementar.
    </div>
  </div>
  <!-- Repeat for each concept -->
</div>
```

### Behavior Contract

| Event | Trigger | Action |
|-------|---------|--------|
| `click` | User clicks `.checklist__toggle` | Toggle `aria-expanded` on button, toggle `hidden` on `.checklist__answer`, update icon |
| `keydown` (Enter/Space) | User focuses toggle and presses Enter/Space | Same as click |

### Accessibility Requirements

- Toggle button MUST have `aria-expanded` attribute (true/false)
- Toggle button MUST have `aria-controls` pointing to answer element ID
- Answer container MUST use `hidden` attribute (not just CSS display:none)
- Icon decorative: `aria-hidden="true"`

## Reading Progress Component

### Input (HTML Structure)

```html
<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" aria-label="Progreso de lectura">
  <div class="progress-bar__fill"></div>
</div>
```

### Observed Elements

The component observes trackable sections via `IntersectionObserver`:

```html
<section class="hero__definition" data-trackable>...</section>
<section class="hero__principles" data-trackable>...</section>
<section class="hero__benefits" data-trackable>...</section>
<section class="hero__comparison" data-trackable>...</section>
<section class="hero__checklist" data-trackable>...</section>
```

### Behavior Contract

| Event | Trigger | Action |
|-------|---------|--------|
| `intersection` | Trackable section enters viewport (threshold 50%) | Mark section as viewed, update progress percentage |
| `update` | Progress changes | Update `aria-valuenow` on progress bar, update CSS width of `.progress-bar__fill` |

### Configuration

- Threshold: 50% of section visible = "viewed"
- Sections must have `[data-trackable]` attribute
- Progress bar must have `[role="progressbar"]` with ARIA attributes

## CSS Design System Contract

### Required CSS Custom Properties

All variables defined in `src/css/variables.css`:

```css
:root {
  /* Colors */
  --color-primary: #...;
  --color-secondary: #...;
  --color-text: #...;
  --color-text-muted: #...;
  --color-background: #...;
  --color-surface: #...;
  --color-border: #...;
  --color-accent: #...;

  /* Typography */
  --font-family-base: ...;
  --font-family-heading: ...;
  --font-size-base: 1rem;
  --font-size-sm: 0.875rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2rem;
  --font-size-3xl: 2.5rem;
  --line-height-base: 1.6;
  --line-height-heading: 1.2;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;

  /* Layout */
  --max-width: 1200px;
  --border-radius: 0.5rem;
  --shadow-sm: ...;
  --shadow-md: ...;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
}
```
