# Tasks: Galería de Plantillas SDD

**Input**: Design documents from `/specs/021-template-gallery/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/` at repository root
- HTML section: `src/index.html` (replace lines 1057-1067)
- JS: `src/js/download-manager.js` (extend existing class)
- CSS: `src/css/guide.css` (extend existing styles)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare existing files for extension — backup current state, verify JSZip availability

- [ ] T001 Backup current `src/js/download-manager.js` hardcoded template content for reference
- [ ] T002 [P] Verify JSZip is loaded in `src/index.html` (check for `<script>` tag with JSZip CDN)
- [ ] T003 [P] Read all 5 template files from `.specify/templates/` and prepare content for embedding in `TEMPLATE_CONTENT` object

**Checkpoint**: Existing code understood, template content ready for embedding

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Template catalog data layer — replaces hardcoded content, provides the foundation for all user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 [P] Define `TEMPLATE_CONTENT` object in `src/js/download-manager.js` with embedded content from all 5 templates (spec, plan, tasks, checklist, constitution)
- [ ] T005 [P] Define `TEMPLATE_CATALOG` array in `src/js/download-manager.js` with metadata for each template (id, name, description, phase, phaseColor, annotations)
- [ ] T006 Implement `getTemplateContent(type)` method in `DownloadManager` class — returns content from `TEMPLATE_CONTENT` instead of hardcoded switch
- [ ] T007 Implement `loadTemplates()` method in `DownloadManager` class — reads speckit version from `.specify/integrations/speckit.manifest.json`, sets `lastUpdated` date
- [ ] T008 Implement `isClipboardAvailable()` method in `DownloadManager` class — checks for `navigator.clipboard` API support

**Checkpoint**: Template catalog and content loading ready — gallery rendering can now begin

---

## Phase 3: User Story 1 - Explorar y previsualizar plantillas SDD (Priority: P1) 🎯 MVP

**Goal**: El usuario ve una galería visual de plantillas con cards, puede previsualizar cualquiera en un drawer lateral con Markdown rendering y anotaciones.

**Independent Test**: Un usuario puede ver las 5 plantillas en la galería, seleccionar cualquiera y previsualizar su contenido completo renderizado en un drawer lateral sin necesidad de descargar nada.

### Implementation for User Story 1

- [ ] T009 [P] [US1] Replace existing templates section in `src/index.html` (lines 1057-1067) with gallery container (`<div class="template-gallery" id="template-gallery">`) and footer markup
- [ ] T010 [P] [US1] Add drawer HTML markup outside section (at body level) in `src/index.html`: overlay, `<aside class="template-drawer">` with header, actions bar, and content area
- [ ] T011 [P] [US1] Implement `renderMarkdown(text)` method in `src/js/download-manager.js` — regex-based tokenizer for headings, bold, placeholders, comments, code blocks, lists, horizontal rules
- [ ] T012 [P] [US1] Implement `renderAnnotations(annotations)` method in `src/js/download-manager.js` — generates HTML callout elements for annotated sections
- [ ] T013 [US1] Implement `renderGallery(containerEl)` method in `src/js/download-manager.js` — renders template cards grid from `TEMPLATE_CATALOG` with name, description, phase badge, and action buttons
- [ ] T014 [US1] Implement `openDrawer(templateId)` method in `src/js/download-manager.js` — opens drawer with rendered Markdown preview + annotations, sets focus trap, adds Escape key listener
- [ ] T015 [US1] Implement `closeDrawer()` method in `src/js/download-manager.js` — closes drawer, restores focus, removes event listeners, marks template as explored
- [ ] T016 [US1] Add gallery card styles in `src/css/guide.css`: `.template-gallery` grid, `.template-card` layout, `.template-card__badge` phase colors, `.template-card__actions` button group
- [ ] T017 [US1] Add drawer styles in `src/css/guide.css`: `.template-drawer-overlay` backdrop, `.template-drawer` sliding panel (translateX animation), `.template-drawer__content` scrollable area, `.template-drawer__annotation` callout styling
- [ ] T018 [US1] Add Markdown rendering styles in `src/css/guide.css`: `.md-heading`, `.md-placeholder`, `.md-comment`, `.md-code-block`, `.md-list` for syntax-highlighted template preview
- [ ] T019 [US1] Add responsive styles in `src/css/guide.css`: mobile (<768px) gallery single column, drawer full-screen with prominent close button
- [ ] T020 [US1] Wire up event listeners in `DownloadManager` constructor — card "Previsualizar" buttons call `openDrawer()`, drawer close button and overlay click call `closeDrawer()`, Escape key closes drawer

**Checkpoint**: User Story 1 functional — usuario puede explorar galería y previsualizar plantillas en drawer

---

## Phase 4: User Story 2 - Descargar plantillas individuales o en conjunto (Priority: P1)

**Goal**: El usuario puede descargar cualquier plantilla individual como .md o todas como .zip, con contenido real de los archivos de plantilla (no hardcoded).

**Independent Test**: Un usuario puede descargar cualquier plantilla individual con un clic, o descargar todas en un .zip, y los archivos contienen el contenido actualizado de `TEMPLATE_CONTENT`.

### Implementation for User Story 2

- [ ] T021 [P] [US2] Update `downloadIndividual(type)` method in `src/js/download-manager.js` — uses `getTemplateContent(type)` instead of old hardcoded content, creates Blob and triggers download
- [ ] T022 [P] [US2] Update `downloadAllAsZip()` method in `src/js/download-manager.js` — iterates `TEMPLATE_CATALOG`, uses JSZip with real content from `getTemplateContent()`, generates `sdd-templates.zip`
- [ ] T023 [US2] Add "Descargar" button to each template card in gallery (rendered by `renderGallery()`) — calls `downloadIndividual(type)` on click
- [ ] T024 [US2] Add "Descargar esta plantilla" button in drawer actions bar — calls `downloadIndividual(currentTemplateId)` without closing drawer
- [ ] T025 [US2] Add "Descargar todas" button in gallery footer — calls `downloadAllAsZip()` on click
- [ ] T026 [US2] Add download error handling in `src/js/download-manager.js` — shows error message with retry option and "ver contenido raw" fallback link if download fails

**Checkpoint**: User Story 2 functional — usuario puede descargar plantillas individuales y todas en zip con contenido real

---

## Phase 5: User Story 3 - Copiar contenido de plantilla al portapapeles (Priority: P2)

**Goal**: El usuario puede copiar el contenido de cualquier plantilla al portapapeles con un clic y recibir confirmación visual.

**Independent Test**: Un usuario puede copiar el contenido de cualquier plantilla al portapapeles desde la galería o el drawer, y ve un indicador "✓ Copiado" durante 2 segundos.

### Implementation for User Story 3

- [ ] T027 [P] [US3] Implement `copyToClipboard(templateId)` method in `src/js/download-manager.js` — uses `navigator.clipboard.writeText()`, returns Promise<boolean>, shows visual feedback
- [ ] T028 [US3] Add "Copiar" button to each template card in gallery — calls `copyToClipboard(type)`, shows "✓ Copiado" indicator for 2 seconds
- [ ] T029 [US3] Add "Copiar" button in drawer actions bar — calls `copyToClipboard(currentTemplateId)`, shows "✓ Copiado" indicator
- [ ] T030 [US3] Implement clipboard unavailable handling — if `isClipboardAvailable()` returns false, hide/disable "Copiar" buttons with tooltip explaining browser doesn't support it

**Checkpoint**: User Story 3 functional — usuario puede copiar plantillas al portapapeles con confirmación visual

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, version display, final integration

- [ ] T031 [P] Add speckit version and last-updated date display in gallery footer (`#template-version`, `#template-updated`) populated by `loadTemplates()`
- [ ] T032 [P] Add ARIA attributes: `aria-expanded` on drawer open/close, `aria-live="polite"` on drawer content area, `aria-label` on all action buttons
- [ ] T033 [P] Add keyboard navigation: Tab order through gallery cards, Enter to open drawer, Escape to close, Tab trap inside drawer
- [ ] T034 [P] Add "explorada" visual indicator on gallery cards after drawer is closed (CSS class `.template-card--explored`)
- [ ] T035 [P] Add error state for missing/corrupt template files — card shows "Plantilla no disponible" and download/copy buttons disabled
- [ ] T036 Test gallery on mobile (<768px): single column layout, full-screen drawer, touch-friendly buttons (min 44px)
- [ ] T037 Test gallery on tablet (768px-1023px): 2-column grid, drawer at 70% width
- [ ] T038 Test gallery on desktop (≥1024px): 3-column grid, drawer at 500px width
- [ ] T039 Run quickstart.md validation: open `src/index.html` in browser, test all gallery interactions, verify downloads contain correct content

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Foundational — gallery rendering needs template catalog
- **US2 (Phase 4)**: Depends on Foundational — downloads need `getTemplateContent()`
- **US3 (Phase 5)**: Depends on Foundational — clipboard needs template content
- **Polish (Phase 6)**: Depends on all user stories complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) — No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) — Independent from US1, uses same `getTemplateContent()` method
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) — Independent from US1/US2, uses same `isClipboardAvailable()` method

### Within Each User Story

- Models/catalog before rendering
- Rendering before event listeners
- Core implementation before polish
- Story complete before moving to next priority

### Parallel Opportunities

- All Phase 1 Setup tasks marked [P] can run in parallel
- All Phase 2 Foundational tasks marked [P] can run in parallel
- Once Phase 2 completes, US1, US2, US3 can all start in parallel (different methods, different UI elements)
- Within US1: T009, T010, T011, T012 can run in parallel (HTML + JS methods)
- Within US1: T016, T017, T018, T019 can run in parallel (CSS styles)
- All Polish tasks marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch HTML markup tasks together:
Task: "Replace templates section in index.html with gallery container"
Task: "Add drawer HTML markup outside section"

# Launch JS method tasks together:
Task: "Implement renderMarkdown() method"
Task: "Implement renderAnnotations() method"

# Launch CSS style tasks together:
Task: "Add gallery card styles"
Task: "Add drawer styles"
Task: "Add Markdown rendering styles"
Task: "Add responsive styles"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup — template content prepared
2. Complete Phase 2: Foundational — `TEMPLATE_CONTENT`, `TEMPLATE_CATALOG`, `getTemplateContent()` ready
3. Complete Phase 3: US1 — gallery with cards, drawer preview, Markdown rendering
4. **STOP and VALIDATE**: Test US1 independently — can browse gallery, preview templates in drawer
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Template catalog ready
2. Add US1 → Gallery + Drawer preview → Test independently → Deploy (MVP!)
3. Add US2 → Individual + Zip downloads with real content → Test independently → Deploy
4. Add US3 → Clipboard copy → Test independently → Deploy
5. Add Polish → Accessibility, version display, responsive testing → Deploy

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (gallery + drawer)
   - Developer B: User Story 2 (downloads)
   - Developer C: User Story 3 (clipboard)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- This feature EXTENDS existing code — no new files created, only modifications to `index.html`, `download-manager.js`, and `guide.css`
- Template content is embedded in JS (not fetched at runtime) — sync manually when speckit updates templates
- JSZip is retained as approved utility library exception for zip generation
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
