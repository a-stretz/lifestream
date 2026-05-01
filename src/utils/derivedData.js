import { WEIGHT_DEFAULTS } from "../constants/schema";
import { getPriorityTier, scoreInitiative } from "./scoring";
import { getInitials } from "./formatters";

export function derivePurpose(init) {
  if (init.targetSaaS) return "Cost reduction / software rationalization";
  if (init.capabilities?.includes("Compliance & Audit")) return "Compliance / risk control";
  if (init.capabilities?.includes("Workflow Automation")) return "Speed / process efficiency";
  if (init.capabilities?.includes("Reporting & Analytics")) return "Visibility / decision support";
  if (init.capabilities?.includes("Document Generation")) return "Documentation quality / throughput";
  if (init.type === "AI Capability") return "AI capability development";
  if (init.type === "Net-New Tool") return "New operating capability";
  return "Standardization / reuse";
}

export function getLatestInput(inputs = []) {
  return inputs.at(-1) ?? null;
}

export function deriveMilestones(init) {
  const latestInput = getLatestInput(init.inputs);

  if (init.status === "Blocked") {
    return [
      { label: "Blocker identified", state: "complete", detail: init.blocker || "Active blocker" },
      { label: "Resolve blocker", state: "current", detail: "Requires owner review or governance decision" },
      { label: "Resume pilot scope", state: "upcoming", detail: "Reconfirm MVP and next validation step" }
    ];
  }

  if (init.status === "Discovery") {
    return [
      { label: "Signal captured", state: "complete", detail: latestInput?.source || "Initial source captured" },
      { label: "Clarify workflow", state: "current", detail: "Map current process, users, systems, and constraints" },
      { label: "Define pilot candidate", state: "upcoming", detail: "Confirm value, feasibility, owner, and next test" }
    ];
  }

  if (init.status === "In Progress") {
    return [
      { label: "Prototype underway", state: "complete", detail: latestInput?.source || "Build activity captured" },
      { label: "Validate with users", state: "current", detail: "Test against real workflow and refine acceptance criteria" },
      { label: "Decide pilot path", state: "upcoming", detail: "Confirm deployment risk and pilot scope" }
    ];
  }

  if (init.status === "Pilot") {
    return [
      { label: "Pilot launched", state: "complete", detail: latestInput?.source || "Pilot signal captured" },
      { label: "Measure adoption and impact", state: "current", detail: "Track usage, errors, feedback, and blockers" },
      { label: "Scale or revise", state: "upcoming", detail: "Decide whether to expand, redesign, or pause" }
    ];
  }

  return [
    { label: "Deployed", state: "complete", detail: "Operational use confirmed" },
    { label: "Monitor performance", state: "current", detail: "Track feedback, reuse, risk, and improvement opportunities" },
    { label: "Identify reusable Materia", state: "upcoming", detail: "Formalize reusable patterns for other teams" }
  ];
}

export function enrichInitiative(init, weights = WEIGHT_DEFAULTS) {
  const score = scoreInitiative(init.scores, weights);
  return {
    ...init,
    purpose: derivePurpose(init),
    priorityScore: score,
    priorityTier: getPriorityTier(score),
    progressMilestones: deriveMilestones(init),
    materia: [init.pattern, ...(init.capabilities || []), init.aiLevel].filter(Boolean)
  };
}

export function buildWielders(initiatives) {
  const wielders = new Map();

  initiatives.forEach((init) => {
    const names = String(init.owner || "Unassigned")
      .split("+")
      .map((name) => name.trim())
      .filter(Boolean);

    names.forEach((name) => {
      const current = wielders.get(name) || {
        name,
        initials: getInitials(name),
        department: init.dept,
        initiativeIds: [],
        contributionCount: 0
      };
      current.initiativeIds.push(init.id);
      current.contributionCount += 1;
      wielders.set(name, current);
    });
  });

  return Array.from(wielders.values());
}
