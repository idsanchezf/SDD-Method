# Feature Specification: SDD Method Web App

**Feature Branch**: `sdd-method-webapp`  
**Created**: 2026-05-05  
**Status**: In Progress  
**Input**: User description: "generar el backlog para una aplicación web en la que se explique la metodologia de spec driven development, donde cada modulo o sección sea una hu con criterios de acptación y debe contemplar un contexto de que es la metodologia de SDD, que fases tiene, cuales son las entradas y salidas de cada fase, que roles intervienen tanto humaanos como IA y como es el proceso general. De igual forma se debe expplicar en alguna sección las responsabilidades y habilidades de cada rol tanto humano como IA"

## Clarifications

### Session 2026-05-05

- Q: ¿El progreso de lectura debe persistir entre sesiones del navegador? → A: No, solo sesión activa. El progreso se pierde al cerrar el navegador.
- Q: ¿En qué formato se entrega el "cheat sheet" descargable? → A: Archivo PDF pre-generado incluido como recurso estático.
- Q: ¿Cuántos casos de estudio debe incluir el sitio? → A: 2 casos: uno greenfield y uno brownfield.
- Q: ¿Cuál es el estilo de navegación principal del sitio? → A: Menú lateral colapsable con toggle en móvil.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Comprender qué es Spec Driven Development (Priority: P1)
**Status**: Implemented
Como visitante nuevo del sitio, quiero entender de forma clara y concisa qué es la metodología Spec Driven Development (SDD), sus beneficios y en qué se diferencia de otros enfoques de desarrollo de software, para poder evaluar si es aplicable a mis proyectos.

**Why this priority**: Sin comprender los fundamentos de SDD, el usuario no puede aprovechar el resto del contenido. Es la base sobre la cual se construye todo el aprendizaje.

**Independent Test**: Un usuario puede navegar a la sección "¿Qué es SDD?" y en menos de 3 minutos responder correctamente: qué es SDD, cuál es su principio central y al menos 2 beneficios clave.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la página principal, **When** navega a la sección "¿Qué es SDD?", **Then** ve una definición clara con ejemplos visuales del concepto.
2. **Given** que el usuario está en la sección de SDD, **When** lee el contenido, **Then** puede identificar al menos 3 diferencias entre SDD y metodologías tradicionales (waterfall, agile sin specs).
3. **Given** que el usuario termina de leer, **When** se le presenta un resumen interactivo, **Then** puede verificar su comprensión con un checklist de conceptos clave.

---

### User Story 2 - Explorar las fases del proceso SDD (Priority: P1)
**Status**: Edited
Como profesional de desarrollo de software, quiero conocer cada fase del proceso SDD, sus entradas, salidas y objetivos, para poder aplicar la metodología paso a paso en mis proyectos.

**Why this priority**: Las fases son el núcleo operativo de SDD. Sin este conocimiento, el usuario no puede ejecutar la metodología.

**Independent Test**: Un usuario puede enumerar correctamente las 5 fases de SDD en orden, identificar al menos una entrada y una salida de cada fase, y explicar el objetivo de cada una.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la sección de fases, **When** selecciona una fase específica, **Then** ve su nombre, descripción, entradas, salidas y duración estimada.
2. **Given** que el usuario está viendo una fase, **When** hace clic en "ver detalle", **Then** se expande información con ejemplos prácticos de artefactos reales.
3. **Given** que el usuario completa la revisión de todas las fases, **When** accede al diagrama interactivo del flujo, **Then** puede visualizar cómo se conectan las fases entre sí.

---

### User Story 3 - Identificar roles y responsabilidades en SDD (Priority: P2)
**Status**: Implemented
Como líder de equipo o desarrollador, quiero entender qué roles participan en un proyecto SDD (tanto humanos como de IA), sus responsabilidades, habilidades requeridas y cómo colaboran entre sí, para poder estructurar mi equipo correctamente.

**Why this priority**: La asignación de roles es fundamental para implementar SDD. Sin claridad en quién hace qué, el proceso se desorganiza.

**Independent Test**: Un usuario puede listar todos los roles (humanos e IA), asignar al menos 3 responsabilidades a cada uno y explicar cómo interactúan dos roles específicos durante una fase.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la sección de roles, **When** selecciona un rol humano (ej. Spec Writer, Developer), **Then** ve sus responsabilidades, habilidades requeridas, nivel de experiencia sugerido y en qué fases participa.
2. **Given** que el usuario selecciona un rol de IA (ej. AI Spec Assistant, AI Code Generator), **Then** ve sus capacidades, limitaciones, prompts recomendados y cómo un humano debe supervisar su trabajo.
3. **Given** que el usuario está en la sección de roles, **When** activa la vista de "matriz de colaboración", **Then** ve una tabla o diagrama que muestra qué roles interactúan en cada fase y de qué manera.

---

### User Story 4 - Comprender el proceso general de SDD de extremo a extremo (Priority: P2)


Como gerente de proyecto o tech lead, quiero visualizar el flujo completo de SDD desde la concepción de una feature hasta su entrega, incluyendo los handoffs entre roles y los puntos de control de calidad, para poder planificar y supervisar proyectos reales.

**Why this priority**: Proporciona la visión holística necesaria para coordinar equipos completos y entender cómo encajan todas las piezas.

**Independent Test**: Un usuario puede describir el flujo end-to-end de SDD, identificar al menos 3 puntos de control de calidad y explicar qué sucede si una spec no pasa revisión.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la sección de proceso general, **When** interactúa con el diagrama de flujo, **Then** puede hacer clic en cada paso y ver descripción, roles involucrados y artefactos producidos.

2. **Given** que el usuario está viendo el diagrama, **When** activa la capa de "control de calidad", **Then** se resaltan los gates de revisión y aprobación del proceso.

3. **Given** que el usuario completa la lectura, **When** accede a la sección de casos de estudio, **Then** puede elegir entre el caso greenfield (proyecto nuevo) o brownfield (legado existente), y ve el proyecto ficticio aplicado paso a paso con artefactos reales de cada fase.

**Detalle adicional**: El diagrama debe mostrar:
- Fases principales: Specify, Clarify, Plan, Tasks, Implement
- Entradas y salidas de cada fase
- Roles clave en cada paso (ej. Spec Writer, Developer, Reviewer)
- Artefactos producidos (specs, plan, tasks, code)
- Puntos de control: Review, Code Review, UAT
- Handoffs entre roles (ej. Spec Writer → Developer, Developer → Tester)

**Edge Cases**: Si una spec falla en revisión, debe mostrar:
- Mensaje de error con razón del rechazo
- Enlaces a documentación de cómo corregir la spec
- Recomendaciones de roles para revisión

**Requirements**: El flujo debe incluir:
- Duración estimada de cada fase
- Indicadores de progreso visual
- Ejemplos de specs fallidas y cómo se corrigieron
- Integración con casos de estudio para ver aplicaciones prácticas

---

### User Story 5 - Navegar la aplicación de forma intuitiva (Priority: P3)

Como usuario del sitio web, quiero navegar entre secciones de forma intuitiva, con un menú claro, indicadores de progreso de lectura y enlaces cruzados entre conceptos relacionados, para poder aprender a mi propio ritmo sin perderme.

**Why this priority**: Mejora la experiencia de aprendizaje pero no es crítica para la entrega del contenido principal.

**Independent Test**: Un usuario puede encontrar cualquier sección del sitio en menos de 2 clics desde la página principal y puede ver su progreso de lectura mientras la sesión del navegador está activa.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la página principal, **When** ve el menú lateral, **Then** identifica claramente todas las secciones principales y su orden lógico de aprendizaje. En móvil, el menú está colapsado y se expande al tocar el botón toggle.
2. **Given** que el usuario está leyendo una sección, **When** encuentra un concepto relacionado con otra sección, **Then** puede hacer clic en un enlace cruzado que lo lleva directamente al contenido relacionado.
3. **Given** que el usuario abandona y regresa al sitio en una nueva sesión, **When** carga la página, **Then** el progreso se reinicia y el usuario comienza desde la página principal sin historial de lectura previa.

---

### Edge Cases

- ¿Qué sucede si un usuario accede directamente a una sección avanzada sin haber leído las bases? → Se muestra un aviso con prerrequisitos sugeridos.
- ¿Cómo se maneja la visualización en dispositivos móviles? → Todo el contenido debe ser responsive y legible en pant pequeñas.
- ¿Qué pasa si un usuario no tiene experiencia previa en desarrollo de software? → Se incluye una sección de "prerrequisitos" con conceptos básicos recomendados.
- ¿Cómo se actualiza el contenido cuando la metodología evoluciona? → Se muestra la fecha de última actualización y un indicador de versión del contenido.
- ¿Qué sucede si el archivo PDF del cheat sheet no está disponible o falla la descarga? → Se muestra un mensaje de error con opción de reintentar y un enlace a versión HTML alternativa.
- ¿Qué sucede si el usuario no entiende la diferencia entre greenfield y brownfield? → Cada caso de estudio incluye una breve explicación de su tipo antes del contenido, para que el usuario entienda el contexto.
- ¿Cómo se comporta el menú lateral en pantallas pequeñas? → En móvil el menú está colapsado por defecto y se expande al tocar un botón toggle tipo hamburger; al seleccionar una sección se cierra automáticamente.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema MUST presentar una sección introductoria que explique qué es Spec Driven Development, su historia, principios fundamentales y beneficios.
- **FR-002**: El sistema MUST documentar cada fase del proceso SDD incluyendo: nombre, descripción, objetivos, entradas requeridas, salidas producidas y duración estimada.
- **FR-003**: El sistema MUST listar todos los roles que intervienen en SDD, diferenciando entre roles humanos y roles de IA.
- **FR-004**: Para cada rol humano, el sistema MUST describir: responsabilidades principales, habilidades requeridas, nivel de experiencia recomendado y fases en las que participa.
- **FR-005**: Para cada rol de IA, el sistema MUST describir: capacidades, limitaciones conocidas, ejemplos de uso efectivo y requisitos de supervisión humana.
- **FR-006**: El sistema MUST presentar el flujo general de SDD como un diagrama interactivo que conecte visualmente todas las fases.
- **FR-007**: Cada sección/módulo del sitio MUST corresponder a una User Story con criterios de aceptación claramente definidos y visibles.
- **FR-008**: El sistema MUST incluir exactamente 2 casos de estudio prácticos: uno greenfield (proyecto desde cero) y uno brownfield (legado existente), mostrando SDD aplicado de principio a fin en cada contexto.
- **FR-009**: El sistema MUST ser completamente responsive y funcionar correctamente en desktop, tablet y móvil.
- **FR-010**: El sistema MUST incluir navegación con menú lateral colapsable que permita saltar entre secciones sin perder contexto. En móvil el menú se colapsa y se activa con un botón toggle (hamburger).
- **FR-011**: El sistema MUST incluir enlaces cruzados entre conceptos relacionados en diferentes secciones.
- **FR-012**: El sistema MUST mostrar la fecha de última actualización del contenido y el número de versión de la metodología.
- **FR-013**: El sistema MUST incluir un resumen ejecutivo o "cheat sheet" descargable en formato PDF pre-generado con los puntos clave de SDD. El archivo se alojará como recurso estático y será accesible desde un botón visible en la página principal y en la sección introductoria.
- **FR-014**: El sistema MUST permitir al usuario marcar secciones como "completadas" para trackear su progreso de aprendizaje durante la sesión activa. El progreso NO persiste entre sesiones del navegador (no usa localStorage ni cookies).

### Key Entities

- **Fase SDD**: Cada etapa del proceso (Specify, Clarify, Plan, Tasks, Implement). Contiene: nombre, descripción, entradas, salidas, roles participantes, duración estimada.
- **Rol**: Participante en el proceso SDD. Puede ser Humano (Spec Writer, Developer, Reviewer, Product Owner) o IA (AI Spec Assistant, AI Code Generator, AI Reviewer). Contiene: tipo, responsabilidades, habilidades, fases de participación.
- **Artefacto**: Documento o entregable producido en una fase. Contiene: nombre, tipo (spec, plan, tasks, code), fase de origen, formato.
- **User Story**: Unidad de contenido del sitio web. Contiene: título, prioridad, descripción, criterios de aceptación, sección del sitio asociada.
- **Caso de Estudio**: Ejemplo práctico que ilustra SDD aplicado. Se incluyen 2 tipos: Greenfield (proyecto nuevo desde cero) y Brownfield (proyecto legado con código existente). Cada uno contiene: título, contexto, fases recorridas, artefactos de ejemplo, desafíos específicos del tipo, lecciones aprendidas.
- **Cheat Sheet PDF**: Resumen ejecutivo descargable en formato PDF. Contiene: definición de SDD, diagrama de las 5 fases, roles clave, atajos y mejores prácticas.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un usuario sin conocimiento previo de SDD puede explicar los fundamentos de la metodología y sus 5 fases en menos de 5 minutos después de recorrer el sitio.
- **SC-002**: El 90% de los usuarios que completan la lectura pueden identificar correctamente las entradas y salidas de al menos 4 de las 5 fases en una evaluación breve.
- **SC-003**: El sitio carga completamente en menos de 2 segundos en una conexión de banda ancha estándar.
- **SC-004**: El 95% de los usuarios navegan exitosamente entre secciones sin requerir más de 2 clics para llegar a cualquier contenido principal.
- **SC-005**: El sitio obtiene una puntuación de accesibilidad WCAG AA o superior en herramientas de auditoría automatizadas.
- **SC-006**: Los usuarios califican la claridad del contenido con un promedio de 4/5 o superior en una encuesta de satisfacción integrada.

## Assumptions

- El público objetivo tiene conocimientos básicos de desarrollo de software pero no necesariamente experiencia con SDD.
- El contenido es educativo/informativo; no se requiere autenticación de usuarios para acceder al contenido principal.
- Las versiones futuras podrían incluir contenido interactivo más avanzado (quizzes, ejercicios prácticos), pero no es parte del alcance de esta versión.
- El hosting será estático (GitHub Pages u equivalente) sin backend dinámico para esta versión inicial.
- El contenido de la metodología SDD se basa en las prácticas actuales del ecosistema Spec Kit / AI-assisted development.
- No se requiere internacionalización (i18n) para esta versión; el contenido será en español como idioma principal.
- Los diagramas y visualizaciones se implementarán con CSS/SVG/Canvas nativo, sin librerías externas de gráficos.
