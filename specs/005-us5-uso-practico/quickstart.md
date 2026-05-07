# Quickstart: US5 Uso Práctico de SDD

## Overview

US5 adds an interactive step-by-step guide for applying SDD methodology, practical examples (Greenfield/Brownfield), and downloadable templates.

## Developer Quickstart

### 1. Prerequisites

- Vanilla JS only (Constitution Principle I)
- Static site (no backend)
- Reuse US4 data: `js/data/case-studies.js`

### 2. Files to Create

```
src/
├── js/
│   ├── guide.js           # Interactive guide logic
│   └── download-manager.js # Template download (Blob/JSZip)
└── css/
    └── guide.css          # Guide styles (reuse US2/US4 variables)
```

### 3. Key Implementation Details

#### Interactive Guide (`guide.js`)
- **Phases**: Specify → Clarify → Plan → Tasks → Implement
- **Storage**: localStorage (`sdd-guide-progress`)
- **State**: `{ currentPhase: "specify", completedPhases: [...], lastVisit: "..." }`
- **Accessibility**: Keyboard nav, ARIA labels, `aria-live="polite"`

#### Download Manager (`download-manager.js`)
- **Individual .md**: Use `Blob` + `URL.createObjectURL()`
- **Combined .zip**: Use JSZip (requires PR approval per Constitution)
- **Templates**: 
  - `spec-template.md` (from US2 spec-template.md)
  - `plan-template.md` (from US4 plan.md structure)
  - `tasks-template.md` (from US4 tasks.md structure)

#### Practical Examples
- **Reuse**: Import `caseStudies` from `js/data/case-studies.js` (US4)
- **Types**: "Greenfield" and "Brownfield" (use original technical terms)
- **Render**: Show phase data (situation, artifactExample, decisions)

### 4. CSS Architecture

Follow US2/US4 patterns:
```css
/* Reuse existing custom properties */
:root {
  --color-primary: #...;  /* From US2 variables.css */
  --color-success: #...; /* From US4 process.css */
}

/* New guide-specific styles */
.guide-container { /* ... */ }
.guide-phase { /* ... */ }
.checklist-item { /* ... */ }
```

### 5. Accessibility Checklist (WCAG AA)

✅ **Principle II**: Semantic HTML + Accessible by Default
- [ ] All buttons: `<button>` (not `<div onclick>`)
- [ ] Keyboard: Tab, Enter, Space activation
- [ ] ARIA: `aria-label`, `aria-live="polite"`, `role="application"`
- [ ] Focus: Visible outline on all interactive elements
- [ ] Color contrast: 4.5:1 minimum (use US2 custom properties)
- [ ] Responsive: Mobile-first (@media queries from US2)

### 6. Testing

#### Manual Testing
- [ ] Guide navigation: Next/Back buttons work
- [ ] Progress saving: Reload page, progress restored
- [ ] Download: .md files download correctly
- [ ] Download: .zip downloads with all 3 templates
- [ ] Keyboard only: Tab through entire guide
- [ ] Screen reader: Announces phase changes
- [ ] Offline: Shows "Connect to internet" message

#### Automated Testing (GitHub Actions)
- [ ] `npm run lint` passes (ESLint)
- [ ] `npm run validate-html` passes
- [ ] No console errors in production build

### 7. Constitution Compliance

| Principle | Check | Status |
|-----------|-------|--------|
| I. Vanilla JS | No frameworks (React/Vue/etc.) | ✅ |
| II. Semantic HTML | `<button>`, ARIA labels, keyboard access | ⚠️ Test |
| III. CSS Architecture | Custom properties, mobile-first | ✅ Reuse US2/US4 |
| IV. Feature Branch | Branch `005-us5-uso-practico` | ✅ |
| V. CI/CD | GitHub Actions validates | ✅ |

### 8. Integration with US4

- **Data**: Import `caseStudies` from `js/data/case-studies.js`
- **Diagram**: Reference US4 `process-diagram.js` for visual guide
- **Walkthrough**: Differentiate from US4 (US5 is educational guide, US4 is interactive demo)

---

## User-Facing Quickstart (for the actual website)

### How to Use the Interactive Guide

1. **Start**: Click "Comenzar Guía" on the US5 section
2. **Follow**: Complete each phase (Specify → Clarify → Plan → Tasks → Implement)
3. **Track**: Checklists auto-check as you progress
4. **Finish**: Receive "¡Metodología Completada!" summary

### How to Use Examples

1. **Select**: Choose "Ver Ejemplo Greenfield" or "Ver Ejemplo Brownfield"
2. **Explore**: View each phase applied in real projects
3. **Download**: Click "Ver artefactos generados" to get spec.md, plan.md, tasks.md

### How to Use Templates

1. **Download**: Click "Descargar Plantillas SDD"
2. **Choose**: Individual .md files or combined .zip
3. **Apply**: Use templates with the interactive guide to create your own SDD docs

---

**Created**: 2026-05-06
**Version**: 1.0.0
**Feature**: US5 - Uso Práctico de SDD
