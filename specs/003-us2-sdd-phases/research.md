# Research: SDD Phases - Interactive Phase Explorer

## Decision: Phase Content Model

**Rationale**: Each of the 5 phases needs consistent structured data. Content is defined statically in HTML with data attributes for JS interaction. This avoids a separate data layer and keeps the page simple.

**Alternatives considered**:
- JSON data file loaded via fetch: Rejected — adds async complexity, requires server for local testing
- JavaScript array in phases.js: Rejected — harder to maintain content, loses SEO value of static HTML

## Decision: Flow Diagram Implementation

**Rationale**: SVG inline with `<rect>` nodes for phases and `<path>` arrows for connections. CSS animations highlight the active path. Bidirectional linking via JS: clicking a card highlights the SVG node, clicking an SVG node highlights the card.

**Alternatives considered**:
- Canvas-based diagram: Rejected — not accessible, harder to style with CSS
- CSS-only flow diagram with flexbox/grid: Rejected — limited control over arrow shapes and connections
- External library (Mermaid.js, D3): Rejected — violates constitution (no third-party libraries)

## Decision: Expandable Detail Panel Pattern

**Rationale**: Uses `<details>`/`<summary>` HTML5 elements for native expandable behavior, enhanced with JS for smooth animations. This provides built-in keyboard support and screen reader compatibility without custom ARIA management.

**Alternatives considered**:
- Custom accordion with divs and aria-expanded: Rejected — more code, native `<details>` does this better
- Modal dialog: Rejected — breaks reading flow, poor mobile UX
- Separate detail page: Rejected — adds navigation friction

## Decision: Print Stylesheet

**Rationale**: `@media print` CSS in `phases.css` expands all detail panels, removes interactive elements, hides progress bar, and formats the flow diagram as a simple list. Triggered by a "Print" button via `window.print()`.

**Alternatives considered**:
- Generate PDF dynamically: Rejected — requires build step or server
- Separate printable page: Rejected — duplicates content

## Decision: Responsive Diagram Strategy

**Rationale**: Desktop: horizontal SVG flow diagram with curved arrows. Mobile: CSS replaces SVG with a vertical flex list using `::before` pseudo-elements for arrow indicators. The SVG is hidden on mobile via `display: none` at the breakpoint.

**Alternatives considered**:
- Scale SVG on mobile: Rejected — becomes too small to read
- Same SVG with responsive viewBox: Rejected — horizontal flow doesn't translate well to portrait screens

## Decision: Cross-Section Integration

**Rationale**: US2 section is appended directly in `src/index.html` after the hero section. Shares the same CSS reset and variables. The shared progress bar from US1 continues to track this section via `[data-trackable]` attribute. `phases.js` is loaded with `defer` alongside `hero.js`.

**Alternatives considered**:
- Separate HTML file: Rejected — breaks single-page experience, complicates navigation
- iframe embed: Rejected — performance overhead, style isolation issues
