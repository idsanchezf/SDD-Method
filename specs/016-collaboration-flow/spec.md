# Feature Specification: Flujo de Colaboración Humano-IA

**Feature Branch**: `016-collaboration-flow`  
**Created**: 2026-05-07  
**Status**: Draft  
**Input**: User description: "US7 - Explorar el flujo de colaboración Humano-IA"

## Clarifications

### Session 2026-05-07

- Q: Should supervision point completion be a hard requirement to advance phases, or a soft recommendation? → A: Soft recommendation — unchecked points show a visual warning but never block phase navigation.
- Q: Should users be able to create or edit their own prompts, or only use pre-defined ones? → A: Only pre-defined prompts for v1; no custom creation or editing.
- Q: How should the system behave when localStorage is unavailable? → A: Graceful degradation with a subtle one-time notice — feature works without persistence but user is informed.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visualizar colaboración por fase (Priority: P1)

Como usuario de SDD, quiero un diagrama interactivo que muestre para cada fase del proceso qué rol humano y qué rol de IA intervienen, qué artefacto producen y dónde está el punto de supervisión, para entender de un vistazo cómo se organiza el trabajo entre humanos y asistentes.

**Why this priority**: Sin esta vista general, el usuario no puede entender el flujo completo de colaboración, que es el core de esta feature.

**Independent Test**: Un usuario puede seleccionar cualquiera de las 5 fases y ver en el diagrama: rol humano, rol IA, artefacto producido y punto de supervisión.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la sección "Flujo de Colaboración", **When** ve la página, **Then** se muestra un diagrama con las 5 fases del SDD conectadas visualmente, donde cada fase tiene un estado (pendiente/activo/completado).
2. **Given** que el usuario selecciona una fase (ej. Specify), **When** hace clic en ella, **Then** se despliega un panel con: rol humano principal (Spec Writer), rol IA asignado (AI Spec Assistant), artefacto producido (spec.md) y punto de supervisión (revisión de criterios de aceptación).
3. **Given** que el usuario navega entre fases, **When** cambia de fase activa, **Then** el panel se actualiza con la información correspondiente a la nueva fase y las flechas del diagrama se actualizan para reflejar el progreso.

---

### User Story 2 - Consultar prompts recomendados (Priority: P1)

Como usuario de SDD, quiero una biblioteca de prompts estructurados organizados por fase y rol de IA, para saber exactamente qué instrucciones darle al asistente en cada paso del proceso.

**Why this priority**: Los prompts son el mecanismo principal de interacción con la IA. Sin ejemplos concretos, el usuario no sabe cómo comunicarse efectivamente con los asistentes.

**Independent Test**: Un usuario puede filtrar prompts por fase o por rol de IA, seleccionar un prompt y ver su estructura completa con ejemplos de uso.

**Acceptance Scenarios**:

1. **Given** que el usuario está viendo una fase en el diagrama, **When** hace clic en "Ver prompts recomendados", **Then** se muestra una lista de prompts estructurados para el rol de IA de esa fase.
2. **Given** que el usuario selecciona un prompt, **When** lo expande, **Then** ve: nombre del prompt, fase destino, rol de IA, texto completo del prompt con placeholders, y un ejemplo de salida esperada.
3. **Given** que el usuario quiere explorar todos los prompts, **When** activa la vista de biblioteca completa, **Then** puede filtrar por fase (Specify/Clarify/Plan/Tasks/Implement) y por rol de IA (AI Spec Assistant/AI Code Generator/AI Reviewer).

---

### User Story 3 - Revisar supervisión requerida (Priority: P2)

Como tech lead o developer, quiero una sección que explique qué debe revisar el humano antes de aceptar el trabajo generado por la IA en cada fase, para mantener la calidad sin convertirme en cuello de botella.

**Why this priority**: La supervisión humana es el principal mecanismo de calidad en SDD. Sin directrices claras, el usuario puede confiar demasiado o demasiado poco en la IA.

**Independent Test**: Un usuario puede seleccionar cualquier fase, ver los puntos de supervisión requeridos y marcar cada uno como revisado.

**Acceptance Scenarios**:

1. **Given** que el usuario selecciona una fase, **When** hace clic en "Ver supervisión requerida", **Then** se expande una lista con los puntos que el humano debe revisar antes de aceptar el trabajo de la IA.
2. **Given** que el usuario revisa un punto, **When** lo marca como completado, **Then** el punto se tacha visualmente y el progreso de supervisión de la fase se actualiza.
3. **Given** que el usuario completa todos los puntos de supervisión de una fase, **When** el progreso llega al 100%, **Then** la fase se marca como "supervisada" y los puntos pendientes restantes se atenúan visualmente sin bloquear la navegación.

---

### Edge Cases

- ¿Qué sucede si el usuario selecciona una fase que no tiene rol de IA asignado? → Se muestra un mensaje indicando que esa fase es exclusivamente humana y no requiere intervención de IA.
- ¿Cómo se maneja si el usuario cierra el panel de supervisión sin completar todos los puntos? → El progreso se guarda y se retoma desde donde quedó al reabrir el panel.
- ¿Qué sucede si localStorage no está disponible? → La funcionalidad opera sin persistencia y se muestra un aviso no intrusivo de una sola vez al usuario.
- ¿Qué pasa si el usuario intenta marcar una fase como supervisada sin haber revisado todos los puntos? → El sistema muestra un aviso visual con los puntos faltantes pero no bloquea la acción. La fase se marca como "supervisada parcialmente".

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema MUST mostrar un diagrama interactivo con las 5 fases de SDD conectadas visualmente, indicando para cada fase: rol humano principal, rol IA asignado, artefacto producido y punto de supervisión.
- **FR-002**: El sistema MUST permitir al usuario seleccionar una fase del diagrama y ver un panel detallado con la información de colaboración de esa fase.
- **FR-003**: El sistema MUST incluir una biblioteca de prompts estructurados organizados por fase y por rol de IA.
- **FR-004**: Cada prompt en la biblioteca MUST contener: nombre, fase destino, rol de IA, texto completo del prompt con placeholders, y un ejemplo de salida esperada.
- **FR-005**: El sistema MUST permitir filtrar los prompts por fase (Specify/Clarify/Plan/Tasks/Implement) y por rol de IA (AI Spec Assistant/AI Code Generator/AI Reviewer).
- **FR-006**: El sistema MUST incluir una sección de supervisión requerida por fase, listando los puntos que el humano debe revisar antes de aceptar el trabajo de la IA.
- **FR-007**: El sistema MUST permitir al usuario marcar puntos de supervisión como revisados y mostrar el progreso de supervisión por fase.
- **FR-008**: El sistema MUST persistir el progreso de supervisión y los prompts explorados en localStorage, con degradación elegante si no está disponible.
- **FR-009**: La supervisión MUST ser una recomendación visual no bloqueante — los puntos pendientes se muestran con un indicador de advertencia pero nunca impiden la navegación entre fases.

### Key Entities

- **Fase de Colaboración**: Representa una fase del SDD con su configuración de colaboración humano-IA. Contiene: nombre de fase, rol humano principal, rol IA asignado, artefacto producido, lista de prompts asociados, puntos de supervisión.
- **Prompt de IA**: Instrucción estructurada para un rol de IA en una fase específica. Contiene: nombre, fase destino, rol destino, texto del prompt (con placeholders), ejemplo de salida esperada.
- **Punto de Supervisión**: Ítem específico que el humano debe verificar antes de aceptar trabajo de IA. Contiene: descripción, fase asociada, estado (pendiente/completado).
- **Progreso de Colaboración**: Estado del avance del usuario en la exploración del flujo. Contiene: fase activa, puntos de supervisión completados por fase, prompts explorados.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un usuario puede seleccionar cualquiera de las 5 fases y ver en menos de 2 clics el diagrama de colaboración con roles, artefactos y supervisión.
- **SC-002**: Un usuario puede encontrar un prompt relevante para su fase y rol en menos de 3 clics desde la vista principal de la sección.
- **SC-003**: Un usuario que completa todas las fases puede ver un resumen de toda la colaboración humano-IA del feature.
- **SC-004**: El 90% de los usuarios que usan el panel de supervisión pueden identificar correctamente qué revisar antes de aceptar trabajo de IA.

## Assumptions

- Los roles de IA predefinidos (AI Spec Assistant, AI Code Generator, AI Reviewer) cubren los casos de uso principales de colaboración.
- Los prompts de ejemplo son ilustrativos y el usuario puede adaptarlos a su contexto específico.
- No se requiere crear nuevos roles de IA para esta feature; se reutilizan los existentes de la sección Roles (US3).
- La información de colaboración se basa en el backlog existente y la sección de Roles.
- El progreso persiste en localStorage (misma estrategia que Constitution Checker).

### Out of scope for v1

- Creación o edición de prompts por parte del usuario (solo prompts predefinidos).
- Exportación o impresión del resumen de colaboración.
- Soporte multi-idioma para prompts y contenido.
