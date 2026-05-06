/**
 * Handoff Entities for US4
 * Transitions of work between roles in SDD process
 */

const handoffs = [
  // Specify Phase Handoffs
  {
    id: "spec-writer-to-developer",
    fromPhase: "specify",
    toPhase: "clarify",
    fromRole: "spec-writer",
    toRole: "developer",
    artifact: "spec.md",
    acceptanceCriteria: [
      "Spec aprobada por reviewer",
      "Criterios de aceptación claros y medibles",
      "Estructura de plantilla completa"
    ],
    caseType: "both"
  },
  {
    id: "ai-spec-to-human",
    fromPhase: "specify",
    toPhase: "specify",
    fromRole: "ai-spec-assistant",
    toRole: "spec-writer",
    artifact: "spec-draft.md",
    acceptanceCriteria: [
      "Borrador revisado por humano",
      "Ajustado a contexto del proyecto",
      "Terminología consistente"
    ],
    caseType: "both"
  },

  // Clarify Phase Handoffs
  {
    id: "developer-to-developer-clarify",
    fromPhase: "clarify",
    toPhase: "plan",
    fromRole: "developer",
    toRole: "developer",
    artifact: "spec.md (clarified)",
    acceptanceCriteria: [
      "Spec lista para planeamiento",
      "Ambigüedades eliminadas",
      "Clarificaciones documentadas en clarifications.md"
    ],
    caseType: "both"
  },

  // Plan Phase Handoffs
  {
    id: "developer-to-developer-plan",
    fromPhase: "plan",
    toPhase: "tasks",
    fromRole: "developer",
    toRole: "developer",
    artifact: "plan.md",
    acceptanceCriteria: [
      "Plan aprobado por reviewer",
      "Tareas listas para ejecución",
      "Dependencias mapeadas"
    ],
    caseType: "both"
  },

  // Tasks Phase Handoffs
  {
    id: "developer-to-developer-tasks",
    fromPhase: "tasks",
    toPhase: "implement",
    fromRole: "developer",
    toRole: "developer",
    artifact: "tasks.md (in progress)",
    acceptanceCriteria: [
      "Tareas core completadas",
      "Pruebas pasando",
      "Código cumple estándares"
    ],
    caseType: "both"
  },
  {
    id: "ai-code-to-reviewer",
    fromPhase: "tasks",
    toPhase: "tasks",
    fromRole: "ai-code-generator",
    toRole: "reviewer",
    artifact: "generated-code.js",
    acceptanceCriteria: [
      "Código revisado por humano",
      "Ajustes aplicados",
      "Pruebas unitarias añadidas"
    ],
    caseType: "both"
  },

  // Implement Phase Handoffs
  {
    id: "developer-to-product-owner",
    fromPhase: "implement",
    toPhase: "implement",
    fromRole: "developer",
    toRole: "product-owner",
    artifact: "Deliverable product",
    acceptanceCriteria: [
      "Producto aceptado por Product Owner",
      "Documentación entregada",
      "Pruebas de aceptación pasando"
    ],
    caseType: "both"
  },
  {
    id: "ai-reviewer-to-developer",
    fromPhase: "implement",
    toPhase: "implement",
    fromRole: "ai-reviewer",
    toRole: "developer",
    artifact: "review-report.md",
    acceptanceCriteria: [
      "Reporte procesado",
      "Issues críticos resueltos",
      "Mejoras implementadas"
    ],
    caseType: "both"
  }
];

// Export for use in process-diagram.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = handoffs;
}
