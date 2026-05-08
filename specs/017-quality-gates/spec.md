# Feature Specification: Quality Gates Interactivos

**Feature Branch**: `017-quality-gates`  
**Created**: 2026-05-07  
**Status**: Draft  
**Input**: User description: "US8 - Inspeccionar Quality Gates interactivamente"

## Clarifications

### Session 2026-05-07

- Q: Should gate exploration state persist across page reloads (localStorage) or only during current session? → A: localStorage, matching existing project pattern (Constitution Checker, Collaboration Flow).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Inspeccionar quality gates en el diagrama (Priority: P1)

Como tech lead o developer, quiero hacer clic en un quality gate del diagrama de proceso E2E y ver un panel con su información detallada, para entender qué criterios verifica y quién es responsable.

**Why this priority**: Sin esta funcionalidad los quality gates existen visualmente pero no comunican su propósito ni criterios, limitando su utilidad como herramienta de calidad.

**Independent Test**: Un usuario puede hacer clic en cualquier quality gate del diagrama de proceso E2E y ver: nombre, descripción, criterios de verificación y roles responsables.

**Acceptance Scenarios**:

1. **Given** que el usuario ve el diagrama de proceso E2E, **When** hace clic en un quality gate (ej. "Spec Review"), **Then** se abre un panel con: nombre del gate, descripción, criterios de verificación detallados y roles responsables de la revisión.
2. **Given** que el usuario abre el panel de un quality gate, **When** cierra el panel por primera vez, **Then** el gate se marca como explorado en el diagrama con un indicador visual persistente (borde verde).
3. **Given** que el usuario cierra el panel, **When** el gate ha sido explorado, **Then** el diagrama muestra un indicador visual (marcado como "explorado") que persiste durante la sesión.

---

### User Story 2 - Simular fallo de quality gate (Priority: P2)

Como tech lead o developer, quiero activar un modo de simulación de fallo en un quality gate para entender qué sucede cuando no se pasa, qué acciones de remediación tomar y a quién recurrir.

**Why this priority**: El entendimiento de las consecuencias del fallo es tan importante como conocer los criterios. La simulación prepara al equipo para manejar gates fallidos en proyectos reales.

**Independent Test**: Un usuario puede activar "Simular fallo" en cualquier gate, ver el estado "FAILED" con recomendaciones de remediación y enlaces a documentación relacionada.

**Acceptance Scenarios**:

1. **Given** que el usuario está viendo un quality gate, **When** activa "Simular fallo", **Then** el gate muestra estado "FAILED" con indicador visual rojo y una lista de criterios no cumplidos.
2. **Given** que el gate está en estado "FAILED", **When** el usuario ve las recomendaciones, **Then** se muestran acciones de remediación paso a paso y enlaces a secciones del sitio donde aprender más (ej. Guía, Constitución).
3. **Given** que el usuario termina de explorar la simulación, **When** desactiva "Simular fallo", **Then** el gate vuelve a su estado neutral sin afectar el progreso de exploración.

---

### Edge Cases

- ¿Qué sucede si el usuario hace clic en un área del diagrama que no es un quality gate? → No ocurre ninguna acción; el clic solo responde en los gates identificados visualmente.
- ¿Cómo se comporta el panel en pantallas pequeñas? → El panel se muestra como overlay a pantalla completa en móvil, con botón de cierre visible.
- ¿Qué pasa si el usuario cierra el panel sin desactivar "Simular fallo"? → La simulación se mantiene activa; al reabrir el gate se conserva el estado de simulación hasta que se desactive explícitamente.
- ¿Cómo se maneja si no hay documentación relacionada para un gate específico? → El enlace a documentación se oculta; se muestra solo "No hay documentación adicional disponible para este gate."

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema MUST permitir hacer clic o presionar Enter/Espacio en cualquier quality gate del diagrama de proceso E2E y abrir un panel de detalle.
- **FR-002**: El panel de detalle del quality gate MUST mostrar: nombre del gate, descripción, criterios de verificación, fase asociada, si es obligatorio o recomendado, y roles responsables.
- **FR-003**: El sistema MUST incluir un botón "Simular fallo" en el panel que al activarse muestre el gate como "FAILED" con indicador visual rojo.
- **FR-004**: En estado "FAILED", el sistema MUST mostrar una lista de criterios no cumplidos y acciones de remediación paso a paso.
- **FR-005**: En estado "FAILED", el sistema MUST mostrar enlaces a secciones de documentación relacionada cuando estén disponibles.
- **FR-006**: El sistema MUST marcar los gates explorados visualmente en el diagrama (indicador "explorado") y persistir este estado en localStorage (clave `sdd-gates-progress`).
- *Clarificación del indicador*: El gate explorado muestra un borde verde (`--color-gate-explored: #10B981`) alrededor del diamante SVG, manteniendo el relleno ámbar a menos que esté en estado FAILED.
- **FR-007**: El sistema MUST permitir desactivar "Simular fallo" y restaurar el gate a su estado neutral sin afectar el marcado de explorado.
- **FR-008**: El panel de detalle MUST ser responsive: en desktop como panel lateral o flotante, en móvil como overlay a pantalla completa.
- **FR-009**: Los datos de los quality gates MUST obtenerse de la fuente existente (quality-points.js), sin duplicar la definición de los gates.
- **FR-010**: El panel de detalle MUST ser accesible por teclado: tecla Escape para cerrar, foco inicial en el botón de cierre, y retorno de foco al gate del diagrama al cerrar.
- **FR-011**: El panel MUST tener atributos ARIA: `role="dialog"`, `aria-labelledby` apuntando al título del gate, y notificaciones `aria-live` para cambios de estado (apertura, cierre, simulación activada/desactivada).

### Key Entities

- **Quality Gate**: Punto de control de calidad en el proceso SDD. Contiene: id, nombre, fase asociada, descripción, criterios de verificación, si es obligatorio (mandatory), roles responsables, acciones de remediación, enlaces a documentación relacionada.
- **Gate Exploration**: Estado de interacción del usuario con un gate. Contiene: gateId, explorado (boolean), simulaciónActiva (boolean), últimoAcceso (timestamp).
- **Progreso de Exploración**: Estado de todos los gates explorados durante la sesión. Contiene: lista de gate explorations, fecha de última actualización.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un usuario puede hacer clic en cualquier quality gate del diagrama y ver el panel de detalle completo en menos de 2 clics desde la vista principal del diagrama.
- **SC-002**: Un usuario puede activar "Simular fallo", ver el estado FAILED con remediaciones, y restaurar el estado neutral en menos de 3 interacciones totales.
- **SC-003**: Los gates explorados son visualmente distinguibles de los no explorados en el diagrama a simple vista.
- **SC-004**: El panel de detalle se renderiza correctamente en resoluciones de escritorio (1024px+) y móvil (320px+) sin pérdida de información.

## Assumptions

- Los datos de quality gates existentes en quality-points.js son la fuente de verdad; esta feature no crea nuevos gates.
- El progreso de exploración persiste en localStorage (clave `sdd-gates-progress`), mismo patrón que Constitution Checker y Collaboration Flow.
- Los roles responsables se derivan de los datos existentes de roles (US3); no se requiere configuración adicional.
- Esta feature extiende el diagrama de proceso E2E existente (US4), no crea un nuevo componente.
- Los enlaces a documentación relacionada se generan dinámicamente según el gateId y las secciones existentes del sitio.
