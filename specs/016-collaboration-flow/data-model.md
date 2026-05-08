# Data Model: Flujo de Colaboración Humano-IA

## Entities

### CollaborationPhase

Representa una fase del SDD con su configuración de colaboración.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | string | Identificador único (specify, clarify, plan, tasks, implement) |
| name | string | Nombre visible de la fase |
| humanRole | string | Rol humano principal |
| aiRole | string | Rol IA asignado |
| artifact | string | Artefacto producido |
| supervisionSummary | string | Descripción breve del punto de supervisión |
| order | number | Orden de la fase (1-5) |
| accentColor | string | Color de la fase para UI |

### IAPrompt

Instrucción estructurada para un rol de IA en una fase específica.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | string | Identificador único |
| name | string | Nombre corto del prompt |
| phaseId | string | Fase destino |
| aiRole | string | Rol IA al que va dirigido |
| prompt | string | Texto completo del prompt (con placeholders {{variable}}) |
| exampleOutput | string | Ejemplo de lo que la IA debería producir |

### SupervisionPoint

Ítem específico que el humano debe verificar.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | string | Identificador único |
| phaseId | string | Fase asociada |
| description | string | Qué debe revisar el humano |
| order | number | Orden de revisión |

### CollaborationProgress

Estado persistido del progreso del usuario.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| activePhase | string | Fase actualmente seleccionada |
| supervisionChecks | object | Mapa de phaseId → { pointId: boolean } |
| exploredPrompts | string[] | IDs de prompts que el usuario ha expandido |
| lastUpdated | number | Timestamp de última modificación |

## Data Shape (JavaScript)

```javascript
const PHASES = [
  { id: 'specify', name: 'Specify', humanRole: 'Spec Writer', aiRole: 'AI Spec Assistant',
    artifact: 'spec.md', supervisionSummary: 'Revisar criterios de aceptación',
    order: 1, accentColor: '#4A90E2' },
  { id: 'clarify', name: 'Clarify', humanRole: 'Spec Writer + Reviewer', aiRole: 'AI Spec Assistant',
    artifact: 'spec.md (clarified)', supervisionSummary: 'Validar respuestas de negocio',
    order: 2, accentColor: '#50E3C2' },
  { id: 'plan', name: 'Plan', humanRole: 'Developer', aiRole: 'AI Code Generator',
    artifact: 'plan.md', supervisionSummary: 'Verificar constitución',
    order: 3, accentColor: '#F5A623' },
  { id: 'tasks', name: 'Tasks', humanRole: 'Developer', aiRole: 'AI Code Generator',
    artifact: 'tasks.md', supervisionSummary: 'Revisar granularidad',
    order: 4, accentColor: '#D0021B' },
  { id: 'implement', name: 'Implement', humanRole: 'Developer', aiRole: 'AI Code Generator + AI Reviewer',
    artifact: 'Código funcional', supervisionSummary: 'Verificar contra criterios de aceptación',
    order: 5, accentColor: '#7ED321' },
];

const PROMPTS = [
  { id: 'gen-spec-draft', name: 'Generar draft de spec', phaseId: 'specify', aiRole: 'AI Spec Assistant',
    prompt: 'Escribe una especificación funcional para {{feature}} con historias de usuario en formato Given/When/Then...',
    exampleOutput: '### User Story 1 - ...\n\n**Given**...' },
  { id: 'identify-ambiguities', name: 'Identificar ambigüedades', phaseId: 'clarify', aiRole: 'AI Spec Assistant',
    prompt: 'Revisa esta spec y lista ambigüedades: {{specText}}...',
    exampleOutput: '1. No se especifica qué pasa si...' },
  // ... (more prompts per phase)
];

const SUPERVISION_POINTS = [
  { id: 'spec-acceptance', phaseId: 'specify', description: 'Los criterios de aceptación cubren todos los escenarios clave', order: 1 },
  { id: 'spec-edge-cases', phaseId: 'specify', description: 'Los edge cases están identificados y resueltos', order: 2 },
  // ... (more points per phase)
];
```
