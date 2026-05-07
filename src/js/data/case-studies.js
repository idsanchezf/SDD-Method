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
        situation: "Con la spec clarificada, el equipo planea la implementación. Deciden usar HTML5, CSS3 y Vanilla JS (constitución del proyecto). Identifican tareas y dependencias.",
        artifactExample: {
          name: "plan.md",
          content: "# Implementation Plan: Task Manager\n\n## Summary\nBuild task manager with vanilla JS...\n\n## Tasks\n- T001 Create HTML structure\n- T002 Style with CSS\n- T003 Implement task CRUD in JS (depends on T001, T002)...\n\n## Dependencies\nT003 → T001, T002"
        },
        decisions: [
          "¿Qué es más importante en el plan?",
          "A) Tareas bien descompuestas con dependencias claras",
          "B) Estimación de tiempos perfecta",
          "C) Lista de herramientas de desarrollo"
        ],
        correctAnswer: "A",
        feedback: {
          correct: "¡Correcto! La descomposición de tareas con dependencias claras permite ejecución paralela y seguimiento.",
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
        situation: "Se implementan las tareas una por una. Se usa asistencia de IA (AI Code Generator) para generar código boilerplate. Cada tarea incluye pruebas.",
        artifactExample: {
          name: "tasks.md + src/js/tasks.js",
          content: "# Tasks Progress\n\n- [X] T001 Create HTML structure\n- [X] T002 Style with CSS\n- [ ] T003 Implement task CRUD (in progress)\n\n---\n\n// src/js/tasks.js\nclass TaskManager {\n  constructor() { this.tasks = []; }\n  addTask(title) { ... }\n}"
        },
        decisions: [
          "¿Qué verificas primero al recibir código generado por IA?",
          "A) Que cumple estándares y tiene pruebas",
          "B) Que funciona visualmente en el navegador",
          "C) Que usa las últimas características de JS"
        ],
        correctAnswer: "A",
        feedback: {
          correct: "¡Correcto! El código debe cumplir estándares y tener pruebas. La revisión humana es crítica.",
          incorrect: [
            "Lo visual es importante pero viene después de la calidad del código.",
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
        situation: "Se completa la implementación, se realizan pruebas de aceptación (UAT) y se entrega el producto final al Product Owner.",
        artifactExample: {
          name: "test-report.md",
          content: "# UAT Report: Task Manager App\n\n## Test Cases\n1. Given user is logged in, When creates task, Then task appears in list ✅\n2. Given user has tasks, When edits task, Then changes saved ✅\n3. Given user has tasks, When deletes task, Then confirmation shown ✅\n\n## Result: ALL PASS"
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
        situation: "El plan debe incluir tareas de refactoring para arreglar SQL injection, crear la nueva tabla reviews, y agregar la funcionalidad. Debe considerar que el sitio usa PHP 5.6 (sin funciones modernas de PHP 7+).",
        artifactExample: {
          name: "plan.md",
          content: "# Implementation Plan: Product Reviews\n\n## Summary\nAdd reviews to legacy e-commerce site with security fixes.\n\n## Tasks\n- T001 Refactor products.php to use prepared statements (fix SQL injection)\n- T002 Create reviews table in MySQL (depends on T001)\n- T003 Implement review submission form (depends on T002)\n- T004 Display reviews on product page (depends on T003)...\n\n## Compatibility\n- Use PHP 5.6 syntax only\n- Test on existing MySQL version..."
        },
        decisions: [
          "¿Qué es lo más importante en el plan para brownfield?",
          "A) Incluir tareas de refactoring y respetar compatibilidad",
          "B) Usar las últimas características de PHP para mayor productividad",
          "C) Planificar migración completa a un framework moderno"
        ],
        correctAnswer: "A",
        feedback: {
          correct: "¡Correcto! En brownfield, el refactoring necesario y la compatibilidad son prioritarios en el plan.",
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
        situation: "Se implementa el refactoring de SQL injection primero (crítico por seguridad), luego la tabla de reviews, y finalmente la funcionalidad. Se usa IA para generar consultas SQL preparadas (que luego revisa humano).",
        artifactExample: {
          name: "tasks.md + src/php/reviews.php",
          content: "# Tasks Progress\n\n- [X] T001 Refactor products.php (SQL injection fix)\n- [X] T002 Create reviews table\n- [ ] T003 Implement review form (in progress)\n\n---\n\n// src/php/reviews.php\n$stmt = $pdo->prepare('INSERT INTO reviews (product_id, rating, comment) VALUES (?, ?, ?)');\n$stmt->execute([$productId, $rating, $comment]);\n"
        },
        decisions: [
          "¿En qué orden ejecutas las tareas?",
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
          fromRole: "developer",
          toRole: "reviewer",
          artifact: "refactored-code.php + reviews-feature.php"
        }
      },
      {
        phaseId: "implement",
        situation: "Se completa la implementación, se prueba que el sitio original sigue funcionando (regression testing) y que las nuevas reseñas funcionan. Se entrega al Product Owner.",
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
          artifact: "Deliverable product (with reviews + backward compatible)"
        }
      }
    ]
  }
];

// Export for use in walkthrough.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = caseStudies;
}
