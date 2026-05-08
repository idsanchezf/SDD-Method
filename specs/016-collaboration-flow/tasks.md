# Tasks: Flujo de Colaboración Humano-IA

**Input**: Design documents from `/specs/016-collaboration-flow/`
**Prerequisites**: plan.md, spec.md, data-model.md, research.md

**Tests**: No solicitados en spec — verificación manual en navegador.

**Organization**: Tasks grouped by user story for independent implementation/testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `src/` at repository root
- CSS in `src/css/`, JS in `src/js/`, HTML as `src/index.html`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Estructura inicial y scaffolding de la sección

- [x] T001 Crear archivo `src/css/collab-flow.css` con estructura base de estilos para la sección
- [x] T002 Crear archivo `src/js/collab-flow.js` con clase `CollaborationFlow` y esqueleto de métodos

---

## Phase 2: User Story 1 - Visualizar colaboración por fase (Priority: P1) 🎯 MVP

**Goal**: Diagrama interactivo con las 5 fases de SDD que muestra el panel de colaboración al seleccionar una fase.

**Independent Test**: Un usuario puede seleccionar cualquiera de las 5 fases y ver: rol humano, rol IA, artefacto producido y punto de supervisión.

### Implementation for User Story 1

- [x] T003 [P] [US1] Definir array `PHASES` con datos de colaboración (rol humano, rol IA, artefacto, supervisión, color) en `src/js/collab-flow.js`
- [x] T004 [P] [US1] Renderizar diagrama horizontal de 5 fases como cards HTML en `src/js/collab-flow.js` con estados (pendiente/activo/completado)
- [x] T005 [US1] Implementar panel de detalle de fase: al hacer clic en una fase, mostrar nombre, rol humano, rol IA, artefacto y punto de supervisión en `src/js/collab-flow.js`
- [x] T006 [US1] Implementar navegación entre fases: al cambiar de fase activa, actualizar panel y estados visuales en `src/js/collab-flow.js`
- [x] T007 [US1] Añadir estilos para diagrama de fases, cards y panel detallado en `src/css/collab-flow.css`

**Checkpoint**: Diagrama funcional — usuario puede ver las 5 fases, hacer clic y ver detalle de colaboración.

---

## Phase 3: User Story 2 - Consultar prompts recomendados (Priority: P1)

**Goal**: Biblioteca de prompts estructurados por fase y rol de IA, con filtros y vista expandible.

**Independent Test**: Un usuario puede filtrar prompts por fase o rol IA, seleccionar uno y ver su estructura completa.

### Implementation for User Story 2

- [x] T008 [P] [US2] Definir array `PROMPTS` con prompts por fase (nombre, texto con placeholders, ejemplo de salida) en `src/js/collab-flow.js`
- [x] T009 [P] [US2] Implementar tabs en el panel de fase (Colaboración / Prompts / Supervisión) en `src/js/collab-flow.js`
- [x] T010 [US2] Implementar vista de prompts: al activar tab Prompts, mostrar lista expandible de prompts para la fase activa en `src/js/collab-flow.js`
- [x] T011 [P] [US2] Implementar filtros de biblioteca de prompts por fase y por rol IA en `src/js/collab-flow.js`
- [x] T012 [US2] Implementar vista de biblioteca completa de prompts con filtros en `src/js/collab-flow.js`
- [x] T013 [US2] Añadir estilos para tabs, lista de prompts y filtros en `src/css/collab-flow.css`

**Checkpoint**: Prompts funcionales — usuario puede ver prompts por fase, expandirlos y filtrar la biblioteca completa.

---

## Phase 4: User Story 3 - Revisar supervisión requerida (Priority: P2)

**Goal**: Checklist de supervisión por fase con persistencia en localStorage y marcado visual no bloqueante.

**Independent Test**: Un usuario puede seleccionar cualquier fase, ver puntos de supervisión, marcarlos como revisados y ver el progreso.

### Implementation for User Story 3

- [x] T014 [P] [US3] Definir array `SUPERVISION_POINTS` con puntos por fase en `src/js/collab-flow.js`
- [x] T015 [P] [US3] Implementar vista de supervisión: al activar tab Supervisión, mostrar checklist con checkboxes en `src/js/collab-flow.js`
- [x] T016 [US3] Implementar lógica de marcado: checkbox tacha punto visualmente, actualiza progreso en `src/js/collab-flow.js`
- [x] T017 [US3] Implementar persistencia localStorage con clave `sdd-collab-progress` en `src/js/collab-flow.js`
- [x] T018 [US3] Implementar estado "supervisada parcialmente" con aviso visual no bloqueante en `src/js/collab-flow.js`
- [x] T019 [US3] Implementar barra de progreso de supervisión por fase en `src/js/collab-flow.js`
- [x] T020 [US3] Implementar degradación elegante: aviso no intrusivo si localStorage no disponible en `src/js/collab-flow.js`
- [x] T021 [US3] Añadir estilos para checklist, progreso y estados de supervisión en `src/css/collab-flow.css`

**Checkpoint**: Supervisión funcional — usuario puede marcar puntos, ver progreso, recargar y mantener estado.

---

## Phase 5: Integración & Polish

**Purpose**: Integrar la sección en la navegación del sitio, añadir al sidebar y verificar scroll spy.

- [x] T022 [P] Insertar sección `<section id="collab-flow">` en `src/index.html` tras la sección Constitución
- [x] T023 [P] Añadir `<link rel="stylesheet" href="css/collab-flow.css">` en `<head>` de `src/index.html`
- [x] T024 [P] Añadir `<script src="js/collab-flow.js" defer></script>` al final de `src/index.html`
- [x] T025 [P] Añadir entrada en sidebar con submenús en `src/index.html`
- [x] T026 Añadir `if (el.id === 'collab-flow') return 'collab-flow'` al scroll spy en `src/js/section-nav.js`
- [x] T027 Verificar funcionamiento completo en navegador: diagrama, prompts, supervisión y persistencia

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **User Story 1 (Phase 2)**: Depends on Phase 1 — MVP scope
- **User Story 2 (Phase 3)**: Depends on Phase 2 (reuses panel/tabs infrastructure)
- **User Story 3 (Phase 4)**: Depends on Phase 2 (reuses panel/tabs infrastructure)
- **Integration (Phase 5)**: Depends on Phases 2-4 completion

### User Story Dependencies

- **US1 (P1) MVP**: Can start after Setup — no dependencies on other stories
- **US2 (P1)**: Depends on US1 (shares the phase panel and tab infrastructure)
- **US3 (P2)**: Depends on US1 (shares the phase panel and tab infrastructure)

### Within Each User Story

- Data arrays before rendering logic
- Core implementation before visual polish
- Story complete before moving to next

### Parallel Opportunities

- All [P] tasks in same phase can run in parallel
- T003+T004 can run in parallel (data + diagram render)
- T008+T009 can run in parallel (data + tab infrastructure)
- T014+T015 can run in parallel (data + checklist render)
- T022-T026 Integration phase: all [P] tasks can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch data + rendering together:
Task: "Definir array PHASES en src/js/collab-flow.js"
Task: "Renderizar diagrama horizontal de 5 fases en src/js/collab-flow.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup → T001, T002
2. Complete Phase 2: User Story 1 → T003-T007
3. **STOP and VALIDATE**: Diagrama funcional con panel de colaboración
4. Deploy/demo si listo

### Incremental Delivery

1. Complete Setup → Estructura lista
2. Add US1 → Diagrama interactivo (MVP!)
3. Add US2 → Biblioteca de prompts
4. Add US3 → Checklist de supervisión
5. Phase 5 → Integración completa

### Parallel Team Strategy

With multiple developers:

1. Developer A: US1 (Phase 2)
2. Developer B: After US1 panel is stable, US2 (Phase 3)
3. Developer C: After US1 panel is stable, US3 (Phase 4)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate independently
- No npm/build steps — vanilla JS, HTML, CSS
