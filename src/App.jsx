import { useCallback, useMemo, useState } from "react";
import { INITIAL_INITIATIVES } from "./data/initiatives";
import { STATUSES, WEIGHT_DEFAULTS } from "./constants/schema";
import { Shell } from "./components/layout/Shell";
import { sanitize } from "./utils/sanitize";
import { buildWielders, enrichInitiative } from "./utils/derivedData";
import { formatCurrency } from "./utils/formatters";

const viewCopy = {
  Overview: {
    eyebrow: "Portfolio Pulse",
    title: "Lifestream",
    description: "Distributed AI initiative intelligence for visibility, prioritization, and reusable momentum.",
    body: "Chunk 1 establishes the product shell, sanitized dataset, asset loading, and navigation foundation. Executive overview metrics and decision surfaces arrive in Chunk 2."
  },
  Initiatives: {
    eyebrow: "Registry",
    title: "Initiatives",
    description: "A complete initiative registry will support search, filtering, and detailed inspection without routing or persistence.",
    body: "The full dataset is loaded and sanitized before rendering. Chunk 3 will replace this placeholder with the explorer and drawer."
  },
  Prioritize: {
    eyebrow: "Scoring",
    title: "Prioritize",
    description: "Weighted prioritization will help model impact, effort, risk, and strategic alignment in session state.",
    body: "The scoring utility is ready with the required inverted risk algorithm. Chunk 4 will add sliders and stack ranking."
  },
  Intelligence: {
    eyebrow: "Patterns",
    title: "Intelligence",
    description: "Computed portfolio signals will surface repeated Materia, blockers, tool patterns, and governance concerns.",
    body: "Derived data helpers are in place for reusable patterns, Wielders, purposes, priority tiers, and milestones. Chunk 5 will build the pattern cards."
  },
  "Software Rationalization": {
    eyebrow: "Cost Displacement",
    title: "Software Rationalization",
    description: "Initiatives with explicit software replacement, reduction, augmentation, or cost displacement targets.",
    body: "This placeholder keeps rationalization as a focused financial subsection rather than the whole portfolio. Chunk 4 will add totals, charts, and the table."
  },
  Roadmap: {
    eyebrow: "Product Path",
    title: "Roadmap",
    description: "A session-only roadmap will show how the prototype becomes structured ingestion and pattern intelligence.",
    body: "The roadmap view will add editable session-only items later, keeping prototype state ephemeral by design."
  },
  "Add Initiative": {
    eyebrow: "Intake",
    title: "Add Initiative",
    description: "A structured form will demonstrate how newly discovered work enters the Lifestream.",
    body: "Chunk 6 will add the in-session form, sanitize submitted text, and update computed signals immediately."
  },
  "Add Input": {
    eyebrow: "Signals",
    title: "Add Input",
    description: "Raw signals will attach to initiatives and update downstream context during the current session.",
    body: "Chunk 6 will add searchable initiative selection and session-only input capture."
  }
};

const statusClass = {
  Discovery: "status-discovery",
  "In Progress": "status-progress",
  Pilot: "status-pilot",
  Deployed: "status-deployed",
  Blocked: "status-blocked"
};

function parseAnnualCost(targetSaaS) {
  if (!targetSaaS) return 0;
  const match = String(targetSaaS).match(/\$([\d,.]+)\s*(k)?/i);
  if (!match) return 0;
  const amount = Number(match[1].replace(/,/g, ""));
  return match[2] ? amount * 1000 : amount;
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item) || "Unspecified";
    acc.set(key, (acc.get(key) || 0) + 1);
    return acc;
  }, new Map());
}

function toSortedEntries(map) {
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

function getNeedAttentionItems(initiatives, ownerCounts) {
  const ownerRiskThreshold = Math.max(4, Math.ceil(initiatives.length * 0.08));
  const seen = new Set();
  const items = [];

  const pushItem = (init, issueType, detail, next) => {
    const key = `${issueType}-${init.id}`;
    if (seen.has(key)) return;
    seen.add(key);
    items.push({ init, issueType, detail, next });
  };

  initiatives.forEach((init) => {
    const ownerCount = ownerCounts.get(init.owner) || 0;
    const noBuilder = !init.owner || /unassigned|sponsor/i.test(init.owner) || init.tools?.includes("TBD");
    const highRisk = ["High", "Regulated"].includes(init.riskTier) && ["Restricted", "Highly Sensitive"].includes(init.sensitivity);

    if (init.status === "Blocked") {
      pushItem(init, "BLOCKED", `${init.blocker || "Active blocker"} blocker · ${init.riskTier} risk · ${init.cluster}`, "Resolve blocker and reconfirm the next validation step");
    } else if (init.blocker) {
      pushItem(init, "ACTIVE BLOCKER", `${init.blocker} blocker · ${init.status} · ${init.cluster}`, "Assign owner review and unblock the next decision");
    } else if (noBuilder) {
      pushItem(init, "NO BUILDER", `${init.status} · ${init.cluster} · builder path unclear`, "Confirm builder, sponsor, and MVP scope");
    } else if (ownerCount >= ownerRiskThreshold) {
      pushItem(init, "CONCENTRATION RISK", `${init.owner} owns ${ownerCount} initiatives · ${init.cluster}`, "Distribute ownership or name a backup Wielder");
    } else if (highRisk) {
      pushItem(init, "HIGH RISK", `${init.riskTier} risk · ${init.sensitivity} data · ${init.cluster}`, "Route through governance before expanding scope");
    }
  });

  const issueOrder = ["BLOCKED", "ACTIVE BLOCKER", "NO BUILDER", "CONCENTRATION RISK", "HIGH RISK"];
  return items
    .sort((a, b) => {
      const issueDelta = issueOrder.indexOf(a.issueType) - issueOrder.indexOf(b.issueType);
      if (issueDelta !== 0) return issueDelta;
      return Number(b.init.priorityScore) - Number(a.init.priorityScore);
    })
    .slice(0, 8);
}

function ExecutiveOverview({ initiatives, onNavigateWithFilters }) {
  const portfolioMetrics = useMemo(() => {
    const active = initiatives.filter((init) => ["In Progress", "Pilot"].includes(init.status)).length;
    const blocked = initiatives.filter((init) => init.status === "Blocked").length;
    const pilotDeployed = initiatives.filter((init) => ["Pilot", "Deployed"].includes(init.status)).length;
    const departments = new Set(initiatives.map((init) => init.dept)).size;
    const rawInputs = initiatives.reduce((sum, init) => sum + (init.inputs?.length || 0), 0);
    const materia = new Set(initiatives.flatMap((init) => init.materia || [])).size;
    const addressableSpend = initiatives.reduce((sum, init) => {
      if (["Replace", "Reduce"].includes(init.rationalization)) return sum + parseAnnualCost(init.targetSaaS);
      return sum;
    }, 0);

    return [
      { label: "Total initiatives", value: initiatives.length },
      { label: "Active / in progress", value: active },
      { label: "Blocked", value: blocked, tone: "danger" },
      { label: "Pilot / deployed", value: pilotDeployed },
      { label: "Departments represented", value: departments },
      { label: "Raw inputs captured", value: rawInputs },
      { label: "Reusable Materia patterns", value: materia },
      { label: "Addressable software spend", value: formatCurrency(addressableSpend) }
    ];
  }, [initiatives]);

  const statusCounts = useMemo(() => {
    const counts = countBy(initiatives, (init) => init.status);
    return STATUSES.map((status) => ({ status, count: counts.get(status) || 0 }));
  }, [initiatives]);

  const blockerCounts = useMemo(() => toSortedEntries(countBy(initiatives.filter((init) => init.blocker), (init) => init.blocker)), [initiatives]);

  const pipelineTakeaway = useMemo(() => {
    const blocked = statusCounts.find((item) => item.status === "Blocked")?.count || 0;
    const shipped = statusCounts.filter((item) => ["Pilot", "Deployed"].includes(item.status)).reduce((sum, item) => sum + item.count, 0);
    const topBlockers = blockerCounts.slice(0, 2).map((item) => item.name.toLowerCase()).join(" and ") || "ownership";
    return `Portfolio signal: ${blocked} blocked or constrained initiatives · ${shipped} pilots/deployed · ${topBlockers} are the most common stalling points.`;
  }, [blockerCounts, statusCounts]);

  const ownerCounts = useMemo(() => countBy(initiatives, (init) => init.owner), [initiatives]);

  const needsAttention = useMemo(() => getNeedAttentionItems(initiatives, ownerCounts), [initiatives, ownerCounts]);

  const clusterCoverage = useMemo(() => {
    const entries = toSortedEntries(countBy(initiatives, (init) => init.cluster));
    const max = Math.max(...entries.map((entry) => entry.count), 1);
    return entries.map((entry) => ({ ...entry, percent: Math.round((entry.count / max) * 100) }));
  }, [initiatives]);

  const capabilityDensity = useMemo(() => {
    const capabilityMap = new Map();
    initiatives.forEach((init) => {
      (init.capabilities || []).forEach((capability) => {
        const current = capabilityMap.get(capability) || { name: capability, count: 0, departments: new Set(), initiatives: [] };
        current.count += 1;
        current.departments.add(init.dept);
        current.initiatives.push(init.name);
        capabilityMap.set(capability, current);
      });
    });

    const entries = Array.from(capabilityMap.values())
      .map((item) => ({ ...item, departmentCount: item.departments.size }))
      .sort((a, b) => b.count - a.count || b.departmentCount - a.departmentCount);
    const max = Math.max(...entries.map((entry) => entry.count), 1);
    return entries.map((entry) => ({ ...entry, percent: Math.round((entry.count / max) * 100) }));
  }, [initiatives]);

  const topCapability = useMemo(() => capabilityDensity[0], [capabilityDensity]);

  const topPriorities = useMemo(() => {
    return [...initiatives]
      .sort((a, b) => Number(b.priorityScore) - Number(a.priorityScore))
      .slice(0, 5);
  }, [initiatives]);

  const softwareSnapshot = useMemo(() => {
    const targeted = initiatives.filter((init) => init.targetSaaS);
    const addressable = targeted.filter((init) => ["Replace", "Reduce"].includes(init.rationalization));
    const totalSpend = targeted.reduce((sum, init) => sum + parseAnnualCost(init.targetSaaS), 0);
    const addressableSpend = addressable.reduce((sum, init) => sum + parseAnnualCost(init.targetSaaS), 0);
    const byMode = toSortedEntries(countBy(targeted, (init) => init.rationalization || "TBD"));
    const topTargets = [...targeted]
      .sort((a, b) => parseAnnualCost(b.targetSaaS) - parseAnnualCost(a.targetSaaS))
      .slice(0, 4);
    return { targeted, totalSpend, addressableSpend, byMode, topTargets };
  }, [initiatives]);

  const latestSignals = useMemo(() => {
    return initiatives
      .flatMap((init) => (init.inputs || []).map((input, index) => ({ ...input, initiative: init.name, initiativeId: init.id, index })))
      .slice(-8)
      .reverse();
  }, [initiatives]);

  const prioritySummary = useMemo(() => toSortedEntries(countBy(initiatives, (init) => init.priorityTier)), [initiatives]);

  return (
    <div className="overview-stack">
<section className="pulse-grid" aria-label="Portfolio pulse metrics">
        {portfolioMetrics.map((metric) => (
          <article className={`pulse-card ${metric.tone || ""}`} key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </section>

      <section className="overview-section pipeline-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Pipeline Summary</p>
            <h2>Status flow</h2>
          </div>
          <p>{pipelineTakeaway}</p>
        </div>
        <div className="status-bar" aria-label="Initiative status distribution">
          {statusCounts.map((item) => (
            <button
              type="button"
              className={`status-segment ${statusClass[item.status]}`}
              style={{ flexGrow: Math.max(item.count, 1) }}
              key={item.status}
              onClick={() => onNavigateWithFilters({ status: item.status })}
            >
              <strong>{item.count}</strong>
              <span>{item.status}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="overview-grid two-column">
        <article className="overview-section">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Needs Attention</p>
              <h2>Scan-first risk queue</h2>
            </div>
          </div>
          <div className="attention-grid">
            {needsAttention.map((item) => (
              <button
                type="button"
                className="attention-card"
                key={`${item.issueType}-${item.init.id}`}
                onClick={() => onNavigateWithFilters({ status: item.init.status, cluster: item.init.cluster })}
              >
                <span className="issue-type">{item.issueType}</span>
                <strong>{item.init.name}</strong>
                <span>{item.detail}</span>
                <em>Next: {item.next}</em>
              </button>
            ))}
          </div>
        </article>

        <article className="overview-section">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Cluster Coverage</p>
              <h2>Where work is concentrated</h2>
            </div>
          </div>
          <div className="bar-list">
            {clusterCoverage.map((cluster) => (
              <button
                type="button"
                className="bar-row clickable-row"
                key={cluster.name}
                onClick={() => onNavigateWithFilters({ cluster: cluster.name })}
              >
                <span>{cluster.name}</span>
                <strong>{cluster.count}</strong>
                <i style={{ width: `${cluster.percent}%` }} />
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className="overview-grid two-column wide-left">
        <article className="overview-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Capability Density / Materia Signal</p>
              <h2>Top reusable Materia: {topCapability?.name}</h2>
            </div>
            <p>
              Appears in {topCapability?.count || 0} initiatives across {topCapability?.departmentCount || 0} departments.
              This is the strongest candidate for shared infrastructure because it recurs across separate teams and workflows.
            </p>
          </div>
          <div className="bar-list capability-list">
            {capabilityDensity.map((capability) => (
              <button
                type="button"
                className="bar-row clickable-row"
                key={capability.name}
                onClick={() => onNavigateWithFilters({ capability: capability.name })}
              >
                <span>{capability.name}</span>
                <strong>{capability.count}</strong>
                <i style={{ width: `${capability.percent}%` }} />
              </button>
            ))}
          </div>
        </article>

        <article className="overview-section">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Priority Mix</p>
              <h2>Priority tiers</h2>
            </div>
          </div>
          <div className="priority-tiers">
            {prioritySummary.map((tier) => (
              <button type="button" key={tier.name} onClick={() => onNavigateWithFilters({ priorityTier: tier.name })}>
                <span>{tier.name}</span>
                <strong>{tier.count}</strong>
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className="overview-grid two-column">
        <article className="overview-section">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Top Priorities</p>
              <h2>Highest weighted score</h2>
            </div>
          </div>
          <div className="priority-list">
            {topPriorities.map((init, index) => (
              <button
                type="button"
                className="priority-row"
                key={init.id}
                onClick={() => onNavigateWithFilters({ priorityTier: init.priorityTier, cluster: init.cluster })}
              >
                <span className="rank">{index + 1}</span>
                <span className="priority-main">
                  <strong>{init.name}</strong>
                  <small>{init.cluster} · {init.status} · {init.owner}</small>
                </span>
                <span className="score-pill">{init.priorityTier} · {init.priorityScore}</span>
              </button>
            ))}
          </div>
        </article>

        <article className="overview-section">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Software Rationalization Snapshot</p>
              <h2>{formatCurrency(softwareSnapshot.addressableSpend)} addressable</h2>
            </div>
          </div>
          <div className="snapshot-metrics">
            <div><span>Targeted annual spend</span><strong>{formatCurrency(softwareSnapshot.totalSpend)}</strong></div>
            <div><span>Targeted initiatives</span><strong>{softwareSnapshot.targeted.length}</strong></div>
          </div>
          <div className="mode-list">
            {softwareSnapshot.byMode.map((mode) => (
              <span key={mode.name}>{mode.name}: {mode.count}</span>
            ))}
          </div>
          <div className="mini-list">
            {softwareSnapshot.topTargets.map((init) => (
              <button type="button" key={init.id} onClick={() => onNavigateWithFilters({ rationalization: init.rationalization })}>
                <span>{init.name}</span>
                <strong>{parseAnnualCost(init.targetSaaS) ? formatCurrency(parseAnnualCost(init.targetSaaS)) : "Partial"}</strong>
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className="overview-section">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Latest Signals</p>
            <h2>Recent source inputs</h2>
          </div>
        </div>
        <div className="signals-grid">
          {latestSignals.map((signal) => (
            <article className="signal-card" key={`${signal.initiativeId}-${signal.index}-${signal.source}`}>
              <span>{signal.type} · {signal.date}</span>
              <strong>{signal.initiative}</strong>
              <p>{signal.source}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function PlaceholderView({ activeView, initiatives, wielders, pendingFilters }) {
  const copy = viewCopy[activeView];
  const blockedCount = initiatives.filter((init) => init.status === "Blocked").length;
  const activeCount = initiatives.filter((init) => ["In Progress", "Pilot"].includes(init.status)).length;
  const materia = Array.from(new Set(initiatives.flatMap((init) => init.materia))).slice(0, 12);
  const sampleInitiatives = initiatives.slice(0, 4);
  const filterEntries = Object.entries(pendingFilters || {});

  return (
    <>
      {activeView === "Initiatives" && filterEntries.length ? (
        <section className="placeholder-card active-filter-card">
          <h2>Dashboard filter queued</h2>
          <div className="materia-strip">
            {filterEntries.map(([key, value]) => (
              <span className="materia-chip" key={key}>{key}: {value}</span>
            ))}
          </div>
        </section>
      ) : null}

      <section className="metric-row" aria-label="Portfolio setup metrics">
        <div className="metric-card">
          <span className="metric-value">{initiatives.length}</span>
          <p className="metric-label">Initiatives loaded</p>
        </div>
        <div className="metric-card">
          <span className="metric-value">{activeCount}</span>
          <p className="metric-label">Active signals</p>
        </div>
        <div className="metric-card">
          <span className="metric-value">{blockedCount}</span>
          <p className="metric-label">Blocked</p>
        </div>
        <div className="metric-card">
          <span className="metric-value">{wielders.length}</span>
          <p className="metric-label">Wielders</p>
        </div>
      </section>

      <section className="view-grid">
        <article className="placeholder-card">
          <h2>{activeView} foundation</h2>
          <p className="placeholder-copy">{copy.body}</p>
          <div className="materia-strip" aria-label="Sample reusable Materia">
            {materia.map((item) => (
              <span className="materia-chip" key={item}>{item}</span>
            ))}
          </div>
        </article>

        <aside className="placeholder-card">
          <h2>Loaded context</h2>
          <div className="meta-list">
            <div className="meta-row"><span>Sanitizer</span><strong>Active before render</strong></div>
            <div className="meta-row"><span>State model</span><strong>React session</strong></div>
            <div className="meta-row"><span>Persistence</span><strong>None</strong></div>
            <div className="meta-row"><span>Routing</span><strong>State navigation</strong></div>
          </div>
        </aside>
      </section>

      <section className="placeholder-card" style={{ marginTop: 18 }}>
        <h2>Sample sanitized initiatives</h2>
        <ul className="placeholder-list">
          {sampleInitiatives.map((init) => (
            <li key={init.id}>
              <strong>{init.name}</strong> · {init.dept} · {init.status} · {init.priorityTier} · {init.purpose}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function App() {
  const [activeView, setActiveView] = useState("Overview");
  const [weights] = useState(WEIGHT_DEFAULTS);
  const [pendingFilters, setPendingFilters] = useState({});

  const initiatives = useMemo(() => {
    return sanitize(INITIAL_INITIATIVES).map((init) => enrichInitiative(init, weights));
  }, [weights]);

  const wielders = useMemo(() => buildWielders(initiatives), [initiatives]);

  const handleNavigate = useCallback((view) => {
    setActiveView(view);
  }, []);

  const handleNavigateWithFilters = useCallback((filters) => {
    setPendingFilters(filters);
    setActiveView("Initiatives");
  }, []);

  const header = useMemo(() => {
    const copy = viewCopy[activeView];
    return {
      eyebrow: copy.eyebrow,
      title: copy.title,
      description: copy.description,
      metric: { value: initiatives.length, label: "Initiatives" }
    };
  }, [activeView, initiatives.length]);

  return (
    <Shell activeView={activeView} onNavigate={handleNavigate} header={header}>
      {activeView === "Overview" ? (
        <ExecutiveOverview initiatives={initiatives} onNavigateWithFilters={handleNavigateWithFilters} />
      ) : (
        <PlaceholderView activeView={activeView} initiatives={initiatives} wielders={wielders} pendingFilters={pendingFilters} />
      )}
    </Shell>
  );
}

export default App;


