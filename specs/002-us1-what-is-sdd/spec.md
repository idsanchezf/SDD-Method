# Feature Specification: What is SDD - Hero Section

**Feature Branch**: `002-us1-what-is-sdd`  
**Created**: 2026-05-05  
**Status**: Draft  
**Input**: User Story 1 from `specs/001-sdd-method-webapp/spec.md` — "Comprender qué es Spec Driven Development"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Comprender qué es Spec Driven Development (Priority: P1)

Como visitante nuevo del sitio, quiero entender de forma clara y concisa qué es la metodología Spec Driven Development (SDD), sus beneficios y en qué se diferencia de otros enfoques de desarrollo de software, para poder evaluar si es aplicable a mis proyectos.

**Why this priority**: Sin comprender los fundamentos de SDD, el usuario no puede aprovechar el resto del contenido. Es la base sobre la cual se construye todo el aprendizaje.

**Independent Test**: Un usuario puede navegar a la sección "¿Qué es SDD?" y en menos de 3 minutos responder correctamente: qué es SDD, cuál es su principio central y al menos 2 beneficios clave.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la página principal, **When** navega a la sección "¿Qué es SDD?", **Then** ve una definición clara con ejemplos visuales del concepto.
2. **Given** que el usuario está en la sección de SDD, **When** lee el contenido, **Then** puede identificar al menos 3 diferencias entre SDD y metodologías tradicionales (waterfall, agile sin specs).
3. **Given** que el usuario termina de leer, **When** se le presenta un resumen interactivo, **Then** puede verificar su comprensión con un checklist de conceptos clave.

### Edge Cases

- ¿Qué sucede si el usuario accede con JavaScript deshabilitado? → Todo el contenido textual debe ser accesible sin JS; las interacciones progresivas simplemente no funcionan.
- ¿Qué pasa si el viewport es muy pequeño (320px)? → El contenido se reordena en columna única, las tarjetas se apilan verticalmente y el texto mantiene tamaño legible (min 16px).
- ¿El contenido puede ser leído por un screen reader? → Todo el contenido semántico usa HTML5 apropiado con ARIA labels donde necesario.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La sección "¿Qué es SDD?" debe incluir una definición clara de la metodología en un párrafo introductorio de máximo 150 palabras.
- **FR-002**: La sección debe incluir una subsección "Principios Fundamentales" con al menos 5 principios de SDD, cada uno con título y descripción de 2-3 líneas.
- **FR-003**: La sección debe incluir una subsección "Beneficios" con al menos 4 beneficios, presentados visualmente con icono + título + descripción.
- **FR-004**: La sección debe incluir una subsección "SDD vs Métodos Tradicionales" con una tabla comparativa que muestre al menos 3 diferencias clave entre SDD y (waterfall, agile sin specs, desarrollo sin documentación).
- **FR-005**: La sección debe incluir un resumen interactivo tipo "checklist" al final que permita al usuario verificar su comprensión con al menos 5 conceptos clave.
- **FR-006**: El contenido debe incluir un indicador visual de progreso de lectura para esta sección (barra o porcentaje visible durante la sesión).
- **FR-007**: Todo el contenido debe ser accesible: cumple WCAG AA para contraste, tiene estructura de headings semántica (h1 → h2 → h3), y todos los elementos interactivos son navegables por teclado.
- **FR-008**: La sección debe cargar completamente y ser legible en menos de 2 segundos en una conexión de 3G.

### Key Entities

- **Sección "¿Qué es SDD?"**: Página/sección principal que agrupa: definición, principios, beneficios, tabla comparativa y checklist interactivo.
- **Principio**: Cada principio fundamental de SDD. Contiene: nombre, descripción corta (2-3 líneas), icono asociado.
- **Beneficio**: Cada beneficio de adoptar SDD. Contiene: título, descripción, icono o indicador visual.
- **Comparativa**: Fila de la tabla comparativa. Contiene: aspecto comparado, cómo lo aborda SDD, cómo lo aborda el método tradicional.
- **Concepto Clave**: Cada ítem del checklist de comprensión. Contiene: enunciado, respuesta correcta (visible al usuario al hacer clic).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un usuario sin conocimiento previo de SDD puede explicar los fundamentos de la metodología en menos de 5 minutos después de leer esta sección.
- **SC-002**: El 90% de los usuarios que completan la lectura pueden identificar correctamente al menos 3 diferencias entre SDD y métodos tradicionales.
- **SC-003**: La sección completa (HTML + CSS + JS) pesa menos de 150 KB sin comprimir y carga en menos de 2 segundos en conexión 3G.
- **SC-004**: La sección obtiene puntuación de accesibilidad de 95/100 o superior en Lighthouse.
- **SC-005**: El checklist interactivo funciona correctamente sin errores en los navegadores Chrome, Firefox, Safari y Edge (últimas 2 versiones).

## Assumptions

- Esta sección es la primera página que ve el usuario (hero section del sitio).
- El contenido textual se proporciona como texto estático en HTML, no se carga dinámicamente.
- No se requiere autenticación ni tracking de usuarios para esta sección.
- Los iconos se implementan con SVG inline o Unicode entities, sin librerías externas.
- El checklist interactivo no guarda estado entre sesiones (solo sesión activa).
- El diseño usa variables CSS para colores y tipografía, facilitando cambios futuros de branding.
