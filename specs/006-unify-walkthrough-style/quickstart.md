# Quickstart: Unificar Look & Feel Walkthrough US4 con Guía US5

**Date**: 2026-05-07

## Prerequisites

- Git repository initialized
- Node.js (optional, for linting)
- GitHub account (for PR workflow)

## Implementation Steps

### Step 1: Analyze Existing Code
```
# Review US5 guide.js for reference styling
src/js/guide.js

# Review US5 guide.css for reference styles
src/css/guide.css

# Review US4 walkthrough.js (target to update)
src/js/walkthrough.js

# Review US4 process.css (target to update)
src/css/process.css
```

### Step 2: Update HTML (Banner Prerrequisito)
```html
<!-- Add to src/index.html in #process-end-to-end section -->
<div class="prereq-banner">
  <span class="prereq-banner__icon">ℹ️</span>
  <p class="prereq-banner__text">¿No sabes qué es SDD? <a href="#hero">Lee la introducción primero</a></p>
</div>
```

### Step 3: Update walkthrough.js
Add methods to InteractiveWalkthrough class:
- `renderPhaseNavigation()` - Create pills navigation
- `renderChecklistForPhase(phaseId)` - Add checklist UI
- `loadProgress()` - Restore from localStorage
- `saveProgress()` - Persist to localStorage
- Update `setupUI()` - Add header with case selector

### Step 4: Update process.css
Add styles matching guide.css:
- `.walkthrough-container` - White bg, shadow, border-radius
- `.phase-nav-item` - Pills with active/completed states
- `.walkthrough-progress` - Bar with percentage text
- `.checklist-item` - Checkbox with strikethrough

### Step 5: Test
- Manual testing: Verify visual consistency with US5 guide
- Accessibility: Keyboard navigation, screen reader
- Responsive: Mobile/tablet/desktop views

## Files Modified

| File | Changes |
|------|---------|
| `src/index.html` | Add prerrequisito banner |
| `src/js/walkthrough.js` | Add UI methods, localStorage |
| `src/css/process.css` | Add walkthrough styles |

## Dependencies

- **Requires**: US5 (guide.js, guide.css) implemented
- **Extends**: US4 walkthrough.js existing functionality

## Success Criteria

After implementation, run:
1. Visual comparison: walkthrough vs guide should match
2. LocalStorage test: reload page, verify state restored
3. Accessibility test: keyboard navigation works