# Research: SDD Roles & Responsibilities

## Decision: Role Content Model

**Rationale**: Each role is defined statically in HTML with data attributes for JS interaction. Human and AI roles are visually differentiated via CSS classes. This avoids a separate data layer and keeps the page simple and SEO-friendly.

## Decision: Collaboration Matrix Implementation

**Rationale**: Responsive HTML table with CSS Grid for desktop, card-based layout for mobile. Each cell shows participation level (principal/secundario/revisor) with color coding and icons. JS handles bidirectional highlighting between roles and phases.

## Decision: Role Card Differentiation (Human vs AI)

**Rationale**: Human roles use the primary color scheme. AI roles use a distinct accent color (e.g., gradient or different border style) and an AI icon badge. This makes the distinction immediately visible without reading labels.

## Decision: Integration Pattern

**Rationale**: US3 section appended to `src/index.html` after the phases section. Shares the same CSS reset and variables. The shared progress bar continues to track this section via `[data-trackable]` attribute.
