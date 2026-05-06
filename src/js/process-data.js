/**
 * Process Data - SDD End-to-End Process Phases
 * Used by US4: End-to-End Process Visualization
 */
(function() {
  'use strict';

  const SDD_PHASES = [
    {
      id: 'specify',
      name: 'Specify',
      displayName: 'Especificar',
      description: 'Definir qué debe hacer el sistema, bajo qué condiciones y con qué criterios de éxito antes de escribir código.',
      inputs: ['Idea de feature', 'Requisitos del usuario', 'Contexto del proyecto'],
      outputs: ['Feature Specification (spec.md)', 'Criterios de aceptación', 'Escenarios de prueba'],
      duration: '1-2 días',
      roles: ['Spec Writer', 'Product Owner'],
      artifacts: ['spec.md', 'acceptance-criteria.md'],
      color: '#3B82F6',
      order: 1
    },
    {
      id: 'clarify',
      name: 'Clarify',
      displayName: 'Aclarar',
      description: 'Refinar la especificación mediante ciclos de revisión para eliminar ambigüedades y asegurar claridad total.',
      inputs: ['Feature Specification', 'Preguntas del equipo', 'Feedback de stakeholders'],
      outputs: ['Spec refinada', 'Preguntas resueltas', 'Clarificaciones documentadas'],
      duration: '1-2 días',
      roles: ['Spec Writer', 'Reviewer', 'Product Owner'],
      artifacts: ['spec-clarified.md', 'clarifications.md'],
      color: '#8B5CF6',
      order: 2
    },
    {
      id: 'plan',
      name: 'Plan',
      displayName: 'Planificar',
      description: 'Generar el plan de implementación basado en la especificación aprobada, definiendo la arquitectura y desglose de tareas.',
      inputs: ['Spec clarificada', 'Arquitectura existente', 'Restricciones técnicas'],
      outputs: ['Implementation Plan (plan.md)', 'Data Model (data-model.md)', 'Contracts'],
      duration: '2-3 días',
      roles: ['Spec Writer', 'Tech Lead', 'Architect'],
      artifacts: ['plan.md', 'data-model.md', 'contracts/'],
      color: '#F59E0B',
      order: 3
    },
    {
      id: 'tasks',
      name: 'Tasks',
      displayName: 'Descomponer',
      description: 'Dividir el plan en tareas ejecutables, organizadas por historias de usuario y con criterios de completitud claros.',
      inputs: ['Implementation Plan', 'Data Model', 'Contracts'],
      outputs: ['Task List (tasks.md)', 'Dependencias mapeadas', 'Criterios de testing'],
      duration: '1-2 días',
      roles: ['Tech Lead', 'Developer', 'QA Engineer'],
      artifacts: ['tasks.md', 'test-plan.md'],
      color: '#10B981',
      order: 4
    },
    {
      id: 'implement',
      name: 'Implement',
      displayName: 'Implementar',
      description: 'Ejecutar las tareas siguiendo las especificaciones y el plan, con revisiones continuas de código y testing.',
      inputs: ['Task List', 'Contracts', 'Coding Standards'],
      outputs: ['Código implementado', 'Tests pasando', 'Documentación actualizada'],
      duration: '3-10 días (según complejidad)',
      roles: ['Developer', 'AI Code Generator', 'Reviewer', 'QA Engineer'],
      artifacts: ['src/**/*.js', 'tests/**/*.js', 'docs/'],
      color: '#EF4444',
      order: 5
    }
  ];

  const QUALITY_GATES = [
    {
      id: 'spec-review',
      name: 'Spec Review',
      phaseId: 'clarify',
      type: 'review',
      description: 'Revisión de la especificación por Reviewer y Product Owner. Verifica claridad, completitud y viabilidad.',
      failureAction: 'Retornar a Specify con feedback documentado. El Spec Writer corrige y reenvía para revisión.',
      position: { x: 250, y: 120 }
    },
    {
      id: 'code-review',
      name: 'Code Review',
      phaseId: 'implement',
      type: 'code-review',
      description: 'Revisión de código por Developer sénior o Reviewer. Verifica cumplimiento de spec, estándares y ausencia de bugs.',
      failureAction: 'Retornar a Developer con comentarios inline. Correcciones requeridas antes de merge.',
      position: { x: 650, y: 120 }
    },
    {
      id: 'uat',
      name: 'User Acceptance Testing',
      phaseId: 'implement',
      type: 'uat',
      description: 'Validación final por Product Owner y usuarios. Verifica que el sistema cumple con todos los criterios de aceptación.',
      failureAction: 'Reportar bugs a Developer. Correcciones y nuevo ciclo de testing antes de despliegue.',
      position: { x: 850, y: 120 }
    }
  ];

  const HANDOFFS = [
    {
      fromRole: 'Spec Writer',
      toRole: 'Spec Writer',
      phaseId: 'clarify',
      artifact: 'spec-clarified.md',
      description: 'El Spec Writer refina la spec inicial basándose en feedback de revisores'
    },
    {
      fromRole: 'Spec Writer',
      toRole: 'Tech Lead',
      phaseId: 'plan',
      artifact: 'spec-clarified.md',
      description: 'Spec finalizada se entrega al Tech Lead para planeación técnica'
    },
    {
      fromRole: 'Tech Lead',
      toRole: 'Tech Lead',
      phaseId: 'tasks',
      artifact: 'plan.md',
      description: 'Plan técnico se descompone en tareas ejecutables'
    },
    {
      fromRole: 'Tech Lead',
      toRole: 'Developer',
      phaseId: 'implement',
      artifact: 'tasks.md',
      description: 'Task list se asigna a Developers para implementación'
    },
    {
      fromRole: 'Developer',
      toRole: 'Developer',
      phaseId: 'implement',
      artifact: 'code',
      description: 'Developer implementa y pasa a otro Developer para Code Review'
    },
    {
      fromRole: 'Developer',
      toRole: 'QA Engineer',
      phaseId: 'implement',
      artifact: 'code + tests',
      description: 'Código aprobado se entrega a QA para testing'
    },
    {
      fromRole: 'QA Engineer',
      toRole: 'Product Owner',
      phaseId: 'implement',
      artifact: 'tested code',
      description: 'QA aprueba y pasa a Product Owner para UAT final'
    }
  ];

  // Export to window
  window.SDD_PHASES = SDD_PHASES;
  window.QUALITY_GATES = QUALITY_GATES;
  window.HANDOFFS = HANDOFFS;

})();
