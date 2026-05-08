# Research: Flujo de Colaboración Humano-IA

## Overview

Esta sección documenta las decisiones de diseño para la sección "Flujo de Colaboración Humano-IA" (US7). No se identificaron NEEDS CLARIFICATION en el spec; la investigación se centra en definir el mapeo de colaboración por fase y la arquitectura del componente.

## Collaboration Mapping

Basado en los roles existentes de US3 y el flujo E2E de US4, se define la siguiente matriz de colaboración:

### Specify
- **Rol humano**: Spec Writer (escribe la spec funcional)
- **Rol IA**: AI Spec Assistant (genera draft, sugiere criterios de aceptación)
- **Artefacto**: spec.md
- **Supervisión**: Revisar que criterios de aceptación reflejen necesidades reales

### Clarify
- **Rol humano**: Spec Writer + Reviewer (resuelven ambigüedades)
- **Rol IA**: AI Spec Assistant (identifica ambigüedades, propone preguntas)
- **Artefacto**: spec.md (clarified)
- **Supervisión**: Validar que cada respuesta aclaratoria tenga sentido de negocio

### Plan
- **Rol humano**: Developer (diseña arquitectura)
- **Rol IA**: AI Code Generator (sugiere estructura, patrones)
- **Artefacto**: plan.md, data-model.md, contracts/
- **Supervisión**: Verificar que el plan cumpla con la constitución antes de continuar

### Tasks
- **Rol humano**: Developer (descompone el plan)
- **Rol IA**: AI Code Generator (genera lista de tareas)
- **Artefacto**: tasks.md
- **Supervisión**: Revisar granularidad y completitud de tareas

### Implement
- **Rol humano**: Developer (implementa, prueba, hace commit)
- **Rol IA**: AI Code Generator + AI Reviewer (genera código, revisa calidad)
- **Artefacto**: Código funcional, tests pasando
- **Supervisión**: Verificar cada tarea contra criterios de aceptación de la spec

## Prompt Library Structure

Cada prompt tendrá:
- **Nombre**: Identificador corto (ej. "generar-spec-draft")
- **Fase**: Fase SDD destino
- **Rol IA**: Rol de IA al que va dirigido
- **Prompt**: Texto completo con placeholders ({{variable}})
- **Ejemplo salida**: Fragmento de lo que la IA debería producir

## Architecture Decision

- **Layout**: Diagrama horizontal con las 5 fases (mismo patrón que flow-diagram existente pero con cards expandibles en lugar de SVG)
- **Panel lateral**: Al seleccionar una fase, se muestra un panel con tabs: "Colaboración", "Prompts", "Supervisión"
- **Persistencia**: localStorage con clave `sdd-collab-progress`
- **Datos**: Hardcodeados en JS (mismo patrón que data/roles-integration.js)

## Alternatives Considered

| Alternativa | Razón para no elegirla |
|-------------|------------------------|
| SVG diagram like flow-diagram | Menos flexible para contenido dinámico; cards con HTML permiten mejor accesibilidad |
| Datos desde JSON externo | Sin build steps ni bundler; hardcodeado en JS es el patrón del proyecto |
| 3 views separadas en lugar de tabs | Sobrecarga de navegación; tabs mantienen contexto visual de la fase activa |

## Decisiones

- **Decision**: Layout de diagrama horizontal con cards expandibles
- **Rationale**: Consistente con el estilo visual existente, mejor accesibilidad que SVG
- **Decision**: Datos de colaboración hardcodeados en JS
- **Rationale**: Mismo patrón que el resto del proyecto (sin build steps)
- **Decision**: Tabs para alternar entre Colaboración/Prompts/Supervisión
- **Rationale**: Mantiene el contexto de fase activa sin recargar la página
