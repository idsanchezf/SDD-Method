# Quickstart: End-to-End SDD Process

## Prerequisites

- Completed US1 (What is SDD) - includes design system (`variables.css`)
- Completed US2 (SDD Phases) - includes phase data and basic diagram
- Completed US3 (Roles & Responsibilities) - includes role data and collaboration matrix
- Repository cloned and working directory set to repo root

## Setup

1. **Verify feature branch**:
   ```bash
   git branch --show-current
   # Should output: 004-us4-proceso-end-to-end
   ```

2. **Verify US2 and US3 artifacts exist**:
   ```bash
   ls src/css/phases.css src/js/phases.js src/css/roles.css src/js/roles.js
   # All files should exist
   ```

3. **Create US4 files**:
   ```bash
   touch src/css/process.css src/js/process.js
   mkdir -p src/js/data src/assets/diagrams
   ```

## Implementation Steps

### Step 1: Enhance Phase Data (US2 Integration)

Add handoffs and quality points to the phase data from US2.

Edit `src/js/data/phases-enhanced.json` (create if not exists):
```json
[
  {
    "id": "specify",
    "order": 1,
    "name": "Specify",
    "inputs": ["Feature idea", "User story"],
    "outputs": ["spec.md"],
    "duration": { "greenfield": "2-3 days", "brownfield": "3-5 days" },
    "roles": ["spec-writer", "product-owner"],
    "qualityPoints": [
      {
        "id": "spec-complete",
        "description": "All sections of spec template completed",
        "verificationCriteria": "Check all mandatory sections filled",
        "mandatory": true
      }
    ],
    "handoffs": [
      {
        "id": "spec-to-clarify",
        "fromRole": "spec-writer",
        "toRole": "developer",
        "artifact": "spec.md",
        "acceptanceCriteria": ["Spec approved by reviewer"],
        "caseType": "both"
      }
    ]
  }
  // ... repeat for all 5 phases
]
```

### Step 2: Create Process Diagram

Create `src/js/process.js` with diagram rendering:

```javascript
// Import enhanced phase data (or load from JSON)
import { phases } from './data/phases-enhanced.js';

class ProcessDiagram {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.svg = this.createSVG();
    this.nodes = [];
    this.handoffs = [];
  }

  createSVG() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('id', 'process-diagram');
    svg.setAttribute('aria-label', 'SDD Process Diagram');
    svg.setAttribute('role', 'application');
    this.container.appendChild(svg);
    return svg;
  }

  render() {
    this.renderNodes();
    this.renderEdges();
    this.renderHandoffs();
    this.renderQualityGates();
  }

  // ... implement rendering methods
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const diagram = new ProcessDiagram('process-diagram-container');
  diagram.render();
});
```

### Step 3: Add Interactive Walkthrough

Extend `process.js` with walkthrough state machine:

```javascript
class InteractiveWalkthrough {
  constructor(diagram) {
    this.diagram = diagram;
    this.currentCase = 'greenfield';
    this.currentPhaseIndex = 0;
    this.userDecisions = {};
  }

  async start(caseType) {
    this.currentCase = caseType;
    this.currentPhaseIndex = 0;
    await this.showCurrentStep();
  }

  async next() {
    if (this.currentPhaseIndex < 4) {
      this.currentPhaseIndex++;
      await this.showCurrentStep();
    }
  }

  async showCurrentStep() {
    const phase = this.diagram.phases[this.currentPhaseIndex];
    // Highlight node, show handoff, display artifact
    this.diagram.highlightNode(phase.id);
    this.diagram.showHandoffForPhase(phase.id);
    this.showArtifactExample(phase);
    this.promptUserDecision(phase);
  }

  promptUserDecision(phase) {
    // Render decision buttons, capture user choice
    const decisions = this.getDecisionsForPhase(phase, this.currentCase);
    // ... render decision UI
  }
}
```

### Step 4: Style with CSS

Edit `src/css/process.css`:

```css
/* Process Diagram */
#process-diagram {
  width: 100%;
  max-width: 1200px;
  height: auto;
  margin: 0 auto;
}

.diagram-node {
  cursor: pointer;
  transition: all 0.3s ease;
}

.diagram-node rect {
  fill: var(--color-phase-default);
  stroke: var(--color-border);
  stroke-width: 2;
}

.diagram-node--active rect {
  stroke: var(--color-primary);
  stroke-width: 3;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
}

/* Handoff Arrows */
.diagram-handoff {
  fill: none;
  stroke: var(--color-handoff-default);
  stroke-width: 2;
  stroke-dasharray: 5,5;
}

.diagram-handoff--active {
  stroke: var(--color-handoff-active);
  stroke-width: 3;
  stroke-dasharray: none;
}

/* Quality Gates */
.diagram-gate {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.diagram-gate--visible {
  opacity: 1;
}

/* Walkthrough Controls */
.walkthrough-controls {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  margin-top: var(--spacing-lg);
}

.walkthrough-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
}

.walkthrough-btn:hover {
  background: var(--color-primary-dark);
}
```

### Step 5: Add HTML Section

Add to `src/index.html` after US3 section:

```html
<section id="process" class="section" aria-labelledby="process-heading">
  <h2 id="process-heading">Proceso End-to-End SDD</h2>
  
  <div class="process-controls">
    <button id="toggle-quality-gates" aria-pressed="false">
      Mostrar Puntos de Control
    </button>
    <div class="case-selector">
      <button data-case="greenfield" class="active">Greenfield</button>
      <button data-case="brownfield">Brownfield</button>
    </div>
  </div>

  <div id="process-diagram-container">
    <!-- SVG diagram rendered by process.js -->
  </div>

  <div class="walkthrough-section">
    <h3>Recorrido Interactivo</h3>
    <div id="walkthrough-container">
      <!-- Walkthrough UI rendered here -->
    </div>
    <div class="walkthrough-controls">
      <button id="walkthrough-start-greenfield">Iniciar Greenfield</button>
      <button id="walkthrough-start-brownfield">Iniciar Brownfield</button>
    </div>
  </div>
</section>
```

### Step 6: Test

1. **Visual test**: Open `index.html` in browser
   - Diagram renders with 5 phase nodes
   - Clicking node highlights it and shows details
   - Toggle quality gates shows/hides gate markers
   - Switch between greenfield/brownfield cases

2. **Walkthrough test**:
   - Click "Iniciar Greenfield"
   - Verify step-by-step navigation works
   - Check artifact examples display correctly
   - Test decision prompts and feedback

3. **Accessibility test**:
   ```bash
   # Run Lighthouse CI
   npm run lighthouse  # if configured
   # Or manually test with NVDA/Narrator
   ```

4. **Integration test**:
   - Click US2 phase card → Verify diagram node highlights
   - Click US3 role → Verify handoff arrows highlight
   - Verify all interactions work together

## Common Issues

### Diagram not rendering
- Check browser console for JS errors
- Verify `phases-enhanced.json` is valid JSON
- Ensure SVG namespace is correct: `http://www.w3.org/2000/svg`

### Walkthrough not advancing
- Check `currentPhaseIndex` increment logic
- Verify event listeners are attached correctly
- Check for uncaught promise rejections

### Styles not applying
- Verify `process.css` is imported in `index.html`
- Check CSS custom properties exist in `variables.css`
- Use browser DevTools to inspect applied styles

## Next Steps

After implementation:
1. Run `/speckit.tasks` to generate task breakdown
2. Implement TDD-style: write tests first, then code
3. Run `/speckit.checklist` before final commit
4. Create PR with screenshots of diagram and walkthrough
