/**
 * ProcessDiagram Layout Coordinates for US4
 * SVG layout positions for nodes, edges, handoff arrows, and quality gates
 */

const diagramLayout = {
  // SVG canvas size
  width: 1200,
  height: 400,
  padding: 50,

  // Phase nodes (horizontal layout)
  nodes: [
    { phaseId: "specify", x: 100, y: 200, width: 140, height: 60 },
    { phaseId: "clarify", x: 320, y: 200, width: 140, height: 60 },
    { phaseId: "plan", x: 540, y: 200, width: 140, height: 60 },
    { phaseId: "tasks", x: 760, y: 200, width: 140, height: 60 },
    { phaseId: "implement", x: 980, y: 200, width: 140, height: 60 }
  ],

  // Edges between phases (phase connections)
  edges: [
    { fromNode: "specify", toNode: "clarify", label: "spec.md" },
    { fromNode: "clarify", toNode: "plan", label: "spec.md (clarified)" },
    { fromNode: "plan", toNode: "tasks", label: "plan.md" },
    { fromNode: "tasks", toNode: "implement", label: "tasks.md" }
  ],

  // Handoff arrows (curved arrows between roles)
  handoffArrows: [
    // Specify phase handoffs
    {
      id: "spec-writer-to-developer",
      fromPhase: "specify",
      toPhase: "clarify",
      path: "M 200 190 C 230 150, 270 150, 300 190",
      label: "spec.md → Developer"
    },
    {
      id: "ai-spec-to-human",
      fromPhase: "specify",
      toPhase: "specify",
      path: "M 140 230 C 160 270, 180 270, 200 230",
      label: "spec-draft.md → Spec Writer"
    },

    // Clarify phase handoffs
    {
      id: "developer-to-developer-clarify",
      fromPhase: "clarify",
      toPhase: "plan",
      path: "M 420 190 C 450 150, 490 150, 520 190",
      label: "spec.md (clarified) → Developer"
    },

    // Plan phase handoffs
    {
      id: "developer-to-developer-plan",
      fromPhase: "plan",
      toPhase: "tasks",
      path: "M 640 190 C 670 150, 710 150, 740 190",
      label: "plan.md → Developer"
    },

    // Tasks phase handoffs
    {
      id: "developer-to-developer-tasks",
      fromPhase: "tasks",
      toPhase: "implement",
      path: "M 860 190 C 890 150, 930 150, 960 190",
      label: "tasks.md → Developer"
    },
    {
      id: "ai-code-to-reviewer",
      fromPhase: "tasks",
      toPhase: "tasks",
      path: "M 800 230 C 820 270, 840 270, 860 230",
      label: "generated-code.js → Reviewer"
    },

    // Implement phase handoffs
    {
      id: "developer-to-product-owner",
      fromPhase: "implement",
      toPhase: "implement",
      path: "M 1060 190 C 1090 150, 1130 150, 1160 190",
      label: "Product → Product Owner"
    },
    {
      id: "ai-reviewer-to-developer",
      fromPhase: "implement",
      toPhase: "implement",
      path: "M 1000 230 C 1020 270, 1040 270, 1060 230",
      label: "review-report.md → Developer"
    }
  ],

  // Quality gates (diamond shapes at top)
  // IDs match quality-points.js entries for gate panel lookup
  gates: [
    { id: "spec-complete", phaseId: "specify", x: 150, y: 55, label: "Spec Review" },
    { id: "spec-testable", phaseId: "specify", x: 190, y: 80, label: "Testable" },
    { id: "spec-consistent", phaseId: "specify", x: 170, y: 110, label: "Consistency" },
    { id: "clarify-ambiguities-resolved", phaseId: "clarify", x: 370, y: 60, label: "Ambiguities" },
    { id: "clarify-scope-clear", phaseId: "clarify", x: 410, y: 90, label: "Scope Clear" },
    { id: "plan-tasks-identified", phaseId: "plan", x: 590, y: 55, label: "Tasks Identified" },
    { id: "plan-dependencies-mapped", phaseId: "plan", x: 630, y: 80, label: "Dependencies" },
    { id: "plan-estimates-realistic", phaseId: "plan", x: 610, y: 110, label: "Estimates" },
    { id: "tasks-code-quality", phaseId: "tasks", x: 810, y: 60, label: "Code Quality" },
    { id: "tasks-tested", phaseId: "tasks", x: 850, y: 90, label: "Tested" },
    { id: "implement-acceptance-tests-pass", phaseId: "implement", x: 1030, y: 55, label: "Acceptance Tests" },
    { id: "implement-code-review-done", phaseId: "implement", x: 1070, y: 80, label: "Code Review" },
    { id: "implement-docs-complete", phaseId: "implement", x: 1050, y: 110, label: "Docs Complete" }
  ],

  // Responsive breakpoints (mobile layout adjustments)
  responsive: {
    tablet: {
      width: 768,
      nodes: [
        { phaseId: "specify", x: 60, y: 200, width: 120, height: 50 },
        { phaseId: "clarify", x: 240, y: 200, width: 120, height: 50 },
        { phaseId: "plan", x: 420, y: 200, width: 120, height: 50 },
        { phaseId: "tasks", x: 600, y: 200, width: 120, height: 50 },
        { phaseId: "implement", x: 780, y: 200, width: 120, height: 50 }
      ]
    },
    mobile: {
      // Vertical stack for mobile
      verticalLayout: true,
      nodeSpacing: 100,
      startY: 100,
      gatesY: 30
    }
  }
};

// Export for use in process-diagram.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = diagramLayout;
}
