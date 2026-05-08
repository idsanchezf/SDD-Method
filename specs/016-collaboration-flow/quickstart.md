# Quickstart: Flujo de Colaboración Humano-IA

## Files to Create

| File | Purpose |
|------|---------|
| `src/css/collab-flow.css` | Estilos de la sección (diagrama, cards, tabs, checklist de supervisión) |
| `src/js/collab-flow.js` | Lógica: renderizado del diagrama, panel de fase, biblioteca de prompts, panel de supervisión, persistencia localStorage |
| `src/index.html` | Nueva sección `<section id="collab-flow">` + script/css refs + sidebar entry |

## Files to Modify

| File | Change |
|------|--------|
| `src/index.html` | Insertar sección tras Constitución, añadir `<link>` CSS y `<script>` JS |
| `src/js/section-nav.js` | Añadir `if (el.id === 'collab-flow') return 'collab-flow'` al scroll spy |

## Implementation Order

1. **Data layer**: Definir arrays `PHASES`, `PROMPTS`, `SUPERVISION_POINTS` en collab-flow.js
2. **Component: Diagram**: Renderizar las 5 fases como cards horizontales con estados
3. **Component: Phase Panel**: Al hacer clic en una fase, mostrar panel con tabs (Colaboración / Prompts / Supervisión)
4. **Component: Prompt Library**: Lista expandible de prompts con filtros por fase y rol IA
5. **Component: Supervision Checklist**: Checkbox por punto, progreso visual, persistencia localStorage
6. **Integration**: Sidebar entry + scroll spy

## Key Design Patterns (from existing sections)

- **CSS**: Custom properties from `variables.css`, BEM naming, `.collab-flow-section` wrapper
- **JS Class**: `collab-flow.js` exports `CollaborationFlow` class with `init()`, `renderDiagram()`, `selectPhase()`, etc.
- **localStorage**: Key `sdd-collab-progress` — same strategy as constitution.js
- **Sidebar**: `<li class="sidebar__section" data-section-target="collab-flow">` with submenus for each view

## Expected localStorage structure

```json
{
  "activePhase": "specify",
  "supervisionChecks": {
    "specify": { "spec-acceptance": true, "spec-edge-cases": false }
  },
  "exploredPrompts": ["gen-spec-draft"],
  "lastUpdated": 1715012345678
}
```
