# Feature Specification: Uso Práctico de SDD

**Feature Branch**: `005-us5-uso-practico`  
**Created**: 2026-05-06  
**Status**: Draft  
**Input**: User description: "US5: Uso Práctico de SDD - Guía paso a paso para aplicar la metodología en proyectos reales"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Guía paso a paso interactiva (Priority: P1)

Como desarrollador principiante, quiero seguir una guía paso a paso de cómo aplicar SDD, para poder implementar la metodología correctamente en mi proyecto.

**Why this priority**: Es el núcleo de la US5 - sin una guía clara, el usuario no puede aplicar SDD prácticamente.

**Independent Test**: Puede ser probado completamente siguiendo la guía y verificando que el usuario completa un ciclo SDD exitosamente.

**Acceptance Scenarios**:

1. **Given** que el usuario está en la sección US5, **When** hace clic en "Comenzar Guía", **Then** se inicia un recorrido guiado de las 5 fases de SDD.
2. **Given** que el usuario está en la guía, **When** completa cada fase (Specify, Clarify, Plan, Tasks, Implement), **Then** ve un checklist de verificación marcado automáticamente.
3. **Given** que el usuario completó la guía, **When** llega al final, **Then** recibe un mensaje de "¡Metodología Completada!" y un resumen de lo aprendido.

---

### User Story 2 - Ejemplos prácticos con casos reales (Priority: P2)

Como desarrollador, quiero ver ejemplos prácticos aplicados a proyectos greenfield y brownfield, para entender cómo se ve SDD en la realidad.

**Why this priority**: Los ejemplos ayudan a conectar la teoría con la práctica, pero requieren la guía base (P1) para tener contexto.

**Independent Test**: Puede ser probado navegando a los ejemplos y verificando que muestran las fases aplicadas correctamente.

**Acceptance Scenarios**:

1. **Given** que el usuario está en US5, **When** selecciona "Ver Ejemplo Proyecto Nuevo", **Then** ve un proyecto desde cero aplicando SDD.
2. **Given** que el usuario está en US5, **When** selecciona "Ver Ejemplo Proyecto Legado", **Then** ve un proyecto con código existente aplicando SDD.
3. **Given** que el usuario ve un ejemplo, **When** hace clic en "Ver artefactos generados", **Then** puede descargar spec.md, plan.md, tasks.md de ese caso.

---

### User Story 3 - Plantillas descargables listas para usar (Priority: P3)

Como desarrollador, quiero descargar plantillas de documentos SDD (spec.md, plan.md, etc.), para poder aplicar la metodología sin empezar desde cero.

**Why this priority**: Las plantillas son útiles pero no esenciales - el usuario puede crear sus propios documentos siguiendo la guía (P1).

**Independent Test**: Puede ser probado haciendo clic en "Descargar Plantillas" y verificando que se descarga un archivo .zip con los templates.

**Acceptance Scenarios**:

1. **Given** que el usuario está en US5, **When** hace clic en "Descargar Plantillas SDD", **Then** se descarga un archivo .zip con spec-template.md, plan-template.md, tasks-template.md.
2. **Given** que el usuario descargó las plantillas, **When** abre spec-template.md, **Then** ve secciones predefinidas (User Stories, Requirements, Success Criteria, etc.).
3. **Given** que el usuario usa una plantilla, **When** la completa siguiendo la guía, **Then** tiene un documento listo para aplicar SDD.

---

### Edge Cases

- ¿Qué pasa si el usuario recarga la página a la mitad de la guía paso a paso? → Debe guardar el progreso en localStorage y permitir retomar.
- ¿Cómo maneja el sistema si el usuario selecciona un ejemplo que no existe? → Mostrar mensaje "Ejemplo no disponible" y sugerir otros.
- ¿Qué sucede si el usuario intenta descargar plantillas sin conexión? → Detectar offline y mostrar mensaje "Conéctate a internet para descargar".

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Sistema DEBE mostrar una guía paso a paso interactiva con las 5 fases de SDD (Specify, Clarify, Plan, Tasks, Implement).
- **FR-002**: Sistema DEBE permitir al usuario avanzar y retroceder en la guía paso a paso.
- **FR-003**: Sistema DEBE mostrar ejemplos prácticos de proyectos greenfield y brownfield aplicando SDD.
- **FR-004**: Sistema DEBE permitir descargar plantillas de documentos SDD (spec.md, plan.md, tasks.md) en formato .md o .zip.
- **FR-005**: Usuarios DEBEN poder marcar checklists de verificación por cada fase en la guía.
- **FR-006**: Sistema DEBE integrar los casos de estudio de US4 (case-studies.js) como ejemplos prácticos.
- **FR-007**: Sistema DEBE mostrar un resumen final cuando el usuario complete la guía paso a paso.

### Key Entities *(include if feature involves data)*

- **Guía Interactiva**: Representa el recorrido paso a paso. Atributos: fase actual, progreso (%), checklist por fase.
- **Ejemplo Práctico**: Caso de estudio (greenfield/brownfield). Atributos: tipo, descripción, artefactos generados.
- **Plantilla**: Documento .md descargable. Atributos: tipo (spec/plan/tasks), contenido, versión.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 90% de usuarios completan la guía paso a paso en menos de 15 minutos.
- **SC-002**: Usuarios pueden descargar plantillas en menos de 5 segundos.
- **SC-003**: 85% de usuarios que ven los ejemplos prácticos reportan "entienden cómo aplicar SDD en proyectos reales" (encuesta post-ejemplo).
- **SC-004**: Sistema soporta 100 usuarios simultáneos usando la guía sin degradación.

## Assumptions

- Usuarios tienen conocimientos básicos de desarrollo de software (lectura de código y documentación).
- Los ejemplos prácticos se basan en los casos de estudio ya implementados en US4 (case-studies.js).
- Plantillas se descargan como archivos .md individuales o un .zip combinado (decisión de implementación).
- La guía paso a paso usa el diagrama de proceso de US4 (process-diagram.js) como referencia visual.
- No se requiere autenticación para usar la guía o descargar plantillas (acceso público).
