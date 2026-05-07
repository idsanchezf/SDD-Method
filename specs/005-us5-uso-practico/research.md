# Research: Uso Práctico de SDD

## Decision: Download Implementation (Plantillas)

**Rationale**: For a static site (no backend), the best practice is to use the `Blob` API and `URL.createObjectURL()` for .md files, and JSZip library or manual .zip creation for multiple files.

**Alternatives considered**:
- Server-side download (requires backend, violates Constitution Principle I - Vanilla JS only)
- Individual file downloads (poor UX, user must download 3+ files separately)
- Single .md download only (doesn't meet FR-004 which requires .zip option)

**Decision**: Implement both options:
1. Individual .md downloads using `Blob` + `createObjectURL()`
2. .zip download using JSZip (third-party library requires PR approval per Constitution)

**Research sources**:
- MDN Web Docs: Blob, URL.createObjectURL()
- JSZip documentation (for .zip creation)
- WCAG AA: Download links must have clear purpose

---

## Decision: LocalStorage for Guide Progress

**Rationale**: localStorage is natively supported in all modern browsers, requires no frameworks, and persists across sessions.

**Alternatives considered**:
- sessionStorage (cleared when tab closes - bad UX)
- Cookies (complex syntax, small storage)
- IndexedDB (overkill for simple progress tracking)

**Decision**: Use localStorage with key `sdd-guide-progress` storing JSON:
```json
{
  "currentPhase": "specify",
  "completedPhases": ["specify"],
  "lastVisit": "2026-05-06T14:30:00"
}
```

**Research sources**:
- MDN: localStorage API
- Web Storage API best practices
- WCAG: No auto-refresh on storage change (user control)

---

## Decision: WCAG AA Compliance for Interactive Guide

**Rationale**: US2 and US4 already implement WCAG AA. US5 must follow Constitution Principle II.

**Key requirements for interactive guide**:
1. **Keyboard navigation**: All buttons and interactive elements must be focusable (tabindex, Enter/Space activation)
2. **Screen reader**: Use ARIA labels for dynamic content (`aria-live`, `aria-atomic`)
3. **Color contrast**: Minimum 4.5:1 ratio (use CSS custom properties from US2)
4. **Focus indicators**: Visible outline on all interactive elements
5. **Responsive**: Work on mobile (US2 uses mobile-first approach)

**Decision**: Follow US2/US4 patterns:
- Use semantic HTML (`<button>`, `<nav>`, `<section>`)
- Add ARIA attributes: `aria-label`, `aria-live="polite"`, `role="application"`
- CSS: `@media (prefers-reduced-motion: reduce)` for animations
- Test with keyboard-only navigation

**Research sources**:
- WCAG 2.1 AA guidelines
- US2/US4 accessibility implementations
- ARIA authoring practices

---

## Constitution Check

✅ Principle I: Vanilla JS only (Blob API, localStorage - native)
✅ Principle II: Semantic HTML + accessible (follows US2/US4)
✅ Principle III: Professional CSS (use existing custom properties)
✅ Principle IV: Feature branch workflow (005-us5-uso-practico)
✅ Principle V: CI/CD via GitHub Actions (existing)

---

## Entity Data Model (from spec)

### Guía Interactiva
- **Attributes**: currentPhase (string), progress (0-100), checklists (array of phase objects)
- **State transitions**: specify → clarify → plan → tasks → implement → complete
- **Storage**: localStorage (`sdd-guide-progress`)

### Ejemplo Práctico
- **Attributes**: type (Greenfield|Brownfield), description (string), artifacts (array of {name, content})
- **Source**: Uses US4 `case-studies.js` data
- **Interaction**: Click to view, click artifact to download

### Plantilla
- **Attributes**: type (spec|plan|tasks), content (markdown string), version (string)
- **Download formats**: .md (individual), .zip (all three)
- **Implementation**: Blob API + JSZip (if approved)

---

## Contracts

### User → Guide Interaction
- **Input**: Click "Comenzar Guía" button
- **Output**: Guide UI renders with Phase 1 (Specify) active
- **State change**: localStorage updated with `currentPhase: "specify"`

### User → Example Selection
- **Input**: Click "Ver Ejemplo Greenfield" or "Ver Ejemplo Brownfield"
- **Output**: Example view renders with phase data from `case-studies.js`
- **State change**: None (read-only view)

### User → Template Download
- **Input**: Click "Descargar Plantillas SDD"
- **Output**: Browser downloads .zip file (or multiple .md files)
- **State change**: None (download only)

---

## Quickstart for Developers

To implement US5:

1. **Copy US4 structure**: Use `process-diagram.js` and `walkthrough.js` as reference
2. **Create new files**:
   - `js/guide.js` - Interactive guide logic
   - `js/download-manager.js` - Template download functionality
   - `css/guide.css` - Styles for interactive guide
3. **Reuse existing data**: Import `caseStudies` from `js/data/case-studies.js`
4. **Follow accessibility**: Copy ARIA patterns from `process-diagram.js`
5. **Test with**: Keyboard-only navigation, screen reader, mobile viewport

---

**Research completed**: 2026-05-06
**Researcher**: AI Assistant
**Artifacts generated**: 
- `research.md` (this file)
- `data-model.md` (entity definitions)
- `quickstart.md` (developer guide)
