# Research: What is SDD - Hero Section

## Decision: Content Architecture

**Rationale**: The hero section must deliver maximum information density while maintaining scannability. Content is organized as progressive disclosure: definition (quick) → principles (scan) → benefits (scan) → comparison table (detail) → checklist (interaction).

**Alternatives considered**:
- Single-page essay format: Rejected — poor scannability, overwhelming for first-time visitors
- Tabbed sections: Rejected — hides content behind clicks; visitors should see the full value proposition at a glance

## Decision: Reading Progress Indicator Implementation

**Rationale**: Uses `IntersectionObserver` API to track which sections have scrolled into view, updating a progress bar at the top of the page. Session-only state stored in a JavaScript variable.

**Alternatives considered**:
- `scroll` event with percentage calculation: Rejected — fires too frequently, requires throttling
- `localStorage` persistence: Rejected — violates clarified spec (session-only)

## Decision: Interactive Checklist Pattern

**Rationale**: Simple accordion-style expandable items. Each concept key is visible; user clicks to reveal the answer/confirmation. State tracked via JS class toggling (`aria-expanded` for accessibility).

**Alternatives considered**:
- Modal dialog: Rejected — breaks reading flow
- Separate quiz page: Rejected — adds navigation friction

## Decision: Icon Strategy

**Rationale**: Inline SVG for principles and benefits. Each SVG is defined directly in the HTML markup, allowing CSS color inheritance and avoiding HTTP requests. Unicode entities used as fallback for simpler symbols.

**Alternatives considered**:
- Icon font (Font Awesome, etc.): Rejected — third-party dependency violates constitution
- Emoji: Rejected — inconsistent rendering across platforms, accessibility concerns

## Decision: CSS Architecture

**Rationale**: CSS custom properties defined in `:root` for the design system. BEM-like naming convention (`.hero__title`, `.hero__card--benefit`) for predictable scoping. Mobile-first media queries (`min-width` breakpoints at 768px and 1024px).

**Alternatives considered**:
- CSS-in-JS: Rejected — unnecessary complexity for static site
- Atomic/utility CSS (Tailwind-style): Rejected — adds build step, increases bundle size

## Decision: Accessibility Approach

**Rationale**: Semantic HTML5 provides baseline accessibility. ARIA attributes (`aria-expanded`, `aria-label`, `role="list"`) enhance screen reader support for interactive elements. Color contrast ratios meet WCAG AA (4.5:1 for text, 3:1 for large text/UI components). Keyboard navigation uses native focusable elements (`<button>`, `<details>`).

**Alternatives considered**:
- Custom focus management: Rejected — native elements handle this correctly
- Skip-link navigation: Recommended addition — added to `index.html` for full page accessibility
