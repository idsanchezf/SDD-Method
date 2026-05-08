# Data Model: Anatomía y escritura de Specs SDD

**Phase**: Phase 1 — Design & Contracts
**Date**: 2026-05-08

## Entities

### SpecSection

Componente estructural de un spec.md que se enseña en la sección de anatomía.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Identificador único (kebab-case, ej. `frontmatter`, `goal-context`) |
| `name` | string | Nombre visible de la sección (ej. "Frontmatter", "User Stories") |
| `purpose` | string | Propósito educativo de esta sección del spec |
| `fields` | string[] | Campos esperados dentro de esta sección |
| `example` | string | Ejemplo concreto de cómo se ve esta sección en un spec.md real |
| `commonMistakes` | string[] | Errores frecuentes al escribir esta sección |
| `order` | number | Orden de aparición en el spec (1-6) |

**Valores esperados para `id`**: `frontmatter`, `goal-context`, `user-stories`, `acceptance-criteria`, `edge-cases`, `open-questions`

---

### AcceptanceScenario

Escenario en formato Given/When/Then que define un criterio de verificación.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Identificador único |
| `description` | string | Descripción corta del escenario |
| `given` | string | Precondiciones del escenario |
| `when` | string | Acción del usuario que dispara el comportamiento |
| `then` | string | Resultado esperado verificable |
| `tags` | string[] | Categorías: `happy-path`, `edge-case`, `error`, `security` |
| `quality` | `good` \| `bad` | Si es un ejemplo de escenario bien o mal escrito |

---

### EdgeCaseTechnique

Método sistemático para descubrir edge cases durante la escritura de specs.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Identificador único |
| `name` | string | Nombre de la técnica (ej. "Límites", "Negaciones") |
| `description` | string | Explicación de la técnica |
| `guideQuestions` | string[] | Preguntas guía para aplicar la técnica |
| `example` | string | Ejemplo aplicado a una feature real |
| `category` | `boundary` \| `negation` \| `empty` \| `error` \| `concurrency` | Categoría de la técnica |

---

### SpecExample

Spec completa de ejemplo con metadatos de calidad para la vista comparativa.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Identificador único |
| `type` | `good` \| `bad` | Si es un ejemplo de spec bien o mal escrita |
| `title` | string | Título del ejemplo |
| `content` | string | Contenido completo del spec.md |
| `annotations` | Annotation[] | Lista de anotaciones línea por línea |

### Annotation

Anotación sobre una línea o sección de un spec de ejemplo.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `lineStart` | number | Línea inicial donde aplica la anotación |
| `lineEnd` | number | Línea final donde aplica la anotación |
| `type` | `positive` \| `negative` \| `info` | Tipo de anotación (buena práctica, error, información) |
| `text` | string | Texto explicativo de la anotación |
