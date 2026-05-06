/**
 * Roles Integration Data for US4
 * Maps US3 roles to handoff participants and diagram interactions
 */

const rolesIntegration = [
  // Spec Writer Role
  {
    roleSlug: "spec-writer",
    roleName: "Spec Writer",
    handoffsAsEmitter: [
      "spec-writer-to-developer",
      "spec-writer-to-developer" // in brownfield with legacy-analysis
    ],
    handoffsAsReceiver: [
      "ai-spec-to-human"
    ],
    phasesParticipates: ["specify", "clarify"],
    diagramColor: "var(--color-role-spec-writer, #4A90E2)"
  },

  // Developer Role
  {
    roleSlug: "developer",
    roleName: "Developer",
    handoffsAsEmitter: [
      "developer-to-developer-clarify",
      "developer-to-developer-plan",
      "developer-to-developer-tasks",
      "developer-to-product-owner"
    ],
    handoffsAsReceiver: [
      "spec-writer-to-developer",
      "developer-to-developer-clarify",
      "developer-to-developer-plan",
      "developer-to-developer-tasks",
      "ai-reviewer-to-developer"
    ],
    phasesParticipates: ["clarify", "plan", "tasks", "implement"],
    diagramColor: "var(--color-role-developer, #50E3C2)"
  },

  // Product Owner Role
  {
    roleSlug: "product-owner",
    roleName: "Product Owner",
    handoffsAsEmitter: [],
    handoffsAsReceiver: [
      "developer-to-product-owner"
    ],
    phasesParticipates: ["specify"],
    diagramColor: "var(--color-role-product-owner, #F5A623)"
  },

  // AI Spec Assistant Role
  {
    roleSlug: "ai-spec-assistant",
    roleName: "AI Spec Assistant",
    handoffsAsEmitter: [
      "ai-spec-to-human"
    ],
    handoffsAsReceiver: [],
    phasesParticipates: ["specify"],
    diagramColor: "var(--color-role-ai-spec, #BD10E0)"
  },

  // AI Code Generator Role
  {
    roleSlug: "ai-code-generator",
    roleName: "AI Code Generator",
    handoffsAsEmitter: [
      "ai-code-to-reviewer"
    ],
    handoffsAsReceiver: [],
    phasesParticipates: ["tasks"],
    diagramColor: "var(--color-role-ai-code, #7B68EE)"
  },

  // Reviewer Role
  {
    roleSlug: "reviewer",
    roleName: "Reviewer",
    handoffsAsEmitter: [],
    handoffsAsReceiver: [
      "ai-code-to-reviewer"
    ],
    phasesParticipates: ["tasks", "implement"],
    diagramColor: "var(--color-role-reviewer, #417505)"
  },

  // AI Reviewer Role
  {
    roleSlug: "ai-reviewer",
    roleName: "AI Reviewer",
    handoffsAsEmitter: [
      "ai-reviewer-to-developer"
    ],
    handoffsAsReceiver: [],
    phasesParticipates: ["implement"],
    diagramColor: "var(--color-role-ai-reviewer, #FF6B6B)"
  }
];

// Helper function: Get handoff arrows for a specific role
function getHandoffsForRole(roleSlug) {
  const role = rolesIntegration.find(r => r.roleSlug === roleSlug);
  if (!role) return [];
  
  // Return handoff IDs where this role participates (as emitter or receiver)
  const allHandoffs = [...role.handoffsAsEmitter, ...role.handoffsAsReceiver];
  return [...new Set(allHandoffs)]; // Remove duplicates
}

// Helper function: Get roles participating in a phase
function getRolesForPhase(phaseId) {
  return rolesIntegration
    .filter(r => r.phasesParticipates.includes(phaseId))
    .map(r => ({
      slug: r.roleSlug,
      name: r.roleName,
      color: r.diagramColor
    }));
}

// Export for use in process-diagram.js and walkthrough.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { rolesIntegration, getHandoffsForRole, getRolesForPhase };
}
