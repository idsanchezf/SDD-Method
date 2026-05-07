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
**Status**: Implemented
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
**Status**: Implemented

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
**Status**: Implemented

Como usuario del sitio web, quiero navegar entre secciones de forma intuitiva, con un menú claro, indicadores de progreso de lectura y enlaces cruzados entre conceptos relacionados, para poder aprender a mi propio ritmo sin perderme.

**Why this priority**: Mejora la experiencia de aprendizaje pero no es crítica para la entrega del contenido principal.

**Independent Test**: Un usuario puede encontrar cualquier sección del sitio en menos de 2 clics desde la página principal y puede ver su progreso de lectura mientras la sesión del navegador está activa.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la página principal, **When** ve el menú lateral, **Then** identifica claramente todas las secciones principales y su orden lógico de aprendizaje. En móvil, el menú está colapsado y se expande al tocar el botón toggle.
2. **Given** que el usuario está leyendo una sección, **When** encuentra un concepto relacionado con otra sección, **Then** puede hacer clic en un enlace cruzado que lo lleva directamente al contenido relacionado.
3. **Given** que el usuario abandona y regresa al sitio en una nueva sesión, **When** carga la página, **Then** el progreso se reinicia y el usuario comienza desde la página principal sin historial de lectura previa.

---

---

### User Story 6 - Conocer y aplicar la Constitución SDD (Priority: P1)
**Status**: Proposed

Como practitioner de SDD, quiero entender los principios constitucionales que rigen cada feature y disponer de un checklist interactivo para verificar que mi proyecto cumple antes de avanzar, para asegurar consistencia y calidad metodológica.

**Why this priority**: La Constitución es el guardarraíl metodológico de SDD. Sin ella, el equipo no tiene criterios objetivos para evaluar si un feature está bien construido antes de avanzar a la siguiente fase.

**Independent Test**: Un usuario puede listar los 5 principios constitucionales, explicar qué valida cada uno y usar el checker interactivo para evaluar un feature de ejemplo.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la sección "Constitución SDD", **When** lee el contenido, **Then** ve explicados los 5 principios: Vanilla-First, Semantic HTML & Accessible, Professional CSS Architecture, Feature Branch & PR Workflow, CI/CD via GitHub Actions.
2. **Given** que el usuario abre el Constitution Checker, **When** selecciona una fase (Specify/Clarify/Plan/Tasks/Implement), **Then** ve un checklist de principios que deben verificarse antes de avanzar a esa fase.
3. **Given** que el usuario marca un principio como no cumplido, **When** el checker detecta la violación, **Then** muestra una explicación de por qué es importante y cómo corregirlo.
4. **Given** que el usuario completa el constitution check, **When** todos los principios pasan, **Then** ve un indicador visual "✓ CONSTITUTION PASSED" y puede continuar al siguiente paso.

**Archivos**: `src/index.html` (nueva sección), `src/css/constitution.css`, `src/js/constitution.js`

---

### User Story 7 - Explorar el flujo de colaboración Humano-IA (Priority: P1)
**Status**: Proposed

Como usuario de SDD, quiero visualizar cómo humanos y asistentes de IA colaboran en cada fase, qué prompts usar y qué supervisión aplicar, para aprovechar la IA sin perder control de calidad.

**Why this priority**: SDD es la primera metodología que integra roles de IA como ciudadanos de primera clase. Explicar este flujo es central a la propuesta de valor de SDD.

**Independent Test**: Un usuario puede seguir el flujo de una feature desde Specify hasta Implement viendo en cada fase qué hace el humano, qué hace la IA y cómo se supervisa.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la sección "Flujo de Colaboración", **When** selecciona una fase, **Then** ve un diagrama que muestra: rol humano principal, rol IA asignado, artefacto producido y punto de supervisión.
2. **Given** que el usuario está viendo un rol de IA (ej. AI Spec Assistant), **When** hace clic en "Ver prompts recomendados", **Then** ve ejemplos de prompts estructurados para esa fase.
3. **Given** que el usuario selecciona "Ver supervisión requerida", **When** expande la sección, **Then** ve qué debe revisar el humano antes de aceptar el trabajo de la IA.
4. **Given** que el usuario completa el flujo completo, **When** llega a Implement, **Then** ve un resumen de toda la colaboración humano-IA del feature.

**Archivos**: `src/index.html`, `src/css/collab-flow.css`, `src/js/collab-flow.js`

---

### User Story 8 - Inspeccionar Quality Gates interactivamente (Priority: P2)
**Status**: Proposed

Como tech lead o developer, quiero hacer clic en los quality gates del diagrama de proceso para entender qué criterios verifican, qué sucede si no se pasan y cómo remediarlos, para asegurar la calidad en cada entrega.

**Why this priority**: Los quality gates existen visualmente en el diagrama pero no son interactivos ni explican su propósito. Esto limita su utilidad como herramienta de calidad.

**Independent Test**: Un usuario puede hacer clic en un quality gate del diagrama, ver sus criterios de verificación y simular un escenario donde el gate falla para entender la remediación.

**Acceptance Scenarios**:

1. **Given** que el usuario ve el diagrama de proceso E2E, **When** hace clic en un quality gate (ej. "Spec Review"), **Then** se abre un panel con: nombre, descripción, criterios de verificación y roles responsables.
2. **Given** que el usuario activa "Simular fallo", **When** el gate muestra estado "FAILED", **Then** ve recomendaciones de remediación y enlaces a documentación relacionada.
3. **Given** que el usuario cierra el panel, **When** el gate queda marcado como "explorado", **Then** el diagrama muestra un indicador visual de progreso.

**Archivos**: Extiende `process.js`, `process.css`

---

### User Story 9 - Explorar y descargar plantillas SDD (Priority: P2)
**Status**: Proposed

Como desarrollador o spec writer, quiero una galería visual de plantillas SDD (spec, plan, tasks) con previsualización y descarga individual, para empezar proyectos rápidamente con la estructura correcta.

**Why this priority**: Las plantillas existen como archivos estáticos pero no hay UI para explorarlas. Esto reduce su adopción.

**Independent Test**: Un usuario puede ver las 3 plantillas (spec, plan, tasks), previsualizar su contenido y descargar la que necesita.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a "Plantillas SDD", **When** ve la galería, **Then** identifica cada plantilla por tipo (spec/plan/tasks) con descripción y formato.
2. **Given** que el usuario selecciona una plantilla, **When** hace clic en "Previsualizar", **Then** ve el contenido completo renderizado sin descargar.
3. **Given** que el usuario decide descargar, **When** hace clic en "Descargar", **Then** recibe el archivo .md individual.
4. **Given** que el usuario quiere todas las plantillas, **When** hace clic en "Descargar todas", **Then** recibe un zip con los 3 archivos.

**Archivos**: Extiende `guide.js`/`guide.css`, sección de templates en `index.html`

---

### User Story 10 - Consultar el Glosario SDD (Priority: P2)
**Status**: Proposed

Como nuevo usuario de SDD, quiero un glosario con búsqueda en vivo donde pueda consultar términos específicos (Constitution, Quality Gate, Handoff, Spec, etc.) con definiciones y enlaces a secciones relacionadas, para resolver dudas rápidamente sin salir del flujo de aprendizaje.

**Why this priority**: SDD introduce ~20 términos propios. Sin glosario, el usuario tiene que buscar en múltiples secciones o adivinar significados.

**Independent Test**: Un usuario puede buscar un término, ver su definición y navegar a la sección relacionada en 1 clic.

**Acceptance Scenarios**:

1. **Given** que el usuario abre el glosario, **When** escribe en el campo de búsqueda, **Then** los resultados se filtran en vivo mostrando términos coincidentes.
2. **Given** que el usuario selecciona un término, **When** hace clic en él, **Then** ve: definición completa, sinónimos, fase relacionada y enlace a la sección del sitio.
3. **Given** que el usuario está en cualquier sección del sitio, **When** encuentra un término glosario, **Then** puede hacer hover para ver un tooltip con la definición breve.

**Archivos**: `src/data/glossary.js`, `src/js/glossary.js`, `src/css/glossary.css`

---

### User Story 11 - Seguir una ruta de aprendizaje SDD (Priority: P2)
**Status**: Proposed

Como visitante nuevo, quiero una ruta de aprendizaje guiada que me lleve desde los conceptos básicos hasta la aplicación avanzada, con recomendaciones de siguiente paso, para aprender SDD de forma estructurada sin sentirme abrumado.

**Why this priority**: El sitio actual asume cierto conocimiento. Una ruta guiada reduce la fricción para nuevos usuarios y aumenta la retención.

**Independent Test**: Un usuario nuevo puede seguir la ruta desde "¿Qué es SDD?" hasta "Aplicar casos de estudio" sin saltos ni contenido que requiera prerrequisitos no cubiertos.

**Acceptance Scenarios**:

1. **Given** que el usuario accede al sitio por primera vez, **When** ve la sección "Comenzar aquí", **Then** se le presenta una ruta: Explorer (conceptos) → Practitioner (aplicar) → Advocate (enseñar).
2. **Given** que el usuario completa un nivel, **When** avanza al siguiente, **Then** ve su progreso y el siguiente paso recomendado.
3. **Given** que el usuario está en una sección avanzada sin haber completado las básicas, **When** detecta prerrequisitos faltantes, **Then** muestra un banner sugiriendo completar la ruta en orden.

**Archivos**: `src/js/learning-path.js`, `src/css/learning-path.css`

---

### User Story 12 - Practicar con el Simulador de Specs (Priority: P3)
**Status**: Proposed

Como aprendiz de SDD, quiero un simulador donde pueda escribir una spec siguiendo la plantilla guiada y recibir feedback automático sobre su completitud y calidad, para practicar la habilidad central de SDD antes de usarla en proyectos reales.

**Why this priority**: Cierra el ciclo teoría-práctica. El usuario no solo lee sobre specs sino que practica escribirlas con feedback inmediato.

**Independent Test**: Un usuario puede escribir una spec en el simulador, recibir feedback sobre secciones faltantes y ver un ejemplo comparativo de spec buena vs mala.

**Acceptance Scenarios**:

1. **Given** que el usuario abre el simulador, **When** ve el editor, **Then** tiene una plantilla guiada con secciones: Goal, Requirements, Acceptance Criteria.
2. **Given** que el usuario completa secciones, **When** hace clic en "Validar", **Then** recibe feedback sobre: secciones completadas, criterios medibles, y sugerencias de mejora.
3. **Given** que el usuario quiere ver un ejemplo, **When** selecciona "Ver spec correcta", **Then** se muestra side-by-side una spec bien escrita vs una con errores comunes.

**Archivos**: `src/js/spec-simulator.js`, `src/css/spec-simulator.css`

---

### User Story 13 - Calcular el impacto de SDD con métricas y ROI (Priority: P3)
**Status**: Proposed

Como líder técnico o gerente evaluando SDD, quiero una calculadora de ROI y visualizaciones de impacto (defectos evitados, tiempo ahorrado) para justificar la adopción de la metodología ante mi equipo o dirección.

**Why this priority**: Ayuda en la decisión de adopción. Sin métricas, SDD compite en desventaja contra metodologías conocidas.

**Independent Test**: Un usuario puede ajustar parámetros de su equipo (tamaño, velocidad actual) y ver una proyección del impacto de adoptar SDD.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a "Métricas SDD", **When** ajusta los sliders (tamaño equipo, velocidad actual, defectos por sprint), **Then** ve una proyección de: reducción de defectos, tiempo ahorrado por sprint, mejora en calidad.
2. **Given** que el usuario explora la sección, **When** ve los gráficos de impacto, **Then** puede alternar entre vistas: defectos evitados, velocidad de entrega, satisfacción del equipo.
3. **Given** que el usuario quiere compartir los resultados, **When** hace clic en "Compartir", **Then** puede copiar un resumen texto de los hallazgos.

**Archivos**: `src/js/metrics.js`, `src/css/metrics.css`

---

### User Story 14 - Navegar dentro de cada sección con menú interno (Priority: P2)
**Status**: In Progress (Branch: `014-section-nav`)

Como usuario del sitio, quiero un menú de navegación interno dentro de cada sección (Hero, Phases, Roles, Proceso, Guía) que muestre sus sub-secciones y permita saltar entre ellas sin hacer scroll manual, para encontrar contenido específico más rápido y entender la estructura de cada módulo.

**Why this priority**: Las secciones principales tienen múltiples sub-secciones (ej. Hero: Definición, Principios, Beneficios, Comparación, Checklist). Sin un menú interno, el usuario debe scrollear para encontrar lo que busca o no sabe qué sub-contenidos existen.

**Independent Test**: Un usuario puede identificar las sub-secciones de cualquier módulo desde su menú interno y saltar a cualquiera de ellas en 1 clic.

**Acceptance Scenarios**:

1. **Given** que el usuario está en una sección (ej. "Roles"), **When** ve el menú interno de la sección, **Then** lista todas las sub-secciones: Roles Humanos, Roles IA, Matriz de Colaboración.
2. **Given** que el usuario hace clic en una sub-sección del menú interno, **When** se ejecuta la navegación, **Then** el scroll se desplaza suavemente hasta esa sub-sección y el ítem del menú se marca como activo.
3. **Given** que el usuario hace scroll dentro de una sección, **When** una nueva sub-sección entra en el viewport, **Then** el menú interno actualiza automáticamente el ítem activo (scroll spy).
4. **Given** que la sección tiene muchas sub-secciones, **When** el menú interno excede la altura de la ventana, **Then** el menú se vuelve scrollable internamente o colapsa sub-ítems.
5. **Given** que el usuario está en móvil, **When** el menú interno ocuparía mucho espacio, **Then** se muestra como un selector desplegable (select) en lugar de lista vertical.

**Archivos**: `src/js/section-nav.js`, `src/css/section-nav.css`, y actualización de `index.html` con `data-section` attributes en cada sub-sección

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

- **FR-025** (US14): El sistema MUST incluir un menú de navegación interno por sección que liste sus sub-secciones, permita saltar a ellas con scroll suave, actualice el ítem activo mediante scroll spy, y se adapte a móvil como selector desplegable.

### New Functional Requirements (Backlog US6-US14)

- **FR-015** (US6): El sistema MUST incluir una sección "Constitución SDD" que explique los 5 principios constitucionales (Vanilla-First, Semantic HTML & Accessible, Professional CSS Architecture, Feature Branch & PR Workflow, CI/CD via GitHub Actions).
- **FR-016** (US6): El sistema MUST incluir un Constitution Checker interactivo con checklist por fase que verifique principios antes de avanzar.
- **FR-017** (US7): El sistema MUST incluir una sección "Flujo de Colaboración Humano-IA" con diagrama interactivo mostrando roles, artefactos y supervisión por fase.
- **FR-018** (US7): El sistema MUST incluir una biblioteca de prompts recomendados organizados por fase y rol de IA.
- **FR-019** (US8): Los quality gates del diagrama de proceso MUST ser interactivos: al hacer clic muestran criterios, estado y remediación.
- **FR-020** (US9): El sistema MUST incluir una galería de plantillas SDD (spec, plan, tasks) con previsualización y descarga individual.
- **FR-021** (US10): El sistema MUST incluir un glosario SDD con búsqueda en vivo y tooltips en todo el sitio.
- **FR-022** (US11): El sistema MUST incluir una ruta de aprendizaje guiada con niveles (Explorer → Practitioner → Advocate).
- **FR-023** (US12): El sistema MUST incluir un simulador de specs con editor guiado y validador automático.
- **FR-024** (US13): El sistema MUST incluir una calculadora de ROI con visualizaciones de impacto de adopción SDD.

### Key Entities (additionales para backlog)

- **Principio Constitucional**: Regla fundamental que todo feature SDD debe cumplir (Vanilla-First, Semantic HTML, CSS Architecture, Feature Branch, CI/CD). Contiene: nombre, descripción, fases donde aplica, consecuencias de violación.
- **Quality Gate**: Punto de control de calidad entre fases. Contiene: nombre, fase origen, criterios de verificación, roles responsables, acciones de remediación.
- **Prompt de IA**: Instrucción estructurada para un rol de IA en una fase específica. Contiene: fase, rol destino, texto del prompt, nivel de supervisión requerido.
- **Plantilla SDD**: Documento predefinido para artefactos SDD (spec, plan, tasks). Contiene: tipo, nombre, secciones, formato (markdown), ejemplo de contenido.
- **Término Glosario**: Definición de un concepto SDD. Contiene: término, definición corta, definición larga, fase relacionada, enlace a sección del sitio.
- **Ruta de Aprendizaje**: Secuencia guiada de secciones del sitio organizada por nivel de experiencia. Contiene: nivel (Explorer/Practitioner/Advocate), secciones incluidas, prerrequisitos, progreso.
- **Simulación de Spec**: Ejercicio práctico de escritura de spec con validación. Contiene: plantilla guiada, criterios de validación, feedback automático, ejemplos comparativos.
- **Métrica SDD**: Indicador de impacto de adopción de SDD. Contiene: nombre, fórmula, valores de entrada, proyección, visualización asociada.

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

## Backlog Prioritization Summary

| US | Título | Prioridad | Status | Esfuerzo Est. |
|----|--------|-----------|--------|---------------|
| 1 | Comprender SDD | P1 | ✅ Implemented | Completado |
| 2 | Explorar fases | P1 | ✅ Implemented | Completado |
| 3 | Roles y responsabilidades | P2 | ✅ Implemented | Completado |
| 4 | Proceso E2E | P2 | ✅ Implemented | Completado |
| 5 | Navegación intuitiva | P3 | ✅ Implemented | Completado |
| **6** | **Constitución SDD** | **P1** | **📋 Proposed** | **Medio (3-4 días)** |
| **7** | **Flujo Colaboración Humano-IA** | **P1** | **📋 Proposed** | **Medio (3-4 días)** |
| **8** | **Quality Gates Interactivos** | **P2** | **📋 Proposed** | **Pequeño (1-2 días)** |
| **9** | **Galería de Plantillas** | **P2** | **📋 Proposed** | **Pequeño (1-2 días)** |
| **10** | **Glosario SDD** | **P2** | **📋 Proposed** | **Pequeño (1-2 días)** |
| **11** | **Ruta de Aprendizaje** | **P2** | **📋 Proposed** | **Medio (2-3 días)** |
| **12** | **Simulador de Specs** | **P3** | **📋 Proposed** | **Grande (4-5 días)** |
| **13** | **Métricas y ROI** | **P3** | **📋 Proposed** | **Grande (4-5 días)** |
| **14** | **Menú interno por sección** | **P2** | **🔄 In Progress** | **Pequeño (1-2 días)** |

**Recomendación**: Abordar US6 + US7 primero (P1) por ser los gaps metodológicos más críticos, luego US14 (P2) como mejora transversal de navegabilidad.

## Assumptions

- El público objetivo tiene conocimientos básicos de desarrollo de software pero no necesariamente experiencia con SDD.
- El contenido es educativo/informativo; no se requiere autenticación de usuarios para acceder al contenido principal.
- Las versiones futuras podrían incluir contenido interactivo más avanzado (quizzes, ejercicios prácticos), pero no es parte del alcance de esta versión.
- El hosting será estático (GitHub Pages u equivalente) sin backend dinámico para esta versión inicial.
- El contenido de la metodología SDD se basa en las prácticas actuales del ecosistema Spec Kit / AI-assisted development.
- No se requiere internacionalización (i18n) para esta versión; el contenido será en español como idioma principal.
- Los diagramas y visualizaciones se implementarán con CSS/SVG/Canvas nativo, sin librerías externas de gráficos.
