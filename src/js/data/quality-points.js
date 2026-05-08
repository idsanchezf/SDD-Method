/**
 * QualityPoint Entities for US4
 * Quality checkpoints for each phase in SDD process
 */

const qualityPoints = [
  // Specify Phase Quality Points
  {
    id: "spec-complete",
    phaseId: "specify",
    name: "Spec Review",
    description: "Todas las secciones de la plantilla de spec completadas",
    verificationCriteria: "Verificar que sección mandatoria tiene contenido",
    mandatory: true,
    roles: ["spec-writer", "reviewer"],
    remediationSteps: [
      "Revisar la plantilla de spec en la Guía de SDD",
      "Completar las secciones faltantes siguiendo la plantilla",
      "Solicitar re-revisión del reviewer"
    ],
    docLinks: [
      { label: "Guía de Specs", url: "#guide-container" },
      { label: "Plantilla de Spec", url: "#guide-templates" }
    ]
  },
  {
    id: "spec-testable",
    phaseId: "specify",
    name: "Spec Testable",
    description: "Cada requerimiento tiene criterios de aceptación verificables",
    verificationCriteria: "Revisar que cada FR tenga al menos un escenario de aceptación",
    mandatory: true,
    roles: ["spec-writer", "reviewer"],
    remediationSteps: [
      "Identificar FR sin escenarios de aceptación",
      "Redactar escenarios Given/When/Then para cada FR",
      "Verificar que los escenarios sean medibles"
    ],
    docLinks: [
      { label: "Guía de Criterios de Aceptación", url: "#guide-container" }
    ]
  },
  {
    id: "spec-consistent",
    phaseId: "specify",
    name: "Spec Consistency",
    description: "Terminología consistente en todo el documento",
    verificationCriteria: "Buscar sinónimos no autorizados, verificar glosario",
    mandatory: false,
    roles: ["spec-writer", "reviewer"],
    remediationSteps: [
      "Revisar términos inconsistentes en la spec",
      "Unificar vocabulario según glosario del proyecto",
      "Actualizar tabla de términos si es necesario"
    ],
    docLinks: [
      { label: "Guía de Estilo", url: "#guide-container" }
    ]
  },

  // Clarify Phase Quality Points
  {
    id: "clarify-ambiguities-resolved",
    phaseId: "clarify",
    name: "Ambiguities Resolved",
    description: "Todas las preguntas de clarificación respondidas",
    verificationCriteria: "Contar preguntas en clarifications.md, verificar respuestas completas",
    mandatory: true,
    roles: ["spec-writer", "reviewer"],
    remediationSteps: [
      "Listar preguntas de clarificación pendientes",
      "Obtener respuestas del stakeholder correspondiente",
      "Actualizar clarifications.md con respuestas completas"
    ],
    docLinks: [
      { label: "Flujo de Clarificación", url: "#collab-flow-diagram" }
    ]
  },
  {
    id: "clarify-scope-clear",
    phaseId: "clarify",
    name: "Scope Clear",
    description: "Alcance del trabajo claramente definido y aceptado",
    verificationCriteria: "Revisar que sección de alcance tiene criterios de inclusión/exclusión",
    mandatory: true,
    roles: ["spec-writer", "product-owner"],
    remediationSteps: [
      "Revisar criterios de inclusión y exclusión actuales",
      "Alinear expectativas con el product owner",
      "Documentar decisiones de alcance en la spec"
    ],
    docLinks: [
      { label: "Guía de Definición de Alcance", url: "#guide-container" }
    ]
  },

  // Plan Phase Quality Points
  {
    id: "plan-tasks-identified",
    phaseId: "plan",
    name: "Tasks Identified",
    description: "Todas las tareas necesarias identificadas",
    verificationCriteria: "Verificar cobertura de todos los requerimientos de la spec",
    mandatory: true,
    roles: ["developer", "ai-code-generator"],
    remediationSteps: [
      "Mapear cada requerimiento a una o más tareas",
      "Identificar tareas faltantes en el plan",
      "Completar tasks.md con todas las tareas identificadas"
    ],
    docLinks: [
      { label: "Plan de Implementación", url: "#process-walkthrough" }
    ]
  },
  {
    id: "plan-dependencies-mapped",
    phaseId: "plan",
    name: "Dependencies Mapped",
    description: "Dependencias entre tareas mapeadas y documentadas",
    verificationCriteria: "Revisar diagrama de dependencias en plan.md",
    mandatory: true,
    roles: ["developer"],
    remediationSteps: [
      "Identificar dependencias secuenciales entre tareas",
      "Documentar orden de ejecución en plan.md",
      "Validar que el orden sea lógicamente correcto"
    ],
    docLinks: [
      { label: "Guía de Planificación", url: "#guide-container" }
    ]
  },
  {
    id: "plan-estimates-realistic",
    phaseId: "plan",
    name: "Realistic Estimates",
    description: "Estimaciones basadas en complejidad técnica",
    verificationCriteria: "Comparar con proyectos similares anteriores",
    mandatory: false,
    roles: ["developer", "ai-code-generator"],
    remediationSteps: [
      "Revisar estimaciones contra datos históricos",
      "Ajustar estimaciones según complejidad real",
      "Documentar supuestos usados en las estimaciones"
    ],
    docLinks: [
      { label: "Guía de Estimación", url: "#guide-container" }
    ]
  },

  // Tasks Phase Quality Points
  {
    id: "tasks-code-quality",
    phaseId: "tasks",
    name: "Code Quality",
    description: "Código cumple estándares del proyecto",
    verificationCriteria: "Ejecutar linter, revisar que no hay errores",
    mandatory: true,
    roles: ["developer", "ai-reviewer"],
    remediationSteps: [
      "Ejecutar linter para identificar violaciones",
      "Corregir errores de estilo y formato",
      "Re-ejecutar linter hasta pasar sin errores"
    ],
    docLinks: [
      { label: "Constitution Checker", url: "#constitution-checker" }
    ]
  },
  {
    id: "tasks-tested",
    phaseId: "tasks",
    name: "Tasks Tested",
    description: "Cada tarea tiene pruebas asociadas",
    verificationCriteria: "Verificar cobertura de pruebas mínimo 80%",
    mandatory: true,
    roles: ["developer", "ai-reviewer"],
    remediationSteps: [
      "Identificar tareas sin pruebas asociadas",
      "Escribir pruebas unitarias para cada tarea",
      "Verificar cobertura mínima del 80%"
    ],
    docLinks: [
      { label: "Guía de Testing", url: "#guide-container" }
    ]
  },

  // Implement Phase Quality Points
  {
    id: "implement-acceptance-tests-pass",
    phaseId: "implement",
    name: "Acceptance Tests Pass",
    description: "Todas las pruebas de aceptación pasan",
    verificationCriteria: "Ejecutar UAT suite, 100% passing",
    mandatory: true,
    roles: ["developer", "reviewer"],
    remediationSteps: [
      "Ejecutar suite de pruebas de aceptación",
      "Identificar y corregir pruebas fallidas",
      "Re-ejecutar hasta obtener 100% passing"
    ],
    docLinks: [
      { label: "Recorrido Interactivo", url: "#process-walkthrough" }
    ]
  },
  {
    id: "implement-code-review-done",
    phaseId: "implement",
    name: "Code Review Done",
    description: "Revisión de código completada y aprobada",
    verificationCriteria: "PR aprobado por al menos un reviewer",
    mandatory: true,
    roles: ["developer", "ai-reviewer", "reviewer"],
    remediationSteps: [
      "Abrir PR con cambios implementados",
      "Responder a comentarios del reviewer",
      "Obtener aprobación del reviewer"
    ],
    docLinks: [
      { label: "Constitution - Workflow", url: "#principles-grid" }
    ]
  },
  {
    id: "implement-docs-complete",
    phaseId: "implement",
    name: "Docs Complete",
    description: "Documentación de usuario y técnica completa",
    verificationCriteria: "Verificar que user-documentation.md existe y es completo",
    mandatory: true,
    roles: ["developer", "spec-writer"],
    remediationSteps: [
      "Listar documentación faltante",
      "Redactar documentación de usuario y técnica",
      "Verificar completitud contra checklist de documentación"
    ],
    docLinks: [
      { label: "Plantillas de Documentación", url: "#guide-templates" }
    ]
  }
];

// Export for use in process-diagram.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = qualityPoints;
}
