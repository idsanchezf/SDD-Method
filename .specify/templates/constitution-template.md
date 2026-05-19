# [PROJECT_NAME] Constitution

## Core Principles

### I. Stack Tecnológico & Restricciones

Define tecnologías, lenguajes y frameworks permitidos o prohibidos en el proyecto.

**Purpose**: [Why this principle exists and what problem it solves]
<!-- Example: Elimina la fragmentación tecnológica, reduce la curva de aprendizaje y asegura que todo el equipo trabaje con las mismas herramientas. -->

**Applies to phases**: [Specify / Clarify / Plan / Tasks / Implement]

**Violation consequences**: [What happens if this principle is violated]
<!-- Example: Dependencias no aprobadas aumentan el bundle size, introducen breaking changes y crean deuda técnica. -->

**Compliance examples**: [Concrete examples of following this principle]
<!-- Example: Usar vanilla JS en lugar de frameworks, CSS nativo en lugar de preprocessors, GitHub Actions en lugar de CI/CD externo. -->

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

<!-- 
  Each phase of the SDD process has specific principles that apply.
  Use this section to verify compliance before advancing to the next phase.
  Mark each applicable principle as [x] when verified.
-->

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

<!-- Example: Technology stack requirements, compliance standards, deployment policies -->

| Layer | Technology | Constraint |
|-------|-----------|------------|
| [Layer 1] | [Technology] | [Constraint description] |
| [Layer 2] | [Technology] | [Constraint description] |

Third-party libraries MUST be approved via PR before inclusion.

## Development Workflow

<!-- Example: Code review requirements, testing gates, deployment approval process -->

[WORKFLOW_DESCRIPTION]

## Governance

<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

[GOVERNANCE_RULES]
<!-- Example: All PRs/reviews must verify compliance; Complexity must be justified; Use this constitution as the source of truth for development guidance. -->

**Amendment Process**: [How to propose and approve changes to this constitution]
<!-- Example: Propose changes via PR. Amendments require consensus (or majority if >3 collaborators). Approved amendments increment the version. -->

**Versioning Policy**: [How versions are incremented]
<!-- Example: Semantic versioning (MAJOR.MINOR.PATCH): MAJOR = principle removal, MINOR = new principle, PATCH = clarifications. -->

**Version**: [CONSTITUTION_VERSION] | **Ratified**: [RATIFICATION_DATE] | **Last Amended**: [LAST_AMENDED_DATE]
<!-- Example: Version: 1.0.0 | Ratified: 2026-05-05 | Last Amended: 2026-05-05 -->
