# Research: Constitución SDD

**Phase**: 0 - Research & Analysis
**Date**: 2026-05-07
**Status**: Complete

## Overview

Research conducted to determine principle-to-phase mappings, localStorage pattern, and UX patterns for the Constitution Checker.

## Principles-Per-Phase Mapping

Each constitutional principle applies to specific SDD phases. The mapping determines which checkboxes appear for each phase in the Constitution Checker.

| Phase | Applicable Principles | Rationale |
|-------|----------------------|-----------|
| Specify | Vanilla-First, Semantic HTML & Accessible, Professional CSS Architecture | La spec define el qué y cómo del stack técnico |
| Clarify | Vanilla-First, Semantic HTML & Accessible, Professional CSS Architecture | Clarificación refuerza las decisiones constitucionales |
| Plan | Vanilla-First, Semantic HTML & Accessible, Professional CSS Architecture, Feature Branch & PR Workflow | El plan define la estrategia de branching |
| Tasks | Feature Branch & PR Workflow, CI/CD via GitHub Actions | Tasks descompone el flujo de trabajo de branching y CI |
| Implement | Feature Branch & PR Workflow, CI/CD via GitHub Actions | Implementación ejecuta el flujo de trabajo concreto |

## localStorage Pattern

Decision: Use same pattern as walkthrough checklist (US4 walkthrough).
- Key: `sdd-constitution-progress`
- Value: JSON object `{ phases: { "specify": { "vanilla-first": true, ... }, ... } }`
- Load on page load, save on each checkbox toggle
- Reset clears the key

## UX Patterns

### Principle Cards (US1)
- Each principle is a card with: icon, name, description, expandable detail section
- Expandable detail uses `<details>`/`<summary>` for native behavior without JS
- Color coding: each principle has an accent color (from design system or custom)

### Constitution Checker (US2)
- Phase selector: pills/buttons at top (reuse pattern from guide.js phase nav)
- Checkbox list per phase: principle name + checkbox + short description
- Verify button: evaluates all checkboxes in current phase
- Verdict display: PASS (green badge) or FAIL (red badge)
- Links from FAIL items to principle card explanation

### Summary Panel (US3)
- Grid of 5 phase cards, each showing phase name + status badge (PASS/FAIL/PENDING)
- Progress bar with percentage (reuse CSS from progress bar component)
- Click on FAIL phase navigates to checker with that phase selected
- Reset button at bottom

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Principle detail disclosure | `<details>`/`<summary>` | Zero JS, accessible by default, matches site patterns |
| Phase selector style | Pills (same as guide.js) | Consistent with existing navigation patterns |
| Checker layout | Inline below principle cards | User reads principles then immediately verifies |
| localStorage key | `sdd-constitution-progress` | Namespaced to avoid collisions with other features |
| Summary position | Below the checker | Natural flow: principles → checker → summary |
