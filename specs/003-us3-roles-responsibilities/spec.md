# Feature Specification: SDD Roles & Responsibilities - Interactive Role Explorer

**Feature Branch**: `004-us3-roles-responsibilities`  
**Created**: 2026-05-05  
**Status**: Draft  
**Input**: User Story 3 from `specs/001-sdd-method-webapp/spec.md` — "Identificar roles y responsabilidades en SDD"

## User Scenarios & Testing *(mandatory)*

### User Story 3 - Identificar roles y responsabilidades en SDD (Priority: P2)

Como líder de equipo o desarrollador, quiero entender qué roles participan en un proyecto SDD (tanto humanos como de IA), sus responsabilidades, habilidades requeridas y cómo colaboran entre sí, para poder estructurar mi equipo correctamente.

**Why this priority**: La asignación de roles es fundamental para implementar SDD. Sin claridad en quién hace qué, el proceso se desorganiza.

**Independent Test**: Un usuario puede listar todos los roles (humanos e IA), asignar al menos 3 responsabilidades a cada uno y explicar cómo interactúan dos roles específicos durante una fase.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la sección de roles, **When** selecciona un rol humano (ej. Spec Writer, Developer), **Then** ve sus responsabilidades, habilidades requeridas, nivel de experiencia sugerido y en qué fases participa.
2. **Given** que el usuario selecciona un rol de IA (ej. AI Spec Assistant, AI Code Generator), **Then** ve sus capacidades, limitaciones, prompts recomendados y cómo un humano debe supervisar su trabajo.
3. **Given** que el usuario está en la sección de roles, **When** activa la vista de "matriz de colaboración", **Then** ve una tabla o diagrama que muestra qué roles interactúan en cada fase y de qué manera.

### Edge Cases

- ¿Qué sucede si el usuario accede a esta sección sin haber leído las secciones anteriores? → Se muestra un banner con enlaces a "¿Qué es SDD?" y "Fases del Proceso", pero no bloquea el acceso.
- ¿Cómo se visualiza la matriz de colaboración en pantallas pequeñas? → En móvil la tabla se convierte en una lista de tarjetas por fase mostrando las interacciones de roles.
- ¿Qué pasa si un usuario necesita comparar dos roles lado a lado? → Se permite seleccionar hasta 2 roles y ver sus detalles en una vista comparativa.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La sección debe presentar los roles humanos de SDD (Spec Writer, Developer, Reviewer, Product Owner) como tarjetas seleccionables con información resumida.
- **FR-002**: La sección debe presentar los roles de IA de SDD (AI Spec Assistant, AI Code Generator, AI Reviewer) como tarjetas diferenciadas visualmente de los roles humanos.
- **FR-003**: Al seleccionar un rol, se debe mostrar un panel de detalle con: responsabilidades principales (lista), habilidades requeridas, nivel de experiencia recomendado, fases en las que participa.
- **FR-004**: Para cada rol de IA, el panel de detalle debe incluir: capacidades, limitaciones conocidas, ejemplos de prompts efectivos y requisitos de supervisión humana.
- **FR-005**: La sección debe incluir una matriz de colaboración que muestre qué roles interactúan en cada fase del proceso SDD (Specify, Clarify, Plan, Tasks, Implement).
- **FR-006**: La matriz de colaboración debe ser interactiva: al hacer clic en una fase, se resaltan los roles participantes; al hacer clic en un rol, se resaltan las fases donde participa.
- **FR-007**: La sección debe incluir un indicador visual de progreso de lectura para esta sección.
- **FR-008**: La sección debe reutilizar las variables CSS del design system creado en US1 (`src/css/variables.css`).
- **FR-009**: La sección debe cargar completamente en menos de 2 segundos en una conexión de 3G.
- **FR-010**: Todo el contenido debe ser accesible: cumple WCAG AA, estructura de headings semántica, elementos interactivos navegables por teclado.

### Key Entities

- **Rol Humano**: Participante humano en el proceso. Contiene: nombre, slug, icono, tipo ("humano"), responsabilidades (string[]), habilidades (string[]), nivel de experiencia, fases de participación (string[]), descripción.
- **Rol IA**: Participante de IA en el proceso. Contiene: nombre, slug, icono, tipo ("ia"), capacidades (string[]), limitaciones (string[]), prompts ejemplo (string[]), supervision humana (string), fases de participación (string[]), descripción.
- **Matriz de Colaboración**: Tabla que cruza fases vs roles. Cada celda indica: nivel de participación (principal, secundario, revisor), tipo de interacción.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El 90% de los usuarios que completan la lectura pueden nombrar al menos 3 roles humanos y 2 roles de IA con una responsabilidad correcta para cada uno.
- **SC-002**: La sección completa (HTML + CSS + JS) añade menos de 50 KB adicionales al bundle total del sitio.
- **SC-003**: La matriz de colaboración es comprensible tanto en vista desktop como móvil sin pérdida de información.
- **SC-004**: La sección obtiene puntuación de accesibilidad de 95/100 o superior en Lighthouse.
- **SC-005**: Los usuarios pueden encontrar la información de un rol específico en menos de 3 clics desde la sección.

## Assumptions

- Esta sección se integra como un `<section>` adicional en `src/index.html` debajo de la sección de fases de US2.
- Reutiliza `src/css/variables.css` y `src/css/reset.css` del US1.
- Tendrá su propio archivo `src/css/roles.css` y `src/js/roles.js`.
- Los iconos de roles usarán SVG inline o Unicode entities.
- No se requiere backend; todo el contenido de roles es estático en HTML.
- Se incluirán al menos 4 roles humanos y 3 roles de IA para cubrir el espectro del proceso SDD.
