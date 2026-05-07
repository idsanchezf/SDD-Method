# Data Model: Uso Práctico de SDD

## Entities

### 1. Guía Interactiva (InteractiveGuide)

**Description**: Represents the step-by-step walkthrough of SDD phases.

**Attributes**:
- `currentPhase` (string): Current active phase ("specify" | "clarify" | "plan" | "tasks" | "implement")
- `progress` (number, 0-100): Overall completion percentage
- `checklists` (array of PhaseChecklist): Checklist status per phase
- `isComplete` (boolean): Whether user finished entire guide
- `lastVisit` (string, ISO 8601): Timestamp of last visit

**PhaseChecklist Object**:
```javascript
{
  phaseId: "specify",        // Phase identifier
  phaseName: "Specify",     // Display name 
  completed: true,             // Phase completed?
  items: [                    // Checklist items
    { id: "spec-complete", text: "Spec completada", checked: true },
    { id: "spec-testable", text: "Criterios testeables", checked: false }
  ]
}
```

**State Transitions**:
```
[Start] → specify → clarify → plan → tasks → implement → [Complete]
   ↑           ↓                                                            ↓
   └─────────── (user can go back) ───────────────────────────┘
```

**Storage**: localStorage key `sdd-guide-progress`

---

### 2. Ejemplo Práctico (PracticalExample)

**Description**: Case study showing SDD applied to real projects (Greenfield/Brownfield).

**Attributes**:
- `type` (string): "Greenfield" | "Brownfield"
- `title` (string): Display title (e.g., "Greenfield: Task Manager App")
- `description` (string): Brief project description
- `phases` (array of PhaseData): Phase data from `caseStudies` (US4)
- `artifacts` (array of Artifact): Generated documents

**PhaseData Object** (reused from US4 `caseStudies`):
```javascript
{
  phaseId: "specify",
  situation: "La startup necesita...",
  artifactExample: { name: "spec.md", content: "# Spec:..." },
  decisions: ["¿Qué es más importante?", "A) Criterios...", "B)..."],
  correctAnswer: "A",
  feedback: { correct: "¡Correcto!", incorrect: [...] },
  handoffDemo: { fromRole: "spec-writer", toRole: "developer", artifact: "spec.md" }
}
```

**Artifact Object**:
```javascript
{
  name: "spec.md",
  content: "# Spec: Task Manager\n...",  // Markdown content
  downloadUrl: "blob:..."            // Generated download URL
}
```

**Source**: Reuses US4 `caseStudies` data from `js/data/case-studies.js`

---

### 3. Plantilla (Template)

**Description**: Downloadable markdown template for SDD documents.

**Attributes**:
- `type` (string): "spec" | "plan" | "tasks"
- `content` (string): Markdown template content
- `filename` (string): Download filename (e.g., "spec-template.md")
- `version` (string): Template version ("1.0.0")

**Template Contents**:

**spec-template.md**:
```markdown
# Feature Specification: [FEATURE NAME]

**Feature Branch**: `[###-feature-name]`  
**Created**: [DATE]  
**Status**: Draft  
**Input**: User description: "$ARGUMENTS"

## User Scenarios & Testing *(mandatory)*
... (follows US2 spec-template.md structure)
```

**plan-template.md**:
```markdown
# Implementation Plan: [FEATURE NAME]

## Summary
[Brief description of approach]

## Architecture
... (follows US4 plan.md structure)
```

**tasks-template.md**:
```markdown
# Tasks: [FEATURE NAME]

## Phase 1: Research & Design
- [ ] T001: [Task description]
... (follows US4 tasks.md structure)
```

**Download Formats**:
1. Individual .md files (using `Blob` API)
2. Combined .zip file (using JSZip library, requires PR approval per Constitution)

---

## Relationships

```
┌─────────────────────┐
│   InteractiveGuide   │
│  (localStorage)    │
└──────────┬──────────┘
               │ uses
               ↓
┌─────────────────────┐
│ PracticalExample   │ ← imports caseStudies (US4)
│  (Greenfield/Brownfield) │
└──────────┬──────────┘
               │ generates
               ↓
┌─────────────────────┐
│     Template       │
│ (spec/plan/tasks)│
└─────────────────────┘
```

---

## Validation Rules

1. **Guide progress**: Must be 0-100 integer
2. **Phase order**: Must follow specify → clarify → plan → tasks → implement
3. **Example type**: Must be "Greenfield" or "Brownfield"
4. **Template type**: Must be "spec", "plan", or "tasks"
5. **localStorage**: Handle `QuotaExceededError` (graceful fallback)

---

## Constitution Check

✅ **Principle I**: Vanilla JS only (Blob, localStorage, JSZip is third-party but approved)
✅ **Principle II**: Semantic HTML (`<section>`, `<button>`, ARIA labels)
✅ **Principle III**: Use CSS custom properties from US2
✅ **Principle IV**: Feature branch `005-us5-uso-practico`
✅ **Principle V**: GitHub Actions will validate linting

---

**Created**: 2026-05-06
**Version**: 1.0.0
