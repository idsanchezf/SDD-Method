# Feature Specification: Anatomía y escritura de Specs SDD

**Feature Branch**: `018-spec-anatomy`  
**Created**: 2026-05-08  
**Status**: Draft  
**Input**: User description: "US15 - Anatomía y escritura de Specs SDD: crear una sección educativa que enseñe la estructura completa de un spec.md, el formato Given/When/Then para criterios de aceptación, técnicas para identificar edge cases, y ejemplos anotados de specs bien y mal escritas."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Aprender la anatomía de un spec.md (Priority: P1)

Como practitioner de SDD sin experiencia previa escribiendo specs, quiero entender la estructura completa de un spec.md —sus secciones obligatorias y opcionales— para poder escribir mi primera especificación con confianza desde cero.

**Why this priority**: Sin conocer la estructura estándar de un spec.md, los usuarios no pueden producir specs consistentes. Es la base sobre la que se construye toda la práctica de SDD.

**Independent Test**: Un usuario puede listar las 6 secciones principales de un spec.md (frontmatter, goal/contexto, user stories, acceptance criteria, edge cases, open questions) y explicar el propósito de cada una.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la sección "Anatomía de una Spec", **When** lee el contenido, **Then** ve un diagrama o esquema visual que muestra la estructura completa de un spec.md con todas sus secciones etiquetadas.
2. **Given** que el usuario selecciona una sección específica del spec (ej. frontmatter), **When** hace clic en ella, **Then** se expande una explicación detallada con: propósito de la sección, campos esperados, ejemplo concreto y errores comunes.
3. **Given** que el usuario completa la lectura de todas las secciones, **When** llega al final, **Then** ve un spec.md completo de ejemplo anotado con comentarios explicativos en cada sección.

---

### User Story 2 - Dominar el formato Given/When/Then (Priority: P1)

Como spec writer en formación, quiero aprender a escribir acceptance criteria en formato Given/When/Then con ejemplos buenos y malos, para eliminar ambigüedades en las especificaciones que entrego.

**Why this priority**: Given/When/Then es el corazón de SDD. Una spec sin acceptance criteria claros no es una spec SDD. Este es el skill más crítico que debe dominar un practitioner.

**Independent Test**: Un usuario puede convertir una descripción vaga de requisito (ej. "el usuario debe poder iniciar sesión") en al menos 3 escenarios Given/When/Then bien formados, identificando precondiciones, acciones y resultados esperados.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la sección de Given/When/Then, **When** ve la explicación, **Then** entiende los 3 componentes: Given (precondiciones), When (acción del usuario), Then (resultado esperado), con ejemplos contrastantes de buenos y malos escenarios.
2. **Given** que el usuario quiere practicar, **When** ve escenarios de ejemplo, **Then** puede comparar lado a lado un escenario bien escrito (específico, medible, libre de implementación) vs uno mal escrito (ambiguo, mezcla implementación, no verificable) con explicación de por qué.
3. **Given** que el usuario revisa escenarios complejos, **When** explora ejemplos con múltiples condiciones, **Then** aprende patrones avanzados: tablas de ejemplos, escenarios con AND/OR, y manejo de excepciones en el formato.

---

### User Story 3 - Identificar y documentar edge cases (Priority: P2)

Como practitioner de SDD, quiero técnicas sistemáticas para descubrir edge cases durante la escritura de specs, para asegurar que la especificación cubre todos los escenarios importantes antes de pasar a implementación.

**Why this priority**: Los edge cases no documentados son la fuente más común de bugs y rework en SDD. Enseñar técnicas para descubrirlos mejora la calidad de las specs desde el origen.

**Independent Test**: Un usuario puede identificar al menos 5 edge cases para una feature simple (ej. formulario de registro) utilizando las técnicas aprendidas (límites, negaciones, estados vacíos, errores, concurrencia).

**Acceptance Scenarios**:

1. **Given** que el usuario accede a "Edge Cases en Specs", **When** lee las técnicas, **Then** aprende 5 categorías sistemáticas para descubrir edge cases: límites (boundary values), negaciones (qué no debería pasar), estados vacíos (null/empty), errores (timeout, caídas), concurrencia (datos compartidos).
2. **Given** que el usuario ve una técnica específica, **When** hace clic en ella, **Then** se expande con: definición, preguntas guía para descubrir edge cases de esa categoría, y un ejemplo aplicado a una feature real.
3. **Given** que el usuario quiere ver edge cases bien documentados, **When** accede a ejemplos de spec, **Then** ve cómo se documentan los edge cases en un spec.md real (sección separada, referencias cruzadas a acceptance criteria, priorización por impacto y probabilidad).

---

### User Story 4 - Consultar ejemplos anotados de specs (Priority: P2)

Como aprendiz visual de SDD, quiero ver specs completas anotadas (buenas y malas) con explicaciones línea por línea, para internalizar los patrones correctos mediante ejemplos concretos.

**Why this priority**: El aprendizaje por ejemplos es más efectivo que la teoría abstracta. Ver specs reales anotadas acelera la curva de aprendizaje y reduce errores comunes.

**Independent Test**: Un usuario puede identificar al menos 3 errores comunes en una spec mal escrita y explicar cómo corregirlos basándose en los ejemplos anotados.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a "Ejemplos Anotados", **When** selecciona "Spec bien escrita", **Then** ve un spec.md completo con anotaciones visuales (notas al margen, resaltado de secciones) que explican por qué cada parte está bien.
2. **Given** que el usuario selecciona "Spec mal escrita", **When** explora el ejemplo, **Then** ve una spec con errores comunes marcados y explicaciones de por qué están mal y cómo corregirlos.
3. **Given** que el usuario quiere comparar, **When** activa la vista side-by-side, **Then** ve ambas specs (buena y mala) alineadas por secciones, con diferencias resaltadas.

---

### Edge Cases

- ¿Qué sucede si el usuario no tiene experiencia previa con Markdown? → La sección de anatomía debe incluir un enlace a la sección de prerrequisitos (US18) que cubre lo básico de Markdown.
- ¿Cómo se maneja el contenido si el usuario accede desde un dispositivo móvil? → Los diagramas de anatomía y las vistas side-by-side deben ser responsivos, colapsándose a vista vertical en pantallas pequeñas.
- ¿Qué pasa si el usuario quiere profundizar en un tema específico? → Cada sección debe tener enlaces cruzados al glosario (US10) y a la documentación relacionada en el sitio.
- ¿Cómo se actualiza el contenido cuando evoluciona el formato de spec? → Se debe incluir un indicador de versión del contenido y fecha de última actualización.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema MUST incluir una sección "Anatomía de una Spec" que muestre visualmente la estructura completa de un spec.md con frontmatter, goal/contexto, user stories, acceptance criteria, edge cases y open questions.
- **FR-002**: Cada sección del spec MUST ser expandible al hacer clic, mostrando: propósito, campos esperados, ejemplo concreto y error común asociado.
- **FR-003**: El sistema MUST incluir un spec.md completo de ejemplo anotado con comentarios explicativos en cada sección.
- **FR-004**: El sistema MUST incluir una subsección dedicada a Given/When/Then que explique los 3 componentes con ejemplos buenos y malos contrastados lado a lado.
- **FR-005**: El sistema MUST cubrir al menos 5 técnicas sistemáticas de descubrimiento de edge cases: límites, negaciones, estados vacíos, errores y concurrencia.
- **FR-006**: El sistema MUST incluir al menos 2 ejemplos completos de spec (una bien escrita y una mal escrita) con anotaciones visuales y vista comparativa side-by-side.
- **FR-007**: La sección MUST ser completamente responsiva, adaptando diagramas y vistas side-by-side a pantallas móviles (collapse vertical).
- **FR-008**: Cada concepto enseñado MUST incluir enlaces a secciones relacionadas del sitio (glosario, prerrequisitos, fases, etc.).
- **FR-009**: El sistema MUST mostrar la versión del contenido y fecha de última actualización en la sección.

### Key Entities *(include if feature involves data)*

- **Spec Section**: Componente estructural de un spec.md (frontmatter, goal, user stories, acceptance criteria, edge cases, open questions). Contiene: nombre, propósito, campos esperados, ejemplo, errores comunes.
- **Acceptance Scenario**: Escenario en formato Given/When/Then que define un criterio de verificación. Contiene: id, descripción corta, Given (precondiciones), When (acción), Then (resultado esperado), tags (happy path / edge case).
- **Edge Case Technique**: Método sistemático para descubrir edge cases. Contiene: nombre, descripción, preguntas guía, ejemplo aplicado, categoría.
- **Spec Example**: Spec completa de ejemplo con metadatos de calidad (buena/mala). Contiene: tipo (buena/mala), contenido completo del spec.md, anotaciones línea por línea.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un usuario sin experiencia previa en SDD puede identificar correctamente las 6 secciones principales de un spec.md después de leer la sección, en una autoevaluación de opción múltiple con 80% de aciertos.
- **SC-002**: El 90% de los usuarios que completan la sección Given/When/Then pueden escribir correctamente al menos 3 escenarios para una feature simple sin ayuda.
- **SC-003**: Un usuario puede descubrir al menos 3 edge cases usando las técnicas enseñadas para una feature que nunca ha visto antes.
- **SC-004**: El 85% de los usuarios califica los ejemplos anotados como "útiles" o "muy útiles" en una encuesta de satisfacción integrada.
- **SC-005**: La sección carga completamente en menos de 2 segundos en una conexión de banda ancha estándar.

## Assumptions

- El público objetivo tiene conocimientos básicos de desarrollo de software (sabe qué es una función, un test, un repositorio).
- El formato de spec SDD sigue la estructura estándar del ecosistema Spec Kit (frontmatter con metadatos, secciones de contenido en Markdown).
- Given/When/Then sigue el formato estándar de BDD ampliamente conocido (Cucumber/Gherkin), no se requiere inventar un nuevo formato.
- Los ejemplos de specs se escribirán en español para mantener consistencia con el resto del sitio.
- La funcionalidad de expandir/colapsar secciones se implementa con JavaScript vanilla, sin librerías externas.
- La vista side-by-side es implementable con CSS Grid/Flexbox responsive.
- No se requiere interacción con backend; todo el contenido es estático y se renderiza en cliente.
