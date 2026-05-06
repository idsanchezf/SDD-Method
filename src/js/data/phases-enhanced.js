/**
 * Enhanced Phase Data for US4 - Includes handoffs and quality points
 * Extends US2 phase data with US4 requirements
 */

const phasesEnhanced = [
  {
    id: "specify",
    order: 1,
    name: "Specify",
    description: "Definir qué se va a construir mediante especificaciones claras y detalladas.",
    longDescription: "La fase de Specify es el fundamento del proceso SDD. Aquí se captura la visión completa de la funcionalidad, incluyendo requisitos funcionales, criterios de aceptación, y entradas/salidas esperadas. El resultado es un documento spec.md completo y listo para revisión.",
    inputs: ["Feature idea", "User story", "Business requirements"],
    outputs: ["spec.md"],
    duration: {
      greenfield: "2-3 days",
      brownfield: "3-5 days"
    },
    roles: ["spec-writer", "product-owner", "ai-spec-assistant"],
    tips: [
      "Incluye ejemplos concretos en la especificación",
      "Define criterios de aceptación medibles",
      "Considera casos edge desde el inicio"
    ],
    artifacts: ["spec.md - Ejemplo: User login feature spec"],
    qualityPoints: [
      {
        id: "spec-complete",
        description: "Todas las secciones de la plantilla de spec completadas",
        verificationCriteria: "Verificar que sección mandatoria tiene contenido",
        mandatory: true
      },
      {
        id: "spec-testable",
        description: "Cada requerimiento tiene criterios de aceptación verificables",
        verificationCriteria: "Revisar que cada FR tenga al menos un escenario de aceptación",
        mandatory: true
      },
      {
        id: "spec-consistent",
        description: "Terminología consistente en todo el documento",
        verificationCriteria: "Buscar sinónimos no autorizados, verificar glosario",
        mandatory: false
      }
    ],
    handoffs: [
      {
        id: "specify-to-clarify",
        fromRole: "spec-writer",
        toRole: "developer",
        artifact: "spec.md",
        acceptanceCriteria: ["Spec aprobada por reviewer", "Criterios de aceptación claros"],
        caseType: "both"
      },
      {
        id: "specify-to-clarify-ai",
        fromRole: "ai-spec-assistant",
        toRole: "spec-writer",
        artifact: "spec-draft.md",
        acceptanceCriteria: ["Borrador revisado por humano", "Ajustado a contexto del proyecto"],
        caseType: "both"
      }
    ]
  },
  {
    id: "clarify",
    order: 2,
    name: "Clarify",
    description: "Refinar y validar la especificación eliminando ambigüedades antes del planeamiento.",
    longDescription: "En la fase Clarify, el equipo revisa la especificación para identificar ambigüedades, contradicciones o requisitos faltantes. Se realizan preguntas de clarificación, se ajusta el alcance si es necesario, y se asegura que todos los participantes tengan la misma comprensión del trabajo a realizar.",
    inputs: ["spec.md"],
    outputs: ["spec.md (updated)", "clarifications.md"],
    duration: {
      greenfield: "1-2 days",
      brownfield: "2-3 days"
    },
    roles: ["developer", "spec-writer", "product-owner", "ai-spec-assistant"],
    tips: [
      "Documenta todas las decisiones de alcance",
      "Usa ejemplos concretos para validar interpretación",
      "Identifica dependencias temprano"
    ],
    artifacts: ["clarifications.md - Ejemplo: Q&A session notes"],
    qualityPoints: [
      {
        id: "clarify-ambiguities-resolved",
        description: "Todas las preguntas de clarificación respondidas",
        verificationCriteria: "Contar preguntas en clarifications.md, verificar respuestas completas",
        mandatory: true
      },
      {
        id: "clarify-scope-clear",
        description: "Alcance del trabajo claramente definido y aceptado",
        verificationCriteria: "Revisar que sección de alcance tiene criterios de inclusión/exclusión",
        mandatory: true
      }
    ],
    handoffs: [
      {
        id: "clarify-to-plan",
        fromRole: "developer",
        toRole: "developer",
        artifact: "spec.md (clarified)",
        acceptanceCriteria: ["Spec lista para planeamiento", "Ambigüedades eliminadas"],
        caseType: "both"
      }
    ]
  },
  {
    id: "plan",
    order: 3,
    name: "Plan",
    description: "Crear un plan de implementación detallado con tareas, dependencias y estimaciones.",
    longDescription: "La fase Plan transforma la especificación clarificada en un plan de acción ejecutable. Se identifican las tareas necesarias, sus dependencias, la estrategia de implementación y las estimaciones de tiempo. El resultado es un plan.md que guiará el trabajo de desarrollo.",
    inputs: ["spec.md (clarified)"],
    outputs: ["plan.md"],
    duration: {
      greenfield: "2-3 days",
      brownfield: "3-4 days"
    },
    roles: ["developer", "spec-writer", "ai-spec-assistant"],
    tips: [
      "Identifica tareas que pueden paralelizarse",
      "Considera riesgos técnicos en las estimaciones",
      "Incluye criterios de 'Done' para cada tarea"
    ],
    artifacts: ["plan.md - Ejemplo: Task breakdown with dependencies"],
    qualityPoints: [
      {
        id: "plan-tasks-identified",
        description: "Todas las tareas necesarias identificadas",
        verificationCriteria: "Verificar cobertura de todos los requerimientos de la spec",
        mandatory: true
      },
      {
        id: "plan-dependencies-mapped",
        description: "Dependencias entre tareas mapeadas y documentadas",
        verificationCriteria: "Revisar diagrama de dependencias en plan.md",
        mandatory: true
      },
      {
        id: "plan-estimates-realistic",
        description: "Estimaciones basadas en complejidad técnica",
        verificationCriteria: "Comparar con proyectos similares anteriores",
        mandatory: false
      }
    ],
    handoffs: [
      {
        id: "plan-to-tasks",
        fromRole: "developer",
        toRole: "developer",
        artifact: "plan.md",
        acceptanceCriteria: ["Plan aprobado por reviewer", "Tareas listas para ejecución"],
        caseType: "both"
      }
    ]
  },
  {
    id: "tasks",
    order: 4,
    name: "Tasks",
    description: "Descomponer el plan en tareas ejecutables y generar código (con asistencia de IA).",
    longDescription: "En la fase Tasks, el plan se descompone en tareas específicas que pueden ser asignadas y ejecutadas. Con la ayuda de IA (AI Code Generator), se comienza la implementación del código. Cada tarea debe tener criterios de completitud claros y pruebas asociadas.",
    inputs: ["plan.md"],
    outputs: ["tasks.md", "src/ (initial code)"],
    duration: {
      greenfield: "3-5 days",
      brownfield: "5-8 days"
    },
    roles: ["developer", "ai-code-generator", "reviewer"],
    tips: [
      "Implementa las tareas en orden de dependencia",
      "Ejecuta pruebas después de cada tarea completada",
      "Documenta decisiones técnicas importantes"
    ],
    artifacts: ["tasks.md - Ejemplo: Task list with status", "src/initial-code.js - First implementation"],
    qualityPoints: [
      {
        id: "tasks-code-quality",
        description: "Código cumple estándares del proyecto",
        verificationCriteria: "Ejecutar linter, revisar que no hay errores",
        mandatory: true
      },
      {
        id: "tasks-tested",
        description: "Cada tarea tiene pruebas asociadas",
        verificationCriteria: "Verificar cobertura de pruebas mínimo 80%",
        mandatory: true
      }
    ],
    handoffs: [
      {
        id: "tasks-to-implement",
        fromRole: "developer",
        toRole: "developer",
        artifact: "tasks.md (in progress)",
        acceptanceCriteria: ["Tareas core completadas", "Pruebas pasando"],
        caseType: "both"
      },
      {
        id: "tasks-review-ai",
        fromRole: "ai-code-generator",
        toRole: "reviewer",
        artifact: "generated-code.js",
        acceptanceCriteria: ["Código revisado por humano", "Ajustes aplicados"],
        caseType: "both"
      }
    ]
  },
  {
    id: "implement",
    order: 5,
    name: "Implement",
    description: "Finalizar la implementación, realizar pruebas de aceptación y entregar el producto terminado.",
    longDescription: "La fase Implement es donde se completa todo el trabajo de desarrollo. Se finalizan las tareas restantes, se integran todos los componentes, se realizan pruebas de aceptación (UAT), y se prepara el producto para su entrega. Incluye revisión final de código y documentación.",
    inputs: ["tasks.md (completed)", "src/ (code)"],
    outputs: ["Deliverable product", "test-report.md", "user-documentation.md"],
    duration: {
      greenfield: "2-4 days",
      brownfield: "4-6 days"
    },
    roles: ["developer", "reviewer", "product-owner", "ai-reviewer"],
    tips: [
      "Realiza una prueba de aceptación completa antes de entregar",
      "Verifica que toda la documentación esté actualizada",
      "Asegura que el producto cumple con todos los criterios de aceptación"
    ],
    artifacts: ["test-report.md - Ejemplo: UAT results", "user-documentation.md - User guide"],
    qualityPoints: [
      {
        id: "implement-acceptance-tests-pass",
        description: "Todas las pruebas de aceptación pasan",
        verificationCriteria: "Ejecutar UAT suite, 100% passing",
        mandatory: true
      },
      {
        id: "implement-code-review-done",
        description: "Revisión de código completada y aprobada",
        verificationCriteria: "PR aprobado por al menos un reviewer",
        mandatory: true
      },
      {
        id: "implement-docs-complete",
        description: "Documentación de usuario y técnica completa",
        verificationCriteria: "Verificar que user-documentation.md existe y es completo",
        mandatory: true
      }
    ],
    handoffs: [
      {
        id: "implement-to-production",
        fromRole: "developer",
        toRole: "product-owner",
        artifact: "Deliverable product",
        acceptanceCriteria: ["Producto aceptado por Product Owner", "Documentación entregada"],
        caseType: "both"
      },
      {
        id: "implement-ai-review",
        fromRole: "ai-reviewer",
        toRole: "developer",
        artifact: "review-report.md",
        acceptanceCriteria: ["Reporte procesado", "Issues críticos resueltos"],
        caseType: "both"
      }
    ]
  }
];

// Export for use in process-diagram.js and walkthrough.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = phasesEnhanced;
}
