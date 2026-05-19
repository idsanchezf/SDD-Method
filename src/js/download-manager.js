/**
 * DownloadManager Class - Template downloads
 * Vanilla JS (ES6+) - Constitution Principle I
 */

class DownloadManager {
  constructor() {
    this.zipAvailable = typeof window.JSZip !== 'undefined';
  }

  downloadIndividualTemplate(type) {
    const content = this.getTemplateContent(type);
    if (!content) {
      console.error(`Template ${type} not found`);
      return;
    }

    try {
      const blob = new Blob([content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}-template.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Download failed:', e);
    }
  }

  downloadAllAsZip() {
    if (!this.zipAvailable) {
      alert('JSZip library not loaded. Downloading individual files instead.');
      this.downloadIndividualTemplate('spec');
      this.downloadIndividualTemplate('plan');
      this.downloadIndividualTemplate('tasks');
      this.downloadIndividualTemplate('checklist');
      this.downloadIndividualTemplate('constitution');
      return;
    }

    try {
      const zip = new JSZip();
      const templates = ['spec', 'plan', 'tasks', 'checklist', 'constitution'];
      
      templates.forEach(type => {
        const content = this.getTemplateContent(type);
        if (content) {
          zip.file(`${type}-template.md`, content);
        }
      });

      zip.generateAsync({ type: 'blob' }).then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sdd-templates.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    } catch (e) {
      console.error('ZIP creation failed:', e);
    }
  }

  getTemplateContent(type) {
    const templates = {
      'spec': `# Feature Specification: [FEATURE NAME]

**Feature Branch**: \`[###-feature-name]\`  
**Created**: [DATE]  
**Status**: Draft  
**Input**: User description: "$ARGUMENTS"

## User Scenarios & Testing *(mandatory)*

### User Story1 - [Brief Title] (Priority: P1)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story2 - [Brief Title] (Priority: P2)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST [specific capability]
- **FR-002**: Users MUST be able to [key interaction]

### Key Entities *(include if feature involves data)*

- **[Entity 1]**: [What it represents, key attributes without implementation]
- **[Entity 2]**: [What it represents, relationships to other entities]

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: [Measurable metric, e.g., "Users can complete account creation in under 2 minutes"]
- **SC-002**: [Measurable metric, e.g., "System handles 1000 concurrent users without degradation"]

## Assumptions

- [Assumption about target users, e.g., "Users have stable internet connectivity"]
- [Assumption about scope boundaries, e.g., "Mobile support is out of scope for v1"]
`,
      'plan': `# Implementation Plan: [FEATURE NAME]

## Summary
[Brief description of approach]

## Architecture

[Describe high-level architecture, data models, contracts]

## Tasks

- [ ] T001: [Task description]
- [ ] T002: [Task description] (depends on T001)

## Dependencies

- [List any dependencies on other features or systems]
`,
      'tasks': `# Tasks: [FEATURE NAME]

## Phase 1: Research & Design
- [ ] T001: [Research task]

## Phase 2: Implementation
- [ ] T002: [Implementation task] (depends on T001)

## Testing
- [ ] T003: [Test task]
`,
      'checklist': `# [CHECKLIST TYPE] Checklist: [FEATURE NAME]

**Purpose**: [Brief description of what this checklist covers]
**Created**: [DATE]
**Feature**: [Link to spec.md or relevant documentation]

## [Category 1]

- [ ] CHK001 First checklist item with clear action
- [ ] CHK002 Second checklist item
- [ ] CHK003 Third checklist item

## [Category 2]

- [ ] CHK004 Another category item
- [ ] CHK005 Item with specific criteria
- [ ] CHK006 Final item in this category

## Notes

- Check items off as completed: \`[x]\`
- Add comments or findings inline
- Link to relevant resources or documentation
- Items are numbered sequentially for easy reference
`,
      'constitution': `# [PROJECT_NAME] Constitution

## Core Principles

### I. Stack Tecnológico & Restricciones

Define tecnologías, lenguajes y frameworks permitidos o prohibidos en el proyecto.

**Purpose**: [Why this principle exists and what problem it solves]

**Applies to phases**: [Specify / Clarify / Plan / Tasks / Implement]

**Violation consequences**: [What happens if this principle is violated]

**Compliance examples**: [Concrete examples of following this principle]

---

### II. Arquitectura & Diseño

Patrones arquitectónicos, organización de código y convenciones de diseño.

**Purpose**: [Why this principle exists]

**Applies to phases**: [Specify / Clarify / Plan / Tasks / Implement]

**Violation consequences**: [What happens if violated]

**Compliance examples**: [Concrete examples of compliance]

---

### III. Workflow & Gobernanza

Flujo de trabajo, branching strategy, revisión y aprobación de cambios.

**Purpose**: [Why this principle exists]

**Applies to phases**: [Specify / Clarify / Plan / Tasks / Implement]

**Violation consequences**: [What happens if violated]

**Compliance examples**: [Concrete examples of compliance]

---

### IV. Estándares de Calidad

Testing, linting, accesibilidad, rendimiento y seguridad como parte del proceso.

**Purpose**: [Why this principle exists]

**Applies to phases**: [Specify / Clarify / Plan / Tasks / Implement]

**Violation consequences**: [What happens if violated]

**Compliance examples**: [Concrete examples of compliance]

---

### V. Documentación & Comunicación

Especificaciones, documentación técnica y canales de comunicación del equipo.

**Purpose**: [Why this principle exists]

**Applies to phases**: [Specify / Clarify / Plan / Tasks / Implement]

**Violation consequences**: [What happens if violated]

**Compliance examples**: [Concrete examples of compliance]

---

## Constitution Checker

### Specify Phase

- [ ] Principle I: Stack Tecnológico — [Brief verification criterion]
- [ ] Principle II: Arquitectura & Diseño — [Brief verification criterion]
- [ ] Principle V: Documentación & Comunicación — [Brief verification criterion]

**Verdict**: [ ] PASS / [ ] FAIL

---

### Clarify Phase

- [ ] Principle I: Stack Tecnológico — [Brief verification criterion]
- [ ] Principle V: Documentación & Comunicación — [Brief verification criterion]

**Verdict**: [ ] PASS / [ ] FAIL

---

### Plan Phase

- [ ] Principle I: Stack Tecnológico — [Brief verification criterion]
- [ ] Principle II: Arquitectura & Diseño — [Brief verification criterion]
- [ ] Principle III: Workflow & Gobernanza — [Brief verification criterion]
- [ ] Principle V: Documentación & Comunicación — [Brief verification criterion]

**Verdict**: [ ] PASS / [ ] FAIL

---

### Tasks Phase

- [ ] Principle III: Workflow & Gobernanza — [Brief verification criterion]
- [ ] Principle IV: Estándares de Calidad — [Brief verification criterion]
- [ ] Principle V: Documentación & Comunicación — [Brief verification criterion]

**Verdict**: [ ] PASS / [ ] FAIL

---

### Implement Phase

- [ ] Principle I: Stack Tecnológico — [Brief verification criterion]
- [ ] Principle II: Arquitectura & Diseño — [Brief verification criterion]
- [ ] Principle III: Workflow & Gobernanza — [Brief verification criterion]
- [ ] Principle IV: Estándares de Calidad — [Brief verification criterion]
- [ ] Principle V: Documentación & Comunicación — [Brief verification criterion]

**Verdict**: [ ] PASS / [ ] FAIL

---

## Technology Stack Constraints

| Layer | Technology | Constraint |
|-------|-----------|------------|
| [Layer 1] | [Technology] | [Constraint description] |

Third-party libraries MUST be approved via PR before inclusion.

## Development Workflow

[WORKFLOW_DESCRIPTION]

## Governance

[GOVERNANCE_RULES]

**Amendment Process**: [How to propose and approve changes]

**Versioning Policy**: [How versions are incremented]

**Version**: [CONSTITUTION_VERSION] | **Ratified**: [RATIFICATION_DATE] | **Last Amended**: [LAST_AMENDED_DATE]
`
    };

    return templates[type] || null;
  }
}

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('download-templates')) {
    window.downloadManager = new DownloadManager();
    
    const downloadBtn = document.getElementById('download-templates');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        if (confirm('Download all 5 templates as .zip? (Requires JSZip library)\n\nClick "Cancel" for individual .md files.')) {
          window.downloadManager.downloadAllAsZip();
        } else {
          window.downloadManager.downloadIndividualTemplate('spec');
          window.downloadManager.downloadIndividualTemplate('plan');
          window.downloadManager.downloadIndividualTemplate('tasks');
          window.downloadManager.downloadIndividualTemplate('checklist');
          window.downloadManager.downloadIndividualTemplate('constitution');
        }
      });
    }
  }
});
