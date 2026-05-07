# User Story 4: End-to-End SDD Process - Greenfield & Brownfield

**Feature Branch**: `004-us4-proceso-end-to-end`  
**Created**: 2026-05-05  
**Status**: Draft 
**Priority**: P2 
**Input**: User Story 4 from `specs/Backlog/spec.md` — "Comprender qué es Spec Driven Development"

## Description
Como gerente de proyecto o tech lead, quiero visualizar el flujo completo de SDD desde la concepción de una feature hasta su entrega aplicado a casos greenfield (proyecto nuevo) y brownfield (legado existente), incluyendo los handoffs entre roles y los puntos de control de calidad, para poder planificar y supervisar proyectos reales.

## Why this priority
Proporciona la visión holística necesaria para coordinar equipos completos y entender cómo encajan todas las piezas en diferentes contextos de proyecto.

## Clarifications

### Session 2026-05-06
- Q: What level of detail should the greenfield and brownfield case studies demonstrate? → A: Interactive walkthrough (step-by-step with user guidance)

## Independent Test
Un usuario puede describir el flujo end-to-end de SDD para un caso greenfield y uno brownfield, identificar al menos 3 puntos de control de calidad y explicar qué sucede si una spec no pasa revisión.

## Acceptance Scenarios
1. **Given** que el usuario accede a la sección de proceso general, **When** interactúa con el diagrama de flujo, **Then** puede hacer clic en cada paso y ver descripción, roles involucrados y artefactos producidos.
2. **Given** que el usuario está viendo el diagrama, **When** activa la capa de "control de calidad", **Then** se resaltan los gates de revisión y aprobación del proceso.
3. **Given** que el usuario completa la lectura, **When** accede a la sección de casos de estudio, **Then** inicia un recorrido interactivo paso a paso para el caso greenfield (proyecto nuevo) con el usuario guiado a través de cada fase, visualizando artefactos reales y tomando decisiones simuladas.
4. **Given** que el usuario está en el recorrido interactivo greenfield, **When** cambia al caso brownfield (legado existente), **Then** ve cómo se adapta el flujo SDD para proyectos con código existente mediante una guía interactiva que resalta consideraciones especiales y modificaciones de artefactos.

## Detalle adicional
- El diagrama debe mostrar:
  - Fases principales: Specify, Clarify, Plan, Tasks, Implement
  - Entradas y salidas de cada fase
  - Roles clave en cada paso (ej. Spec Writer, Developer, Reviewer)
  - Artefactos producidos (specs, plan, tasks, code)
  - Puntos de control: Review, Code Review, UAT
  - Handoffs entre roles (ej. Spec Writer → Developer, Developer → Tester)
- Casos de estudio incluidos:
  - **Greenfield**: Proyecto nuevo desde cero, mostrando el flujo completo estándar
  - **Brownfield**: Proyecto con código legado existente, mostrando adaptaciones del flujo (ej. análisis de código existente en fase Specify, consideraciones de compatibilidad)

## Edge Cases
- Si una spec falla en revisión, debe mostrar:
  - Mensaje de error con razón del rechazo
  - Enlaces a documentación de cómo corregir la spec
  - Recomendaciones de roles para revisión
- Diferencias en brownfield:
  - Cómo manejar especificaciones de código existente que no cumple con SDD
  - Adaptación de artefactos de salida considerando deuda técnica

## Requirements
- El flujo debe incluir:
  - Duración estimada de cada fase (diferenciando greenfield vs brownfield)
  - Indicadores de progreso visual
  - Ejemplos de specs fallidas y cómo se corrigieron
  - Casos de estudio interactivos para greenfield y brownfield con recorrido paso a paso guiado
  - En cada fase del recorrido: visualización de artefactos, decisiones simuladas del usuario, y feedback inmediato
  - Comparativa visual entre ambos casos resaltando diferencias clave
  - Controles de navegación en el recorrido: anterior, siguiente, saltar a fase específica

---

## User Story 4.1 - Enhancement: Unificar Look & Feel con US5 (Priority: P1)

Como usuario, quiero que el recorrido interactivo (walkthrough) de la US4 tenga el mismo estilo visual y UX que la guía paso a paso de la US5, para tener una experiencia consistente al navegar entre ambas secciones.

**Why this priority**: La consistencia visual es crítica para la experiencia de usuario. Ambas secciones permiten navegar por las fases de SDD, por lo que el usuario espera un estilo unificado.

**Independent Test**: Puede ser probado comparando visualmente el walkthrough (US4) con la guía (US5) y verificando que comparten: header con selector de caso, progress bar con porcentaje, navegación por fases, y checklist por fase.

### Acceptance Scenarios

1. **Given** que el usuario accede al recorrido interactivo (US4), **When** visualiza el walkthrough, **Then** ve una interfaz con:
   - Header completo con título y selector de caso de estudio (Greenfield/Brownfield)
   - Progress bar con indicador de porcentaje
   - Navegación visual por fases (Specify → Clarify → Plan → Tasks → Implement)
   - Checklist por cada fase con checkboxes interactivos
   - Controles de navegación (Atrás/Siguiente) con estados claros

2. **Given** que el usuario está en la sección proceso (US4), **When** no ha completado las secciones previas (hero/phases/roles), **Then** ve un banner de prerrequisito indicando qué debe leer primero

3. **Given** que el usuario completa una fase en el walkthrough, **When** marca los items del checklist, **Then** el progreso se guarda en localStorage y se refleja en la barra de progreso

### Detalle adicional
- Elementos a unificar con US5:
  - Contenedor: white background, box-shadow, border-radius 8px
  - Phase navigation: pills horizontales con estados active/completed/hover
  - Progress bar: barra + texto de porcentaje (ej: "60% completado")
  - Checklist: checkbox con label, strikethrough al completar
  - Botones: disabled state, hover, focus visibles

### Edge Cases
- Si el usuario recarga la página a mitad del walkthrough → restaurar estado desde localStorage
- Si el usuario cambia de caso (Greenfield → Brownfield) → resetear progreso del walkthrough

### Requirements
- FR-U4-001: Walkthrough DEBE tener header con selector de caso de estudio
- FR-U4-002: Walkthrough DEBE mostrar progress bar con porcentaje texto
- FR-U4-003: Walkthrough DEBE tener navegación visual por fases (pills)
- FR-U4-004: Walkthrough DEBE incluir checklist por fase
- FR-U4-005: Walkthrough DEBE guardar progreso en localStorage
- FR-U4-006: Sección US4 DEBE tener banner de prerrequisito cuando aplica