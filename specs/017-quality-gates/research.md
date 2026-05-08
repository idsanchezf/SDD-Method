# Research: Quality Gates Interactivos

## Overview

No se identificaron NEEDS CLARIFICATION en el spec (1 clarificación resuelta: localStorage persistence). La investigación se centra en determinar cómo extender el diagrama SVG existente para soportar interacción en los quality gates.

## Existing Gate Data Analysis

Los quality gates viven en `src/js/data/quality-points.js` como un array de objetos con:
- `id`, `phaseId`, `description`, `verificationCriteria`, `mandatory`

**Gap**: Los datos actuales no incluyen campos que el spec requiere:
- `role` (roles responsables)
- `remediationSteps` (acciones de remediación para simulación)
- `docLinks` (enlaces a documentación relacionada)
- `name` (nombre corto visible)

**Decision**: Extender `quality-points.js` con estos campos adicionales, preservando la estructura existente (misma fuente de verdad).

## Existing Gate Rendering

En `process-diagram.js:292-338`, los gates se renderizan como SVG `<polygon>` (diamantes) dentro de `gGates` con `role="img"`. Actualmente solo soportan `toggleGateHighlight(phaseId)` → cambiar color de relleno.

**Gap**: No hay eventos de click individual por gate ni dispatch de eventos personalizados para que el panel reaccione.

**Decision**: Modificar `renderGates()` para añadir `role="button"`, `tabindex`, y dispatchar `gate:select` en click/keydown (mismo patrón que `selectNode`).

## Component Architecture

| Component | File | Responsibility |
|-----------|------|----------------| 
| ProcessDiagram (extendido) | process-diagram.js | Dispatchar `gate:select` y `gate:explored` events |
| GatePanel | gate-panel.js | Renderizar panel detalle con tabs (info, simulación, remediación) |
| GateProgress | gate-progress.js | Persistencia localStorage, estado de exploración |

## localStorage Schema

Clave: `sdd-gates-progress` (mismo prefijo `sdd-` que Constitution Checker y Collaboration Flow)

```json
{
  "exploredGates": {
    "spec-complete": { "explored": true, "simulationActive": false, "lastAccessed": 1715012345678 },
    "clarify-ambiguities-resolved": { "explored": false, "simulationActive": false, "lastAccessed": null }
  },
  "lastUpdated": 1715012345678
}
```

## Panel Interaction Design

### Gate Click → Panel Open
- SVG diamond dispatcha `gate:select` con `{ gateId, phaseId }`
- GatePanel escucha, busca datos en qualityPoints extendido + roles existentes
- Panel se renderiza como `div[role="dialog"]` con overlay

### Panel Content (responsive)
- **Desktop**: Panel lateral flotante (350px-400px) anclado a la derecha del diagrama
- **Mobile**: Overlay full-screen con botón de cierre visible

### Simular Fallo
- Botón toggle "Simular fallo" en el panel
- Activo → gate SVG cambia a rojo (`var(--color-gate-failed)`)
- Muestra lista de criterios no cumplidos + remediaciones paso a paso + enlaces doc
- Desactivar → restaura color neutral, no afecta estado "explorado"

## Gate Explored Marking

- Al cerrar el panel por primera vez para un gate, se marca como "explorado"
- SVG recibe clase `diagram-gate--explored` (borde verde/badge)
- Persiste en localStorage bajo clave `sdd-gates-progress`

## Alternatives Considered

| Alternativa | Razón para no elegirla |
|-------------|------------------------|
| Panel como tooltip/Hover card | No soporta el contenido rico (remediaciones, enlaces) que requiere FR-004/FR-005 |
| Modal nativo (`<dialog>`) | Menos flexible para posicionamiento lateral en desktop; overlay full-screen en mobile es mejor UX |
| Web Component | Sin build steps y vanilla-first; una clase JS es suficiente |
| Datos separados de quality-points.js | FR-009 explícitamente dice usar la fuente existente |

## Decisiones

- **Decision**: Extender `quality-points.js` con campos faltantes (name, roles, remediationSteps, docLinks)
- **Rationale**: FR-009 requiere fuente existente; añadir campos es menos riesgoso que duplicar
- **Decision**: GatePanel como clase separada (no dentro de ProcessDiagram)
- **Rationale**: Separación de concerns — el diagrama renderiza SVG, el panel maneja UI overlay
- **Decision**: Eventos personalizados (`gate:select`) para comunicación diagrama → panel
- **Rationale**: Mismo patrón que `phase:select`, `phase:highlight`, `role:highlight` existentes
- **Decision**: localStorage con clave `sdd-gates-progress`
- **Rationale**: Match existing pattern (constitution: `sdd-constitution-progress`, collab: `sdd-collab-progress`)
