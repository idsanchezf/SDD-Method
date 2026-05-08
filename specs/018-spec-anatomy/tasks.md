# Tasks: Anatomía y escritura de Specs SDD

**Input**: Design documents from `/specs/018-spec-anatomy/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/` at repository root
- All new CSS: `src/css/spec-anatomy.css`
- All new JS: `src/js/spec-anatomy.js`
- HTML section: `src/index.html`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize CSS and JS files, and the HTML section shell

- [x] T001 Create `src/css/spec-anatomy.css` with card-style variables and responsive base layout
- [x] T002 Create `src/js/spec-anatomy.js` with module wrapper and data structure placeholders
- [x] T003 Add `<link rel="stylesheet" href="css/spec-anatomy.css">` and `<script src="js/spec-anatomy.js" defer></script>` to `src/index.html`
- [x] T004 Add `<section class="spec-anatomy-section" id="spec-anatomy">` shell with heading and intro paragraph in `src/index.html`
- [x] T005 Add sidebar entry for "Anatomía de Specs" with 4 submenu items in `src/index.html`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Data layer — all spec anatomy content, GWT examples, edge case techniques, and annotated examples as JavaScript data

- [x] T006 [P] Define `specSections` array with 6 SpecSection objects (frontmatter, goal/contexto, user stories, acceptance criteria, edge cases, open questions) in `src/js/spec-anatomy.js`
- [x] T007 [P] Define `gwtExamples` array with good and bad Given/When/Then scenarios in `src/js/spec-anatomy.js`
- [x] T008 [P] Define `edgeCaseTechniques` array with 5 techniques (boundary, negation, empty, error, concurrency) in `src/js/spec-anatomy.js`
- [x] T009 [P] Define `specExamples` array with 2 SpecExample objects (good and bad) including full spec content and line annotations in `src/js/spec-anatomy.js`

**Checkpoint**: All data ready — interactivity and rendering can now begin

---

## Phase 3: User Story 1 - Aprender la anatomía de un spec.md (P1) 🎯 MVP

**Goal**: El usuario ve un diagrama/anatomía visual del spec.md con secciones expandibles que muestran propósito, campos, ejemplo y errores comunes.

**Independent Test**: Un usuario puede hacer clic en cada una de las 6 secciones del spec y ver su explicación expandida sin errores de consola.

### Implementation for User Story 1

- [x] T010 [P] [US1] Implement `renderAnatomyDiagram()` — renderiza el esquema visual de las 6 secciones del spec en `src/js/spec-anatomy.js`
- [x] T011 [US1] Implement `initAnatomy()` — agrega event listeners de expand/colapsar a cada sección del diagrama usando toggle con `aria-expanded` en `src/js/spec-anatomy.js`
- [x] T012 [US1] Style `.spec-anatomy-section` con card layout (max-width: 900px, centrado, bg-white, border-radius, box-shadow) en `src/css/spec-anatomy.css`
- [x] T013 [US1] Style `.spec-anatomy__diagram` con layout de lista vertical, animación de expand/colapsar (max-height transition) y estilos de hover en `src/css/spec-anatomy.css`
- [x] T014 [US1] Style `.spec-anatomy__section-detail` para cada sección expandible (padding, border, tipografía, colores de error común) en `src/css/spec-anatomy.css`
- [x] T015 [US1] Add US1 section HTML (`<div id="spec-anatomy-overview">`) with `.spec-anatomy__diagram` container in `src/index.html`

**Checkpoint**: User Story 1 functional — usuario puede explorar las 6 secciones del spec

---

## Phase 4: User Story 2 - Dominar el formato Given/When/Then (P1)

**Goal**: El usuario aprende Given/When/Then con ejemplos buenos y malos lado a lado.

**Independent Test**: Un usuario puede ver 3 pares de escenarios bien/mal escritos y entender la diferencia.

### Implementation for User Story 2

- [x] T016 [P] [US2] Implement `renderGWTExamples()` — renderiza ejemplos Given/When/Then lado a lado (good vs bad) en `src/js/spec-anatomy.js`
- [x] T017 [US2] Add US2 section HTML (`<div id="spec-anatomy-gwt">`) with `.spec-anatomy__gwt` container in `src/index.html`
- [x] T018 [US2] Style `.spec-anatomy__gwt` con vista side-by-side (CSS Grid 2 columnas), colapsable a vertical en <768px en `src/css/spec-anatomy.css`
- [x] T019 [US2] Style `.gwt-card--good` (borde verde) y `.gwt-card--bad` (borde rojo) con highlighting de diferencias en `src/css/spec-anatomy.css`
- [x] T020 [US2] Implement `renderComplexPatterns()` — sección de patrones avanzados (tablas de ejemplos, AND/OR, excepciones) en `src/js/spec-anatomy.js`

**Checkpoint**: User Story 2 functional — usuario puede comparar escenarios GWT

---

## Phase 5: User Story 3 - Identificar y documentar edge cases (P2)

**Goal**: El usuario aprende 5 técnicas sistemáticas para descubrir edge cases con ejemplos aplicados.

**Independent Test**: Un usuario puede expandir cada técnica, leer su descripción y ver el ejemplo aplicado.

### Implementation for User Story 3

- [x] T021 [P] [US3] Implement `renderEdgeCaseTechniques()` — renderiza las 5 técnicas con estilo expandible (details/summary) en `src/js/spec-anatomy.js`
- [x] T022 [US3] Add US3 section HTML (`<div id="spec-anatomy-edgecases">`) with `.spec-anatomy__edgecases` container in `src/index.html`
- [x] T023 [US3] Style `.spec-anatomy__edgecases` con cards por técnica, cada una con `details`/`summary` nativo estilizado en `src/css/spec-anatomy.css`
- [x] T024 [US3] Style `.technique-card` con icono de categoría (boundary/negation/empty/error/concurrency), preguntas guía y ejemplo en `src/css/spec-anatomy.css`

**Checkpoint**: User Story 3 functional — usuario puede explorar 5 técnicas de edge cases

---

## Phase 6: User Story 4 - Consultar ejemplos anotados de specs (P2)

**Goal**: El usuario ve specs completas anotadas (buena y mala) con vista side-by-side comparativa.

**Independent Test**: Un usuario puede alternar entre spec buena y mala, activar vista comparativa y ver diferencias resaltadas.

### Implementation for User Story 4

- [x] T025 [P] [US4] Implement `renderSpecExamples()` — renderiza los 2 ejemplos completos con selector de tabs (buena/mala/both) en `src/js/spec-anatomy.js`
- [x] T026 [US4] Implement `renderAnnotations()` — renderiza anotaciones línea por línea alineadas con el contenido del spec en `src/js/spec-anatomy.js`
- [x] T027 [US4] Add US4 section HTML (`<div id="spec-anatomy-examples">`) with `.spec-anatomy__examples` container including tab selector (buena/mala/comparar) in `src/index.html`
- [x] T028 [US4] Style `.spec-anatomy__examples` con tabs (CSS class toggle), side-by-side grid y highlight de diferencias en `src/css/spec-anatomy.css`
- [x] T029 [US4] Style `.annotation--positive` (verde), `.annotation--negative` (rojo), `.annotation--info` (azul) con tooltips o notas al margen en `src/css/spec-anatomy.css`
- [x] T030 [US4] Implement `initExamples()` — agrega event listeners para tabs y toggle de vista comparativa en `src/js/spec-anatomy.js`

**Checkpoint**: User Story 4 functional — usuario puede explorar specs anotadas

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Mejoras que afectan a todas las user stories

- [x] T031 [P] Add `init()` entry point — llama a initAnatomy(), renderGWTExamples(), renderEdgeCaseTechniques(), renderSpecExamples() en DOMContentLoaded en `src/js/spec-anatomy.js`
- [x] T032 [P] Add responsive media queries for <768px (collapse side-by-side, full-width cards, reduce padding) en `src/css/spec-anatomy.css`
- [x] T033 [P] Add keyboard navigation (Tab, Enter, Escape) for expand/colapsar, tabs y side-by-side toggle en `src/js/spec-anatomy.js`
- [x] T034 [P] Add ARIA attributes (`aria-expanded`, `aria-controls`, `role="tablist"`, `role="tab"`, `role="tabpanel"`) en `src/js/spec-anatomy.js`
- [x] T035 Add version indicator and last-updated date to the section footer in `src/index.html`
- [x] T036 Add cross-links from each technique/section to glossary (US10) and prerequisites (US18) in `src/index.html`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Foundational — can start first (MVP)
- **US2 (Phase 4)**: Depends on Foundational — independent from US1
- **US3 (Phase 5)**: Depends on Foundational — independent from US1, US2
- **US4 (Phase 6)**: Depends on Foundational — independent from US1, US2, US3
- **Polish (Phase 7)**: Depends on all user stories complete

### User Story Dependencies

- **US1 (P1)**: MVP — anatomy diagram and expand/colapsar
- **US2 (P1)**: Independent from all other stories
- **US3 (P2)**: Independent from all other stories
- **US4 (P2)**: Independent from all other stories

### Within Each User Story

- Data before rendering
- HTML structure before CSS
- CSS before JS interactivity
- Story complete before moving to next priority

### Parallel Opportunities

- All Phase 1 Setup tasks marked [P] can run in parallel
- All Phase 2 data tasks marked [P] can run in parallel
- Once Phase 2 completes, US1, US2, US3, US4 can all start in parallel (different HTML sections, independent data)
- All polish tasks marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all data tasks together:
Task: "Define specSections array with 6 SpecSection objects in src/js/spec-anatomy.js"
Task: "Define gwtExamples array with good and bad Given/When/Then scenarios in src/js/spec-anatomy.js"
Task: "Define edgeCaseTechniques array with 5 techniques in src/js/spec-anatomy.js"
Task: "Define specExamples array with 2 SpecExample objects in src/js/spec-anatomy.js"
```

```bash
# Launch US1 tasks together:
Task: "Implement renderAnatomyDiagram() in src/js/spec-anatomy.js"
Task: "Style spec-anatomy-section with card layout in src/css/spec-anatomy.css"
Task: "Add US1 section HTML in src/index.html"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup — files created, linked, section shell
2. Complete Phase 2: Foundational — all data ready
3. Complete Phase 3: US1 — anatomy diagram with expand/colapsar
4. **STOP and VALIDATE**: Test US1 independently
5. Deploy if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 → Anatomy diagram → Test independently → Deploy (MVP!)
3. Add US2 → GWT examples → Test independently → Deploy
4. Add US3 → Edge case techniques → Test independently → Deploy
5. Add US4 → Annotated examples → Test independently → Deploy
6. Add Polish → Cross-cutting improvements → Deploy

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: US1 (anatomy diagram)
   - Developer B: US2 (GWT examples)
   - Developer C: US3 (edge case techniques)
   - Developer D: US4 (annotated examples)
3. Stories complete and integrate independently into the same HTML/CSS/JS files
