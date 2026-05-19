# Feature Specification: Galería de Plantillas SDD

**Feature Branch**: `021-template-gallery`  
**Created**: 2026-05-19  
**Status**: Draft  
**Input**: User description: "Galería de plantillas - US9 del backlog: galería visual de plantillas SDD (spec, plan, tasks) con previsualización y descarga individual. Se implementa como mejora de la sección existente 'Plantillas Descargables' en US5 (src/index.html + src/js/download-manager.js), no como feature independiente."

## Clarifications

### Session 2026-05-19

- Q: ¿Qué patrón de previsualización usar para mostrar el contenido de las plantillas? → A: Panel lateral deslizable (drawer) desde la derecha con scroll independiente.
- Q: ¿Cómo proceder con la funcionalidad existente de descarga de plantillas en US5? → A: Mejorar lo existente — extender download-manager.js y la sección actual con galería, previsualización y copiar. US9 se cierra como duplicado de US5.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Explorar y previsualizar plantillas SDD (Priority: P1)

Como desarrollador o spec writer que quiere iniciar un proyecto con SDD, quiero ver una galería visual de las plantillas disponibles (spec.md, plan.md, tasks.md) con su estructura y contenido, para entender qué formato debe tener cada artefacto antes de empezar a escribir.

**Why this priority**: La sección "Plantillas Descargables" actual (US5) es solo un botón que descarga plantillas con contenido hardcoded en JS. No hay galería visual, no hay previsualización, y el contenido no se sincroniza con los archivos reales de `.specify/templates/`. Sin estas mejoras, los usuarios descargan plantillas desactualizadas sin entender su estructura.

**Independent Test**: Un usuario puede ver las 3 plantillas principales (spec, plan, tasks) en una galería, seleccionar cualquiera y previsualizar su contenido completo renderizado sin necesidad de descargar nada.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la sección "Plantillas SDD", **When** ve la galería, **Then** identifica cada plantilla por tipo con: nombre, descripción breve, formato (Markdown), y un badge indicando su fase asociada (Specify, Plan, Tasks).
2. **Given** que el usuario selecciona una plantilla, **When** hace clic en "Previsualizar", **Then** se abre un panel lateral deslizable (drawer) desde la derecha con el contenido completo de la plantilla renderizado con syntax highlighting de Markdown, mostrando la estructura con encabezados, placeholders y comentarios explicativos.
3. **Given** que el usuario está previsualizando una plantilla en el drawer, **When** hace scroll, **Then** ve cada sección de la plantilla con anotaciones que explican qué debe incluir y por qué (ej. "Esta sección es obligatoria: describe el escenario de usuario principal").
4. **Given** que el usuario cierra el drawer de previsualización, **When** vuelve a la galería, **Then** la plantilla previsualizada muestra un indicador visual de "explorada".

---

### User Story 2 - Descargar plantillas individuales o en conjunto (Priority: P1)

Como practitioner de SDD que ya entendió la estructura de las plantillas, quiero descargar la plantilla que necesito en formato Markdown, para empezar mi proyecto con la estructura correcta sin tener que copiar y pegar manualmente.

**Why this priority**: La descarga individual y en zip ya funciona en `download-manager.js`, pero usa contenido hardcoded. El contenido debe leerse de los archivos reales de `.specify/templates/` para mantenerse sincronizado con las actualizaciones de speckit.

**Independent Test**: Un usuario puede descargar cualquier plantilla individual con un clic, o descargar todas las plantillas en un archivo zip, y los archivos descargados contienen el contenido actualizado de los archivos reales en `.specify/templates/`, no contenido hardcoded.

**Acceptance Scenarios**:

1. **Given** que el usuario ve la galería de plantillas, **When** hace clic en "Descargar" en una plantilla específica, **Then** recibe el archivo .md correspondiente con el nombre correcto (ej. `spec-template.md`).
2. **Given** que el usuario quiere todas las plantillas, **When** hace clic en "Descargar todas", **Then** recibe un archivo `.zip` que contiene las 3 plantillas (.md) organizadas en una carpeta `sdd-templates/`.
3. **Given** que el usuario descarga una plantilla, **When** abre el archivo descargado, **Then** ve el contenido completo con placeholders listos para rellenar (ej. `[FEATURE NAME]`, `[DATE]`) y sin contenido de ejemplo hardcodeado.
4. **Given** que el usuario está en la previsualización de una plantilla, **When** hace clic en "Descargar esta plantilla", **Then** se descarga el archivo sin cerrar la previsualización.

---

### User Story 3 - Copiar contenido de plantilla al portapapeles (Priority: P2)

Como desarrollador que trabaja en un proyecto existente, quiero copiar el contenido de una plantilla directamente al portapapeles, para pegarlo en mi editor sin necesidad de descargar un archivo intermedio.

**Why this priority**: Muchos usuarios prefieren copiar-pegar sobre descargar, especialmente cuando ya tienen un archivo abierto en su editor. Reduce fricción en el flujo de trabajo.

**Independent Test**: Un usuario puede copiar el contenido de cualquier plantilla al portapapeles con un clic y recibir confirmación visual de que se copió correctamente.

**Acceptance Scenarios**:

1. **Given** que el usuario ve la galería o la previsualización de una plantilla, **When** hace clic en "Copiar al portapapeles", **Then** el contenido Markdown se copia y ve un indicador de "✓ Copiado" durante 2 segundos.
2. **Given** que el usuario pega el contenido copiado en un archivo .md, **When** lo abre en su editor, **Then** ve la plantilla completa con todos los placeholders intactos.

---

### Edge Cases

- ¿Qué pasa si el navegador no soporta la API de portapapeles? → El botón "Copiar" se oculta o se deshabilita con un tooltip explicando que el navegador no lo soporta. Se ofrece descarga como alternativa.
- ¿Qué sucede si la descarga falla (ej. bloqueo del navegador)? → Se muestra un mensaje de error con opción de reintentar y un enlace para ver el contenido raw en una nueva pestaña como fallback.
- ¿Cómo se manejan plantillas futuras (ej. constitution-template, checklist-template)? → La galería debe ser extensible: nuevas plantillas se agregan al catálogo de datos sin cambiar la UI. El catálogo se genera dinámicamente desde los archivos en `.specify/templates/`.
- ¿Qué pasa si el usuario accede desde móvil? → La galería muestra las plantillas en una columna vertical. El drawer de previsualización ocupa toda la pantalla con botón de cierre prominente.
- ¿Cómo se actualiza el contenido de las plantillas cuando speckit evoluciona? → La galería lee los archivos reales de `.specify/templates/` en cada carga, no usa contenido hardcoded. La versión de speckit se muestra en el footer.
- ¿Qué pasa si un archivo de plantilla en `.specify/templates/` no existe o está corrupto? → La galería muestra un indicador de error para esa plantilla específica con mensaje "Plantilla no disponible" y el botón de descarga se deshabilita.
- ¿Cómo se maneja la transición desde la UI actual (un solo botón) a la nueva galería? → La sección existente se reemplaza completamente. El botón "Descargar Plantillas SDD" se convierte en el botón "Descargar todas" dentro de la nueva galería.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema MUST incluir una sección "Plantillas SDD" que presente una galería visual de todas las plantillas disponibles organizadas por tipo.
- **FR-002**: Cada plantilla en la galería MUST mostrar: nombre, descripción breve, formato (Markdown), fase asociada (Specify/Plan/Tasks/Checklist/Constitution), y fecha de última modificación del archivo fuente. El contenido se lee de los archivos reales en `.specify/templates/`, no de datos hardcoded.
- **FR-003**: El sistema MUST permitir previsualizar el contenido completo de cualquier plantilla en un panel lateral deslizable (drawer) desde la derecha con scroll independiente, renderizado con syntax highlighting de Markdown.
- **FR-004**: La previsualización MUST incluir anotaciones explicativas en cada sección obligatoria de la plantilla, indicando qué debe incluir el usuario y por qué.
- **FR-005**: El sistema MUST permitir descargar cualquier plantilla individual como archivo .md con un solo clic.
- **FR-006**: El sistema MUST permitir descargar todas las plantillas en un archivo .zip con un solo clic.
- **FR-007**: El sistema MUST permitir copiar el contenido de cualquier plantilla al portapapeles con un solo clic, con confirmación visual de éxito.
- **FR-008**: Las plantillas descargadas o copiadas MUST contener los placeholders originales (ej. `[FEATURE NAME]`, `[DATE]`) sin contenido de ejemplo hardcodeado.
- **FR-009**: La galería MUST ser extensible: el catálogo se genera dinámicamente al escanear los archivos en `.specify/templates/`, sin requerir cambios en la UI cuando se agregan nuevas plantillas.
- **FR-010**: El sistema MUST mostrar la versión de speckit y la fecha de última actualización de las plantillas en el footer de la sección.
- **FR-011**: La galería y previsualización MUST ser completamente responsivas y funcionales en desktop, tablet y móvil.
- **FR-012**: Si la API de portapapeles no está disponible, el botón de copiar MUST ocultarse o deshabilitarse con explicación al usuario.
- **FR-013**: Si la descarga falla, el sistema MUST mostrar un mensaje de error con opción de reintentar y un fallback de "ver contenido raw" en nueva pestaña.

### Key Entities

- **Plantilla SDD**: Documento predefinido para artefactos SDD. Contiene: id, nombre, tipo (spec/plan/tasks/checklist/constitution), descripción, fase asociada, contenido (Markdown, leído de `.specify/templates/`), fecha de última modificación del archivo, versión de speckit de origen.
- **Catálogo de Plantillas**: Colección dinámica generada al escanear los archivos en `.specify/templates/`. Contiene: array de Plantilla SDD, versión de speckit (de `.specify/integrations/speckit.manifest.json`), fecha de generación del catálogo.
- **DownloadManager (existente)**: Clase actual en `src/js/download-manager.js` que maneja descargas individuales y zip. Se extiende con: lectura de archivos reales, galería visual, previsualización en drawer, copiar al portapapeles.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un usuario puede encontrar, previsualizar y descargar la plantilla que necesita en menos de 30 segundos desde que accede a la sección.
- **SC-002**: El 90% de los usuarios que visitan la galería descargan o copian al menos una plantilla en la misma sesión.
- **SC-003**: Las plantillas descargadas son archivos .md válidos que pueden abrirse directamente en cualquier editor de texto sin errores de formato.
- **SC-004**: La sección carga completamente en menos de 2 segundos en una conexión de banda ancha estándar.
- **SC-005**: El 80% de los usuarios califican la galería como "útil" o "muy útil" en una encuesta de satisfacción integrada.

## Assumptions

- La implementación se realiza sobre la sección existente "Plantillas Descargables" en `src/index.html` (líneas 1057-1067) y la clase `DownloadManager` en `src/js/download-manager.js`.
- Las plantillas actuales en `download-manager.js` están hardcoded y deben reemplazarse por lectura de los archivos reales en `.specify/templates/`.
- La funcionalidad existente de descarga individual (.md) y descarga en zip (JSZip) se mantiene como base, pero el contenido se sincroniza con los archivos reales.
- JSZip está actualmente cargado como librería externa para la generación de zip. Se evalúa reemplazarlo por `CompressionStream` API nativa en el plan.
- El CSS existente en `src/css/guide.css` (`.guide__templates`) se extiende con los nuevos estilos de galería, drawer y botones de copiar.
- No se requiere autenticación para acceder a las plantillas.
- La galería se implementa como contenido estático con Vanilla JS, sin backend, consistente con la constitución del proyecto.
- La versión de speckit se obtiene del archivo `.specify/integrations/speckit.manifest.json` existente en el proyecto.
- No se requiere internacionalización (i18n) para esta versión; el contenido será en español.
