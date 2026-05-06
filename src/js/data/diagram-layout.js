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
  gates: [
    { id: "spec-review", phaseId: "specify", x: 170, y: 80, label: "Review" },
    { id: "clarify-review", phaseId: "clarify", x: 390, y: 80, label: "Review" },
    { id: "plan-review", phaseId: "plan", x: 610, y: 80, label: "Review" },
    { id: "tasks-code-review", phaseId: "tasks", x: 830, y: 80, label: "Code Review" },
    { id: "implement-uat", phaseId: "implement", x: 1050, y: 80, label: "UAT" }
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
