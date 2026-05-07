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