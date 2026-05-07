# Feature Specification: Unificar Look & Feel Walkthrough US4 con Guía US5

**Feature Branch**: `006-unify-walkthrough-style`  
**Created**: 2026-05-07  
**Status**: Draft  
**Input**: User description: "US 4.1 unificar estilo visual walkthrough US4 con guía US5"

## Clarifications

### Session 2026-05-07
- Q: What specific elements from US5 guide should be adopted? → A: Header with case selector, progress bar with %, phase navigation pills, checklist per phase, container styling (white bg, shadow, border-radius)
- Q: Should the walkthrough keep its interactive decision features? → A: Yes, preserve existing walkthrough decisions, feedback, and handoff visualization - only visual/UX style changes

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Unificar Contenedor y Estilos Base (Priority: P1)

Como usuario, quiero que el walkthrough de US4 tenga el mismo estilo visual del contenedor que la guía de US5, para que ambas secciones se vean coherentes.

**Why this priority**: La consistencia visual es crítica para la experiencia de usuario. Ambas secciones permiten navegar por las fases de SDD, por lo que el usuario espera un estilo unificado.

**Independent Test**: Puede ser probado comparando visualmente el walkthrough (US4) con la guía (US5) y verificando que comparten el estilo del contenedor.

**Acceptance Scenarios**:

1. **Given** que el usuario accede al recorrido interactivo (US4), **When** visualiza el walkthrough, **Then** ve un contenedor con white background (#fff), box-shadow (0 2px 8px rgba(0,0,0,0.1)), y border-radius 8px
2. **Given** que el usuario ve la guía (US5), **When** compara con el walkthrough, **Then** ambos tienen el mismo estilo de contenedor

---

### User Story 2 - Header con Selector de Caso de Estudio (Priority: P1)

Como usuario, quiero ver un header completo en el walkthrough que incluya un selector para cambiar entre casos de estudio (Greenfield/Brownfield), para tener control sobre el tipo de proyecto que estoy viendo.

**Why this priority**: El selector permite al usuario cambiar de contexto de estudio sin necesidad de navegar a otra sección.

**Independent Test**: Puede ser probado haciendo clic en el selector y verificando que cambia el contenido del walkthrough.

**Acceptance Scenarios**:

1. **Given** que el usuario está en el walkthrough, **When** ve el header, **Then** encuentra un dropdown/selector con opciones "Greenfield" y "Brownfield"
2. **Given** que el usuario selecciona un caso diferente, **When** hace clic en la opción, **Then** el contenido del walkthrough se actualiza para reflejar el caso seleccionado

---

### User Story 3 - Progress Bar con Porcentaje (Priority: P1)

Como usuario, quiero ver una barra de progreso que indique claramente el porcentaje completado del walkthrough, para saber cuánto falta para terminar.

**Why this priority**: El porcentaje da feedback inmediato sobre el progreso, mejorando la experiencia de usuario.

**Independent Test**: Puede ser probado avanzando en el walkthrough y verificando que el porcentaje se actualiza correctamente.

**Acceptance Scenarios**:

1. **Given** que el usuario está en el walkthrough, **When** visualiza el header, **Then** ve una barra de progreso con texto indicating percentage (ej: "20% completado")
2. **Given** que el usuario avanza a la siguiente fase, **When** completa el paso, **Then** el porcentaje se actualiza correspondientemente

---

### User Story 4 - Navegación Visual por Fases Pills (Priority: P1)

Como usuario, quiero ver una navegación visual estilo pills para las 5 fases (Specify → Clarify → Plan → Tasks → Implement), para poder entender mi posición actual y navegar rápidamente entre fases.

**Why this priority**: La navegación pills proporciona una vista clara de todas las fases y permite saltar directamente a cualquier fase.

**Independent Test**: Puede ser probado haciendo clic en los pills de navegación y verificando que el walkthrough se mueve a la fase correspondiente.

**Acceptance Scenarios**:

1. **Given** que el usuario está en el walkthrough, **When** ve la navegación, **Then** ve 5 pills horizontales representando cada fase
2. **Given** que el usuario está en una fase específica, **When** visualiza el pill correspondiente, **Then** el pill tiene estado "active" (borde accent, bg claro)
3. **Given** que el usuario ha completado una fase, **When** visualiza el pill, **Then** el pill tiene estado "completed" con checkmark
4. **Given** que el usuario hace clic en un pill de fase, **Then** el walkthrough navega a esa fase

---

### User Story 5 - Checklist por Fase (Priority: P2)

Como usuario, quiero ver un checklist interactivo por cada fase del walkthrough, para verificar mi comprensión y progreso en cada etapa.

**Why this priority**: El checklist proporciona una forma de auto-evaluación y asegura que el usuario complete lositems requeridos en cada fase.

**Independent Test**: Puede ser probado marcando los items del checklist y verificando que se actualiza el progreso.

**Acceptance Scenarios**:

1. **Given** que el usuario está en una fase del walkthrough, **When** visualiza el contenido, **Then** ve un checklist con items relevantes (completitud de artifact, decisiones tomadas, handoff verificado)
2. **Given** que el usuario marca un item del checklist, **When** hace clic en el checkbox, **Then** el item se marca y el texto tiene strikethrough
3. **Given** que el usuario recarga la página, **When** retorna al walkthrough, **Then** el estado del checklist se restaura desde localStorage

---

### User Story 6 - Banner de Prerrequisito (Priority: P3)

Como usuario, quiero ver un banner de prerrequisito en la sección de proceso (US4) cuando no he completado las secciones previas, para saber qué debo leer primero.

**Why this priority**: El banner guía al usuario a seguir el orden correcto de lectura para entender la metodología.

**Independent Test**: Puede ser probado accediendo a la sección US4 y verificando que el banner aparece con el mensaje correcto.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la sección proceso (US4), **When** no ha leído las secciones previas, **Then** ve un banner con mensaje "¿No sabes qué es SDD? Lee la introducción primero" y enlace a #hero
2. **Given** que el usuario hace clic en el enlace del banner, **Then** navega a la sección de introducción

---

## Edge Cases

- Si el usuario recarga la página a mitad del walkthrough → restaurar estado desde localStorage
- Si el usuario cambia de caso (Greenfield → Brownfield) → resetear progreso del walkthrough
- Si el usuario intenta navegar a una fase que no ha completado → permitir solo navegación a fases previas o la siguiente

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Sistema DEBE tener header con selector de caso de estudio (Greenfield/Brownfield)
- **FR-002**: Sistema DEBE mostrar progress bar con indicador de porcentaje texto (ej: "X% completado")
- **FR-003**: Sistema DEBE tener navegación visual por fases estilo pills con estados active/completed/default
- **FR-004**: Sistema DEBE incluir checklist por fase con checkboxes interactivos
- **FR-005**: Sistema DEBE guardar progreso en localStorage y restaurarlo al volver
- **FR-006**: Sección US4 DEBE tener banner de prerrequisito cuando aplica
- **FR-007**: Contenedor del walkthrough DEBE tener white background (#fff), box-shadow, border-radius 8px
- **FR-008**: Walkthrough DEBE mantener funcionalidad existente de decisiones simuladas y feedback

### Key Entities

- **WalkthroughState**: Representa el estado actual del walkthrough. Atributos: currentCase, currentPhaseIndex, progress, userDecisions, visitedPhases
- **PhaseChecklist**: Checklist por fase. Atributos: phaseId, items (array de objetos con id, text, checked)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% de usuarios pueden identificar visualmente que walkthrough (US4) y guía (US5) tienen estilos consistentes
- **SC-002**: 90% de usuarios completan el walkthrough utilizando la navegación pills
- **SC-003**: El progreso se guarda correctamente en localStorage - al recargar, el estado se restaura en menos de 1 segundo
- **SC-004**: 95% de usuarios que ven el banner de prerrequisito entienden qué sección deben leer primero

## Assumptions

- Los usuarios ya conocen la estructura básica de las 5 fases de SDD (de US2)
- US5 (guía) está completamente implementada y puede usarse como referencia visual
- El walkthrough existente mantiene su funcionalidad de decisiones simuladas
- No se requiere autenticación para usar el walkthrough