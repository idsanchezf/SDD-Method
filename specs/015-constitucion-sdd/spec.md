# Feature Specification: Constitución SDD

**Feature Branch**: `015-constitucion-sdd`
**Created**: 2026-05-07
**Status**: Draft
**Input**: User story US6 del backlog: "Constitución SDD"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Conocer los principios constitucionales (Priority: P1)

Como usuario del sitio, quiero una sección dedicada que explique los 5 principios constitucionales de SDD (Vanilla-First, Semantic HTML & Accessible, Professional CSS Architecture, Feature Branch & PR Workflow, CI/CD via GitHub Actions), para entender las reglas fundamentales que todo proyecto SDD debe cumplir.

**Why this priority**: Los principios constitucionales son la base metodológica de SDD. Sin entenderlos, el usuario no comprende por qué SDD funciona ni cómo aplicarlo correctamente en sus proyectos.

**Independent Test**: Un usuario puede navegar a la sección "Constitución SDD", leer los 5 principios, y explicar al menos 3 de ellos después de la lectura.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la sección "Constitución SDD", **When** ve el contenido, **Then** encuentra los 5 principios listados con su nombre, descripción y propósito.
2. **Given** que el usuario lee un principio, **When** expande su detalle, **Then** ve: definición, fases donde aplica, consecuencias de violación, y ejemplos de cumplimiento.
3. **Given** que el usuario navega la sección, **When** hace scroll, **Then** cada principio está claramente separado visualmente con icono identificativo y código de color.

---

### User Story 2 - Verificar principios por fase con Constitution Checker (Priority: P1)

Como usuario practicante de SDD, quiero un Constitution Checker interactivo que me permita verificar qué principios aplican en cada fase del proceso (Specify, Clarify, Plan, Tasks, Implement), para asegurarme de que mi proyecto cumple con la constitución antes de avanzar.

**Why this priority**: El valor práctico de los principios está en su aplicación por fase. El checker convierte el conocimiento teórico en una herramienta de verificación accionable.

**Independent Test**: Un usuario puede seleccionar una fase, ver qué principios aplicar, marcar los que ha cumplido, y recibir un veredicto de "PASS" o "FAIL" para esa fase.

**Acceptance Scenarios**:

1. **Given** que el usuario abre el Constitution Checker, **When** selecciona una fase (ej. "Plan"), **Then** ve los principios que aplican a esa fase con checkboxes interactivos.
2. **Given** que el usuario marca todos los principios de una fase como cumplidos, **When** hace clic en "Verificar", **Then** recibe un veredicto "PASS ✓" con mensaje de confirmación.
3. **Given** que al menos un principio no está marcado, **When** el usuario verifica la fase, **Then** recibe un veredicto "FAIL ✗" listando los principios pendientes con enlaces a su explicación.
4. **Given** que el usuario completa todas las fases, **When** todas pasan la verificación, **Then** recibe un resumen "Constitución Completa" con opción de resetear.

---

### User Story 3 - Ver progreso constitucional del proyecto (Priority: P2)

Como líder técnico, quiero ver un resumen visual del progreso constitucional del proyecto (qué fases cumplen la constitución y cuáles no), para identificar riesgos y áreas de mejora en la adopción de SDD.

**Why this priority**:
El checker individual por fase es útil, pero sin una vista global el líder no puede evaluar el estado general del proyecto ni priorizar acciones correctivas.

**Independent Test**: Un usuario puede ver un panel resumen con las 5 fases, cada una marcada como PASS/FAIL/PENDING, y el porcentaje total de cumplimiento constitucional.

**Acceptance Scenarios**:

1. **Given** que el usuario ha verificado al menos una fase, **When** ve el resumen, **Then** cada fase muestra estado: PASS (verde), FAIL (rojo), o PENDING (gris).
2. **Given** que el usuario ve el resumen, **When** no ha verificado ninguna fase, **Then** todas las fases muestran "PENDING" y el progreso total es 0%.
3. **Given** que el usuario hace clic en una fase del resumen, **When** la fase está en FAIL, **Then** navega directamente al Constitution Checker con esa fase seleccionada y los principios pendientes resaltados.

### Edge Cases

- ¿Qué sucede si el usuario no ha leído la sección de principios antes de usar el checker? → El checker funciona independientemente, pero cada principio tiene un enlace a su explicación completa.
- ¿Cómo se maneja el progreso del checker entre sesiones? → El estado del checker se guarda en localStorage y se restaura al recargar (mismo patrón que el checklist del walkthrough).
- ¿Qué pasa si todos los principios están marcados en todas las fases? → El resumen muestra 100% y un mensaje de felicitación "Proyecto constitutionalmente compliant".
- ¿El checker valida principios que no aplican a una fase? → Cada fase muestra solo los principios relevantes. Por ejemplo, CI/CD no aplica en Specify, solo en Implement.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Sistema DEBE incluir una sección "Constitución SDD" con los 5 principios constitucionales: Vanilla-First, Semantic HTML & Accessible, Professional CSS Architecture, Feature Branch & PR Workflow, CI/CD via GitHub Actions.
- **FR-002**: Cada principio DEBE mostrar: nombre, descripción, propósito, fases donde aplica, consecuencias de violación y ejemplos de cumplimiento.
- **FR-003**: Sistema DEBE incluir un Constitution Checker interactivo con selector de fase (Specify, Clarify, Plan, Tasks, Implement).
- **FR-004**: Cada fase en el checker DEBE mostrar los principios que aplican con checkboxes.
- **FR-005**: Sistema DEBE verificar los checkboxes y mostrar veredicto PASS/FAIL por fase.
- **FR-006**: Sistema DEBE mostrar un resumen global con estado PASS/FAIL/PENDING por fase y porcentaje total.
- **FR-007**: Sistema DEBE persistir el estado del checker en localStorage y restaurarlo al recargar.
- **FR-008**: Sistema DEBE permitir resetear todo el progreso del checker.
- **FR-009**: Los principios en FAIL DEBEN tener enlaces a su sección de explicación para facilitar la corrección.

### Key Entities

- **Principio Constitucional**: Nombre, descripción, propósito, fases donde aplica[], consecuencias de violación, ejemplos de cumplimiento.
- **ConstitutionState**: Fase actual seleccionada, checklist por fase (fase → principio[] → checked), progreso global (porcentaje), estado por fase (PASS/FAIL/PENDING).
- **ConstitutionChecker**: Componente interactivo. Métodos: selectPhase(), togglePrinciple(), verify(), reset(), getSummary(), save(), load().

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un usuario puede leer y comprender los 5 principios constitucionales en menos de 5 minutos.
- **SC-002**: Un usuario puede verificar una fase completa (marcar principios + obtener veredicto) en menos de 30 segundos.
- **SC-003**: El resumen global muestra correctamente el porcentaje de cumplimiento después de verificar cualquier combinación de fases.
- **SC-004**: El estado del checker persiste correctamente al recargar la página (verificado con prueba manual de recarga).
- **SC-005**: El Constitution Checker es accesible por teclado (Tab + Enter para marcar checkboxes y navegar entre fases).

## Assumptions

- El usuario ya conoce las 5 fases de SDD (US1-US2 ya implementadas).
- Los principios constitucionales se aplican de forma acumulativa: cumplir en fases tempranas facilita el cumplimiento en fases tardías.
- No se requiere autenticación para usar el checker (progreso local en el navegador).
- Los estilos del checker seguirán el design system existente (variables.css).
- La sección "Constitución SDD" será una nueva sección en la página principal, no una página separada.
- Vanilla-First es el principio de más alto nivel y aplica a todas las fases.
