# Contract: Gate Panel Interface

## Purpose

Define the interface contract between ProcessDiagram (SVG) and the Gate Panel UI component for interactive quality gates.

## Events Dispatched

### gate:select

Dispatched by ProcessDiagram when user clicks/activates a gate diamond.

| Detail Field | Type | Description |
|-------------|------|-------------|
| gateId | string | Quality gate identifier (ej. "spec-complete") |
| phaseId | string | Phase identifier (ej. "specify") |

```javascript
// Example dispatch (process-diagram.js)
gate.element.addEventListener('click', () => {
  this.dispatchEvent('gate:select', { gateId: gate.gateId, phaseId: gate.phaseId });
});
```

### gate:explored

Dispatched by GatePanel when a gate is first explored (user opens panel and then closes it).

| Detail Field | Type | Description |
|-------------|------|-------------|
| gateId | string | Quality gate identifier |

### gate:simulation

Dispatched by GatePanel when simulation toggle changes.

| Detail Field | Type | Description |
|-------------|------|-------------|
| gateId | string | Quality gate identifier |
| active | boolean | Whether simulation is now active |

## Events Listened

### gate:select (by GatePanel)

Listens for `gate:select` to open the detail panel for the selected gate.

### gate:simulation (by ProcessDiagram)

Listens for `gate:simulation` to update SVG gate diamond color (red for FAILED, neutral otherwise).

### gate:explored (by ProcessDiagram)

Listens for `gate:explored` to add CSS class `diagram-gate--explored` to the gate element.

## CSS Class Contract

### Gate SVG States

| Class | Element | Visual | When |
|-------|---------|--------|------|
| `.diagram-gate--explored` | `.diagram-gate` | Green border/badge | Gate has been opened at least once |
| `.diagram-gate--failed` | `.diagram-gate` | Red fill | Simulation mode active |
| `.diagram-gate--selected` | `.diagram-gate` | Highlighted border | Panel currently open for this gate |

### Panel States

| Class | Element | When |
|-------|---------|------|
| `.gate-panel--open` | `.gate-panel` | Panel is visible |
| `.gate-panel--simulating` | `.gate-panel` | Simulation mode active |
| `.gate-panel--mobile` | `.gate-panel` | Viewport < 768px |

## DOM Structure

### Panel Container (in index.html)

```html
<div id="gate-panel" class="gate-panel" role="dialog" aria-labelledby="gate-panel-title" aria-hidden="true">
  <div class="gate-panel__overlay"></div>
  <div class="gate-panel__content">
    <button class="gate-panel__close" type="button" aria-label="Cerrar panel">&times;</button>
    <div class="gate-panel__body">
      <!-- Rendered by GatePanel -->
    </div>
  </div>
</div>
```

### Panel Sections (rendered by JS)

```html
<header class="gate-panel__header">
  <span class="gate-panel__badge" data-mandatory="true">Obligatorio</span>
  <h3 id="gate-panel-title">Spec Review</h3>
  <span class="gate-panel__phase">Fase: Specify</span>
</header>

<section class="gate-panel__info">
  <h4>Descripción</h4>
  <p>Todas las secciones de la plantilla de spec completadas</p>
</section>

<section class="gate-panel__criteria">
  <h4>Criterios de Verificación</h4>
  <ul>
    <li>Verificar que sección mandatoria tiene contenido</li>
  </ul>
</section>

<section class="gate-panel__roles">
  <h4>Roles Responsables</h4>
  <ul>
    <li>Spec Writer</li>
    <li>Reviewer</li>
  </ul>
</section>

<section class="gate-panel__simulation">
  <button id="gate-simulate-toggle" type="button" aria-pressed="false">
    Simular fallo
  </button>
  <div class="gate-panel__simulation-content" hidden>
    <!-- Only visible when simulation active -->
    <div class="gate-panel__failed-criteria">
      <h4>Criterios no cumplidos</h4>
      <ul>
        <li>Todas las secciones de la plantilla de spec completadas</li>
      </ul>
    </div>
    <div class="gate-panel__remediation">
      <h4>Acciones de remediación</h4>
      <ol>
        <li>Revisar la plantilla de spec en /guide</li>
        <li>Completar las secciones faltantes</li>
        <li>Solicitar re-revisión del reviewer</li>
      </ol>
    </div>
    <div class="gate-panel__doc-links">
      <h4>Más información</h4>
      <ul>
        <li><a href="#guide-container">Guía de Specs</a></li>
        <li><a href="#guide-templates">Plantilla de Spec</a></li>
      </ul>
    </div>
  </div>
</section>
```

## GatePanel Class Interface

```javascript
class GatePanel {
  constructor(containerId)    // Container element ID
  init()                     // Load state, bind events
  openGate(gateId)           // Open panel for gate
  close()                    // Close panel
  toggleSimulation()         // Toggle simulation mode
  getState()                 // Get current panel state
  save()                     // Persist to localStorage
  load()                     // Load from localStorage
  destroy()                  // Clean up event listeners
}
```
