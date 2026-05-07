# Feature Specification: Menú de navegación lateral global

**Feature Branch**: `014-section-nav`
**Created**: 2026-05-07
**Status**: In Progress
**Input**: User story US14 del backlog: "Menú interno por sección" (re-definido como menú lateral global)

## Clarifications

- **2026-05-07**: El alcance original era un menú interno por sección. Se re-definió a un menú lateral global colapsable con submenús para mejorar la navegabilidad general del sitio.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Menú lateral global colapsable con submenús (Priority: P1)

Como usuario del sitio, quiero un menú de navegación lateral (sidebar) en el lado izquierdo que liste todas las secciones principales y sus sub-secciones, que sea colapsable en móvil y permita navegar a cualquier contenido del sitio con 1-2 clics, para encontrar información rápidamente sin tener que scrollear.

**Why this priority**: El sitio tiene 5 secciones principales con 2-5 sub-secciones cada una. Sin una navegación global estructurada, el usuario depende de scrollear o de banners de prerrequisito para ubicarse. Un sidebar mejora la navegabilidad (SC-004 del backlog) y la experiencia general.

**Independent Test**: Un usuario puede identificar las 5 secciones principales desde el sidebar, expandir cualquier sección para ver sus sub-secciones, y navegar a cualquiera con 1 clic.

**Acceptance Scenarios**:

1. **Given** que el usuario carga el sitio, **When** ve el sidebar, **Then** lista las 5 secciones principales: ¿Qué es SDD?, Las 5 Fases, Roles, Proceso E2E, Uso Práctico.
2. **Given** que el usuario hace clic en una sección del sidebar, **When** la sección tiene sub-secciones, **Then** se expande mostrando las sub-secciones con animación suave y el arrow gira 90°.
3. **Given** que el usuario hace clic en una sub-sección, **When** se ejecuta la navegación, **Then** el scroll se desplaza suavemente hasta esa sub-sección y el link se marca como activo.
4. **Given** que el usuario hace scroll en la página, **When** una sección principal entra en viewport, **Then** el sidebar resalta la sección correspondiente y expande sus sub-menús automáticamente (scroll spy).
5. **Given** que el usuario está en móvil (< 1024px), **When** el sidebar está oculto, **Then** ve un botón hamburger en la esquina superior izquierda para abrirlo.
6. **Given** que el sidebar está abierto en móvil, **When** el usuario hace clic fuera del sidebar (overlay), presiona Escape, o selecciona un link, **Then** el sidebar se cierra.
7. **Given** que el usuario está en desktop (>= 1024px), **When** carga el sitio, **Then** el sidebar está visible permanentemente y el contenido principal tiene margen izquierdo para no solaparse.
8. **Given** que el sidebar excede la altura de la ventana, **When** hay muchas secciones, **Then** el área de navegación es scrollable internamente.

## Edge Cases

- Si el usuario recarga la página → el sidebar mantiene su estado visual (abierto/cerrado según viewport)
- Colisión con el progress bar existente: el sidebar y el progress bar coexisten; el progress bar se desplaza con el margen del contenido
- Si el usuario usa teclado (Tab) → los botones y links del sidebar deben ser focusables
- En móvil, el sidebar debe tener un botón de cierre (X) además del overlay y Escape
- El sidebar no debe interferir con el skip-link (accesibilidad)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sidebar DEBE listar las 5 secciones principales: Hero (¿Qué es SDD?), Phases, Roles, Process E2E, Guide
- **FR-002**: Cada sección con sub-secciones DEBE tener un botón expandible con indicador visual (flecha/chevron)
- **FR-003**: El sidebar DEBE ser colapsable: en móvil se oculta detrás de un toggle (hamburger), en desktop es visible permanentemente
- **FR-004**: El sidebar DEBE implementar scroll spy: resalta la sección activa y expande su submenú automáticamente
- **FR-005**: El sidebar DEBE cerrarse al hacer clic en un link (en móvil)
- **FR-006**: El sidebar DEBE cerrarse con el overlay (clic fuera) y con tecla Escape (en móvil)
- **FR-007**: El sidebar DEBE tener un botón de cierre visible (X) en su header
- **FR-008**: El contenido principal DEBE tener `margin-left` igual al ancho del sidebar en desktop
- **FR-009**: El sidebar DEBE ser accesible por teclado con roles ARIA (`navigation`, `aria-expanded`, `aria-label`)

### Key Entities

- **Sidebar**: Componente de navegación lateral. Estado: isOpen, activeSection, activeSubsection
- **SidebarSection**: Una sección principal en el menú. Atributos: id, title, subSections[], isExpanded
- **SidebarSubSection**: Una sub-sección dentro de una sección. Atributos: id, title, anchor (href)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El 100% de las secciones principales son accesibles desde el sidebar en 1 clic
- **SC-002**: El scroll spy actualiza la sección activa en menos de 100ms
- **SC-003**: El sidebar es completamente operativo por teclado (Tab + Enter + Escape)
- **SC-004**: En móvil, el sidebar se abre/cierra en menos de 300ms (transición CSS)

## Assumptions

- El ancho del sidebar es fijo: 280px
- El breakpoint para mobile/desktop es 1024px
- No se requiere persistencia del estado del sidebar entre sesiones
- El sidebar usa anchor links (#) para navegación; el smooth scroll viene del CSS global (`scroll-behavior: smooth`)
- Los IDs de sub-secciones ya existen en el HTML (añadidos como parte de esta US)
