<!--
## Sync Impact Report
- Version change: 1.0.0 → 1.0.0 (no semantic change)
- Modified principles: Backlog structure & specification cycles clarified
- Added sections: User Story Folder Structure
- Removed sections: None
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md
  - ✅ .specify/templates/spec-template.md
  - ⚠ .specify/templates/tasks-template.md (task categorization needs review)
- Follow-up TODOs:
  - [ ] Verify task categorization alignment with new principles
  - [ ] Update agent-specific guidance files (e.g., `commands/commands.md`)
-->

# WebApp Constitution

## Core Principles

### I. Vanilla-First (NON-NEGOTIABLE)

No JavaScript frameworks (React, Vue, Angular, Svelte, etc.) are permitted. All
interactivity MUST be implemented with vanilla JavaScript (ES6+). DOM
manipulation uses native APIs: `querySelector`, `addEventListener`,
`fetch`, `IntersectionObserver`, etc. State management is explicit and
traceable without framework abstractions.

**Rationale**: Eliminates build-step complexity, reduces bundle size, ensures
long-term maintainability, and lowers the barrier for contributors who only
need to know standard web technologies.

### II. Semantic HTML & Accessible by Default

All markup MUST use semantic HTML5 elements (`header`, `nav`, `main`,
`section`, `article`, `aside`, `footer`). ARIA attributes are added only
when native semantics are insufficient. Every interactive element MUST be
keyboard-accessible and screen-reader compatible.

**Rationale**: Accessibility is not an afterthought. Semantic markup improves
SEO, readability, and ensures the application works for all users.

### III. Professional CSS Architecture

Styles are organized using a modular, scalable architecture. CSS custom
properties (variables) define the design system (colors, spacing, typography,
shadows). Media queries implement responsive design with a mobile-first
approach. No inline styles are permitted except for dynamic values set via
JavaScript.

**Rationale**: A consistent design system ensures visual coherence across all
pages and components. Custom properties enable theming and reduce repetition.

### IV. Feature Branch & PR Workflow (NON-NEGOTIABLE)

Every change MUST originate from a feature branch named `feat/<short-description>`.
Direct commits to `main` are prohibited. Each feature branch MUST be merged
via a Pull Request. Before merging:
1. The branch MUST be rebased onto the latest `main`.
2. Any merge conflicts MUST be resolved by the author.
3. At least one code review approval is required.
4. The PR MUST include a description of changes and testing evidence.

**Rationale**: Enables parallel development by multiple collaborators without
stepping on each other's work. PRs provide a natural review gate and audit
trail.

### V. CI/CD via GitHub Actions

Every pull request MUST trigger a GitHub Actions workflow that validates:
- HTML/CSS/JS linting passes.
- No console errors in production code.
- All assets are optimized.

The `main` branch MUST have a deployment workflow that publishes to the
target hosting platform (GitHub Pages, Netlify, Vercel, or custom server)
on every successful merge.

**Rationale**: Automated validation catches regressions before they reach
production. Continuous deployment ensures the live site always reflects `main`.

## Technology Stack Constraints

| Layer        | Technology                          | Constraint                |
|--------------|-------------------------------------|---------------------------|
| Markup       | HTML5                               | Semantic elements required|
| Styling      | CSS3 (Custom Properties, Flexbox, Grid, Animations) | No preprocessors required |
| Scripting    | Vanilla JavaScript (ES6+)           | No frameworks or libraries|
| Version Ctrl | Git + GitHub                        | Feature branches + PRs    |
| CI/CD        | GitHub Actions                      | Required for all PRs      |
| Deployment   | GitHub Pages / Static hosting       | Automated on merge to main|

Third-party libraries (fonts, icons, lightweight utilities) MUST be approved
via PR before inclusion. No npm dependencies for framework-level code.

## Collaborative Workflow

### Branch Naming Convention

- `feat/<description>` — New features
- `fix/<description>` — Bug fixes
- `docs/<description>` — Documentation updates
- `refactor/<description>` — Code refactoring (no behavior change)
- `chore/<description>` — Maintenance tasks (tooling, config)

### Pull Request Requirements

- Title follows Conventional Commits: `type(scope): description`
- Description includes: purpose, approach, testing notes, screenshots if UI
- Conflicts with `main` resolved before review request
- Self-review completed before requesting reviewer

### Conflict Resolution

When conflicts arise between a feature branch and `main`:
1. Fetch latest `main`: `git fetch origin main`
2. Rebase feature branch: `git rebase origin/main`
3. Resolve conflicts manually, test the result
4. Force-push: `git push --force-with-lease`
5. Re-request review

## Governance

This constitution supersedes all other development practices in the project.
Any deviation MUST be documented in a PR with explicit justification and
approved by at least one collaborator.

**Amendment Process**: Propose changes via PR. Amendments require consensus
(or majority if >3 collaborators). Approved amendments increment the version.

**Versioning Policy**: Semantic versioning (MAJOR.MINOR.PATCH):
- MAJOR: Backward-incompatible principle removal or redefinition
- MINOR: New principle or section added
- PATCH: Clarifications, wording fixes, non-semantic refinements

**Compliance Review**: Every PR review MUST verify constitution compliance.
Automated checks in GitHub Actions SHOULD enforce linting and style rules.

**Version**: 1.0.0 | **Ratified**: 2026-05-05 | **Last Amended**: 2026-05-05
