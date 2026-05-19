# Feature Specification: Prerrequisitos para adoptar SDD

**Feature Branch**: `019-sdd-prerequisites`  
**Created**: 2026-05-08  
**Status**: Draft  
**Input**: User description: "US18 - Prerrequisitos para adoptar SDD: crear una sección educativa que liste los prerrequisitos técnicos y culturales necesarios antes de adoptar SDD, con un checklist interactivo para que los equipos evalúen su preparación, recursos para cerrar brechas y una ruta sugerida de preparación."

## User Scenarios & Testing *(mandatory)*

### User Story 0 - Comprender el propósito de la sección (Priority: P1)

Como visitante que llega por primera vez a la sección "Prerrequisitos SDD", quiero entender de un vistazo qué es esta sección, para quién es, y qué puedo hacer aquí, para decidir si me sirve antes de invertir tiempo en el checklist.

**Why this priority**: Sin un encabezado claro, el visitante abandona antes de interactuar con el checklist. La primera impresión determina si el usuario se queda.

**Independent Test**: Un visitante puede leer el encabezado e introducción en menos de 15 segundos y responder: (a) ¿qué es esta sección?, (b) ¿para quién es?, (c) ¿qué acción principal puedo tomar?

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la sección "Prerrequisitos SDD" por primera vez, **When** ve el encabezado, **Then** lee: título claro ("Prerrequisitos para adoptar SDD"), subtítulo explicativo en lenguaje no-técnico ("Antes de empezar con SDD, tu equipo necesita ciertas bases. Esta sección te ayuda a evaluar si las tienes y qué hacer si faltan."), y un párrafo introductorio que explica: para quién es (líderes técnicos y desarrolladores), qué incluye (checklist interactivo + recursos), y cuánto toma (~3 minutos).
2. **Given** que el usuario es un visitante recurrente con progreso guardado, **When** vuelve a la sección, **Then** ve un indicador visual ("Tu evaluación anterior: [veredicto] — [X] de 10 prerrequisitos cumplidos") y la opción de "Continuar evaluación" o "Empezar de nuevo".
3. **Given** que el usuario lee la introducción, **When** busca la acción principal, **Then** encuentra un botón o enlace prominente "Evaluar mi equipo" que lleva directamente al checklist interactivo.

---

### User Story 1 - Evaluar preparación del equipo (Priority: P1)

Como líder técnico evaluando SDD para mi equipo, quiero un checklist interactivo donde pueda marcar qué prerrequisitos cumple mi equipo, para obtener un veredicto claro sobre si estamos listos para adoptar SDD.

**Why this priority**: Sin una evaluación estructurada, los equipos intentan SDD sin estar preparados y abandonan por frustración. El checklist es la herramienta central de esta sección.

**Independent Test**: Un líder técnico puede completar el checklist de prerrequisitos en menos de 3 minutos, recibir un veredicto ("Ready", "Casi listo" o "Faltan bases") y ver exactamente qué brechas debe cerrar.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la sección "Prerrequisitos SDD", **When** ve el checklist, **Then** identifica los prerrequisitos organizados en 3 categorías: Técnicos (Git, Markdown, testing, CLI), Metodológicos (Agile, code review, IA), y Herramientas (editor, linter, CI/CD).
2. **Given** que el usuario marca algunos prerrequisitos como cumplidos, **When** hace clic en "Evaluar preparación", **Then** el sistema muestra un veredicto: si todos marcados → "Ready para SDD", si faltan algunos → "Casi listo (X brechas)" con las brechas listadas, si faltan muchos → "Faltan bases (revisar Y recursos)" con ruta sugerida.
3. **Given** que el usuario recibe un veredicto "Casi listo", **When** hace clic en una brecha específica, **Then** se expande con recursos recomendados: tutoriales, documentación externa, ejemplos prácticos para cerrar esa brecha.
4. **Given** que el usuario tiene varias brechas, **When** recibe la ruta sugerida, **Then** ve una secuencia ordenada por dependencias (ej. "Primero Git, luego Markdown, luego testing").

---

### User Story 2 - Comprender los prerrequisitos técnicos (Priority: P1)

Como desarrollador que quiere aprender SDD, quiero entender qué habilidades técnicas necesito dominar antes de empezar, para saber si tengo las bases o debo estudiar algo primero.

**Why this priority**: Los prerrequisitos técnicos son el principal obstáculo para adoptar SDD. Sin claridad sobre qué se necesita saber, el desarrollador puede sentirse abrumado o saltar a SDD sin las bases.

**Independent Test**: Un desarrollador puede listar los 4 prerrequisitos técnicos principales (Git, Markdown, testing, CLI) y explicar por qué cada uno es necesario para SDD.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la categoría "Técnicos", **When** lee la sección, **Then** ve 4 prerrequisitos: Git (branches, PRs, commits), Markdown (encabezados, listas, tablas, code blocks), testing (unitario, integración, Given/When/Then), CLI básico (navegación, scripts).
2. **Given** que el usuario quiere entender por qué Git es necesario, **When** expande el prerrequisito, **Then** ve una explicación: "SDD versiona specs tanto como código. Necesitas Git para trackear cambios en specs, hacer code review de specs en PRs y mantener trazabilidad."
3. **Given** que el usuario necesita aprender un prerrequisito, **When** hace clic en "Recursos", **Then** ve enlaces a documentación oficial, tutoriales interactivos y ejemplos específicos de SDD que usan esa habilidad.

---

### User Story 3 - Comprender los prerrequisitos metodológicos y culturales (Priority: P2)

Como líder de equipo, quiero evaluar si mi equipo tiene la madurez metodológica y cultural necesaria para SDD, para identificar brechas de mentalidad antes de invertir en la adopción.

**Why this priority**: Los prerrequisitos culturales son los más difíciles de cerrar. Identificarlos temprano evita conflictos y resistencia durante la adopción.

**Independent Test**: Un líder puede evaluar 3 aspectos culturales de su equipo (experiencia Agile, familiaridad con code review, apertura a IA) y recibir recomendaciones específicas para cada brecha.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a "Metodológicos", **When** revisa los items, **Then** ve: experiencia previa con Agile/iteraciones, familiaridad con code review, apertura a trabajo asistido por IA.
2. **Given** que un equipo no tiene experiencia con code review, **When** el usuario expande esa brecha, **Then** ve recursos sobre cómo implementar revisiones de código gradualmente, empezando por PRs pequeños y aumentando complejidad.
3. **Given** que el equipo muestra resistencia a la IA, **When** el usuario consulta la sección, **Then** ve argumentos y estudios sobre cómo la IA asistida por specs produce mejores resultados que la IA sin contexto.

---

### Edge Cases

- ¿Qué pasa si el equipo no usa Git? → El prerrequisito de Git se marca como no cumplido y se muestra como la brecha más prioritaria (sin Git no hay trazabilidad de specs).
- ¿Cómo se maneja un equipo sin experiencia en testing? → Se recomienda empezar con testing manual estructurado (checklists) antes de saltar a testing automatizado.
- ¿Qué sucede si el usuario ya cumple todos los prerrequisitos? → El veredicto muestra "Ready para SDD" y sugiere comenzar con la sección "¿Qué es SDD?" del sitio.
- ¿Cómo se actualizan los recursos recomendados? → Los enlaces externos deben tener fecha de verificación y un aviso de que pueden quedar desactualizados.
- ¿Qué pasa si localStorage está deshabilitado (navegación privada, bloqueado)? → El checklist funciona normalmente pero muestra un aviso informativo: "Tu progreso no se guardará automáticamente. Considera hacer una captura de pantalla de tu evaluación." No se bloquea ninguna funcionalidad.
- ¿Qué sucede si el usuario hace clic rápido en checkboxes múltiples veces antes de evaluar? → El sistema debe procesar el último estado de cada checkbox sin duplicar ni perder cambios. No hay debounce necesario — el estado se lee al momento de "Evaluar".
- ¿Qué pasa si el usuario cambia de categoría mientras evalúa? → El checklist muestra las 3 categorías simultáneamente en scroll vertical. No hay tabs ni navegación entre categorías — todo es visible en una sola página.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema MUST incluir una sección "Prerrequisitos SDD" organizada en 3 categorías: Técnicos, Metodológicos y Herramientas.
- **FR-002**: Cada prerrequisito MUST mostrar: nombre, explicación de por qué es necesario para SDD, nivel sugerido (básico/intermedio/avanzado) y recursos recomendados.
- **FR-003**: El sistema MUST incluir un checklist interactivo donde el usuario pueda marcar cada prerrequisito como cumplido/no cumplido.
- **FR-004**: El sistema MUST calcular un veredicto basado en los items marcados: todos cumplidos → "Ready para SDD", 1-2 sin cumplir → "Casi listo (X brechas)", 3+ sin cumplir → "Faltan bases (revisar Y recursos)".
- **FR-005**: Cada brecha identificada MUST ser expandible al hacer clic, mostrando recursos recomendados (tutoriales, documentación, ejemplos) para cerrarla.
- **FR-006**: Cuando hay 2+ brechas, el sistema MUST mostrar una ruta sugerida de preparación ordenada por dependencias.
- **FR-007**: El veredicto y progreso MUST persistir en localStorage para que el equipo pueda retomar la evaluación.
- **FR-008**: La sección MUST incluir enlaces a las secciones del sitio donde se aplican cada prerrequisito (ej. Git → Proceso E2E, testing → Anatomía de Specs).
- **FR-009**: El botón "Evaluar preparación" MUST mostrar un estado visual de "calculando..." (texto cambiado, cursor de espera) durante el cálculo del veredicto (duración <200ms).
- **FR-010**: Cuando el progreso se guarda en localStorage exitosamente, el sistema MUST mostrar un indicador discreto no-intrusivo (ej. ícono de check + "Guardado") durante 2 segundos.
- **FR-011**: Las explicaciones de "por qué es necesario para SDD" MUST estar escritas en lenguaje accesible para un desarrollador junior, evitando jerga de arquitectura avanzada.
- **FR-012**: Los tipos de recurso (tutorial, documentación, ejemplo) MUST distinguirse visualmente con un badge o ícono identificable.
- **FR-013**: Todos los elementos interactivos (checkboxes, botones, items expandibles, enlaces) MUST tener estados hover, focus y active definidos con contraste WCAG AA mínimo 3:1.
- **FR-014**: El orden de tabulación (tabindex) MUST seguir el flujo visual: encabezado → introducción → categorías (en orden) → checkboxes dentro de cada categoría → botón evaluar → veredicto → ruta sugerida → cross-links.
- **FR-015**: Los cambios dinámicos de contenido (veredicto mostrado, brechas expandidas, ruta sugerida) MUST anunciarse a screen readers mediante ARIA live regions (`aria-live="polite"`).

### Key Entities *(include if feature involves data)*

- **Prerequisite**: Habilidad o conocimiento necesario para adoptar SDD. Contiene: id, nombre, categoría (técnico/metodológico/herramienta), descripción, por qué es necesario para SDD, nivel sugerido (básico/intermedio/avanzado), recursos recomendados (array de Resource), sección del sitio relacionada.
- **Resource**: Recurso educativo para cerrar una brecha. Contiene: título, tipo (tutorial/documentación/ejemplo), url, duración estimada.
- **Evaluation**: Evaluación de preparación del equipo. Contiene: prerequisites marcados como cumplidos, veredicto (ready/almost/missing), brechas identificadas, ruta sugerida.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un líder técnico puede completar la evaluación de preparación de su equipo en menos de 3 minutos y recibir un veredicto claro.
- **SC-002**: El 90% de los usuarios que reciben un veredicto "Casi listo" pueden identificar sus brechas y acceder a recursos para cerrarlas en 1 clic.
- **SC-003**: Un usuario sin experiencia previa en SDD puede entender qué habilidades necesita desarrollar antes de adoptar la metodología después de leer la sección.
- **SC-004**: El 80% de los usuarios califica los recursos recomendados como "útiles" o "muy útiles" en una encuesta de satisfacción.
- **SC-005**: La sección carga completamente en menos de 2 segundos en una conexión de banda ancha estándar.

## Clarifications

### Session 2026-05-08

- Q: Should the checklist be a fixed set of 10 prerequisites or allow users to add custom items? → A: Fixed set of 10 items, hardcoded in JS. No custom items.

## Assumptions

- Los prerrequisitos técnicos asumen un desarrollador de software promedio (conoce programación básica).
- Los recursos recomendados son enlaces a documentación pública (GitHub Docs, MDN, etc.) que pueden quedar desactualizados.
- El checklist usa localStorage para persistencia, consistente con el resto del sitio.
- La ruta sugerida se genera mediante reglas fijas (orden por dependencia), no con IA.
- Los veredictos se calculan con lógica simple (conteo de items), no con algoritmos complejos.
- La sección se implementa como contenido estático con Vanilla JS, sin backend.
- Los enlaces externos se revisan y actualizan con cada release del sitio (cadencia: al menos trimestral).
- El contenido está en español como idioma único en esta versión (i18n no es requisito actual).
