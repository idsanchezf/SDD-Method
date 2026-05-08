# Data Model: Quality Gates Interactivos

## Entities

### QualityGate (extendido de quality-points.js)

Punto de control de calidad en el proceso SDD. Fuente de verdad: `src/js/data/quality-points.js`.

| Campo | Tipo | Existente | Descripción |
|-------|------|-----------|-------------|
| id | string | ✅ | Identificador único (ej. "spec-complete") |
| phaseId | string | ✅ | Fase asociada (ej. "specify") |
| description | string | ✅ | Descripción del gate |
| verificationCriteria | string | ✅ | Criterios de verificación |
| mandatory | boolean | ✅ | Si es obligatorio o recomendado |
| name | string | ❌ NUEVO | Nombre corto visible (ej. "Spec Review") |
| roles | string[] | ❌ NUEVO | Roles responsables (slugs desde roles-integration) |
| remediationSteps | string[] | ❌ NUEVO | Acciones de remediación paso a paso |
| docLinks | {label: string, url: string}[] | ❌ NUEVO | Enlaces a documentación relacionada |

### GateExploration

Estado de interacción del usuario con un gate. Persistido en localStorage.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| gateId | string | ID del quality gate |
| explored | boolean | Si el usuario ha abierto el panel al menos una vez |
| simulationActive | boolean | Si el modo "Simular fallo" está activo |
| lastAccessed | number (timestamp) | Último acceso en ms |

### GateProgress

Estado de todos los gates explorados. Persistido en localStorage (clave: `sdd-gates-progress`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| exploredGates | Object<string, GateExploration> | Mapa de gateId → estado |
| lastUpdated | number | Timestamp de última modificación |

## Extended quality-points.js Data Shape

```javascript
const qualityPoints = [
  {
    id: "spec-complete",
    phaseId: "specify",
    name: "Spec Review",              // NUEVO
    description: "Todas las secciones de la plantilla de spec completadas",
    verificationCriteria: "Verificar que sección mandatoria tiene contenido",
    mandatory: true,
    roles: ["spec-writer", "reviewer"],  // NUEVO (slugs de roles-integration.js)
    remediationSteps: [                  // NUEVO
      "Revisar la plantilla de spec en /guide",
      "Completar las secciones faltantes",
      "Solicitar re-revisión del reviewer"
    ],
    docLinks: [                          // NUEVO
      { label: "Guía de Specs", url: "#guide-container" },
      { label: "Plantilla de Spec", url: "#guide-templates" }
    ]
  },
  // ... (mismos campos para todos los gates existentes)
];
```

## State Shape (localStorage)

```javascript
{
  "exploredGates": {
    "spec-complete": {
      "explored": true,
      "simulationActive": false,
      "lastAccessed": 1715012345678
    },
    "clarify-ambiguities-resolved": {
      "explored": false,
      "simulationActive": false,
      "lastAccessed": null
    }
    // ... (por cada gateId en qualityPoints)
  },
  "lastUpdated": 1715012345678
}
```
