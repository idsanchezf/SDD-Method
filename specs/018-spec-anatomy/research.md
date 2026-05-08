# Research: Anatomía y escritura de Specs SDD

**Phase**: Phase 0 — Outline & Research
**Date**: 2026-05-08

## Summary

No unresolved [NEEDS CLARIFICATION] markers existed in the spec. All technical decisions have reasonable defaults based on the project constitution and existing site architecture.

## Decisions

| Decision | Rationale | Alternatives Considered |
|----------|-----------|------------------------|
| Same card-style layout as other sections | Consistencia visual con el resto del sitio (max-width: 900px, bg-white, border-radius, box-shadow) | Layout full-width (descartado: rompe consistencia) |
| `details`/`summary` para expandir secciones de anatomía | Nativo HTML5, accesible sin JS, degradación graceful | Custom accordion con JS (descartado: HTML nativo es más robusto y accesible) |
| Vista side-by-side con CSS Grid | Responsive sin JS, colapsa a vertical en mobile | Flexbox (descartado: Grid maneja mejor el layout de 2 columnas iguales) |
| Datos de anatomía y ejemplos en JS (array de objetos) | Los datos de las secciones del spec, técnicas de edge cases y ejemplos son contenido estructurado, no markup HTML | HTML hardcoded (descartado: menos mantenible y más verboso) |
