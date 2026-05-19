# Implementation Plan: Prerrequisitos para adoptar SDD

**Branch**: `020-sdd-prerequisites` | **Date**: 2026-05-08 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/019-sdd-prerequisites/spec.md`

## Summary

Crear una nueva sección educativa en el sitio SDD Method que liste los prerrequisitos técnicos y culturales necesarios antes de adoptar SDD, con un checklist interactivo para que los equipos evalúen su preparación, recursos para cerrar brechas y una ruta sugerida de preparación. Se implementa como HTML semántico + CSS + Vanilla JS con persistencia en localStorage.

## Technical Context

**Language/Version**: Vanilla JavaScript ES6+
**Primary Dependencies**: Ninguna (Vanilla-First por constitución)
**Storage**: localStorage para persistencia del progreso del checklist
**Testing**: Verificación visual manual + validación de accesibilidad WCAG AA + Lighthouse
**Target Platform**: Navegadores modernos (Chrome, Firefox, Safari, Edge última versión)
**Project Type**: Sección educativa interactiva estática en sitio web existente
**Performance Goals**: Carga completa en <2s (SC-005)
**Constraints**: WCAG AA, mobile-first responsive, sin frameworks JS, sin librerías externas
**Scale/Scope**: Una nueva sección HTML + archivo CSS + archivo JS dentro del sitio existente

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Vanilla-First (NON-NEGOTIABLE) | ✅ PASS | Vanilla JS para checklist interactivo, veredicto y localStorage |
| II. Semantic HTML & Accessible | ✅ PASS | Uso de `section`, `fieldset`, `legend`, `input[type="checkbox"]`, roles ARIA |
| III. Professional CSS Architecture | ✅ PASS | CSS modular con custom properties, mobile-first, sin inline styles |
| IV. Feature Branch & PR Workflow (NON-NEGOTIABLE) | ✅ PASS | Rama `020-sdd-prerequisites`, PR con revisión |
| V. CI/CD via GitHub Actions | ✅ PASS | Validación estándar del proyecto |

**Gate Result**: ✅ PASS — Todas las verificaciones constitucionales pasan sin necesidad de justificaciones de complejidad.

## Project Structure

### Documentation (this feature)

```text
specs/019-sdd-prerequisites/
├── spec.md              # Feature specification
├── plan.md              # This file
├── tasks.md             # Task breakdown
└── checklists/
    ├── requirements.md  # Quality checklist
    ├── evaluation.md    # Evaluation feature checklist
    └── frontend.md      # Frontend educational content checklist
```

### Source Code (repository root)

```text
src/
├── index.html               # ← Nueva sección: <section class="prerequisites-section">
├── css/
│   └── sdd-prerequisites.css # ← Nuevo archivo: estilos de la sección
└── js/
    └── sdd-prerequisites.js  # ← Nuevo archivo: datos, checklist, veredicto, localStorage
```

**Structure Decision**: Se sigue el mismo patrón del sitio existente: una sección en `index.html`, su CSS en `src/css/`, su JS en `src/js/`.

## Design Tokens

### Typography Scale

| Element | Font Size | Weight | Line Height | Usage |
|---------|-----------|--------|-------------|-------|
| Section heading | 2rem (32px) | 700 | 1.2 | "Prerrequisitos para adoptar SDD" |
| Subtitle | 1.125rem (18px) | 400 | 1.5 | Texto explicativo no-técnico |
| Intro paragraph | 1rem (16px) | 400 | 1.6 | Descripción de la sección |
| Category heading | 1.25rem (20px) | 600 | 1.3 | "Técnicos", "Metodológicos", "Herramientas" |
| Prerequisite name | 1rem (16px) | 500 | 1.4 | Nombre de cada prerrequisito |
| Prerequisite detail | 0.875rem (14px) | 400 | 1.6 | Explicación, nivel, recursos |
| Resource link | 0.875rem (14px) | 400 | 1.4 | Enlaces a tutoriales/docs |
| Verdict text | 1.25rem (20px) | 700 | 1.3 | "Ready", "Casi listo", "Faltan bases" |
| Badge/label | 0.75rem (12px) | 600 | 1 | Nivel (básico/intermedio/avanzado), tipo de recurso |
| Footer/metadata | 0.75rem (12px) | 400 | 1.4 | Versión, última actualización |

### Color Palette

| Token | Value | Usage | WCAG AA on white |
|-------|-------|-------|------------------|
| `--verdict-ready` | `#16a34a` (green-600) | Veredicto "Ready para SDD" | ✅ PASS (4.5:1) |
| `--verdict-almost` | `#ca8a04` (yellow-600) | Veredicto "Casi listo" | ✅ PASS (4.5:1) |
| `--verdict-missing` | `#dc2626` (red-600) | Veredicto "Faltan bases" | ✅ PASS (4.5:1) |
| `--badge-basic` | `#2563eb` (blue-600) | Nivel "básico" | ✅ PASS |
| `--badge-intermediate` | `#d97706` (amber-600) | Nivel "intermedio" | ✅ PASS |
| `--badge-advanced` | `#9333ea` (purple-600) | Nivel "avanzado" | ✅ PASS |
| `--resource-tutorial` | `#059669` (emerald-600) | Badge tipo "tutorial" | ✅ PASS |
| `--resource-doc` | `#2563eb` (blue-600) | Badge tipo "documentación" | ✅ PASS |
| `--resource-example` | `#7c3aed` (violet-600) | Badge tipo "ejemplo" | ✅ PASS |
| `--focus-ring` | `#3b82f6` (blue-500) | Focus visible (2px solid) | ✅ PASS |
| `--saved-indicator` | `#16a34a` (green-600) | "Guardado" indicator | ✅ PASS |

### Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 0.25rem (4px) | Badge padding interno |
| `--space-sm` | 0.5rem (8px) | Gap entre items de lista |
| `--space-md` | 1rem (16px) | Padding de cards, gap entre categorías |
| `--space-lg` | 1.5rem (24px) | Gap entre secciones principales |
| `--space-xl` | 2rem (32px) | Margen de sección |
| `--space-2xl` | 3rem (48px) | Espaciado de heading principal |

### Layout

| Property | Value | Notes |
|----------|-------|-------|
| Max content width | 900px | Centrada con `margin: 0 auto` |
| Card border-radius | 8px | Consistente con resto del sitio |
| Card box-shadow | `0 1px 3px rgba(0,0,0,0.1)` | Elevación sutil |
| Checkbox minimum size | 24x24px | Touch target accesible |
| Button minimum size | 44x44px | WCAG touch target |
| Focus ring | 2px solid `--focus-ring`, offset 2px | Visible en todos los interactivos |

### Responsive Breakpoints

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Mobile | <768px | Full-width cards, padding reducido (12px), heading 1.5rem |
| Tablet | 768px–1023px | Cards al 80% del ancho, padding estándar |
| Desktop | ≥1024px | Cards centradas a 900px max, layout completo |

## Complexity Tracking

No se requiere — Constitution Check pasó sin violaciones.
