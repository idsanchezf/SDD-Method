# Implementation Plan: Galería de Plantillas SDD

**Branch**: `021-template-gallery` | **Date**: 2026-05-19 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/021-template-gallery/spec.md`

## Summary

Replace the existing "Plantillas Descargables" section (US5) — currently a single button downloading hardcoded templates — with a full visual template gallery featuring: card-based gallery layout, sidebar drawer preview with Markdown rendering and annotations, clipboard copy, and downloads sourced from real `.specify/templates/` files instead of hardcoded content. Extends existing `download-manager.js`, `index.html` templates section, and `guide.css`.

## Technical Context

**Language/Version**: Vanilla JavaScript ES6+
**Primary Dependencies**: None (Vanilla-First). JSZip currently loaded for zip generation — evaluate replacing with native `CompressionStream` API.
**Storage**: N/A (no persistence; reads `.specify/templates/` at load time)
**Testing**: Verificación visual manual + validación de accesibilidad WCAG AA + Lighthouse
**Target Platform**: Navegadores modernos (Chrome, Firefox, Safari, Edge última versión)
**Project Type**: Enhancement of existing static web section (US5 "Plantillas Descargables")
**Performance Goals**: Section loads in <2s; drawer opens in <100ms
**Constraints**: WCAG AA, mobile-first responsive, no JS frameworks, no new external libraries
**Scale/Scope**: Extends 3 existing files: `src/index.html`, `src/js/download-manager.js`, `src/css/guide.css`. Adds 1 new CSS file for gallery-specific styles if needed.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Vanilla-First (NON-NEGOTIABLE) | ⚠ NEEDS REVIEW | JSZip is currently used for zip generation. Must evaluate native `CompressionStream` API as replacement. If not viable, must justify JSZip exception via PR. |
| II. Semantic HTML & Accessible | ✅ PASS | Gallery uses `<section>`, `<article>`, `<button>`. Drawer uses `role="dialog"`, `aria-label`, keyboard close (Escape). All interactive elements keyboard-accessible. |
| III. Professional CSS Architecture | ✅ PASS | New styles extend `guide.css` custom properties. Mobile-first responsive. No inline styles. |
| IV. Feature Branch & PR Workflow (NON-NEGOTIABLE) | ✅ PASS | Branch `021-template-gallery`, PR with review. |
| V. CI/CD via GitHub Actions | ✅ PASS | Standard validation pipeline. |

**Gate Result**: ⚠ CONDITIONAL PASS — JSZip usage requires resolution in Phase 0 research. If native alternative is viable, full PASS. If not, documented justification required in Complexity Tracking.

## Phase 0: Research

### R1: JSZip vs Native CompressionStream API

**Decision**: Evaluate `CompressionStream` API (native browser `deflate-raw`) as replacement for JSZip in client-side zip generation.

**Research findings**:
- `CompressionStream` API is available in Chrome 80+, Firefox 113+, Safari 16.4+, Edge 80+
- It provides raw deflate, not zip format. Building a valid .zip requires constructing the zip file format manually (local file headers, central directory, end-of-central-directory record)
- This is complex and error-prone without a library
- Alternative: Use `JSZip` as an approved exception (loaded via CDN `<script>` tag, not npm)
- **Alternative considered**: Download individual files sequentially (already implemented as fallback) — but loses the "download all" convenience

**Decision**: Keep JSZip as approved exception. It is loaded via CDN `<script>` tag (not npm), used only for one feature, and the alternative (manual zip construction) is disproportionately complex. The constitution allows third-party libraries via PR approval.

**Rationale**: JSZip is a lightweight (~30KB gzipped), well-maintained library. The native API does not provide zip format directly. Building zip format from scratch is a maintenance burden that violates the spirit of "Vanilla-First" (which targets frameworks, not utility libraries).

---

### R2: Markdown Syntax Highlighting Without Libraries

**Decision**: Implement lightweight Markdown rendering without external libraries (marked.js, highlight.js, etc.).

**Research findings**:
- Full Markdown parsing from scratch is complex (nested lists, code blocks, tables, etc.)
- The templates are known content — we can use a simpler approach:
  - Option A: Render as preformatted text (`<pre><code>`) with basic regex-based highlighting for headings, code blocks, comments
  - Option B: Use `marked.js` (CDN) — lightweight (~40KB) but adds a dependency
  - Option C: Render raw Markdown in `<pre>` with CSS-based styling for readability (no syntax highlighting, just clean monospace display)
- **Decision**: Option A — regex-based highlighting for the known template structure. Templates have predictable patterns: `# headings`, `**bold**`, `[placeholders]`, `<!-- comments -->`. A simple tokenizer handles these without a library.

**Rationale**: Templates are controlled content with known structure. Full Markdown parsing is overkill. Regex-based approach is ~50 lines of JS and handles all template patterns.

## Project Structure

### Documentation (this feature)

```text
specs/021-template-gallery/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 output (JSZip, Markdown rendering)
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── index.html               # ← Extended: replace templates section (lines 1057-1067)
├── css/
│   └── guide.css            # ← Extended: gallery, drawer, copy button styles
└── js/
    └── download-manager.js  # ← Extended: template catalog, gallery rendering, drawer, clipboard
```

**Structure Decision**: Extends existing files rather than creating new ones. The `DownloadManager` class is extended with new methods. The HTML section is replaced. CSS styles are added to `guide.css` under new class namespaces (`.template-gallery-*`, `.template-drawer-*`).

## Phase 1: Design & Contracts

### Data Model: Template Catalog

```javascript
// Template catalog — generated at load time by scanning .specify/templates/
// Since this is a static site, the catalog is embedded as a JS object
// that maps to the known template files.

const TEMPLATE_CATALOG = [
  {
    id: 'spec',
    name: 'Spec Template',
    type: 'spec',
    description: 'Plantilla para escribir especificaciones de features con user stories, acceptance criteria y edge cases.',
    phase: 'Specify',
    phaseColor: 'var(--phase-specify, #2563eb)',
    file: '.specify/templates/spec-template.md',
    annotations: {
      'User Scenarios & Testing': 'Obligatoria: describe los escenarios de usuario con Given/When/Then',
      'Requirements': 'Obligatoria: lista los requisitos funcionales con MUST/SHOULD',
      'Success Criteria': 'Obligatoria: define métricas medibles y agnósticas de tecnología',
      'Key Entities': 'Opcional: incluye si la feature involucra datos o modelos'
    }
  },
  {
    id: 'plan',
    name: 'Plan Template',
    type: 'plan',
    description: 'Plantilla para el plan de implementación con arquitectura, estructura de proyecto y dependencias.',
    phase: 'Plan',
    phaseColor: 'var(--phase-plan, #7c3aed)',
    file: '.specify/templates/plan-template.md',
    annotations: {
      'Technical Context': 'Obligatoria: define lenguaje, dependencias, plataforma y constraints',
      'Constitution Check': 'Obligatoria: verifica cada principio constitucional',
      'Project Structure': 'Obligatoria: documenta la estructura de archivos del feature'
    }
  },
  {
    id: 'tasks',
    name: 'Tasks Template',
    type: 'tasks',
    description: 'Plantilla para el desglose de tareas organizadas por fase con dependencias y paralelismo.',
    phase: 'Tasks',
    phaseColor: 'var(--phase-tasks, #059669)',
    file: '.specify/templates/tasks-template.md',
    annotations: {
      'Phase Dependencies': 'Obligatoria: define el orden de ejecución y bloqueos',
      'Parallel Opportunities': 'Opcional: identifica tareas que pueden ejecutarse en paralelo'
    }
  },
  {
    id: 'checklist',
    name: 'Checklist Template',
    type: 'checklist',
    description: 'Plantilla para checklists de calidad de requisitos con categorías y items trazables.',
    phase: 'Checklist',
    phaseColor: 'var(--phase-checklist, #d97706)',
    file: '.specify/templates/checklist-template.md',
    annotations: {
      'Category': 'Obligatoria: agrupa los items de checklist por dimensión de calidad',
      'Notes': 'Opcional: instrucciones de uso y referencias'
    }
  },
  {
    id: 'constitution',
    name: 'Constitution Template',
    type: 'constitution',
    description: 'Plantilla para definir la constitución del proyecto con 5 principios: Stack Tecnológico, Arquitectura & Diseño, Workflow & Gobernanza, Estándares de Calidad, Documentación & Comunicación.',
    phase: 'Constitution',
    phaseColor: 'var(--phase-constitution, #dc2626)',
    file: '.specify/templates/constitution-template.md',
    annotations: {
      'Core Principles': 'Obligatoria: define los 5 principios con propósito, fases aplicables, consecuencias y ejemplos',
      'Constitution Checker': 'Obligatoria: checklist por fase (Specify/Clarify/Plan/Tasks/Implement) con veredicto PASS/FAIL',
      'Technology Stack Constraints': 'Opcional: define las tecnologías permitidas y restricciones por capa',
      'Governance': 'Obligatoria: proceso de enmienda, versionado y reglas de cumplimiento'
    }
  }
];
```

### DownloadManager Class Extensions

| Method | Purpose | Returns |
|--------|---------|---------|
| `loadTemplates()` | Loads template content from embedded catalog (replaces hardcoded content) | `Promise<void>` |
| `renderGallery(containerEl)` | Renders the visual gallery into the specified DOM container | `void` |
| `openDrawer(templateId)` | Opens the sidebar drawer with template preview and annotations | `void` |
| `closeDrawer()` | Closes the sidebar drawer | `void` |
| `copyToClipboard(templateId)` | Copies template content to clipboard with visual feedback | `Promise<boolean>` |
| `downloadIndividual(type)` | Downloads single template as .md (updated to use real content) | `void` |
| `downloadAllAsZip()` | Downloads all templates as .zip (updated to use real content) | `void` |
| `getTemplateContent(type)` | Returns template content from catalog (replaces hardcoded switch) | `string \| null` |
| `isClipboardAvailable()` | Checks if Clipboard API is supported | `boolean` |

### HTML Structure (replaces lines 1057-1067 in index.html)

```html
<section class="guide-section" id="templates" data-trackable>
  <div class="guide__container">
    <h2>Plantillas SDD</h2>
    <p class="guide__intro">Explora, previsualiza y descarga las plantillas oficiales para aplicar SDD en tus proyectos.</p>

    <!-- Gallery -->
    <div class="template-gallery" id="template-gallery" role="list">
      <!-- Cards rendered by DownloadManager.renderGallery() -->
    </div>

    <!-- Footer with version info -->
    <div class="template-gallery__footer">
      <span id="template-version">Speckit v0.8.6</span>
      <span id="template-updated">Actualizado: 2026-05-19</span>
    </div>
  </div>
</section>

<!-- Drawer (outside section, at body level for proper overlay) -->
<div class="template-drawer-overlay" id="template-drawer-overlay" aria-hidden="true">
  <aside class="template-drawer" id="template-drawer" role="dialog" aria-label="Previsualización de plantilla" aria-modal="true">
    <div class="template-drawer__header">
      <h3 id="template-drawer__title"></h3>
      <button class="template-drawer__close" id="template-drawer__close" type="button" aria-label="Cerrar previsualización">&times;</button>
    </div>
    <div class="template-drawer__actions">
      <button class="template-drawer__copy" id="template-drawer__copy" type="button">Copiar</button>
      <button class="template-drawer__download" id="template-drawer__download" type="button">Descargar</button>
    </div>
    <div class="template-drawer__content" id="template-drawer__content">
      <!-- Rendered Markdown with annotations -->
    </div>
  </aside>
</div>
```

### CSS Class Namespaces

| Namespace | Purpose |
|-----------|---------|
| `.template-gallery` | Grid container for template cards |
| `.template-card` | Individual template card |
| `.template-card__badge` | Phase badge on card |
| `.template-card__actions` | Button group (preview, download, copy) |
| `.template-drawer-overlay` | Full-screen backdrop |
| `.template-drawer` | Sliding panel from right |
| `.template-drawer__content` | Scrollable Markdown preview area |
| `.template-drawer__annotation` | Explanatory callout for required sections |
| `.template-gallery__footer` | Version and update date |

### Contract: Template Content Loading

Since this is a static site without a build step, template content cannot be read from `.specify/templates/` at runtime via `fetch()` (file:// protocol restrictions, CORS on some hosts).

**Approach**: Template content is embedded in the JavaScript as a module that exports the catalog with full content. This is generated manually when speckit templates are updated.

```javascript
// At top of download-manager.js (or separate template-catalog.js)
// Content is copy-pasted from .specify/templates/*.md when templates change
// This keeps the site working on file:// and any static host

const TEMPLATE_CONTENT = {
  'spec': `...content from spec-template.md...`,
  'plan': `...content from plan-template.md...`,
  'tasks': `...content from tasks-template.md...`,
  'checklist': `...content from checklist-template.md...`,
  'constitution': `...content from constitution-template.md...`
};
```

**Tradeoff**: Content is duplicated between `.specify/templates/` and `download-manager.js`. When speckit updates templates, the JS must be manually synced. This is acceptable because:
1. Template updates are infrequent (speckit version bumps)
2. It avoids `fetch()` issues on file:// protocol
3. It keeps the site fully static with no build step

## Constitution Check (Post-Design)

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Vanilla-First (NON-NEGOTIABLE) | ✅ PASS | JSZip retained as approved exception (utility library, not framework). No new frameworks added. All interactivity is vanilla JS. |
| II. Semantic HTML & Accessible | ✅ PASS | Drawer uses `role="dialog"`, `aria-modal="true"`, `aria-label`. Close on Escape. Focus trap inside drawer. All buttons keyboard-accessible. |
| III. Professional CSS Architecture | ✅ PASS | New styles use custom properties from existing design system. Mobile-first responsive. No inline styles. |
| IV. Feature Branch & PR Workflow (NON-NEGOTIABLE) | ✅ PASS | Branch `021-template-gallery`, PR with review. |
| V. CI/CD via GitHub Actions | ✅ PASS | Standard validation pipeline. |

**Gate Result**: ✅ PASS — All principles satisfied. JSZip documented as approved utility library exception.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| JSZip library (third-party) | Client-side zip generation for "download all" feature | Native `CompressionStream` API does not produce zip format. Manual zip construction is ~500 lines of error-prone code. Individual sequential downloads already exist as fallback but lose convenience. |
