/**
 * QualityPoint Entities for US4
 * Quality checkpoints for each phase in SDD process
 */

const qualityPoints = [
  // Specify Phase Quality Points
  {
    id: "spec-complete",
    phaseId: "specify",
    description: "Todas las secciones de la plantilla de spec completadas",
    verificationCriteria: "Verificar que sección mandatoria tiene contenido",
    mandatory: true
  },
  {
    id: "spec-testable",
    phaseId: "specify",
    description: "Cada requerimiento tiene criterios de aceptación verificables",
    verificationCriteria: "Revisar que cada FR tenga al menos un escenario de aceptación",
    mandatory: true
  },
  {
    id: "spec-consistent",
    phaseId: "specify",
    description: "Terminología consistente en todo el documento",
    verificationCriteria: "Buscar sinónimos no autorizados, verificar glosario",
    mandatory: false
  },

  // Clarify Phase Quality Points
  {
    id: "clarify-ambiguities-resolved",
    phaseId: "clarify",
    description: "Todas las preguntas de clarificación respondidas",
    verificationCriteria: "Contar preguntas en clarifications.md, verificar respuestas completas",
    mandatory: true
  },
  {
    id: "clarify-scope-clear",
    phaseId: "clarify",
    description: "Alcance del trabajo claramente definido y aceptado",
    verificationCriteria: "Revisar que sección de alcance tiene criterios de inclusión/exclusión",
    mandatory: true
  },

  // Plan Phase Quality Points
  {
    id: "plan-tasks-identified",
    phaseId: "plan",
    description: "Todas las tareas necesarias identificadas",
    verificationCriteria: "Verificar cobertura de todos los requerimientos de la spec",
    mandatory: true
  },
  {
    id: "plan-dependencies-mapped",
    phaseId: "plan",
    description: "Dependencias entre tareas mapeadas y documentadas",
    verificationCriteria: "Revisar diagrama de dependencias en plan.md",
    mandatory: true
  },
  {
    id: "plan-estimates-realistic",
    phaseId: "plan",
    description: "Estimaciones basadas en complejidad técnica",
    verificationCriteria: "Comparar con proyectos similares anteriores",
    mandatory: false
  },

  // Tasks Phase Quality Points
  {
    id: "tasks-code-quality",
    phaseId: "tasks",
    description: "Código cumple estándares del proyecto",
    verificationCriteria: "Ejecutar linter, revisar que no hay errores",
    mandatory: true
  },
  {
    id: "tasks-tested",
    phaseId: "tasks",
    description: "Cada tarea tiene pruebas asociadas",
    verificationCriteria: "Verificar cobertura de pruebas mínimo 80%",
    mandatory: true
  },

  // Implement Phase Quality Points
  {
    id: "implement-acceptance-tests-pass",
    phaseId: "implement",
    description: "Todas las pruebas de aceptación pasan",
    verificationCriteria: "Ejecutar UAT suite, 100% passing",
    mandatory: true
  },
  {
    id: "implement-code-review-done",
    phaseId: "implement",
    description: "Revisión de código completada y aprobada",
    verificationCriteria: "PR aprobado por al menos un reviewer",
    mandatory: true
  },
  {
    id: "implement-docs-complete",
    phaseId: "implement",
    description: "Documentación de usuario y técnica completa",
    verificationCriteria: "Verificar que user-documentation.md existe y es completo",
    mandatory: true
  }
];

// Export for use in process-diagram.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = qualityPoints;
}
