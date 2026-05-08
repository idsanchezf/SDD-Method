# Quickstart: Quality Gates Interactivos

## Files to Create

| File | Purpose |
|------|---------|
| `src/js/gate-panel.js` | GatePanel class: renderizar panel detalle, simulación, remediaciones |
| `src/css/gate-panel.css` | Estilos del panel (lateral desktop, overlay mobile, estados SVG) |

## Files to Modify

| File | Change |
|------|--------|
| `src/js/data/quality-points.js` | Extender cada gate con: `name`, `roles`, `remediationSteps`, `docLinks` |
| `src/js/process-diagram.js` | Añadir dispatch `gate:select` en click/keydown de gates, escuchar `gate:simulation` y `gate:explored` para actualizar SVG |
| `src/css/process.css` | Añadir clases: `diagram-gate--explored`, `diagram-gate--failed`, estilo hover/active en gates |
| `src/index.html` | Añadir contenedor `<div id="gate-panel">` tras diagrama, `<link>` CSS y `<script>` JS |
| `src/js/section-nav.js` | Añadir `if (el.id === 'gate-panel') return 'process-end-to-end'` al scroll spy (opcional) |

## Implementation Order

1. **Data layer**: Extender `quality-points.js` con campos nuevos (name, roles, remediationSteps, docLinks)
2. **CSS: Gate panel styles**: Panel lateral/overlay, estados de gate en diagrama, responsive
3. **CSS: Gate states in process.css**: `.diagram-gate--explored`, `.diagram-gate--failed`
4. **Component: GatePanel class**: Render panel con sections (info, criteria, roles, simulation)
5. **Component: GateProgress persistence**: localStorage save/load para estado de exploración
6. **Integration: ProcessDiagram events**: Dispatch `gate:select` en click, listen for `gate:simulation`/`gate:explored`
7. **Integration: index.html**: Panel container + script/css refs
8. **Integration: quality-points.js**: Rellenar campos nuevos para todos los gates

## Key Design Patterns (from existing sections)

- **CSS**: Custom properties from `variables.css`, BEM naming with `.gate-panel` prefix
- **JS Class**: GatePanel class with `init()`, `openGate(gateId)`, `close()`, `toggleSimulation()`
- **localStorage**: Key `sdd-gates-progress` — same save/load pattern as constitution.js / collab-flow.js
- **Events**: Custom events (`gate:select`, `gate:simulation`, `gate:explored`) — same pattern as `phase:select`, `role:highlight`
- **Responsive**: Desktop = lateral panel (350px), Mobile (< 768px) = full-screen overlay

## Expected localStorage structure

```json
{
  "exploredGates": {
    "spec-complete": { "explored": true, "simulationActive": false, "lastAccessed": 1715012345678 }
  },
  "lastUpdated": 1715012345678
}
```
