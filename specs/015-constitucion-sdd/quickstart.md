# Quickstart: Constitución SDD

**Phase**: 1 - Design
**Date**: 2026-05-07
**Status**: Draft

## Implementation Order

### 1. Add constitution section to index.html

Insert a new `<section id="constitution" class="constitution-section" data-trackable>` between the existing sections (after `#guide` or as appropriate).

The section contains:
- Section title + intro paragraph
- 5 principle cards (`.principle-card`) with `<details>`/`<summary>` for expandable content
- Constitution Checker (`.constitution-checker`) with phase selector pills + checkboxes + verify button
- Summary panel (`.constitution-summary`) with phase status grid + progress bar + reset button

### 2. Create constitution.css

New file `src/css/constitution.css`:
- Principle cards: grid layout, each card has accent color border, icon, name, expandable detail
- Phase selector pills: reuse styles from guide.css `.phase-nav-item` pattern
- Checkbox list: styled checkboxes with labels, strikethrough on checked
- Verdict badges: PASS (green), FAIL (red), PENDING (grey)
- Summary grid: 5 phase cards with status badges
- Progress bar: reuse progress bar styles from hero.css

### 3. Create constitution.js

New file `src/js/constitution.js`:
- `PRINCIPLES` array: all 5 principles with id, name, description, appliesTo, etc.
- `PHASE_PRINCIPLES` map: phase → principle[] (derived from appliesTo)
- `ConstitutionChecker` class:
  - `selectPhase(phaseId)`: update active phase, render checklist
  - `togglePrinciple(principleId)`: toggle checkbox, save state
  - `verify()`: check all principles, return PASS/FAIL
  - `reset()`: clear all checkboxes, clear localStorage
  - `getSummary()`: return per-phase status and global percentage
  - `save()`: persist to localStorage key `sdd-constitution-progress`
  - `load()`: restore from localStorage

### 4. Add CSS link and JS script to index.html

```html
<link rel="stylesheet" href="css/constitution.css">
...
<script src="js/constitution.js" defer></script>
```
