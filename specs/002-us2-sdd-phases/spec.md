# Feature Specification: SDD Phases - Interactive Phase Explorer

**Feature Branch**: `003-us2-sdd-phases`  
**Created**: 2026-05-05  
**Status**: Draft  
**Input**: User Story 2 from `specs/backlog/spec.md` — "Explorar las fases del proceso SDD"

## User Scenarios & Testing *(mandatory)*

### User Story 2 - Explorar las fases del proceso SDD (Priority: P1)

Como profesional de desarrollo de software, quiero conocer cada fase del proceso SDD, sus entradas, salidas y objetivos, para poder aplicar la metodología paso a paso en mis proyectos.

**Why this priority**: Las fases son el núcleo operativo de SDD. Sin este conocimiento, el usuario no puede ejecutar la metodología.

**Independent Test**: Un usuario puede enumerar correctamente las 5 fases de SDD en orden, identificar al menos una entrada y una salida de cada fase, y explicar el objetivo de cada una.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la sección de fases, **When** selecciona una fase específica, **Then** ve su nombre, descripción, entradas, salidas, duración estimada y los handoffs entre roles (quién entrega y quién recibe el trabajo).
2. **Given** que el usuario está viendo una fase, **When** hace clic en "ver detalle", **Then** se expande información con ejemplos prácticos de artefactos reales, los puntos de calidad que debe cumplir la fase y los handoffs específicos entre roles participantes.
3. **Given** que el usuario completa la revisión de todas las fases, **When** accede al diagrama interactivo del flujo, **Then** puede visualizar cómo se conectan las fases entre sí y las transiciones de roles con sus handoffs.

### Edge Cases

- ¿Qué sucede si el usuario accede a esta sección sin haber leído la sección "¿Qué es SDD?"? → Se muestra un banner sugerido con enlace a la sección introductoria, pero no bloquea el acceso.
- ¿Cómo se comporta el diagrama de flujo en pantallas pequeñas? → En móvil el diagrama se convierte en una lista vertical con flechas indicadoras de dirección.
- ¿Qué pasa si un usuario necesita imprimir o exportar la información de fases? → Se incluye un botón de "imprimir" que genera una versión optimizada para impresión con todas las fases visibles.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La sección debe presentar las 5 fases de SDD (Specify, Clarify, Plan, Tasks, Implement) como tarjetas interactivas que el usuario puede seleccionar individualmente.
- **FR-002**: Cada fase debe mostrar: nombre, número de orden, descripción breve (2-3 líneas), entradas requeridas, salidas producidas, duración estimada, roles principales y handoffs entre roles (quién entrega y quién recibe el trabajo).
- **FR-003**: Al hacer clic en "ver detalle" en una fase, se debe expandir un panel con: descripción extendida, ejemplos de artefactos reales, preguntas frecuentes de la fase, consejos prácticos, puntos de calidad que debe cumplir la fase y handoffs específicos entre roles participantes.
- **FR-004**: La sección debe incluir un diagrama de flujo visual que muestre la secuencia de las 5 fases con flechas de conexión, animación opcional de recorrido y transiciones de roles con sus handoffs.
- **FR-005**: El diagrama de flujo debe ser interactivo: al hacer clic en una fase del diagrama, se resalta la tarjeta correspondiente y viceversa, mostrando también los handoffs de esa fase.
- **FR-006**: La sección debe incluir un indicador visual de progreso de lectura para esta sección (barra o porcentaje visible durante la sesión).
- **FR-007**: Todo el contenido debe ser accesible: cumple WCAG AA, estructura de headings semántica, elementos interactivos navegables por teclado, y el diagrama debe tener alternativa textual.
- **FR-008**: La sección debe reutilizar las variables CSS del design system creado en US1 (`src/css/variables.css`).
- **FR-009**: La sección debe cargar completamente en menos de 2 segundos en una conexión de 3G.
- **FR-010**: Cada fase debe definir puntos de calidad específicos que deben cumplirse antes de pasar a la siguiente fase (ej. checklist de calidad).

### Key Entities

- **Fase SDD**: Cada etapa del proceso. Contiene: número de orden (1-5), nombre, slug (ej. "specify"), descripción corta, descripción larga, entradas (string[]), salidas (string[]), duración estimada, roles principales (string[]), consejos (string[]), artefactos de ejemplo (string[]), puntos de calidad (string[]), handoffs (objeto con rol emisor, rol receptor, artefacto entregado).
- **Handoff**: Transición de trabajo entre roles. Contiene: fase origen, rol emisor, rol receptor, artefacto entregado, criterios de aceptación del handoff.
- **Punto de Calidad**: Criterio de calidad para una fase. Contiene: descripción, criterio de verificación, obligatorio (booleano).
- **Diagrama de Flujo**: Representación visual de la secuencia de fases. Contiene: nodos (uno por fase), conexiones (flechas direccionales entre nodos consecutivos), estado activo (fase seleccionada), transiciones de roles con handoffs visualizados.
- **Panel de Detalle**: Contenido expandible por fase. Contiene: referencia a fase, descripción extendida, FAQ items (pregunta + respuesta), consejos prácticos, puntos de calidad (string[]), handoffs específicos entre roles participantes.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El 90% de los usuarios que completan la lectura pueden enumerar las 5 fases en orden correcto y nombrar al menos una entrada y salida de cada una.
- **SC-002**: La sección completa (HTML + CSS + JS) añade menos de 50 KB adicionales al bundle total del sitio.
- **SC-003**: El diagrama de flujo es comprensible tanto en vista desktop como móvil sin pérdida de información.
- **SC-004**: La sección obtiene puntuación de accesibilidad de 95/100 o superior en Lighthouse (manteniendo el score global del sitio).
- **SC-005**: El diagrama interactivo responde a clics en menos de 100ms en dispositivos de gama media.

## Assumptions

- Esta sección se integra como un `<section>` adicional en `src/index.html` debajo de la hero section de US1.
- Reutiliza `src/css/variables.css` y `src/css/reset.css` del US1.
- Tendrá su propio archivo `src/css/phases.css` y `src/js/phases.js`.
- El diagrama de flujo se implementará con SVG inline + CSS animations, sin librerías externas.
- No se requiere backend; todo el contenido de las fases es estático en HTML.
- La navegación entre US1 y US2 será mediante anclas en `index.html` (el menú lateral se implementará en una user story futura).
