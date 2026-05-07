# Feature Specification: Menú de navegación interna por sección

**Feature Branch**: `014-section-nav`
**Created**: 2026-05-07
**Status**: Draft
**Input**: User story US14 del backlog: "Navegar dentro de cada sección con menú interno"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Menú interno de sub-secciones (Priority: P1)

Como usuario del sitio, quiero un menú de navegación interno dentro de cada sección principal (Hero, Phases, Roles, Proceso E2E, Guía) que liste las sub-secciones disponibles y permita saltar directamente a ellas, para encontrar contenido específico más rápido y entender la estructura de cada módulo.

**Why this priority**: Las 5 secciones principales tienen entre 4 y 7 sub-secciones cada una. Sin un menú interno, el usuario debe scrollear manualmente para encontrar lo que busca o ignora que existen ciertos sub-contenidos. Esto impacta directamente la navegabilidad (SC-004 del backlog).

**Independent Test**: Un usuario puede identificar las sub-secciones de cualquier sección desde su menú interno y saltar a cualquiera de ellas en 1 clic.

**Acceptance Scenarios**:

1. **Given** que el usuario está en una sección (ej. "Roles"), **When** ve el menú interno de la sección, **Then** lista todas las sub-secciones: Roles Humanos, Roles IA, Matriz de Colaboración.
2. **Given** que el usuario hace clic en un ítem del menú interno, **When** se ejecuta la navegación, **Then** el scroll se desplaza suavemente hasta esa sub-sección y el ítem del menú se marca como activo.
3. **Given** que el usuario hace scroll dentro de una sección, **When** una nueva sub-sección entra en el viewport, **Then** el menú interno actualiza automáticamente el ítem activo (scroll spy).
4. **Given** que el menú interno excede la altura de la ventana, **When** hay más de 6 ítems, **Then** el menú se vuelve scrollable internamente con `overflow-y: auto`.
5. **Given** que el usuario está en móvil (viewport < 768px), **When** el menú interno ocuparía espacio vertical, **Then** se muestra como un `<select>` desplegable en lugar de lista vertical.
6. **Given** que la sección no tiene sub-secciones o tiene una sola, **When** se evalúa el menú, **Then** el menú interno no se renderiza (no ocupa espacio innecesario).

## Edge Cases

- Si el usuario está en una sección sin sub-secciones (ej. contenido plano) → el menú no se muestra
- Si el usuario recarga la página → el scroll spy reinicia; el menú muestra el primer ítem como activo si la sección está en viewport
- Si el menú está en un iframe o contexto embebido → scroll spy usa el viewport padre (no aplica en este sitio estático)
- Si el usuario navega con teclado (Tab) → los ítems del menú deben ser focusables con `role="link"` y `tabindex="0"`
- Colisión con el menú lateral existente: el menú interno es complementario (navegación intra-sección), no reemplaza la navegación global

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Cada sección principal (Hero, Phases, Roles, Process, Guide) DEBE detectar automáticamente sus sub-secciones mediante `data-section` attributes en el HTML
- **FR-002**: El menú interno DEBE posicionarse como sticky dentro del contenedor de la sección o como sidebar inline
- **FR-003**: El menú DEBE implementar scroll spy via IntersectionObserver para marcar el ítem activo
- **FR-004**: El menú DEBE hacer scroll suave a la sub-sección al hacer clic en un ítem
- **FR-005**: En móvil (< 768px) el menú DEBE convertirse en un `<select>` desplegable
- **FR-006**: Si la sección tiene 0 o 1 sub-sección, el menú NO DEBE renderizarse
- **FR-007**: El menú DEBE ser accesible por teclado con roles ARIA apropiados (`navigation`, `list`, `listitem`, `link`)

### Design System Integration

- Usar colores del sistema: `var(--color-accent)` para ítem activo, `var(--color-text)` para default
- Usar tipografía del sistema: `var(--font-body)` y `var(--font-size-sm)` para ítems
- El menú debe integrarse visualmente con el diseño existente (sin romper layout)
- No requiere frameworks externos (vanilla JS + CSS)

### Key Entities

- **SectionNavMenu**: Componente de menú interno para una sección. Atributos: sectionElement (HTMLElement), items (array de {id, title, element}), currentActive (string), isMobile (boolean)
- **SectionNavConfig**: Configuración global. Atributos: sections (NodeList de section elements), mobileBreakpoint (number, default 768)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El 100% de las secciones principales con >= 2 sub-secciones muestran menú interno
- **SC-002**: El scroll spy actualiza el ítem activo en menos de 100ms después de que una sub-sección cruza el viewport
- **SC-003**: El menú es completamente operativo por teclado (Tab + Enter)
- **SC-004**: En móvil, el selector desplegable ocupa menos de 60px de altura vertical

## Assumptions

- Las secciones principales ya existen y tienen sub-secciones identificables por headings (h2/h3)
- Se requiere marcar sub-secciones con `data-section` en el HTML (no detección automática por headings)
- No se requiere animación de entrada/salida del menú
- El menú lateral global existente (US5) permanece intacto
- El sticky positioning del menú se maneja con CSS position: sticky
- No hay conflicto con el progress bar global existente
