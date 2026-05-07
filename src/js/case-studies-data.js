/**
 * Case Studies Data - Greenfield & Brownfield Examples
 * Used by US4: End-to-End Process Visualization
 */
(function() {
  'use strict';

  const CASE_STUDIES = {
    greenfield: {
      id: 'greenfield',
      title: 'Proyecto Nuevo (Greenfield)',
      type: 'greenfield',
      context: 'Startup de e-commerce necesita construir una plataforma de ventas desde cero. El equipo tiene libertad total de elección tecnológica y no hay código legacy.',
      techStack: 'Vanilla JS, Node.js, PostgreSQL',
      teamSize: '5 personas (1 Product Owner, 1 Spec Writer, 2 Developers, 1 QA)',
      duration: '6 semanas',
      phases: [
        {
          phaseId: 'specify',
          summary: 'Se define el scope inicial: catálogo de productos, carrito, checkout y panel de admin.',
          artifacts: {
            'spec.md': '# Feature: Catálogo de Productos\n\n## Descripción\nLos usuarios pueden ver lista de productos con filtros...\n\n## Criterios de Aceptación\n1. Given usuario en homepage, When navega a /catalog, Then ve lista de 12 productos...',
            'acceptance-criteria.md': '- [ ] Catálogo muestra productos\n- [ ] Filtros funcionan correctamente\n- [ ] Paginación de 12 items'
          },
          notes: 'Al ser greenfield, se pudo definir una arquitectura limpia desde el inicio. Se eligió SPA con Vanilla JS por simplicidad.'
        },
        {
          phaseId: 'clarify',
          summary: 'El equipo revisa la spec y agrega detalles sobre paginación, manejo de imágenes y fallbacks.',
          artifacts: {
            'spec-clarified.md': '## Clarificaciones\n- Paginación: 12 items por página, lazy loading\n- Imágenes: fallback a placeholder si falla carga\n- Filtros: por categoría, precio y rating'
          },
          notes: 'Se aclararon ambigüedades sobre el comportamiento de paginación y manejo de errores de red.'
        },
        {
          phaseId: 'plan',
          summary: 'Se diseña la arquitectura: API REST en Node.js, frontend Vanilla JS modular, DB PostgreSQL.',
          artifacts: {
            'plan.md': '# Implementation Plan: Catálogo de Productos\n\n## Tech Stack\n- Backend: Node.js + Express\n- Frontend: Vanilla JS (ES6+)\n- DB: PostgreSQL\n\n## Data Model\n- Product (id, name, price, category, image)...',
            'data-model.md': '## Entities\n### Product\n- id: UUID\n- name: string\n- price: decimal\n- category: enum\n- imageUrl: string'
          },
          notes: 'La planeación fue directa al no tener restricciones de código existente.'
        },
        {
          phaseId: 'tasks',
          summary: 'Se dividen en 8 tareas: modelos DB, API endpoints, componentes UI, integración.',
          artifacts: {
            'tasks.md': '## Phase 3: User Story 1 - Catálogo (P1)\n- [ ] T001 Create Product model in models/product.js\n- [ ] T002 [P] Create GET /api/products endpoint\n- [ ] T003 [P] Create catalog-page.js component...'
          },
          notes: 'Las tareas se asignaron en paralelo: 1 dev en backend, 1 dev en frontend.'
        },
        {
          phaseId: 'implement',
          summary: 'Implementación tomó 10 días. Code reviews diarios. QA encontró 3 bugs menores resueltos en 2 días.',
          artifacts: {
            'src/models/product.js': 'class Product {\n  constructor(data) {\n    this.id = data.id;\n    this.name = data.name;\n    //...\n  }\n}',
            'tests/integration/test-catalog.js': 'describe("Catálogo de Productos", function() {\n  it("muestra 12 productos", ...);\n});'
          },
          notes: 'Al no haber deuda técnica, el código fue limpio y testing sencillo. Deploy exitoso en día 15.'
        }
      ],
      challenges: [
        'Decisión de arquitectura inicial sin datos históricos',
        'Configuración de CI/CD desde cero',
        'Definir estándares de código sin precedentes'
      ],
      lessons: [
        'Invertir tiempo en una buena spec ahorra semanas de rework',
        'La arquitectura limpia desde el inicio facilita escalabilidad futura',
        'El uso de Vanilla JS permitió onboarding rápido de nuevos devs'
      ]
    },
    brownfield: {
      id: 'brownfield',
      title: 'Proyecto Legado (Brownfield)',
      type: 'brownfield',
      context: 'Empresa retail tiene sistema de inventario en PHP 5.6 (legacy) y necesita agregar módulo de ventas online manteniendo compatibilidad con sistema existente.',
      techStack: 'PHP 5.6 (legacy), jQuery (legacy), Python Flask (nuevo módulo), MySQL',
      teamSize: '4 personas (1 Product Owner, 1 Spec Writer, 1 Legacy Developer, 1 Modern Developer)',
      duration: '10 semanas',
      phases: [
        {
          phaseId: 'specify',
          summary: 'Se define el módulo de ventas online que debe integrarse con inventario existente vía API.',
          artifacts: {
            'spec.md': '# Feature: Módulo de Ventas Online\n\n## Contexto\nSistema legacy en PHP 5.6 con inventario en MySQL. Necesitamos módulo de ventas en Python Flask.\n\n## Criterios de Aceptación\n1. Given usuario autenticado, When agrega item al carrito, Then se reserva en inventario via API...'
          },
          notes: 'La spec tuvo que considerar limitaciones del sistema legacy y APIs de integración.'
        },
        {
          phaseId: 'clarify',
          summary: 'Varias rondas de clarificación sobre formato de APIs, manejo de transacciones distribuidas y fallback strategies.',
          artifacts: {
            'spec-clarified.md': '## Clarificaciones\n- API Legacy: formato JSON, auth via API key\n- Transacciones: 2-phase commit entre sistemas\n- Fallback: cola de mensajes si API legacy no responde\n- Compatibilidad: probar en PHP 5.6'
          },
          notes: 'Este paso tomó 5 días (vs 2 en greenfield) debido a la complejidad de integración.'
        },
        {
          phaseId: 'plan',
          summary: 'Arquitectura híbrida: Python Flask para nuevo módulo, manteniendo PHP legacy. Bridge pattern para integración.',
          artifacts: {
            'plan.md': '# Implementation Plan: Ventas Online (Brownfield)\n\n## Arquitectura\n- Módulo nuevo: Python Flask + SQLAlchemy\n- Legacy: PHP 5.6 + MySQL\n- Integración: REST API + message queue\n\n## Desafíos\n- Compatibilidad PHP 5.6\n- Migración de datos...'
          },
          notes: 'El plan requirió análisis profundo del código legacy y documentación de APIs existentes.'
        },
        {
          phaseId: 'tasks',
          summary: 'Tareas divididas por sistema: legacy (3 tareas) y moderno (6 tareas). Dependencias cruzadas.',
          artifacts: {
            'tasks.md': '## Phase 3: User Story 1 - Ventas Online (P1)\n- [ ] T001 [Legacy] Add API endpoint in PHP for inventory check\n- [ ] T002 [Modern] Create Flask app structure\n- [ ] T003 [Modern] Implement inventory service client...'
          },
          notes: 'Las tareas no pudieron paralelizarse completamente debido a dependencias de integración.'
        },
        {
          phaseId: 'implement',
          summary: 'Implementación tomó 6 semanas. Bugs por incompatibilidad de encoding entre sistemas. Refactoring de código legacy requerido.',
          artifacts: {
            'src/legacy/api/inventory.php': '<?php\nheader("Content-Type: application/json");\n// Legacy API endpoint...',
            'src/modern/services/inventory_client.py': 'class InventoryClient:\n    def check_availability(self, product_id):\n        # Call legacy API...'
          },
          notes: 'Se encontraron bugs en PHP 5.6 que requirieron patches. Testing fue más complejo por entornos híbridos.'
        }
      ],
      challenges: [
        'Compatibilidad con PHP 5.6 (sin soporte oficial)',
        'Integración entre sistemas con diferentes stacks',
        'Manejo de transacciones distribuidas sin 2PC nativo',
        'Falta de tests en código legacy (tuvo que añadirse)',
        'Documentación inexistente del sistema legacy'
      ],
      lessons: [
        'La fase de Specify debe ser más exhaustiva en proyectos brownfield',
        'Incluir análisis de riesgo técnico en la planeación',
        'La inversión en tests del sistema legacy paga dividendos a largo plazo',
        'El patrón Bridge/Adapter es esencial para integración legacy',
        'El tiempo estimado debe incluir refactoring de código legacy'
      ]
    }
  };

  // Export to window
  window.CASE_STUDIES = CASE_STUDIES;

})();
