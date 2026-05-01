import { useCallback, useEffect, useMemo, useState } from "react";
import { CLUSTERS, STATUSES, WEIGHT_DEFAULTS } from "./constants/schema";
import { INITIAL_INITIATIVES } from "./data/initiatives";
import { Shell } from "./components/layout/Shell";
import { sanitize } from "./utils/sanitize";
import { buildWielders, enrichInitiative } from "./utils/derivedData";
import { formatCurrency } from "./utils/formatters";

const viewCopy = {
  Overview: {
    eyebrow: "Portfolio Pulse",
    title: "Lifestream",
    description: "Distributed AI initiative intelligence for visibility, prioritization, and reusable momentum.",
    body: "Executive overview dashboard for portfolio attention, movement, reusable patterns, and priority signals."
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

const issueOrder = ["BLOCKED", "ACTIVE BLOCKER", "NO BUILDER", "HIGH RISK", "SENSITIVE DATA", "CONCENTRATION RISK"];

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

function truncateText(text = "", length = 138) {
  return text.length > length ? `${text.slice(0, length).trim()}...` : text;
}

function getNeedAttentionItems(initiatives, ownerCounts) {
  const ownerRiskThreshold = Math.max(4, Math.ceil(initiatives.length * 0.08));
  const items = [];

  const pushItem = (init, issueType, reason) => {
    items.push({
      init,
      issueType,
      reason,
      blocker: init.blocker || "None",
      owner: init.owner || "Unassigned"
    });
  };

  initiatives.forEach((init) => {
    const owner = String(init.owner || "");
    const ownerCount = ownerCounts.get(init.owner) || 0;
    const noBuilder = !owner.trim() || /unassigned|sponsor|tbd/i.test(owner);
    const highRisk = ["High", "Regulated"].includes(init.riskTier) && init.status !== "Deployed";
    const sensitiveData = init.sensitivity === "Highly Sensitive" && init.status !== "Deployed";

    if (init.status === "Blocked") pushItem(init, "BLOCKED", `${init.blocker || "Active blocker"} is preventing movement.`);
    else if (init.blocker) pushItem(init, "ACTIVE BLOCKER", `${init.blocker} needs owner review before the next step.`);
    else if (noBuilder) pushItem(init, "NO BUILDER", "Builder or accountable owner is unclear.");
    else if (highRisk) pushItem(init, "HIGH RISK", `${init.riskTier} risk initiative is not deployed.`);
    else if (sensitiveData) pushItem(init, "SENSITIVE DATA", "Highly sensitive data requires visible governance attention.");
    else if (ownerCount >= ownerRiskThreshold) pushItem(init, "CONCENTRATION RISK", `${init.owner} is attached to ${ownerCount} initiatives.`);
  });

  const sorted = items.sort((a, b) => {
    const issueDelta = issueOrder.indexOf(a.issueType) - issueOrder.indexOf(b.issueType);
    if (issueDelta !== 0) return issueDelta;
    return Number(b.init.priorityScore) - Number(a.init.priorityScore);
  });

  return { visible: sorted.slice(0, 8), total: sorted.length };
}

function ExecutiveOverview({ initiatives, wielders, onNavigateWithFilters }) {
  const metrics = useMemo(() => {
    const active = initiatives.filter((init) => ["In Progress", "Pilot"].includes(init.status)).length;
    const blocked = initiatives.filter((init) => init.status === "Blocked").length;
    const departments = new Set(initiatives.map((init) => init.dept)).size;
    const rawInputs = initiatives.reduce((sum, init) => sum + (init.inputs?.length || 0), 0);
    const patterned = initiatives.filter((init) => init.pattern || init.capabilities?.length).length;
    const rationalizationTargets = initiatives.filter((init) => init.targetSaaS).length;

    return [
      { label: "Total initiatives", value: initiatives.length },
      { label: "Active initiatives", value: active },
      { label: "Blocked initiatives", value: blocked, tone: "danger" },
      { label: "Departments represented", value: departments },
      { label: "Wielders / contributors", value: wielders.length },
      { label: "Total raw inputs", value: rawInputs },
      { label: "Initiatives with Materia", value: patterned },
      { label: "Software targets", value: rationalizationTargets }
    ];
  }, [initiatives, wielders.length]);

  const pipeline = useMemo(() => {
    const counts = countBy(initiatives, (init) => init.status);
    const statuses = STATUSES.map((status) => ({ status, count: counts.get(status) || 0 }));
    const summary = `${counts.get("Blocked") || 0} blocked · ${counts.get("In Progress") || 0} in progress · ${counts.get("Pilot") || 0} in pilot · ${counts.get("Deployed") || 0} deployed.`;
    return { statuses, summary };
  }, [initiatives]);

  const ownerCounts = useMemo(() => countBy(initiatives, (init) => init.owner), [initiatives]);
  const attentionItems = useMemo(() => getNeedAttentionItems(initiatives, ownerCounts), [initiatives, ownerCounts]);

  const clusterCounts = useMemo(() => {
    const counts = countBy(initiatives, (init) => init.cluster);
    const entries = CLUSTERS.map((cluster) => ({ name: cluster, count: counts.get(cluster) || 0 }));
    const max = Math.max(...entries.map((entry) => entry.count), 1);
    const min = Math.min(...entries.map((entry) => entry.count));
    return entries.map((entry) => ({
      ...entry,
      percent: Math.round((entry.count / max) * 100),
      density: entry.count === max ? "high" : entry.count === min ? "low" : "normal"
    }));
  }, [initiatives]);

  const topPriorities = useMemo(() => {
    return [...initiatives]
      .sort((a, b) => Number(b.priorityScore) - Number(a.priorityScore))
      .slice(0, 5);
  }, [initiatives]);

  const capabilityDensity = useMemo(() => {
    const capabilityMap = new Map();
    initiatives.forEach((init) => {
      (init.capabilities || []).forEach((capability) => {
        const current = capabilityMap.get(capability) || { name: capability, count: 0, departments: new Set() };
        current.count += 1;
        current.departments.add(init.dept);
        capabilityMap.set(capability, current);
      });
    });

    const entries = Array.from(capabilityMap.values())
      .map((item) => ({ ...item, departmentCount: item.departments.size }))
      .sort((a, b) => b.count - a.count || b.departmentCount - a.departmentCount);
    const max = Math.max(...entries.map((entry) => entry.count), 1);
    return {
      top: entries[0],
      entries: entries.map((entry) => ({ ...entry, percent: Math.round((entry.count / max) * 100), highDensity: entry.count >= max * 0.75 }))
    };
  }, [initiatives]);

  const rationalizationSnapshot = useMemo(() => {
    const targeted = initiatives.filter((init) => init.targetSaaS);
    const totalAnnualTarget = targeted.reduce((sum, init) => sum + parseAnnualCost(init.targetSaaS), 0);
    const counts = countBy(targeted, (init) => init.rationalization || "TBD");
    const blockedCount = targeted.filter((init) => init.status === "Blocked").length;
    const topTargets = [...targeted]
      .sort((a, b) => parseAnnualCost(b.targetSaaS) - parseAnnualCost(a.targetSaaS))
      .slice(0, 4)
      .map((init) => ({ ...init, annualCost: parseAnnualCost(init.targetSaaS) }));

    return {
      totalAnnualTarget,
      targetCount: targeted.length,
      replaceCount: counts.get("Replace") || 0,
      reduceCount: counts.get("Reduce") || 0,
      augmentCount: counts.get("Augment") || 0,
      blockedCount,
      topTargets
    };
  }, [initiatives]);

  const latestSignals = useMemo(() => {
    return initiatives
      .flatMap((init) => (init.inputs || []).map((input, index) => ({ ...input, initiative: init.name, initiativeId: init.id, index })))
      .slice(-6)
      .reverse()
      .map((signal) => ({ ...signal, preview: truncateText(signal.text) }));
  }, [initiatives]);

  const handleStatusClick = useCallback((status) => onNavigateWithFilters({ status }), [onNavigateWithFilters]);
  const handleClusterClick = useCallback((cluster) => onNavigateWithFilters({ cluster }), [onNavigateWithFilters]);
  const handlePriorityClick = useCallback((priorityTier, cluster) => onNavigateWithFilters({ priorityTier, cluster }), [onNavigateWithFilters]);
  const handleCapabilityClick = useCallback((capability) => onNavigateWithFilters({ capability }), [onNavigateWithFilters]);
  const handleRationalizationClick = useCallback((rationalization) => onNavigateWithFilters({ rationalization }), [onNavigateWithFilters]);
  const handleInitiativeClick = useCallback((initiativeId) => onNavigateWithFilters({ selectedInitiativeId: initiativeId }), [onNavigateWithFilters]);

  return (
    <div className="overview-stack">
      <section className="pulse-grid" aria-label="Portfolio pulse metrics">
        {metrics.map((metric) => (
          <article className={`pulse-card ${metric.tone || ""}`} key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </section>

      <section className="overview-section pipeline-section">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Pipeline Status Bar</p>
            <h2>What is moving</h2>
          </div>
        </div>
        <div className="status-bar" aria-label="Initiative status distribution">
          {pipeline.statuses.map((item) => (
            <button
              type="button"
              className={`status-segment ${statusClass[item.status]}`}
              style={{ flexGrow: Math.max(item.count, 1) }}
              key={item.status}
              onClick={() => handleStatusClick(item.status)}
            >
              <strong>{item.count}</strong>
              <span>{item.status}</span>
            </button>
          ))}
        </div>
        <p className="pipeline-summary">{pipeline.summary}</p>
      </section>

      <section className="overview-grid two-column attention-layout">
        <article className="overview-section">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Needs Attention</p>
              <h2>Scan-first risk queue</h2>
            </div>
            {attentionItems.total > attentionItems.visible.length ? <p>Showing top 8 of {attentionItems.total} attention signals.</p> : null}
          </div>
          <div className="attention-grid">
            {attentionItems.visible.map((item) => (
              <button
                type="button"
                className={`attention-card issue-${item.issueType.toLowerCase().replace(/\s+/g, "-")}`}
                key={`${item.issueType}-${item.init.id}`}
                onClick={() => handleInitiativeClick(item.init.id)}
              >
                <span className="issue-type">{item.issueType}</span>
                <strong>{item.init.name}</strong>
                <span>{item.init.cluster} · {item.owner}</span>
                <span>Blocker: {item.blocker}</span>
                <em>{item.reason}</em>
              </button>
            ))}
          </div>
        </article>

        <article className="overview-section">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Cluster Coverage</p>
              <h2>Where patterns are emerging</h2>
            </div>
          </div>
          <div className="cluster-grid">
            {clusterCounts.map((cluster) => (
              <button
                type="button"
                className={`cluster-card ${cluster.density}`}
                key={cluster.name}
                onClick={() => handleClusterClick(cluster.name)}
              >
                <span>{cluster.name}</span>
                <strong>{cluster.count}</strong>
                <i style={{ width: `${cluster.percent}%` }} />
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
              <h2>Most valuable work</h2>
            </div>
          </div>
          <div className="priority-list">
            {topPriorities.map((init, index) => (
              <button
                type="button"
                className="priority-row"
                key={init.id}
                onClick={() => handlePriorityClick(init.priorityTier, init.cluster)}
              >
                <span className="rank">{index + 1}</span>
                <span className="priority-main">
                  <strong>{init.name}</strong>
                  <small>{init.cluster} · {init.owner} · {init.status}</small>
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
              <h2>{formatCurrency(rationalizationSnapshot.totalAnnualTarget)} annual target</h2>
            </div>
          </div>
          <div className="snapshot-metrics rationalization-metrics">
            <div><span>Targets</span><strong>{rationalizationSnapshot.targetCount}</strong></div>
            <div><span>Replace</span><strong>{rationalizationSnapshot.replaceCount}</strong></div>
            <div><span>Reduce</span><strong>{rationalizationSnapshot.reduceCount}</strong></div>
            <div><span>Augment</span><strong>{rationalizationSnapshot.augmentCount}</strong></div>
            <div><span>Blocked</span><strong>{rationalizationSnapshot.blockedCount}</strong></div>
          </div>
          <div className="mini-list">
            {rationalizationSnapshot.topTargets.map((init) => (
              <button type="button" key={init.id} onClick={() => handleRationalizationClick(init.rationalization)}>
                <span>{init.targetSaaS}</span>
                <strong>{init.annualCost ? formatCurrency(init.annualCost) : "Partial"}</strong>
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className="overview-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Capability Density / Materia Signal</p>
            <h2>Required Capabilities</h2>
          </div>
          <p>
            {capabilityDensity.top?.name} appears in {capabilityDensity.top?.count || 0} initiatives across {capabilityDensity.top?.departmentCount || 0} departments. This is the strongest reusable infrastructure signal.
          </p>
        </div>
        <div className="capability-bars">
          {capabilityDensity.entries.map((capability) => (
            <button
              type="button"
              className={`capability-row ${capability.highDensity ? "high-density" : ""}`}
              key={capability.name}
              onClick={() => handleCapabilityClick(capability.name)}
            >
              <span>{capability.name}</span>
              <strong>{capability.count}</strong>
              <i style={{ width: `${capability.percent}%` }} />
            </button>
          ))}
        </div>
      </section>

      <section className="overview-section">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Latest Signals</p>
            <h2>Recent raw inputs</h2>
          </div>
        </div>
        <div className="signals-grid">
          {latestSignals.map((signal) => (
            <article className="signal-card" key={`${signal.initiativeId}-${signal.index}-${signal.source}`}>
              <span>{signal.type} · {signal.date}</span>
              <strong>{signal.initiative}</strong>
              <p className="signal-source">{signal.source}</p>
              <p>{signal.preview}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}


const aiLevelDescriptions = {
  Assist: "Supports a person with drafting, analysis, search, or recommendations while humans drive the workflow.",
  Augment: "Extends an existing workflow with AI-assisted decisions, routing, or structured outputs.",
  Automate: "Runs a repeatable process with limited manual effort and visible oversight boundaries.",
  Experiment: "Explores feasibility, data readiness, or operating fit before a production path is clear."
};

const riskOrder = { Low: 1, Medium: 2, High: 3, Regulated: 4 };
const statusOrder = { Discovery: 1, "In Progress": 2, Pilot: 3, Deployed: 4, Blocked: 5 };

const defaultExplorerFilters = {
  search: "",
  cluster: "",
  department: "",
  type: "",
  status: "",
  aiLevel: "",
  riskTier: "",
  sensitivity: "",
  blocker: "",
  pattern: "",
  sort: "Priority Score"
};

const sortOptions = ["Priority Score", "Name", "Department", "Status", "Input Count", "Risk Tier", "Latest Signal"];

function getLatestSignal(init) {
  return init.inputs?.at(-1) || null;
}

function inputDateValue(input) {
  if (!input?.date) return 0;
  const parsed = Date.parse(`${input.date} 2026`);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function uniqueSorted(values) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

function applyPendingFilters(filters, pendingFilters = {}) {
  const next = { ...filters };
  if (pendingFilters.status) next.status = pendingFilters.status;
  if (pendingFilters.cluster) next.cluster = pendingFilters.cluster;
  if (pendingFilters.capability) next.pattern = pendingFilters.capability;
  if (pendingFilters.priorityTier) next.priorityTier = pendingFilters.priorityTier;
  if (pendingFilters.rationalization) next.rationalization = pendingFilters.rationalization;
  return next;
}

function Badge({ children, tone = "neutral" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="filter-field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">All</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function InitiativeExplorer({ initiatives, pendingFilters }) {
  const [filters, setFilters] = useState(() => applyPendingFilters(defaultExplorerFilters, pendingFilters));
  const [selectedId, setSelectedId] = useState(pendingFilters.selectedInitiativeId || null);

  useEffect(() => {
    setFilters((current) => applyPendingFilters(current, pendingFilters));
    if (pendingFilters.selectedInitiativeId) setSelectedId(pendingFilters.selectedInitiativeId);
  }, [pendingFilters]);

  const filterOptions = useMemo(() => ({
    clusters: uniqueSorted(initiatives.map((init) => init.cluster)),
    departments: uniqueSorted(initiatives.map((init) => init.dept)),
    types: uniqueSorted(initiatives.map((init) => init.type)),
    statuses: STATUSES,
    aiLevels: uniqueSorted(initiatives.map((init) => init.aiLevel)),
    riskTiers: uniqueSorted(initiatives.map((init) => init.riskTier)),
    sensitivities: uniqueSorted(initiatives.map((init) => init.sensitivity)),
    blockers: uniqueSorted(initiatives.map((init) => init.blocker).filter(Boolean)),
    patterns: uniqueSorted(initiatives.flatMap((init) => [init.pattern, ...(init.capabilities || [])]))
  }), [initiatives]);

  const filteredInitiatives = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    return initiatives.filter((init) => {
      const searchable = [
        init.name,
        init.summary,
        init.dept,
        init.owner,
        init.cluster,
        init.pattern,
        init.blocker,
        ...(init.capabilities || []),
        ...(init.tools || [])
      ].join(" ").toLowerCase();

      if (query && !searchable.includes(query)) return false;
      if (filters.cluster && init.cluster !== filters.cluster) return false;
      if (filters.department && init.dept !== filters.department) return false;
      if (filters.type && init.type !== filters.type) return false;
      if (filters.status && init.status !== filters.status) return false;
      if (filters.aiLevel && init.aiLevel !== filters.aiLevel) return false;
      if (filters.riskTier && init.riskTier !== filters.riskTier) return false;
      if (filters.sensitivity && init.sensitivity !== filters.sensitivity) return false;
      if (filters.blocker && init.blocker !== filters.blocker) return false;
      if (filters.pattern && init.pattern !== filters.pattern && !init.capabilities?.includes(filters.pattern)) return false;
      if (filters.priorityTier && init.priorityTier !== filters.priorityTier) return false;
      if (filters.rationalization && init.rationalization !== filters.rationalization) return false;
      return true;
    });
  }, [filters, initiatives]);

  const sortedInitiatives = useMemo(() => {
    return [...filteredInitiatives].sort((a, b) => {
      if (filters.sort === "Name") return a.name.localeCompare(b.name);
      if (filters.sort === "Department") return a.dept.localeCompare(b.dept) || a.name.localeCompare(b.name);
      if (filters.sort === "Status") return (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0) || a.name.localeCompare(b.name);
      if (filters.sort === "Input Count") return (b.inputs?.length || 0) - (a.inputs?.length || 0) || a.name.localeCompare(b.name);
      if (filters.sort === "Risk Tier") return (riskOrder[b.riskTier] || 0) - (riskOrder[a.riskTier] || 0) || a.name.localeCompare(b.name);
      if (filters.sort === "Latest Signal") return inputDateValue(getLatestSignal(b)) - inputDateValue(getLatestSignal(a));
      return Number(b.priorityScore) - Number(a.priorityScore) || a.name.localeCompare(b.name);
    });
  }, [filteredInitiatives, filters.sort]);

  const resultsSummary = useMemo(() => {
    const activeFilterCount = Object.entries(filters).filter(([key, value]) => key !== "sort" && value).length;
    return { shown: sortedInitiatives.length, activeFilterCount };
  }, [filters, sortedInitiatives.length]);

  const selectedInitiative = useMemo(() => {
    return initiatives.find((init) => init.id === selectedId) || null;
  }, [initiatives, selectedId]);

  const updateFilter = useCallback((key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(defaultExplorerFilters);
    setSelectedId(null);
  }, []);

  const openInitiative = useCallback((id) => setSelectedId(id), []);
  const closeDrawer = useCallback(() => setSelectedId(null), []);

  return (
    <section className="explorer-view">
      <div className="explorer-toolbar">
        <label className="search-field">
          <span>Search initiatives</span>
          <input
            value={filters.search}
            onChange={(event) => updateFilter("search", event.target.value)}
            placeholder="Search name, summary, owner, capability, tool, blocker..."
          />
        </label>
        <label className="filter-field sort-field">
          <span>Sort by</span>
          <select value={filters.sort} onChange={(event) => updateFilter("sort", event.target.value)}>
            {sortOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
      </div>

      <div className="filter-grid">
        <FilterSelect label="Cluster" value={filters.cluster} options={filterOptions.clusters} onChange={(value) => updateFilter("cluster", value)} />
        <FilterSelect label="Department" value={filters.department} options={filterOptions.departments} onChange={(value) => updateFilter("department", value)} />
        <FilterSelect label="Type" value={filters.type} options={filterOptions.types} onChange={(value) => updateFilter("type", value)} />
        <FilterSelect label="Status" value={filters.status} options={filterOptions.statuses} onChange={(value) => updateFilter("status", value)} />
        <FilterSelect label="AI Level" value={filters.aiLevel} options={filterOptions.aiLevels} onChange={(value) => updateFilter("aiLevel", value)} />
        <FilterSelect label="Risk Tier" value={filters.riskTier} options={filterOptions.riskTiers} onChange={(value) => updateFilter("riskTier", value)} />
        <FilterSelect label="Sensitivity" value={filters.sensitivity} options={filterOptions.sensitivities} onChange={(value) => updateFilter("sensitivity", value)} />
        <FilterSelect label="Blocker" value={filters.blocker} options={filterOptions.blockers} onChange={(value) => updateFilter("blocker", value)} />
        <FilterSelect label="Pattern / Materia" value={filters.pattern} options={filterOptions.patterns} onChange={(value) => updateFilter("pattern", value)} />
      </div>

      <div className="results-summary">
        <span>{resultsSummary.shown} initiatives shown</span>
        <span>{resultsSummary.activeFilterCount} active filters</span>
        <button type="button" onClick={clearFilters}>Clear filters</button>
      </div>

      <div className="initiative-list">
        {sortedInitiatives.map((init) => (
          <button type="button" className="initiative-row" key={init.id} onClick={() => openInitiative(init.id)}>
            <div className="initiative-row-main">
              <strong>{init.name}</strong>
              <p>{init.summary}</p>
              <div className="chip-row">
                <Badge tone="status">Status: {init.status}</Badge>
                <Badge tone="ai">AI Level: {init.aiLevel}</Badge>
                <Badge tone="risk">Risk: {init.riskTier}</Badge>
                <Badge tone="sensitivity">Sensitivity: {init.sensitivity}</Badge>
                {init.blocker ? <Badge tone="blocker">Blocker: {init.blocker}</Badge> : null}
              </div>
            </div>
            <div className="initiative-meta-grid">
              <span><em>Owner / Wielder</em><strong>{init.owner}</strong></span>
              <span><em>Department</em><strong>{init.dept}</strong></span>
              <span><em>Cluster</em><strong>{init.cluster}</strong></span>
              <span><em>Type</em><strong>{init.type}</strong></span>
              <span><em>Score</em><strong>{init.priorityScore}</strong></span>
              <span><em>Priority tier</em><strong>{init.priorityTier}</strong></span>
              <span><em>Reusable Materia / Pattern</em><strong>{init.pattern || "None"}</strong></span>
              <span><em>Input count</em><strong>{init.inputs?.length || 0}</strong></span>
            </div>
            <div className="required-capabilities">
              <em>Required Capabilities</em>
              <div>{(init.capabilities || []).map((capability) => <span key={capability}>{capability}</span>)}</div>
            </div>
          </button>
        ))}
      </div>

      {selectedInitiative ? (
        <InitiativeDrawer initiative={selectedInitiative} initiatives={initiatives} onClose={closeDrawer} />
      ) : null}
    </section>
  );
}

function InitiativeDrawer({ initiative, initiatives, onClose }) {
  const [expandedInputs, setExpandedInputs] = useState(new Set());

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const related = useMemo(() => {
    const samePattern = initiatives
      .filter((item) => item.id !== initiative.id && initiative.pattern && item.pattern === initiative.pattern)
      .slice(0, 5);
    const capabilitySet = new Set(initiative.capabilities || []);
    const sameCapability = initiatives
      .filter((item) => item.id !== initiative.id && (item.capabilities || []).some((capability) => capabilitySet.has(capability)))
      .slice(0, 5);
    return { samePattern, sameCapability };
  }, [initiative, initiatives]);

  const drawerFields = useMemo(() => [
    ["Owner / Wielder", initiative.owner],
    ["Department", initiative.dept],
    ["Cluster", initiative.cluster],
    ["Type", initiative.type],
    ["Status", initiative.status],
    ["Purpose / Objective", initiative.purpose],
    ["AI Level", initiative.aiLevel],
    ["AI Level Description", aiLevelDescriptions[initiative.aiLevel]],
    ["Risk Tier", initiative.riskTier],
    ["Data Sensitivity", initiative.sensitivity],
    ["Blocker", initiative.blocker || "None"],
    ["Target Software", initiative.targetSaaS || "None"],
    ["Rationalization Mode", initiative.rationalization || "None"]
  ], [initiative]);

  const scoreBars = useMemo(() => [
    ["Impact", initiative.scores.impact],
    ["Effort", initiative.scores.effort],
    ["Risk", initiative.scores.risk],
    ["Alignment", initiative.scores.alignment]
  ], [initiative]);

  const toggleInput = useCallback((index) => {
    setExpandedInputs((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);

  return (
    <div className="drawer-backdrop" onMouseDown={onClose}>
      <aside className="initiative-drawer" aria-label="Initiative detail" onMouseDown={(event) => event.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <p className="eyebrow">Initiative Detail</p>
            <h2>{initiative.name}</h2>
            <p>{initiative.summary}</p>
          </div>
          <button type="button" className="drawer-close" onClick={onClose}>Close</button>
        </div>

        <div className="drawer-score-strip">
          <div><span>Priority score</span><strong>{initiative.priorityScore}</strong></div>
          <div><span>Priority tier</span><strong>{initiative.priorityTier}</strong></div>
        </div>

        <section className="drawer-section">
          <h3>Core Metadata</h3>
          <div className="drawer-field-grid">
            {drawerFields.map(([label, value]) => <span key={label}><em>{label}</em><strong>{value}</strong></span>)}
          </div>
        </section>

        <section className="drawer-section">
          <h3>Pattern And Capability Context</h3>
          <div className="drawer-chip-group">
            <em>Required Capabilities</em>
            <div>{(initiative.capabilities || []).map((capability) => <span key={capability}>{capability}</span>)}</div>
          </div>
          <div className="drawer-chip-group">
            <em>Reusable Materia / Pattern</em>
            <div>{initiative.pattern ? <span>{initiative.pattern}</span> : <span>None</span>}</div>
          </div>
          <div className="drawer-chip-group">
            <em>Tools Used</em>
            <div>{(initiative.tools || []).map((tool) => <span key={tool}>{tool}</span>)}</div>
          </div>
          <RelatedList title="Similar initiatives sharing the same pattern" items={related.samePattern} />
          <RelatedList title="Similar initiatives sharing at least one capability" items={related.sameCapability} />
        </section>

        <section className="drawer-section">
          <h3>Progress And Next Steps</h3>
          <div className="milestone-list">
            {(initiative.progressMilestones || []).slice(0, 5).map((milestone) => (
              <div className={`milestone milestone-${milestone.state}`} key={milestone.label}>
                <span>{milestone.state}</span>
                <strong>{milestone.label}</strong>
                <p>{milestone.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="drawer-section">
          <h3>Score Breakdown</h3>
          <div className="score-bars">
            {scoreBars.map(([label, value]) => (
              <div className="score-bar" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <i style={{ width: `${value * 10}%` }} />
              </div>
            ))}
          </div>
        </section>

        <section className="drawer-section">
          <h3>Raw Inputs</h3>
          <div className="raw-input-list">
            {(initiative.inputs || []).map((input, index) => {
              const expanded = expandedInputs.has(index);
              return (
                <button type="button" className="raw-input-card" key={`${input.source}-${index}`} onClick={() => toggleInput(index)}>
                  <span>{input.type} · {input.date}</span>
                  <strong>{input.source}</strong>
                  <p>{expanded ? input.text : truncateText(input.text, 180)}</p>
                </button>
              );
            })}
          </div>
        </section>
      </aside>
    </div>
  );
}

function RelatedList({ title, items }) {
  return (
    <div className="related-list">
      <em>{title}</em>
      {items.length ? items.map((item) => <span key={item.id}>{item.name}</span>) : <span>None found</span>}
    </div>
  );
}

function PrioritizationView({ initiatives, weights, onWeightsChange }) {
  const [selectedId, setSelectedId] = useState(null);

  const rankedInitiatives = useMemo(() => [...initiatives].sort((a, b) => Number(b.priorityScore) - Number(a.priorityScore)), [initiatives]);

  const tierSummary = useMemo(() => {
    const tiers = ["P0", "P1", "P2"].map((tier) => {
      const items = initiatives.filter((init) => init.priorityTier === tier);
      const blocked = items.filter((init) => init.status === "Blocked").length;
      const spend = items.reduce((sum, init) => sum + parseAnnualCost(init.targetSaaS), 0);
      return { tier, count: items.length, blocked, spend };
    });
    return tiers;
  }, [initiatives]);

  const comparisonRows = useMemo(() => rankedInitiatives.slice(0, 5).map((init) => ({
    id: init.id,
    name: init.name,
    impact: init.scores.impact,
    effort: init.scores.effort,
    lowRisk: 10 - init.scores.risk,
    alignment: init.scores.alignment,
    finalScore: init.priorityScore
  })), [rankedInitiatives]);

  const selectedInitiative = useMemo(() => initiatives.find((init) => init.id === selectedId) || null, [initiatives, selectedId]);

  const handleWeightChange = useCallback((key, value) => {
    onWeightsChange((current) => ({ ...current, [key]: Number(value) }));
  }, [onWeightsChange]);

  const openInitiative = useCallback((id) => setSelectedId(id), []);
  const closeDrawer = useCallback(() => setSelectedId(null), []);

  return (
    <section className="portfolio-view">
      <div className="overview-section">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Scoring Weights</p>
            <h2>Model strategic tradeoffs</h2>
          </div>
        </div>
        <div className="weight-grid">
          {Object.entries(weights).map(([key, value]) => (
            <label className="weight-slider" key={key}>
              <span>{key}</span>
              <strong>{value}</strong>
              <input type="range" min="0" max="100" value={value} onChange={(event) => handleWeightChange(key, event.target.value)} />
            </label>
          ))}
        </div>
      </div>

      <section className="overview-grid two-column">
        <article className="overview-section">
          <div className="section-heading compact"><div><p className="eyebrow">Tier Summary</p><h2>Priority distribution</h2></div></div>
          <div className="tier-summary-grid">
            {tierSummary.map((tier) => (
              <div className="tier-card" key={tier.tier}>
                <span>{tier.tier}</span>
                <strong>{tier.count}</strong>
                <small>{tier.blocked} blocked · {formatCurrency(tier.spend)} target spend</small>
              </div>
            ))}
          </div>
        </article>

        <article className="overview-section">
          <div className="section-heading compact"><div><p className="eyebrow">Top 5 Comparison Matrix</p><h2>Score comparison</h2></div></div>
          <div className="comparison-table">
            <div className="comparison-head"><span>Initiative</span><span>Impact</span><span>Effort</span><span>Low Risk</span><span>Alignment</span><span>Final</span></div>
            {comparisonRows.map((row) => (
              <div className="comparison-row" key={row.id}>
                <strong>{row.name}</strong>
                {[row.impact, row.effort, row.lowRisk, row.alignment].map((score, index) => <ScoreCell score={score} key={index} />)}
                <span>{row.finalScore}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="overview-section">
        <div className="section-heading compact"><div><p className="eyebrow">Stack Rank</p><h2>All initiatives by weighted score</h2></div></div>
        <div className="ranked-list">
          {rankedInitiatives.map((init, index) => (
            <button className="ranked-row" type="button" key={init.id} onClick={() => openInitiative(init.id)}>
              <span className="rank">{index + 1}</span>
              <span className="ranked-main"><strong>{init.name}</strong><small>{init.cluster} · {init.owner} · {init.status}</small></span>
              <Badge tone="risk">Risk: {init.riskTier}</Badge>
              {init.blocker ? <Badge tone="blocker">Blocker: {init.blocker}</Badge> : <span />}
              <span className="score-pill">{init.priorityTier} · {init.priorityScore}</span>
            </button>
          ))}
        </div>
      </section>

      {selectedInitiative ? <InitiativeDrawer initiative={selectedInitiative} initiatives={initiatives} onClose={closeDrawer} /> : null}
    </section>
  );
}

function ScoreCell({ score }) {
  return <span className="score-cell"><i style={{ width: `${score * 10}%` }} />{score}</span>;
}

function SoftwareRationalizationView({ initiatives }) {
  const [selectedId, setSelectedId] = useState(null);

  const rationalizationInitiatives = useMemo(() => initiatives.filter((init) => init.targetSaaS), [initiatives]);

  const softwareCostCalculations = useMemo(() => {
    const rows = rationalizationInitiatives.map((init) => ({ ...init, annualCost: parseAnnualCost(init.targetSaaS) }));
    const total = rows.reduce((sum, init) => sum + init.annualCost, 0);
    const addressable = rows.filter((init) => ["Replace", "Reduce"].includes(init.rationalization)).reduce((sum, init) => sum + init.annualCost, 0);
    const counts = countBy(rows, (init) => init.rationalization || "TBD");
    const blocked = rows.filter((init) => init.status === "Blocked").length;
    const topTargets = [...rows].sort((a, b) => b.annualCost - a.annualCost).slice(0, 4);
    const modes = ["Replace", "Reduce", "Augment", "Retain", "TBD"].map((mode) => ({ mode, count: counts.get(mode) || 0 })).filter((item) => item.count);
    return { rows, total, addressable, counts, blocked, topTargets, modes };
  }, [rationalizationInitiatives]);

  const selectedInitiative = useMemo(() => initiatives.find((init) => init.id === selectedId) || null, [initiatives, selectedId]);
  const openInitiative = useCallback((id) => setSelectedId(id), []);
  const closeDrawer = useCallback(() => setSelectedId(null), []);

  return (
    <section className="portfolio-view">
      <div className="overview-section">
        <div className="section-heading">
          <div><p className="eyebrow">Software Rationalization Snapshot</p><h2>Focused cost displacement subsection</h2></div>
          <p>Initiatives here have explicit software cost displacement targets. Rationalization is optional metadata, not the reason every initiative exists.</p>
        </div>
        <div className="snapshot-metrics rationalization-summary">
          <div><span>Total annual target</span><strong>{formatCurrency(softwareCostCalculations.total)}</strong></div>
          <div><span>Addressable annual target</span><strong>{formatCurrency(softwareCostCalculations.addressable)}</strong></div>
          <div><span>Target systems</span><strong>{softwareCostCalculations.rows.length}</strong></div>
          <div><span>Replace</span><strong>{softwareCostCalculations.counts.get("Replace") || 0}</strong></div>
          <div><span>Reduce</span><strong>{softwareCostCalculations.counts.get("Reduce") || 0}</strong></div>
          <div><span>Augment</span><strong>{softwareCostCalculations.counts.get("Augment") || 0}</strong></div>
          <div><span>Blocked</span><strong>{softwareCostCalculations.blocked}</strong></div>
        </div>
      </div>

      <section className="overview-grid two-column">
        <article className="overview-section">
          <div className="section-heading compact"><div><p className="eyebrow">Mode Breakdown</p><h2>Rationalization modes</h2></div></div>
          <div className="mode-breakdown">
            {softwareCostCalculations.modes.map((item) => <div key={item.mode}><span>{item.mode}</span><strong>{item.count}</strong><i style={{ width: `${(item.count / softwareCostCalculations.rows.length) * 100}%` }} /></div>)}
            <div><span>Blocked</span><strong>{softwareCostCalculations.blocked}</strong><i style={{ width: `${(softwareCostCalculations.blocked / softwareCostCalculations.rows.length) * 100}%` }} /></div>
          </div>
        </article>
        <article className="overview-section">
          <div className="section-heading compact"><div><p className="eyebrow">Top Targets</p><h2>Highest estimated annual costs</h2></div></div>
          <div className="mini-list">
            {softwareCostCalculations.topTargets.map((init) => <button type="button" key={init.id} onClick={() => openInitiative(init.id)}><span>{init.targetSaaS}</span><strong>{init.annualCost ? formatCurrency(init.annualCost) : "Partial"}</strong></button>)}
          </div>
        </article>
      </section>

      <section className="overview-section">
        <div className="section-heading compact"><div><p className="eyebrow">Target Table</p><h2>Initiatives with explicit software targets</h2></div></div>
        <div className="software-table">
          <div className="software-head"><span>Initiative</span><span>Target System</span><span>Annual Cost</span><span>Mode</span><span>Status</span><span>Owner / Wielder</span><span>Cluster</span><span>Risk</span><span>Blocker</span></div>
          {softwareCostCalculations.rows.map((init) => (
            <button type="button" className="software-row" key={init.id} onClick={() => openInitiative(init.id)}>
              <strong>{init.name}</strong><span>{init.targetSaaS}</span><span>{init.annualCost ? formatCurrency(init.annualCost) : "Partial"}</span><span>{init.rationalization || "TBD"}</span><span>{init.status}</span><span>{init.owner}</span><span>{init.cluster}</span><span>{init.riskTier}</span><span>{init.blocker || "None"}</span>
            </button>
          ))}
        </div>
      </section>

      {selectedInitiative ? <InitiativeDrawer initiative={selectedInitiative} initiatives={initiatives} onClose={closeDrawer} /> : null}
    </section>
  );
}

const baseRoadmapItems = [
  { title: "Working static prototype", horizon: "Horizon 1", type: "Prototype", description: "Browser-deployable portfolio visibility using static data.", priority: "High" },
  { title: "Initiative registry", horizon: "Horizon 1", type: "Registry", description: "Structured initiative metadata and source context.", priority: "High" },
  { title: "Manual initiative intake", horizon: "Horizon 1", type: "Intake", description: "Session-only form path for new initiatives.", priority: "Medium" },
  { title: "Manual raw input intake", horizon: "Horizon 1", type: "Intake", description: "Attach source signals to known initiatives.", priority: "Medium" },
  { title: "Executive overview", horizon: "Horizon 1", type: "Dashboard", description: "Attention, movement, priority, and pattern signals.", priority: "High" },
  { title: "Initiative explorer", horizon: "Horizon 1", type: "Explorer", description: "Search, filter, inspect, and compare initiatives.", priority: "High" },
  { title: "Priority scoring", horizon: "Horizon 1", type: "Scoring", description: "Weighted score modeling for strategic tradeoffs.", priority: "High" },
  { title: "Software rationalization view", horizon: "Horizon 1", type: "Finance", description: "Focused view of explicit cost displacement targets.", priority: "Medium" },
  { title: "Import from spreadsheets", horizon: "Horizon 2", type: "Ingestion", description: "Controlled bulk import from structured files.", priority: "High" },
  { title: "Import from meeting notes", horizon: "Horizon 2", type: "Ingestion", description: "Turn notes into reviewed initiative updates.", priority: "Medium" },
  { title: "Import from project updates", horizon: "Horizon 2", type: "Ingestion", description: "Normalize updates from existing operating cadences.", priority: "Medium" },
  { title: "Import from chat exports", horizon: "Horizon 2", type: "Ingestion", description: "Review source channel exports before registry updates.", priority: "Medium" },
  { title: "Source attribution and confidence", horizon: "Horizon 2", type: "Governance", description: "Preserve provenance and confidence for every extracted signal.", priority: "High" },
  { title: "Human review before registry update", horizon: "Horizon 2", type: "Governance", description: "Keep people in the loop for system-generated changes.", priority: "High" },
  { title: "Suggested initiative creation", horizon: "Horizon 3", type: "Discovery", description: "Recommend new initiative records from repeated signals.", priority: "High" },
  { title: "Suggested Materia detection", horizon: "Horizon 3", type: "Pattern", description: "Identify reusable workflow and capability patterns.", priority: "High" },
  { title: "Similar initiative matching", horizon: "Horizon 3", type: "Pattern", description: "Connect related efforts across departments.", priority: "High" },
  { title: "Dynamic pattern recognition", horizon: "Horizon 3", type: "Intelligence", description: "Detect blockers, risks, and reusable patterns as they emerge.", priority: "Medium" },
  { title: "Governance risk flagging", horizon: "Horizon 3", type: "Governance", description: "Route sensitive or regulated work for review.", priority: "High" },
  { title: "Contributor and ownership mapping", horizon: "Horizon 3", type: "Operating Model", description: "Show participation and ownership coverage.", priority: "Medium" },
  { title: "Production storage and audit trail", horizon: "Horizon 3", type: "Platform", description: "Persist validated portfolio data with change history.", priority: "High" }
];

const horizonMeta = {
  "Horizon 1": { title: "Prototype and Registry", purpose: "Demonstrate visibility, structured initiative data, manual intake, and portfolio intelligence." },
  "Horizon 2": { title: "Structured Ingestion", purpose: "Move from manual entry to controlled ingestion from source systems." },
  "Horizon 3": { title: "Assisted Discovery and Pattern Intelligence", purpose: "Use AI to identify emerging initiatives, reusable Materia, patterns, blockers, and governance risks." }
};

function RoadmapView({ initiativeCount }) {
  const [items, setItems] = useState(baseRoadmapItems);
  const [form, setForm] = useState({ title: "", horizon: "Horizon 1", type: "", description: "", priority: "Medium" });

  const roadmapGroupedItems = useMemo(() => ["Horizon 1", "Horizon 2", "Horizon 3"].map((horizon) => ({ horizon, ...horizonMeta[horizon], items: items.filter((item) => item.horizon === horizon) })), [items]);

  const updateForm = useCallback((key, value) => setForm((current) => ({ ...current, [key]: value })), []);
  const submitRoadmapItem = useCallback((event) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    setItems((current) => [...current, { ...form, title: form.title.trim() }]);
    setForm({ title: "", horizon: "Horizon 1", type: "", description: "", priority: "Medium" });
  }, [form]);

  return (
    <section className="portfolio-view">
      <div className="overview-section current-state-callout">
        <p className="eyebrow">Current State</p>
        <h2>{initiativeCount} initiatives across multiple departments</h2>
        <p>Fragmented channels, no shared registry, and no production ingestion yet. This prototype shows the operating model before persistent storage and automated ingestion exist.</p>
      </div>

      <div className="roadmap-grid">
        {roadmapGroupedItems.map((group) => (
          <article className="overview-section roadmap-column" key={group.horizon}>
            <p className="eyebrow">{group.horizon}</p>
            <h2>{group.title}</h2>
            <p>{group.purpose}</p>
            <div className="roadmap-item-list">
              {group.items.map((item, index) => <div className="roadmap-item" key={`${item.title}-${index}`}><strong>{item.title}</strong><span>{item.type} · {item.priority}</span><p>{item.description}</p></div>)}
            </div>
          </article>
        ))}
      </div>

      <form className="overview-section roadmap-form" onSubmit={submitRoadmapItem}>
        <div className="section-heading"><div><p className="eyebrow">Add Roadmap Item</p><h2>Session-only planning</h2></div><p>Roadmap additions are session-only in this prototype. Persistent roadmap storage would require a backend or database in production.</p></div>
        <div className="roadmap-form-grid">
          <label><span>Title</span><input value={form.title} onChange={(event) => updateForm("title", event.target.value)} /></label>
          <label><span>Horizon</span><select value={form.horizon} onChange={(event) => updateForm("horizon", event.target.value)}><option>Horizon 1</option><option>Horizon 2</option><option>Horizon 3</option></select></label>
          <label><span>Type</span><input value={form.type} onChange={(event) => updateForm("type", event.target.value)} /></label>
          <label><span>Priority</span><select value={form.priority} onChange={(event) => updateForm("priority", event.target.value)}><option>High</option><option>Medium</option><option>Low</option></select></label>
          <label className="roadmap-description"><span>Description</span><textarea value={form.description} onChange={(event) => updateForm("description", event.target.value)} /></label>
        </div>
        <button type="submit" className="primary-action">Add item</button>
      </form>
    </section>
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
  const [weights, setWeights] = useState(WEIGHT_DEFAULTS);
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
        <ExecutiveOverview initiatives={initiatives} wielders={wielders} onNavigateWithFilters={handleNavigateWithFilters} />
      ) : activeView === "Initiatives" ? (
        <InitiativeExplorer initiatives={initiatives} pendingFilters={pendingFilters} />
      ) : activeView === "Prioritize" ? (
        <PrioritizationView initiatives={initiatives} weights={weights} onWeightsChange={setWeights} />
      ) : activeView === "Software Rationalization" ? (
        <SoftwareRationalizationView initiatives={initiatives} />
      ) : activeView === "Roadmap" ? (
        <RoadmapView initiativeCount={initiatives.length} />
      ) : (
        <PlaceholderView activeView={activeView} initiatives={initiatives} wielders={wielders} pendingFilters={pendingFilters} />
      )}
    </Shell>
  );
}

export default App;





