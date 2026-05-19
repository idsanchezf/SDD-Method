# [PROJECT_NAME] Constitution
<!-- Example: SDD Method Constitution, Team Constitution, etc. -->

## Core Principles

### I. [PRINCIPLE_1_NAME] (NON-NEGOTIABLE)
<!-- Example: I. Vanilla-First (NON-NEGOTIABLE) -->

[PRINCIPLE_1_DESCRIPTION]
<!-- Example: No JavaScript frameworks (React, Vue, Angular) are permitted. All interactivity MUST be implemented with vanilla JavaScript (ES6+). DOM manipulation uses native APIs: querySelector, addEventListener, fetch, IntersectionObserver, etc. -->

**Purpose**: [Why this principle exists and what problem it solves]
<!-- Example: Eliminates build-step complexity, reduces bundle size, ensures long-term maintainability, and lowers the barrier for contributors. -->

**Applies to phases**: [Specify / Clarify / Plan / Tasks / Implement — list which SDD phases this principle affects]
<!-- Example: All phases (Vanilla-First is a foundational constraint) -->

**Violation consequences**: [What happens if this principle is violated]
<!-- Example: Framework dependencies increase bundle size, introduce breaking changes, and create a learning barrier for new contributors. -->

**Compliance examples**: [Concrete examples of following this principle]
<!-- Example: Using querySelector instead of jQuery, native fetch instead of axios, IntersectionObserver instead of scroll libraries. -->

---

### II. [PRINCIPLE_2_NAME]
<!-- Example: II. Semantic HTML & Accessible by Default -->

[PRINCIPLE_2_DESCRIPTION]
<!-- Example: All markup MUST use semantic HTML5 elements (header, nav, main, section, article, aside, footer). ARIA attributes are added only when native semantics are insufficient. Every interactive element MUST be keyboard-accessible and screen-reader compatible. -->

**Purpose**: [Why this principle exists]

**Applies to phases**: [Specify / Clarify / Plan / Tasks / Implement]

**Violation consequences**: [What happens if violated]

**Compliance examples**: [Concrete examples of compliance]

---

### III. [PRINCIPLE_3_NAME]
<!-- Example: III. Professional CSS Architecture -->

[PRINCIPLE_3_DESCRIPTION]

**Purpose**: [Why this principle exists]

**Applies to phases**: [Specify / Clarify / Plan / Tasks / Implement]

**Violation consequences**: [What happens if violated]

**Compliance examples**: [Concrete examples of compliance]

---

### IV. [PRINCIPLE_4_NAME] (NON-NEGOTIABLE)
<!-- Example: IV. Feature Branch & PR Workflow (NON-NEGOTIABLE) -->

[PRINCIPLE_4_DESCRIPTION]

**Purpose**: [Why this principle exists]

**Applies to phases**: [Specify / Clarify / Plan / Tasks / Implement]

**Violation consequences**: [What happens if violated]

**Compliance examples**: [Concrete examples of compliance]

---

### V. [PRINCIPLE_5_NAME]
<!-- Example: V. CI/CD via GitHub Actions -->

[PRINCIPLE_5_DESCRIPTION]

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

- [ ] Principle I: [Name] — [Brief verification criterion]
- [ ] Principle II: [Name] — [Brief verification criterion]
- [ ] Principle III: [Name] — [Brief verification criterion]

**Verdict**: [ ] PASS / [ ] FAIL

---

### Clarify Phase

- [ ] Principle I: [Name] — [Brief verification criterion]
- [ ] Principle II: [Name] — [Brief verification criterion]

**Verdict**: [ ] PASS / [ ] FAIL

---

### Plan Phase

- [ ] Principle I: [Name] — [Brief verification criterion]
- [ ] Principle II: [Name] — [Brief verification criterion]
- [ ] Principle III: [Name] — [Brief verification criterion]
- [ ] Principle IV: [Name] — [Brief verification criterion]

**Verdict**: [ ] PASS / [ ] FAIL

---

### Tasks Phase

- [ ] Principle I: [Name] — [Brief verification criterion]
- [ ] Principle IV: [Name] — [Brief verification criterion]
- [ ] Principle V: [Name] — [Brief verification criterion]

**Verdict**: [ ] PASS / [ ] FAIL

---

### Implement Phase

- [ ] Principle I: [Name] — [Brief verification criterion]
- [ ] Principle II: [Name] — [Brief verification criterion]
- [ ] Principle III: [Name] — [Brief verification criterion]
- [ ] Principle IV: [Name] — [Brief verification criterion]
- [ ] Principle V: [Name] — [Brief verification criterion]

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
