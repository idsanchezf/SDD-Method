/**
 * Case Study Data for US4
 * Greenfield and Brownfield interactive walkthrough cases
 */

const caseStudies = [
  {
    id: "greenfield",
    title: "Greenfield: Task Manager App",
    description: "Proyecto nuevo desde cero para gestionar tareas personales",
    projectContext: "Una startup decide crear una aplicación web para gestión de tareas personales. No existe código previo. El equipo usa SDD por primera vez.",
    highlights: [
      "Proceso estándar sin consideraciones de legado",
      "Foco en crear nuevas funcionalidades",
      "Artefactos son documentos nuevos desde cero"
    ],
    phases: [
      {
        phaseId: "specify",
        situation: "La startup necesita una app donde usuarios puedan crear, editar y eliminar tareas. También necesitan organizar por categorías y fechas.",
        artifactExample: {
          name: "spec.md",
          content: "# Spec: Task Manager App\n\n## Goal\nAllow users to manage personal tasks...\n\n## Requirements\n- FR-001: User can create task...\n\n## Acceptance Criteria\n- AC-001: Given user is logged in, When..."
        },
        decisions: [
          "¿Qué criterio es más importante para la especificación?",
          "A) Criterios de aceptación claros y medibles",
          "B) Descripción detallada de UI",
          "C) Lista completa de tecnologías a usar"
        ],
        correctAnswer: "A",
        feedback: {
          correct: "¡Correcto! Los criterios de aceptación medibles son fundamentales para verificar el trabajo.",
          incorrect: [
            "La UI es importante pero viene después de los requerimientos funcionales.",
            "Las tecnologías se deciden en la fase Plan, no en Specify."
          ]
        },
        handoffDemo: {
          fromRole: "spec-writer",
          toRole: "developer",
          artifact: "spec.md"
        }
      },
      {
        phaseId: "clarify",
        situation: "Al revisar la spec, se identifica que 'categorías' no está bien definido. ¿Son predefinidas o personalizadas? También hay ambigüedad sobre 'fechas'.",
        artifactExample: {
          name: "clarifications.md",
          content: "## Q&A Session\n\n**Q**: ¿Las categorías son predefinidas o el usuario puede crear las suyas?\n**A**: Usuario puede crear sus propias categorías.\n\n**Q**: ¿Qué formato deben tener las fechas?\n**A**: ISO 8601 (YYYY-MM-DD)..."
        },
        decisions: [
          "¿Cómo debe manejarse la ambigüedad en 'categorías'?",
          "A) Dejarlo ambiguo para flexibilidad",
          "B) Clarificar que usuario crea sus propias",
          "C) Usar categorías predefinidas por el sistema"
        ],
        correctAnswer: "B",
        feedback: {
          correct: "¡Correcto! La clarificación permite al usuario crear sus propias categorías, dando flexibilidad controlada.",
          incorrect: [
            "La ambigüedad lleva a malentendidos. SIEMPRE clarificar.",
            "Categorías predefinidas limitan al usuario sin necesidad."
          ]
        },
        handoffDemo: {
          fromRole: "developer",
          toRole: "developer",
          artifact: "spec.md (clarified)"
        }
      },
      {
        phaseId: "plan",
        situation: "Con la spec clarificada, el equipo define la arquitectura del sistema. Usando HTML5, CSS3 y Vanilla JS (constitución del proyecto), diseñan la estructura de componentes, el flujo de datos y las interfaces entre módulos. Esta arquitectura guiará la descomposición en tareas en la siguiente fase.",
        artifactExample: {
          name: "plan.md",
          content: "# Architecture Plan: Task Manager\n\n## Summary\nBuild task manager with vanilla JS...\n\n## Component Architecture\n- App (orchestrator, holds state)\n  - Header (title, navigation)\n  - TaskList (renders tasks, sorting)\n  - TaskForm (create/edit tasks)\n  - FilterBar (filter by category/status)\n\n## Data Flow\nUser action → Controller → Model → View update\n\n## Data Model\n- Task: { id, title, description, category, dueDate, completed, createdAt }\n\n## Persistence\n- LocalStorage for CRUD operations\n\n## Layout\n- CSS Grid: sidebar (filter) + main (list/form)"
        },
        decisions: [
          "¿Qué es más importante en el plan?",
          "A) Arquitectura clara y dependencias definidas",
          "B) Estimación de tiempos perfecta",
          "C) Lista de herramientas de desarrollo"
        ],
        correctAnswer: "A",
        feedback: {
          correct: "¡Correcto! La arquitectura y dependencias claras permiten descomposición efectiva en tareas.",
          incorrect: [
            "Las estimaciones son útiles pero vienen después de identificar tareas.",
            "Las herramientas ya están definidas en la constitución (vanilla JS)."
          ]
        },
        handoffDemo: {
          fromRole: "developer",
          toRole: "developer",
          artifact: "plan.md"
        }
      },
      {
        phaseId: "tasks",
        situation: "Tomando el diseño arquitectónico del plan (componentes, flujo de datos, modelo), se detalla cada componente y se descompone en tareas concretas. Se usa asistencia de IA (AI Code Generator) para generar código boilerplate que siga la arquitectura definida. Cada tarea especifica qué componente implementa, sus interfaces y pruebas asociadas.",
        artifactExample: {
          name: "tasks.md + src/js/tasks.js",
          content: "# Tasks Breakdown\n\n## Component: TaskForm\n- [ ] T001 Implement TaskForm UI (create/edit mode) (estimate: 2h)\n- [ ] T002 Add form validation (estimate: 1h, depends on T001)\n\n## Component: TaskList\n- [ ] T003 Render task list with sorting (estimate: 2h)\n- [ ] T004 Add filter by category (estimate: 1h, depends on T003)\n\n## Component: App (Orchestrator)\n- [ ] T005 Wire components together, add LocalStorage (estimate: 2h, depends on T001-T004)\n\n---\n\n// src/js/tasks.js (generated by AI, follows architecture from plan.md)\nclass TaskForm { /* ref: plan.md → Component Architecture */ }\nclass TaskList { /* ref: plan.md → Data Model */ }\nclass App { /* ref: plan.md → Data Flow */ }"
        },
        decisions: [
          "¿Qué verificas primero al recibir código generado por IA?",
          "A) Que cumple la arquitectura definida en el plan y tiene pruebas",
          "B) Que funciona visualmente en el navegador",
          "C) Que usa las últimas características de JS"
        ],
        correctAnswer: "A",
        feedback: {
          correct: "¡Correcto! El código debe respetar la arquitectura definida en plan.md y cumplir estándares con pruebas. La revisión humana verifica coherencia arquitectónica.",
          incorrect: [
            "Lo visual es importante pero viene después de verificar la arquitectura y calidad.",
            "Usar características nuevas no garantiza calidad ni mantenibilidad."
          ]
        },
        handoffDemo: {
          fromRole: "ai-code-generator",
          toRole: "reviewer",
          artifact: "generated-code.js"
        }
      },
      {
        phaseId: "implement",
        situation: "Se finaliza la implementación de todas las tareas pendientes. Se realizan pruebas de aceptación (UAT) contra los criterios de la spec. Se entregan los artefactos finales al Product Owner.",
        artifactExample: {
          name: "test-report.md",
          content: "# UAT Report: Task Manager App\n\n## Test Cases\n1. Given user is logged in, When creates task, Then task appears in list ✅\n2. Given user has tasks, When edits task, Then changes saved ✅\n3. Given user has tasks, When deletes task, Then confirmation shown ✅\n\n## Result: ALL PASS\n\n## Deliverables\n- src/js/tasks.js\n- user-documentation.md"
        },
        decisions: [
          "¿Qué indica que el producto está listo para entregar?",
          "A) Todas las pruebas de aceptación pasan",
          "B) El código está escrito y compila",
          "C) La interfaz se ve como en el diseño"
        ],
        correctAnswer: "A",
        feedback: {
          correct: "¡Correcto! El criterio final es que TODAS las pruebas de aceptación pasen. Eso define 'Done'.",
          incorrect: [
            "Que compile no garantiza que funcione correctamente.",
            "El diseño visual es solo una parte del producto completo."
          ]
        },
        handoffDemo: {
          fromRole: "developer",
          toRole: "product-owner",
          artifact: "Deliverable product"
        }
      }
    ]
  },
  {
    id: "brownfield",
    title: "Brownfield: Legacy E-commerce Site",
    description: "Proyecto con código legado (PHP) que necesita nuevas funcionalidades usando SDD",
    projectContext: "Una tienda en línea existente construida en PHP 5.6 necesita agregar un sistema de reseñas de productos. El código actual no sigue metodologías modernas. Se usará SDD para la nueva funcionalidad.",
    highlights: [
      "Debes analizar código existente antes de especificar",
      "Consideraciones de compatibilidad y deuda técnica",
      "Artefactos incluyen análisis de código legado"
    ],
    phases: [
      {
        phaseId: "specify",
        situation: "Antes de escribir la spec, debes analizar cómo funciona el sitio actual de e-commerce. Identificas que usa sesiones PHP para carritos y MySQL para productos. La nueva función debe integrarse sin romper lo existente.",
        artifactExample: {
          name: "spec.md + legacy-analysis.md",
          content: "# Spec: Product Reviews\n\n## Context\nExisting PHP e-commerce site, need to add reviews.\n\n## Constraints\n- Must maintain backward compatibility with PHP 5.6\n- Must not break existing cart functionality\n- Database changes must be backward compatible\n\n## Requirements\n- FR-001: User can submit review...\n\n## Legacy Analysis\n- Cart uses PHP sessions\n- Products table has: id, name, price\n- Need to add reviews table..."
        },
        decisions: [
          "¿Qué es más crítico en la fase Specify para brownfield?",
          "A) Analizar el código legado y documentar comportamiento actual",
          "B) Escribir la especificación como si fuera un proyecto nuevo",
          "C) Migrar todo el código a tecnologías modernas primero"
        ],
        correctAnswer: "A",
        feedback: {
          correct: "¡Correcto! En brownfield es CRÍTICO analizar y documentar el comportamiento actual antes de especificar cambios.",
          incorrect: [
            "Ignorar el legado causará incompatibilidades y bugs.",
            "Migrar todo primero no es parte del alcance y rompe el principio de SDD paso a paso."
          ]
        },
        handoffDemo: {
          fromRole: "spec-writer",
          toRole: "developer",
          artifact: "spec.md + legacy-analysis.md"
        }
      },
      {
        phaseId: "clarify",
        situation: "Al clarificar, descubres que 'reseñas' puede significar diferentes cosas. ¿Solo texto? ¿Calificación con estrellas? ¿Respuestas a reseñas? También hay deuda técnica: el código de productos tiene SQL injection potencial.",
        artifactExample: {
          name: "clarifications.md + technical-debt.md",
          content: "## Clarifications\n**Q**: ¿Las reseñas incluyen calificación?\n**A**: Sí, 1-5 estrellas además de texto.\n\n## Technical Debt\n- Products query vulnerable to SQL injection (line 45 in products.php)\n- Need to refactor before adding reviews feature...\n"
        },
        decisions: [
          "¿Cómo manejas la deuda técnica encontrada?",
          "A) Documentarla y planificar refactoring como parte de la tarea",
          "B) Ignorarla, solo agregar la nueva funcionalidad",
          "C) Detener todo y refactorizar todo el sitio"
        ],
        correctAnswer: "A",
        feedback: {
          correct: "¡Correcto! Documentar y planificar refactoring como parte de la tarea aborda seguridad sin bloquear el proyecto.",
          incorrect: [
            "Ignorar vulnerabilidades pone en riesgo a los usuarios.",
            "Refactorizar todo excede el alcance y viola principios de SDD."
          ]
        },
        handoffDemo: {
          fromRole: "developer",
          toRole: "developer",
          artifact: "spec.md (clarified) + technical-debt.md"
        }
      },
      {
        phaseId: "plan",
        situation: "El plan debe definir la arquitectura para integrar reviews sin romper el sitio existente. Se diseñan los componentes, el modelo de datos extendido y las interfaces con el legado. Considera que el sitio usa PHP 5.6 (sin funciones modernas de PHP 7+). Esta arquitectura guiará la descomposición en tareas en la siguiente fase.",
        artifactExample: {
          name: "plan.md",
          content: "# Architecture Plan: Product Reviews\n\n## Summary\nAdd reviews to legacy e-commerce site with security fixes.\n\n## Component Architecture\n- LegacyCart (existing, keep unchanged)\n- LegacyProduct (existing, add prepared statements)\n- ReviewManager (new, handles CRUD)\n- ReviewUI (new, renders review form and list)\n\n## Extended Data Model\n- Product (existing) 1──N Review (new)\n- Review: { id, productId, rating, comment, createdAt }\n\n## Integration Points\n- Product page template → inject ReviewUI\n- MySQL query → prepared statements (ref: technical-debt.md)\n- Session cart → untouched\n\n## Constraints\n- PHP 5.6 syntax only\n- Test on existing MySQL version\n- Backward compatible"
        },
        decisions: [
          "¿Qué es lo más importante en el plan para brownfield?",
          "A) Arquitectura que respeta compatibilidad y limitaciones del legado",
          "B) Usar las últimas características de PHP para mayor productividad",
          "C) Planificar migración completa a un framework moderno"
        ],
        correctAnswer: "A",
        feedback: {
          correct: "¡Correcto! En brownfield, la arquitectura debe respetar el legado y definir compatibilidad.",
          incorrect: [
            "Usar PHP 7+ rompería el sitio existente que corre en 5.6.",
            "Migrar todo no es parte del alcance de esta función."
          ]
        },
        handoffDemo: {
          fromRole: "developer",
          toRole: "developer",
          artifact: "plan.md"
        }
      },
      {
        phaseId: "tasks",
        situation: "Tomando la arquitectura definida en el plan (componentes LegacyProduct, ReviewManager, ReviewUI y modelo extendido), se detalla cada componente y se descompone en tareas concretas. Se usa IA para generar código que respete las interfaces definidas y las restricciones del legado. Cada tarea especifica qué componente modifica o crea y sus dependencias arquitectónicas.",
        artifactExample: {
          name: "tasks.md + src/php/reviews.php",
          content: "# Tasks Breakdown\n\n## Component: LegacyProduct (refactor)\n- [ ] T001 Add prepared statements to products.php (estimate: 2h)\n\n## Component: ReviewManager (new)\n- [ ] T002 Create reviews table in MySQL (estimate: 1h, depends on T001)\n- [ ] T003 Implement ReviewManager CRUD class (estimate: 2h, depends on T002)\n\n## Component: ReviewUI (new)\n- [ ] T004 Build review form + list UI (estimate: 2h, depends on T003)\n- [ ] T005 Inject ReviewUI into product page template (estimate: 1h, depends on T004)\n\n---\n\n// src/php/reviews.php (generated by AI, follows architecture from plan.md)\nclass ReviewManager { /* ref: plan.md → Component Architecture */ }\nclass ReviewUI { /* ref: plan.md → Integration Points */ }\n$stmt = $pdo->prepare('INSERT INTO reviews (product_id, rating, comment) VALUES (?, ?, ?)');\n$stmt->execute([$productId, $rating, $comment]);\n"
        },
        decisions: [
          "¿En qué orden tienen prioridad las tareas?",
          "A) Refactoring de seguridad primero, luego nueva funcionalidad",
          "B) Nueva funcionalidad primero, refactoring después",
          "C) Todo en paralelo para ser más rápido"
        ],
        correctAnswer: "A",
        feedback: {
          correct: "¡Correcto! En brownfield, arreglar vulnerabilidades de seguridad PRIMERO es crítico. Luego nueva funcionalidad.",
          incorrect: [
            "Agregar funcionalidad sobre código vulnerable es peligroso.",
            "El paralelismo no ayuda si hay dependencias técnicas."
          ]
        },
        handoffDemo: {
          fromRole: "ai-code-generator",
          toRole: "reviewer",
          artifact: "generated-code.php"
        }
      },
      {
        phaseId: "implement",
        situation: "Se finaliza la implementación de todas las tareas (refactoring + nueva funcionalidad). Se realizan pruebas de regresión (para asegurar que el sitio original sigue funcionando) y pruebas de la nueva función. Se entrega al Product Owner.",
        artifactExample: {
          name: "test-report.md",
          content: "# UAT Report: Product Reviews (Brownfield)\n\n## Regression Tests (Existing Functionality)\n1. Given user adds item to cart, When checkout, Then order placed ✅\n2. Given user views product, Then details display correctly ✅\n\n## New Feature Tests\n3. Given user is on product page, When submits review, Then review appears ✅\n4. Given user submits 1-5 star rating, Then rating saved ✅\n\n## Result: ALL PASS (Regression + New Feature)"
        },
        decisions: [
          "¿Qué es diferente en las pruebas de brownfield vs greenfield?",
          "A) Debes probar que el código existente sigue funcionando (regression)",
          "B) Solo pruebas la nueva funcionalidad",
          "C) Pruebas unitarias son suficientes"
        ],
        correctAnswer: "A",
        feedback: {
          correct: "¡Correcto! En brownfield, las pruebas de regresión son ESENCIALES para asegurar que no rompiste lo existente.",
          incorrect: [
            "Solo probar lo nuevo ignoraría errores en funcionalidad existente.",
            "Las pruebas unitarias no cubren integración con el sistema existente."
          ]
        },
        handoffDemo: {
          fromRole: "developer",
          toRole: "product-owner",
          artifact: "Deliverable product + test-report.md"
        }
      }
    ]
  }
];

// Export for use in walkthrough.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = caseStudies;
}

// Also expose on window for scripts that reference window.caseStudies
if (typeof window !== 'undefined') {
  window.caseStudies = caseStudies;
}
