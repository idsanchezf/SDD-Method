# Research: End-to-End SDD Process

## Technology Decisions

### Decision: Vanilla JavaScript for Interactive Walkthrough
**Rationale**: Constitution mandates vanilla-first approach (Principle I). No frameworks allowed. ES6+ native APIs (`querySelector`, `addEventListener`, `fetch`, `IntersectionObserver`) provide all necessary interactivity.

**Alternatives considered**:
- React/Vue/Angular: Rejected - violates Constitution Principle I
- jQuery: Rejected - unnecessary abstraction, not vanilla
- Web Components: Considered but adds complexity without clear benefit for this use case

### Decision: SVG + CSS Animations for Process Diagram
**Rationale**: Lightweight, accessible, no external libraries. SVG inline allows CSS styling and JS interaction. Works with vanilla JS.

**Alternatives considered**:
- Canvas API: Rejected - harder to make accessible, no DOM interaction
- Mermaid.js/Graphviz: Rejected - external dependency, violates vanilla-first
- CSS-only diagrams: Insufficient for complex interactive flows

### Decision: Static JSON Data for Case Studies
**Rationale**: No backend required (static site). Embed case study data as JSON in JS file or fetch from static JSON file. Simpler than building CMS.

**Alternatives considered**:
- Headless CMS: Overkill for 2 case studies
- Markdown files + fetch: More complex parsing, no clear benefit
- Inline HTML: Harder to maintain, mixes content with structure

## Performance Research

### Target Metrics (from spec)
- Page load < 2 seconds on 3G
- Diagram interaction response < 100ms on mid-range devices
- Lighthouse accessibility score ≥ 95

### Techniques
- Inline critical CSS for process section
- Defer non-critical JS with `defer` attribute
- Use `requestAnimationFrame` for smooth diagram animations
- Optimize SVG size (remove unnecessary metadata)
- Test with Chrome DevTools throttling (3G Slow)

## Accessibility Research

### WCAG AA Compliance
- Semantic HTML5: `<section>`, `<article>`, `<nav>` for structure
- ARIA labels for interactive diagram elements
- Keyboard navigation: `tabindex`, `keydown` listeners for diagram nodes
- Focus indicators visible (CSS `:focus-visible`)
- Color contrast ≥ 4.5:1 (use `variables.css` design tokens)
- Screen reader testing with NVDA/Narrator

### Interactive Walkthrough Accessibility
- Each step announced via `aria-live` region
- Progress indicator has `role="progressbar"` with `aria-valuenow`
- Navigation buttons properly labeled
- Skip links for keyboard users

## Integration with US2 and US3

### Data Reuse
- US2 phase data: Extend with handoffs and quality points (already updated in US2 spec)
- US3 role data: Reference roles in handoff definitions
- Shared CSS variables from `variables.css`
- Modular JS: `process.js` imports phase/role data from `phases.js` and `roles.js`

### Diagram Integration
- US2 has basic phase diagram (FR-004, FR-005)
- US4 enhances with: handoff arrows, quality gates, role transitions
- Extend SVG diagram or create new comprehensive one
- Decision: Create new `process-diagram.js` that builds on US2 foundations

## Case Study Structure

### Greenfield Case Study
- Project: "Task Manager App" (new with zero code)
- Phases: Show all 5 SDD phases with full artifacts
- Artifacts: Realistic spec.md, plan.md, tasks.md, code snippets
- Handoffs: Spec Writer → Developer → Tester
- Quality gates: Review checkpoints

### Brownfield Case Study  
- Project: "Legacy E-commerce Site" (existing PHP codebase)
- Adaptations:
  - Specify phase: Analyze existing code + document current behavior
  - Clarify phase: Identify technical debt, legacy patterns
  - Plan phase: Migration strategy, compatibility concerns
  - Tasks phase: Refactoring tasks, not just new features
  - Implement phase: Incremental changes, backward compatibility
- Handoffs: Same roles but different artifact types (analysis docs vs new specs)

## Open Questions Resolved

All NEEDS CLARIFICATION resolved during `/speckit.clarify`:
- Q1: Case study detail level → Interactive walkthrough (step-by-step with user guidance)

## References

- Constitution: `.specify/memory/constitution.md`
- US2 Spec: `specs/002-us2-sdd-phases/spec.md`
- US3 Spec: `specs/003-us3-roles-responsibilities/spec.md`
- WCAG 2.1 AA Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Vanilla JS Best Practices: https://vanillajstoolkit.com/learn/
