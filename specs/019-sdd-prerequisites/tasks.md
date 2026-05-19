# Tasks: Prerrequisitos para adoptar SDD

**Input**: Spec from `/specs/019-sdd-prerequisites/spec.md`
**Prerequisites**: plan.md, spec.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/` at repository root
- All new CSS: `src/css/sdd-prerequisites.css`
- All new JS: `src/js/sdd-prerequisites.js`
- HTML section: `src/index.html`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize CSS and JS files, and the HTML section shell

- [ ] T001 [P] Create `src/css/sdd-prerequisites.css` with design tokens (typography scale, color palette, spacing system, layout variables) and responsive base layout
- [ ] T002 [P] Create `src/js/sdd-prerequisites.js` with module wrapper and data structure placeholders
- [ ] T003 Add `<link rel="stylesheet" href="css/sdd-prerequisites.css">` and `<script src="js/sdd-prerequisites.js" defer></script>` to `src/index.html`
- [ ] T004 Add `<section class="prerequisites-section" id="prerequisites">` shell with heading, subtitle, and intro paragraph in `src/index.html`
- [ ] T005 Add sidebar entry for "Prerrequisitos SDD" with 3 submenu items in `src/index.html`

---

## Phase 2a: User Story 0 - Sección introductoria (P1)

**Goal**: El visitante entiende de un vistazo qué es la sección, para quién es, y puede iniciar la evaluación.

**Independent Test**: Un visitante lee el encabezado e introducción en <15 segundos y puede responder qué es, para quién es, y qué acción tomar.

### Implementation for User Story 0

- [ ] T006 [P] [US0] Add heading, subtitle (lenguaje no-técnico), and intro paragraph (audiencia, contenido, duración estimada) in `src/index.html`
- [ ] T007 [P] [US0] Style `.prerequisites-header` with section heading, subtitle, and intro paragraph typography per design tokens in `src/css/sdd-prerequisites.css`
- [ ] T008 [P] [US0] Implement `detectReturningVisitor()` — checks localStorage for saved progress and shows "Tu evaluación anterior: [veredicto]" banner with "Continuar" / "Empezar de nuevo" options in `src/js/sdd-prerequisites.js`
- [ ] T009 [US0] Add prominent "Evaluar mi equipo" CTA button linking to checklist section with scroll behavior in `src/index.html`

**Checkpoint**: User Story 0 complete — first-time and returning visitors have clear entry points

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Data layer — all prerequisites data, resources, and evaluation logic

- [ ] T010 [P] Define `prerequisitesData` array with all prerequisites organized by 3 categories (Técnicos, Metodológicos, Herramientas) in `src/js/sdd-prerequisites.js`
- [ ] T011 [P] Define `verdictConfig` object with verdict rules (all → Ready, 1-2 gaps → Casi listo, 3+ → Faltan bases) in `src/js/sdd-prerequisites.js`

**Checkpoint**: All data ready — interactivity and rendering can now begin

---

## Phase 3: User Story 1 - Evaluar preparación del equipo (P1) 🎯 MVP

**Goal**: El usuario ve un checklist interactivo organizado en 3 categorías, marca prerrequisitos cumplidos, recibe un veredicto claro con brechas identificadas.

**Independent Test**: Un líder técnico puede completar el checklist en menos de 3 minutos, recibir un veredicto ("Ready", "Casi listo" o "Faltan bases") y ver exactamente qué brechas debe cerrar.

### Implementation for User Story 1

- [ ] T012 [P] [US1] Implement `renderChecklist()` — renderiza el checklist con 3 categorías y sus prerrequisitos con checkboxes en `src/js/sdd-prerequisites.js`
- [ ] T013 [P] [US1] Implement `calculateVerdict()` — calcula veredicto basado en items marcados (todos → Ready, 1-2 → Casi listo, 3+ → Faltan bases) en `src/js/sdd-prerequisites.js`
- [ ] T014 [P] [US1] Implement `renderVerdict()` — renderiza el veredicto con brechas listadas y recursos expandibles en `src/js/sdd-prerequisites.js`
- [ ] T015 [US1] Implement `initChecklist()` — agrega event listeners para checkboxes y botón de evaluar en `src/js/sdd-prerequisites.js`
- [ ] T016 [US1] Style `.prerequisites-section` con card layout (max-width: 900px, centrado, bg-white, border-radius, box-shadow) en `src/css/sdd-prerequisites.css`
- [ ] T017 [US1] Style `.prereq-checklist` con categorías, checkboxes estilizados y spacing en `src/css/sdd-prerequisites.css`
- [ ] T018 [US1] Style `.prereq-verdict` con veredicto (Ready verde, Casi listo amarillo, Faltan rojo) y brechas listadas en `src/css/sdd-prerequisites.css`
- [ ] T019 [US1] Add US1 section HTML (`<div id="prereq-checklist-section">`) with `.prereq-checklist` container and evaluate button in `src/index.html`

**Checkpoint**: User Story 1 functional — usuario puede evaluar preparación y recibir veredicto

---

## Phase 4: User Story 2 - Comprender los prerrequisitos técnicos (P1)

**Goal**: El usuario puede expandir cada prerrequisito técnico para ver explicación, nivel sugerido y recursos recomendados.

**Independent Test**: Un desarrollador puede listar los 4 prerrequisitos técnicos principales (Git, Markdown, testing, CLI) y explicar por qué cada uno es necesario para SDD.

### Implementation for User Story 2

- [ ] T020 [P] [US2] Implement `expandPrerequisite()` — función para expandir/colapsar detalle de cada prerrequisito con recursos en `src/js/sdd-prerequisites.js`
- [ ] T021 [US2] Add US2 section HTML with `.prereq-detail` containers for expandable prerequisite info in `src/index.html`
- [ ] T022 [US2] Style `.prereq-item-detail` para cada prerrequisito expandible (explicación, nivel, recursos) en `src/css/sdd-prerequisites.css`
- [ ] T023 [US2] Style `.prereq-resource` con cards de recursos (tutorial, documentación, ejemplo) con badges visuales distinguibles en `src/css/sdd-prerequisites.css`

**Checkpoint**: User Story 2 functional — usuario puede explorar detalles y recursos de cada prerrequisito

---

## Phase 5: User Story 3 - Comprender prerrequisitos metodológicos y culturales (P2)

**Goal**: El usuario evalúa la madurez metodológica y cultural del equipo con recomendaciones específicas.

**Independent Test**: Un líder puede evaluar 3 aspectos culturales (Agile, code review, apertura a IA) y recibir recomendaciones para cada brecha.

### Implementation for User Story 3

- [ ] T024 [P] [US3] Implement `renderMethodologicalResources()` — renderiza recursos expandibles para brechas metodológicas en `src/js/sdd-prerequisites.js`
- [ ] T025 [US3] Add US3 section HTML for methodological/cultural resources within the checklist detail in `src/index.html`
- [ ] T026 [US3] Style `.prereq-cultural` con recursos específicos para brechas metodológicas en `src/css/sdd-prerequisites.css`

**Checkpoint**: User Story 3 functional — usuario puede explorar recursos metodológicos

---

## Phase 6: Persistence & Polish

**Purpose**: localStorage persistence, suggested route, cross-links, accessibility, edge cases

- [ ] T027 [P] Implement `saveProgress()` — guarda checklist en localStorage con clave `sdd-prereqs-progress` en `src/js/sdd-prerequisites.js`
- [ ] T028 [P] Implement `loadProgress()` — carga checklist guardado al iniciar la sección en `src/js/sdd-prerequisites.js`
- [ ] T029 [P] Implement `generateSuggestedRoute()` — genera ruta sugerida ordenada por dependencias cuando hay 2+ brechas en `src/js/sdd-prerequisites.js`
- [ ] T030 [P] Add responsive media queries for <768px (full-width cards, reduce padding) in `src/css/sdd-prerequisites.css`
- [ ] T031 [P] Add keyboard navigation (Tab, Enter, Space) and ARIA attributes (`aria-expanded`, `aria-controls`, `aria-live="polite"` for dynamic content) en `src/js/sdd-prerequisites.js`
- [ ] T032 Add version indicator and last-updated date to the section footer in `src/index.html`
- [ ] T033 Add cross-links from prerequisites to related sections (Git → Proceso E2E, testing → Anatomía de Specs) in `src/index.html`
- [ ] T034 [P] Implement "calculando..." button state during verdict calculation (text change, wait cursor, <200ms duration) in `src/js/sdd-prerequisites.js`
- [ ] T035 [P] Implement "Guardado" non-intrusive indicator after localStorage save (check icon + text, 2s display) in `src/js/sdd-prerequisites.js`
- [ ] T036 [P] Add localStorage unavailable detection and show informational warning ("Tu progreso no se guardará") in `src/js/sdd-prerequisites.js`
- [ ] T037 [P] Define hover, focus, active states for all interactive elements (checkboxes, buttons, expandable items, links) with WCAG AA 3:1 contrast in `src/css/sdd-prerequisites.css`
- [ ] T038 [P] Set explicit tabindex order: heading → intro → categories (in order) → checkboxes → evaluate button → verdict → suggested route → cross-links in `src/index.html` and `src/js/sdd-prerequisites.js`
- [ ] T039 [P] Add resource link validation check on page load — flag broken links with visual indicator (warning icon + "enlace puede estar desactualizado") in `src/js/sdd-prerequisites.js`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **US0 Intro (Phase 2a)**: Depends on Setup — can start after Phase 1
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Foundational — can start first (MVP)
- **US2 (Phase 4)**: Depends on Foundational — independent from US1
- **US3 (Phase 5)**: Depends on Foundational — independent from US1, US2
- **Polish (Phase 6)**: Depends on all user stories complete

### Parallel Opportunities

- All Phase 1 Setup tasks marked [P] can run in parallel
- Phase 2a (US0) tasks marked [P] can run in parallel with each other
- All Phase 2 data tasks marked [P] can run in parallel
- Once Phase 2 completes, US1, US2, US3 can all start in parallel
- All polish tasks marked [P] can run in parallel

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup — files created, linked, section shell
2. Complete Phase 2a: US0 — heading, intro, returning visitor detection, CTA
3. Complete Phase 2: Foundational — all data ready
4. Complete Phase 3: US1 — checklist with verdict
5. **STOP and VALIDATE**: Test US0 + US1 independently
6. Deploy if ready

### Incremental Delivery

1. Setup + US0 → Entry point ready
2. Add Foundational → Data ready
3. Add US1 → Checklist + Verdict → Test independently → Deploy (MVP!)
4. Add US2 → Technical prerequisite details → Test independently → Deploy
5. Add US3 → Methodological resources → Test independently → Deploy
6. Add Polish → Persistence, route, cross-links, accessibility → Deploy
