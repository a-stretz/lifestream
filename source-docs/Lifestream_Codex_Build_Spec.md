# Lifestream Prototype — Codex Build Specification

**Purpose:** Build a polished, working, browser-deployable prototype of **Lifestream**, an internal intelligence tool for discovering, structuring, prioritizing, and scaling distributed AI initiatives.

**Audience:** A business, innovation, or IT leader evaluating whether this system could create visibility across decentralized AI work.

**Primary outcome:** A deployed web application that can be opened from a public URL with no login, no backend, no Claude artifact dependency, and no extra context required.

---

## 1. Source Package to Give Codex

Give Codex these files in the project context:

1. **This file:** `Lifestream_Codex_Build_Spec.md`
   - This is the controlling build spec.
   - When conflicts exist, this file wins.

2. **Functional baseline:** `icc.jsx`
   - Use as the working v1 UI and interaction reference.
   - Do not preserve old naming, old 18-item limitation, or `INIT_META`.

3. **Data source:** `100 icc.js`
   - Contains the full initiative dataset.
   - Use the `SEED` array as the basis for `src/data/initiatives.js`.
   - Each initiative includes expanded fields: `aiLevel`, `sensitivity`, `blocker`, `pattern`, `riskTier`, `cluster`, `tools`, and `inputs`.

4. **Visual/style source:** `lifestream profile guide.md`
   - Use this as the main style and language source.
   - Apply the Lifestream aesthetic only where it improves clarity.

5. **Reference images / assets:**
   - `Lifestream white icon.png`
   - `Lifestream black icon.png`
   - `LIFESTREAM BANNER 4.png`
   - `Lifestream full.png`
   - `dc962b9f-84a1-4a79-97ed-92c06eb3e863.png`

6. **Optional reference only:** `lifestream_ai_assisted_developer_system_guide (1).md`
   - Use only if more design rationale is needed.
   - Do not let this inflate the build or overcomplicate the UI.

7. **Prior review notes:** `icc Spec Review.txt`
   - Incorporate the product corrections: rebrand to Lifestream, remove company/person references, improve dashboard scanability, rename SaaS module, replace radar chart, add initiative progress, improve Intelligence context, and add an in-session Roadmap item form.

---

## 2. Controlling Product Direction

Build **Lifestream**, not “Innovation Command Center.”

Lifestream is a lightweight intelligence layer that makes distributed AI innovation visible, structured, and actionable.

It should help a user answer:

1. What initiatives exist?
2. Which initiatives need attention?
3. Which work is highest priority?
4. What repeated patterns are emerging?
5. Which capabilities are being rebuilt repeatedly?
6. Which initiatives have risk, blockers, or governance concerns?
7. Which software rationalization opportunities have cost impact?
8. What next steps or roadmap items move the portfolio forward?

The app should feel like a **clean internal intelligence product first** and a **Lifestream-themed system second**.

---

## 3. Critical Rebranding and Redaction Rules

The prototype must not mention the real target company, real interview stakeholders, or direct Seaboard-specific references.

### Remove or replace these terms everywhere in the deployed app

| Existing term | Replace with |
|---|---|
| Seaboard Foods | the organization |
| Seaboard | the organization |
| Ryan | Innovation Lead |
| Doug | IT Director |
| Prairie Fresh | Core Brand |
| Austin | Product Lead |

### Required implementation

Create a utility function that recursively sanitizes all text in the seed data before rendering:

```js
const REDACTION_MAP = {
  "Seaboard Foods": "the organization",
  "Seaboard Farms": "Business Unit A",
  "Seaboard": "the organization",
  "Prairie Fresh": "Core Brand",
  "Ryan": "Innovation Lead",
  "Doug": "IT Director",
  "Austin": "Product Lead"
};
```

Apply this to:

- initiative names
- summaries
- owner fields
- raw input source fields
- raw input text
- roadmap copy
- sidebar footer
- header/subtitle text
- any hardcoded UI copy copied from old files

### QA requirement

Before shipping, run a project-wide search and confirm the final app does not render or contain:

```txt
Seaboard
Ryan
Doug
Prairie Fresh
Austin
```

Exception: source file comments are allowed only if they are not bundled into visible UI. Prefer removing them anyway.

---

## 4. Build Architecture

### Stack

Use:

```txt
Vite + React + JSX
Recharts for charts
Plain CSS or CSS modules
Google Font: DM Sans
No backend
No auth
No database
No API calls
No localStorage
No React Router
All app state lives in React state during the session
```

### Deployment

Target deployment: **Netlify static site**.

Add `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

### Project structure

Use this structure unless Codex strongly needs a simpler implementation:

```txt
lifestream-prototype/
├── index.html
├── package.json
├── vite.config.js
├── netlify.toml
├── public/
│   └── assets/
│       ├── lifestream-white-icon.png
│       ├── lifestream-black-icon.png
│       ├── lifestream-banner.png
│       ├── lifestream-full.png
│       └── lifestream-reference.png
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── data/
    │   └── initiatives.js
    ├── constants/
    │   ├── schema.js
    │   ├── colors.js
    │   └── navigation.js
    ├── utils/
    │   ├── scoring.js
    │   ├── sanitize.js
    │   ├── derivedData.js
    │   └── formatters.js
    ├── components/
    │   ├── layout/
    │   │   ├── Sidebar.jsx
    │   │   ├── PageHeader.jsx
    │   │   └── Shell.jsx
    │   ├── shared/
    │   │   ├── Badge.jsx
    │   │   ├── MetricCard.jsx
    │   │   ├── MateriaChip.jsx
    │   │   ├── WielderAvatarGroup.jsx
    │   │   ├── RawInputCard.jsx
    │   │   ├── InitiativeDrawer.jsx
    │   │   ├── SectionCard.jsx
    │   │   └── EmptyState.jsx
    │   └── views/
    │       ├── ExecutiveOverview.jsx
    │       ├── InitiativeExplorer.jsx
    │       ├── PrioritizationView.jsx
    │       ├── IntelligenceView.jsx
    │       ├── SoftwareRationalizationView.jsx
    │       ├── RoadmapView.jsx
    │       ├── AddInitiativeView.jsx
    │       └── AddInputView.jsx
    └── styles/
        ├── globals.css
        └── tokens.css
```

If file splitting slows the build, a single `App.jsx` is acceptable, but the final app must still behave correctly.

---

## 5. Data Model and Derived Data

### Initiative model

Use the data from `100 icc.js`.

Each initiative should support:

```ts
type Initiative = {
  id: number;
  name: string;
  dept: string;
  type: string;
  status: "Discovery" | "In Progress" | "Pilot" | "Deployed" | "Blocked";
  owner: string;
  targetSaaS: string | null;
  rationalization: "Replace" | "Reduce" | "Augment" | "Retain" | null;
  capabilities: string[];
  scores: {
    impact: number;
    effort: number;
    risk: number;
    alignment: number;
  };
  summary: string;
  aiLevel: "Assist" | "Augment" | "Automate" | "Experiment";
  sensitivity: "Public" | "Internal" | "Confidential" | "Restricted" | "Highly Sensitive";
  blocker: string | null;
  pattern: string | null;
  riskTier: "Low" | "Medium" | "High" | "Regulated";
  cluster: string;
  tools: string[];
  inputs: RawInput[];
};
```

### Add derived fields in code

Do not manually edit all 88 records unless necessary. Derive these fields at runtime:

#### `purpose`

Create a `derivePurpose(init)` function:

| Signal | Purpose |
|---|---|
| `targetSaaS` exists | Cost reduction / software rationalization |
| capabilities include `Compliance & Audit` | Compliance / risk control |
| capabilities include `Workflow Automation` | Speed / process efficiency |
| capabilities include `Reporting & Analytics` | Visibility / decision support |
| capabilities include `Document Generation` | Documentation quality / throughput |
| type is `AI Capability` | AI capability development |
| type is `Net-New Tool` | New operating capability |

Show this in the Initiative Drawer and Add Initiative form.

#### `priorityTier`

Use the weighted score:

- P0: score >= 7.5
- P1: score >= 6.0 and < 7.5
- P2: score < 6.0

#### `progressMilestones`

The source data does not have true project plans. Create a lightweight derived milestone list from status, blocker, and inputs.

Example logic:

```js
function deriveMilestones(init) {
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
```

#### `Materia`

Treat reusable capabilities and repeated patterns as Materia.

Derived Materia sources:

- `init.pattern`
- each item in `init.capabilities`
- possibly `init.aiLevel` for AI maturity classification

Display Materia as chips and cards.

#### `Wielders`

Treat initiative owners and contributors as Wielders.

Do not create a gamified leaderboard. Use Wielders to show contribution presence, not ranking.

Derived Wielder model:

```ts
type Wielder = {
  name: string;
  initials: string;
  department: string;
  initiativeIds: number[];
  contributionCount: number;
};
```

---

## 6. Scoring Algorithm

Do not change the scoring algorithm.

```js
export function scoreInitiative(scores, weights) {
  const total = weights.impact + weights.effort + weights.risk + weights.alignment;
  return (
    (scores.impact * weights.impact +
      scores.effort * weights.effort +
      (10 - scores.risk) * weights.risk +
      scores.alignment * weights.alignment) /
    total
  ).toFixed(1);
}
```

Risk is intentionally inverted. Lower risk improves the score.

---

## 7. Constants

Create `src/constants/schema.js`.

```js
export const DEPARTMENTS = [
  "Accounting", "Accounting / Procurement", "Compliance", "Export / Compliance",
  "Feed Mills", "Finance", "Finance / Compliance", "HR", "HR / Compliance",
  "HR / Operations", "HR / Processing", "HR / Recruiting", "HR / Safety",
  "IT", "IT / Innovation", "IT / Security", "Legal / Procurement",
  "Live Operations", "Maintenance", "Marketing", "Operations", "Operations / Facilities",
  "Processing", "Processing / Finance", "Processing / Operations", "Processing / QA",
  "Procurement", "Procurement / Processing", "QA", "QA / Sales", "QA / Sales / Export",
  "Safety", "Safety / HR", "Safety / Processing", "Sales", "Sales / Supply Chain",
  "Supply Chain", "Supply Chain / Accounting", "Supply Chain / Processing",
  "Supply Chain / Procurement", "Supply Chain / QA", "Cross-Functional"
];

export const TYPES = [
  "SaaS Replacement", "AI Capability", "Process Automation", "Net-New Tool",
  "Reporting & Analytics", "Compliance & Audit", "Workflow Automation", "User-Facing App"
];

export const STATUSES = ["Discovery", "In Progress", "Pilot", "Deployed", "Blocked"];

export const AI_LEVELS = ["Assist", "Augment", "Automate", "Experiment"];

export const CAPABILITIES = [
  "Data Pipeline", "Workflow Automation", "Reporting & Analytics", "Document Generation",
  "User-Facing App", "Integration Layer", "Compliance & Audit", "Scheduling & Planning"
];

export const CLUSTERS = [
  "Finance Automation", "Plant Operations", "Compliance & Safety", "Logistics & Supply Chain",
  "Commercial & Sales", "Innovation Infrastructure", "HR & People", "Marketing & Brand"
];

export const RISK_TIERS = ["Low", "Medium", "High", "Regulated"];

export const SENSITIVITIES = ["Public", "Internal", "Confidential", "Restricted", "Highly Sensitive"];

export const BLOCKERS = [
  "Data Access", "Security", "Stakeholder Alignment", "Technical Feasibility",
  "Compliance", "Ownership"
];

export const PATTERNS = [
  "HITL Routing", "Document Extraction", "Approval Workflow", "Dashboard", "Monitoring",
  "Exception Triage", "Scheduling", "Search/Retrieval"
];

export const PURPOSES = [
  "Cost reduction / software rationalization", "Speed / process efficiency", "Compliance / risk control",
  "Visibility / decision support", "Documentation quality / throughput", "Quality improvement",
  "New operating capability", "AI capability development", "Standardization / reuse"
];

export const WEIGHT_DEFAULTS = { impact: 35, effort: 25, risk: 15, alignment: 25 };
```

---

## 8. Visual System Implementation

### Design principle

Do not make the app look like a fantasy dashboard. Make it look like a sharp internal intelligence product with a distinct Lifestream identity.

### Required visual language

- Dark operational base.
- Controlled Lifestream gradient accents.
- Clean cards and tables.
- Strong labels and hierarchy.
- Materia chips for reusable patterns and capabilities.
- Wielder avatars or initials for contributors.
- Minimal motion.
- No emoji-heavy UI.

### Color tokens

Use the existing v1 app dark palette, enhanced with Lifestream accents.

```css
:root {
  --bg: #0c0e14;
  --surface: #14171f;
  --surface-2: #1a1e28;
  --surface-hover: #1f2433;
  --border: #262b3a;
  --border-light: #2f3548;
  --text: #e2e4eb;
  --text-muted: #8990a5;
  --text-dim: #555d75;

  --stream-blue: #00E5FF;
  --deep-teal: #008BC5;
  --energy-orange: #FFA000;
  --vivid-magenta: #FF3CAF;
  --cosmic-purple: #7B2CFF;

  --green: #22c55e;
  --red: #ef4444;
  --amber: #f59e0b;
  --cyan: #22d3ee;
  --purple: #a78bfa;
  --rose: #f472b6;

  --gradient-lifestream-full: linear-gradient(135deg, #00E5FF 0%, #7B2CFF 48%, #FF3CAF 72%, #FFA000 100%);
  --gradient-lifestream-refined: linear-gradient(135deg, rgba(0,229,255,0.20), rgba(123,44,255,0.18), rgba(255,60,175,0.12));
}
```

### Asset use

Copy the provided images into `public/assets/` and rename them:

| Source asset | Use |
|---|---|
| `Lifestream white icon.png` | Dark sidebar logo, header icon, loading/empty state mark |
| `Lifestream black icon.png` | Light background fallback, favicon candidate |
| `LIFESTREAM BANNER 4.png` | Executive Overview header background only |
| `Lifestream full.png` | Optional About/Intro panel or empty-state illustration |
| `dc962b9f-84a1-4a79-97ed-92c06eb3e863.png` | Optional reference only, do not overuse |

### Motion rules

- Use very subtle transitions on hover and filter changes.
- Use gradient animation only in the main page header or empty state.
- Respect reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. Navigation Model

Use React state for navigation. No routing library.

Suggested nav:

```txt
Lifestream
- Overview
- Initiatives
- Prioritize
- Intelligence
- Software Rationalization
- Roadmap
- Add Initiative
- Add Input
```

Optional stretch nav:

```txt
- Materia Library
- Activity Stream
```

If time is limited, derive Materia and activity content inside Overview, Initiatives, and Intelligence rather than adding separate pages.

---

## 10. View Requirements

## 10.1 Executive Overview

Formerly Dashboard.

### Purpose

Answer: **What needs attention, what is moving, and where is reusable value emerging?**

### Required sections

#### A. Lifestream header

Use the banner asset subtly.

Content:

```txt
Lifestream
Distributed AI initiative intelligence for visibility, prioritization, and reusable momentum.
```

Do not mention the target company or real people.

#### B. Portfolio pulse metrics

Cards:

- Total initiatives
- Active / in progress
- Blocked
- Pilot / deployed
- Departments represented
- Raw inputs captured
- Reusable Materia patterns
- Addressable software spend

#### C. Pipeline summary

Keep a compact status bar, but add an actual readable takeaway.

Example:

```txt
Portfolio signal: 8 blocked or constrained initiatives · 12 pilots/deployed · Data access and ownership are the most common stalling points.
```

Clicking a status segment should navigate to Initiative Explorer filtered by that status.

#### D. Needs Attention

This must be highly scannable.

Each card should start with the issue type, then initiative name.

Example card structure:

```txt
BLOCKED
Financial Reporting Pipeline
Security blocker · High risk · Finance Automation
Next: InfoSec review and parallel validation plan
```

Issue types:

- Blocked
- Active blocker
- No builder assigned
- Concentration risk
- High risk + high sensitivity

No distracting emoji. Use colored dot, thin accent stripe, or badge.

#### E. Capability Density / Materia Signal

This is one of the strongest parts of the product. Elevate it.

Show:

- Top reusable capability by count
- Count of initiatives using it
- Number of departments represented
- Why it matters

Example:

```txt
Top reusable Materia: Data Pipeline
Appears in 31 initiatives across 14 departments. This is the strongest candidate for shared infrastructure.
```

Then show a horizontal bar list of all capabilities.

#### F. Top Priorities

Show top 3 by weighted score.

Each row:

- Rank
- Initiative name
- score
- tier
- cluster
- status
- owner/wielder
- blocker if present

Click opens Initiative Drawer.

#### G. Software Rationalization Snapshot

Show only initiatives with `targetSaaS`.

Include:

- Total targeted spend
- Addressable spend: Replace + Reduce
- Replace count
- Reduce count
- Augment count
- Blocked count

#### H. Latest Signals

Show the latest 6 raw inputs across all initiatives.

Sort by date string as best effort. If true date parsing is hard, use dataset order but label it as “Recent captured signals.”

Each signal:

- input type
- source
- initiative
- date
- short excerpt

---

## 10.2 Initiative Explorer

### Purpose

Give the user a searchable, filterable registry of all initiatives.

### Header copy

```txt
Initiative Explorer
A searchable registry of captured AI initiatives, source signals, reusable Materia, contributors, blockers, and deployment risk.
```

### Required controls

Filters:

```txt
Search
Cluster
Department
Type
Status
AI Level
Risk Tier
Sensitivity
Blocker
Pattern / Materia
Sort
```

Sort options:

- Priority score
- Name
- Department
- Status
- Input count
- Risk tier
- Latest signal

All filters use AND logic.

### Row/card structure

Use a table-like card with visible labels.

Columns or labeled groups:

```txt
Initiative
Owner / Wielder
Department
Cluster
Type
Status
AI Level
Risk
Score
```

Below or inside each card:

```txt
Required Capabilities: [Data Pipeline] [Workflow Automation]
Reusable Materia: [HITL Routing]
```

Avoid ambiguity. Do not show raw “Owner · Department” without labels.

### Initiative Drawer

Clicking an initiative opens a drawer or modal.

Must show:

1. Name
2. Summary
3. Owner / Wielder
4. Department
5. Cluster
6. Status
7. Priority score and tier
8. Purpose
9. Type
10. AI Level with description
11. Risk Tier
12. Data Sensitivity
13. Blocker card if present
14. Target software and rationalization if present
15. Tools used
16. Required Capabilities
17. Reusable Materia / pattern
18. Similar initiatives sharing the same pattern or capability
19. Progress / next steps derived milestones
20. Score dimension bars
21. Raw inputs as expandable cards

### Progress section

Add a visible section titled:

```txt
Progress and Next Steps
```

Use the derived milestones described earlier. This solves the “static ticket” problem.

---

## 10.3 Prioritization View

### Purpose

Let the user model strategic tradeoffs and see how initiative priority changes.

### Required sections

#### A. Scoring weights

Four sliders:

- Impact
- Effort
- Risk
- Alignment

Scores recalculate in real time.

#### B. Stack rank

All initiatives ranked by score.

Show:

- rank
- tier
- initiative
- cluster
- status
- blocker
- score

#### C. Tier summary

Show:

- P0 count
- P1 count
- P2 count
- blocked count by tier
- targeted software spend by tier

#### D. Replace radar chart

Do not use the spider/radar chart.

Replace with a **Top 5 Comparison Matrix** or **Diverging Score Bar**.

Recommended: comparison matrix.

Rows: top 5 initiatives.

Columns:

- Impact
- Effort
- Low Risk score, computed as `10 - risk`
- Alignment
- Final score

Add tiny horizontal bars inside cells for scanability.

---

## 10.4 Intelligence View

### Purpose

Make portfolio-level patterns understandable quickly.

This view should not feel like a research report. It should feel like an operational intelligence dashboard.

### Pattern strategy

For this prototype:

- Pattern categories are fixed.
- Counts, lists, percentages, and examples are computed from the current initiative data.
- If the user adds an initiative, the computed signals update.

For the roadmap:

- Explain that future versions can dynamically detect new patterns from source inputs, initiative metadata, embeddings, recurring capabilities, tool reuse, blockers, and contributor activity.

### Layout

Use a grid of pattern cards.

Each pattern card must include:

1. Pattern title
2. One-sentence “So What” callout
3. Computed signal count
4. Example initiatives
5. Business implication
6. Recommended next action
7. Expand/collapse detail

### Required patterns

#### Pattern 1: Assist Layer Ceiling

Computed from `aiLevel`.

So What example:

```txt
Most initiatives are still assistive, which means the portfolio has adoption momentum but limited operational leverage until more workflows graduate into governed augmentation.
```

Show counts by Assist, Augment, Automate, Experiment.

#### Pattern 2: Fragmented Data / No Shared Context

Computed from:

```js
capabilities.includes("Data Pipeline") && !capabilities.includes("Integration Layer")
```

Also cross-reference `blocker === "Data Access"`.

#### Pattern 3: Tool Proliferation

Computed from `tools` arrays.

Show:

- common tools
- one-off tools
- standardization opportunity

#### Pattern 4: Missing Feedback Loops

Computed from raw input types.

Has feedback if any input type is:

```txt
feedback
output_sample
memo
```

Highest concern:

```txt
status === "Deployed" && no feedback inputs
```

#### Pattern 5: Grassroots Momentum

Show:

- builder/wielder count
- department coverage
- initiatives by owner
- concentration risk
- bootcamp/adoption signals if present in data

Do not create a leaderboard.

#### Pattern 6: Portfolio Cluster Distribution

Show counts across 8 clusters.

Highlight underserved clusters and over-concentrated clusters.

#### Pattern 7: Reusable Workflow Patterns

Group by `pattern`.

Show:

- HITL Routing
- Document Extraction
- Approval Workflow
- Dashboard
- Monitoring
- Exception Triage
- Scheduling
- Search/Retrieval

For each:

- count
- departments represented
- example initiatives
- reusable template opportunity

#### Pattern 8: Deployment Risk and Governance

Create a matrix:

Rows: Risk Tier.

Columns: Sensitivity.

Each cell shows count.

Red zone:

```js
(riskTier === "High" || riskTier === "Regulated") &&
(sensitivity === "Restricted" || sensitivity === "Highly Sensitive")
```

Surface:

- red-zone count
- blocked red-zone count
- unblocked red-zone count
- recommended governance action

---

## 10.5 Software Rationalization View

Rename from “SaaS Targets” to **Software Rationalization**.

### Purpose

Track initiatives that have explicit software replacement, reduction, augmentation, or cost displacement targets.

This is not the whole portfolio. It is a financial subsection.

### Required header copy

```txt
Software Rationalization
Initiatives with explicit software cost displacement, replacement, reduction, or augmentation targets.
```

### Required sections

#### A. Summary metrics

- Total targeted annual spend
- Addressable annual spend: Replace + Reduce
- Replace count
- Reduce count
- Augment count
- Blocked count

#### B. Chart

Show cost by initiative or rationalization mode.

Color by rationalization:

- Replace: amber
- Reduce: magenta/rose
- Augment: cyan
- Retain/TBD: muted
- Blocked: red accent

#### C. Table

Columns:

```txt
Initiative
Target system
Annual cost
Rationalization mode
Status
Owner / Wielder
Risk tier
Blocker
```

#### D. Clarify optionality

Show small explanatory copy:

```txt
Rationalization is only shown when an initiative targets a specific software cost. Other initiatives may still create value through speed, quality, compliance, visibility, or new capability creation.
```

---

## 10.6 Roadmap View

### Purpose

Show how this static prototype evolves into a production-grade intake, discovery, prioritization, and pattern recognition system.

### Required sections

#### Current State callout

Use generic wording:

```txt
Current state: distributed AI experimentation, many source channels, inconsistent initiative tracking, no shared registry, and limited visibility into reusable patterns.
```

Do not mention 30 Telegram channels unless sanitized as “many source channels.”

#### Three horizons

Horizon 1: Prototype and registry

- static initiative dataset
- manual add initiative
- manual add input
- computed dashboard
- fixed intelligence patterns with dynamic counts
- in-session roadmap editing

Horizon 2: Structured ingestion

- spreadsheet upload
- structured form intake
- artifact upload
- meeting notes import
- GitHub/project inventory import
- classification into initiative metadata

Horizon 3: Assisted discovery and pattern intelligence

- source monitoring
- automated clustering
- pattern recommendations
- Materia library generation
- risk and governance routing
- stakeholder review loops
- reusable workflow templates

#### Add Roadmap Item

Add an in-session form:

Fields:

- title
- horizon
- type
- description
- priority

Submitting pushes the item into local React state only.

No backend and no localStorage.

Add a note:

```txt
Items added in this prototype are session-only. Persistent roadmap management would require storage in a production version.
```

---

## 10.7 Add Initiative View

### Purpose

Demonstrate how a user would add a newly discovered initiative.

### Required fields

- Initiative name
- Summary
- Owner / Wielder
- Department
- Type
- Status
- Purpose / Objective
- AI Level
- Cluster
- Risk Tier
- Sensitivity
- Primary Blocker, optional
- Reusable Pattern / Materia, optional
- Required Capabilities, multi-select
- Tools Used, comma-separated
- Target Software, optional
- Rationalization Mode, optional and only meaningful if Target Software exists
- Scores: impact, effort, risk, alignment

### Submit behavior

- Add the new initiative to `inits` React state.
- Assign a new ID.
- Sanitize text before storing/rendering.
- Do not persist across page refresh.

---

## 10.8 Add Input View

### Purpose

Demonstrate how raw signals become initiative context.

### Required fields

- Initiative search/select
- Input type
- Source
- Date
- Text

The initiative dropdown must be searchable. Do not make the user scroll through 88 records.

### Submit behavior

- Add input to selected initiative in React state.
- Latest Signals and Initiative Drawer update immediately.
- Intelligence computed signals update if input type affects feedback-loop logic.

---

## 11. Optional Stretch Views

Only build these if the primary app is stable.

## 11.1 Materia Library

Derived from capabilities and patterns.

Show:

- Materia name
- type: capability or pattern
- reuse count
- departments represented
- associated initiatives
- maturity signal
- recommended standardization action

## 11.2 Activity Stream

Derived from raw inputs.

Show:

- newly captured signals
- initiatives updated
- Materia patterns detected
- blockers identified
- feedback received

This can be a lightweight feed, not a full event system.

---

## 12. Interaction Requirements

### Filtering

- All filters are additive.
- Clearing filters should be easy.
- Current filter state should be visible.
- Clicking dashboard cards should navigate to pre-filtered Initiative Explorer where useful.

### Drawers and modals

- Use drawer for initiative details if possible.
- Modal is acceptable if faster.
- User must be able to close with button and `Esc`.

### Charts

Use Recharts only where they add clarity.

Good chart uses:

- capability density bars
- cluster distribution
- software rationalization chart
- risk/sensitivity matrix
- top 5 comparison matrix or bar comparison

Avoid:

- radar/spider charts
- decorative charts with no decision value

---

## 13. Performance Requirements

Use memoization for all derived values.

Required:

```js
useMemo
```

For:

- filtered initiatives
- sorted initiatives
- ranked initiatives
- dashboard metric groups
- latest signals
- capability counts
- cluster counts
- pattern counts
- software rationalization totals
- intelligence pattern calculations
- risk/sensitivity matrix
- derived Materia library

Use:

```js
useCallback
```

For:

- view navigation handlers passed to children
- initiative selection
- add initiative submit
- add input submit
- roadmap item submit

---

## 14. Codex Build Sequence

Use this chunking plan. Do not ask Codex to do everything in one giant vague pass.

## Chunk 1: Project setup, assets, data, and shell

Prompt Codex:

```txt
Create a Vite React app for the Lifestream prototype. Use JSX, Recharts, DM Sans, no backend, no auth, no routing library, no localStorage. Set up the project structure from Lifestream_Codex_Build_Spec.md. Copy the Lifestream image assets into public/assets with clean names. Create constants, color tokens, and utility files. Import the full SEED array from 100 icc.js into src/data/initiatives.js. Add a recursive sanitizer that removes real company/person references before rendering. Build the app shell with a fixed left sidebar, top page header, and placeholder views for Overview, Initiatives, Prioritize, Intelligence, Software Rationalization, Roadmap, Add Initiative, and Add Input. Ensure npm run build passes.
```

Acceptance:

- App launches.
- Sidebar works.
- Assets load.
- Dataset imports.
- No forbidden references render.
- Build passes.

---

## Chunk 2: Executive Overview

Prompt Codex:

```txt
Build the Executive Overview view according to section 10.1 of Lifestream_Codex_Build_Spec.md. It must show portfolio pulse metrics, a compact pipeline bar with a readable narrative takeaway, scannable Needs Attention cards, elevated Capability Density / Materia Signal, Top Priorities, Software Rationalization Snapshot, Cluster Coverage, and Latest Signals. Use useMemo for every computed dataset. Make cards clickable where useful to navigate to Initiative Explorer with filters applied. Keep the UI clean and scan-first. Do not overuse gradients or emoji.
```

Acceptance:

- A non-technical user can understand the portfolio state in under 60 seconds.
- Needs Attention issue type is visible first.
- Capability Density clearly explains why it matters.
- Clicking status/cluster/priority items works.

---

## Chunk 3: Initiative Explorer and Initiative Drawer

Prompt Codex:

```txt
Build the Initiative Explorer and Initiative Drawer according to section 10.2. Add search and filters for cluster, department, type, status, AI level, risk tier, sensitivity, blocker, and pattern. Use labeled columns/cards so metadata is interpretable. The drawer must show all initiative fields, purpose, priority tier, AI level description, risk/sensitivity, blocker, target software if present, tools, Required Capabilities, reusable Materia, similar initiatives, derived Progress and Next Steps, score bars, and expandable raw inputs. Use useMemo for filtering and sorting. Avoid ambiguous owner/department display.
```

Acceptance:

- All initiatives display.
- Filters combine correctly.
- Drawer shows full context.
- Progress and Next Steps section exists.
- Raw inputs expand/collapse.

---

## Chunk 4: Prioritization, Software Rationalization, Roadmap

Prompt Codex:

```txt
Build the Prioritization, Software Rationalization, and Roadmap views. Prioritization must keep the scoring sliders and stack rank, add tier summary, and replace the radar chart with a readable Top 5 Comparison Matrix. Software Rationalization must only include initiatives with targetSaaS and explain that rationalization is optional cost-displacement metadata. Roadmap must show Current State, three horizons, and an in-session Add Roadmap Item form. No persistence beyond React state. Use memoized derived data throughout.
```

Acceptance:

- Sliders recalculate scores across app.
- No radar chart remains.
- Software Rationalization is clearly a subsection.
- Roadmap add item works in session.

---

## Chunk 5: Intelligence View

Prompt Codex:

```txt
Build the Intelligence View according to section 10.4. Use fixed pattern categories with computed signals from the current initiative data. Each pattern card must include title, So What callout, computed count/signal, example initiatives, implication, and recommended next action. Include all eight patterns: Assist Layer Ceiling, Fragmented Data / No Shared Context, Tool Proliferation, Missing Feedback Loops, Grassroots Momentum, Portfolio Cluster Distribution, Reusable Workflow Patterns, and Deployment Risk & Governance. Use useMemo for each pattern computation. Make the page interpretable without requiring the user to read dense paragraphs.
```

Acceptance:

- All 8 patterns render.
- Computed counts update when initiatives/inputs are added.
- So What callouts are visible.
- Risk/sensitivity matrix works.

---

## Chunk 6: Add Initiative, Add Input, final polish, QA

Prompt Codex:

```txt
Build Add Initiative and Add Input views. Add Initiative must include purpose/objective, AI level, cluster, sensitivity, risk tier, blocker, reusable pattern, capabilities, tools, target software, rationalization mode, and score fields. Add Input must have a searchable initiative dropdown and update the selected initiative immediately. Then run final polish: remove forbidden references, ensure all pages are responsive at 1280/1440/1920 widths, ensure no console errors, ensure npm run build passes, and confirm every visual effect maps to product meaning. Do not add backend, auth, API calls, localStorage, or routing.
```

Acceptance:

- Add Initiative works.
- Add Input works.
- Latest Signals updates.
- Intelligence feedback-loop logic updates from new input type.
- Build passes.
- Redaction check passes.

---

## 15. Master Prompt to Give Codex First

Use this if starting fresh:

```txt
You are building a working deployed prototype called Lifestream.

Read and follow Lifestream_Codex_Build_Spec.md as the controlling source of truth.

Use icc.jsx as the functional v1 baseline, but do not preserve the old naming, old 18-initiative limitation, old radar chart, or INIT_META workaround.

Use 100 icc.js as the full initiative dataset. Import the full SEED array into src/data/initiatives.js. Use direct initiative fields for aiLevel, tools, sensitivity, blocker, pattern, riskTier, and cluster.

Use lifestream profile guide.md and the provided Lifestream image assets to apply the visual system. The app should feel like a clean internal intelligence tool first and a Lifestream-themed system second. Use gradients, glow, motion, and connection motifs only when they communicate state, activity, relationship, reuse, or importance.

Critical rules:
- Product name is Lifestream.
- Do not mention Seaboard, Ryan, Doug, Austin, or Prairie Fresh anywhere in the rendered app.
- Sanitize source data before rendering.
- No backend.
- No database.
- No auth.
- No API calls.
- No localStorage.
- No React Router.
- All changes are in-session React state only.
- Build a deployed Vite React app that can be hosted on Netlify.
- Keep the interface scannable, professional, and useful.
- Build in chunks and verify npm run build after each major step.

Start with Chunk 1 from the build sequence.
```

---

## 16. Final QA Checklist

Before considering the prototype complete:

### Build and runtime

- [ ] `npm install` completes.
- [ ] `npm run dev` works.
- [ ] `npm run build` completes.
- [ ] No console errors.
- [ ] Netlify deploy works.

### Data

- [ ] Full initiative dataset loads.
- [ ] Initiative count matches the dataset.
- [ ] Expanded fields render: aiLevel, sensitivity, blocker, pattern, riskTier, cluster, tools.
- [ ] `INIT_META` is removed.
- [ ] No direct `INIT_META[i.id]` references remain.

### Redaction

- [ ] No visible Seaboard reference.
- [ ] No visible Ryan reference.
- [ ] No visible Doug reference.
- [ ] No visible Austin reference.
- [ ] No visible Prairie Fresh reference.

### Overview

- [ ] Portfolio pulse metrics render.
- [ ] Pipeline includes a readable takeaway.
- [ ] Needs Attention is scan-first.
- [ ] Capability Density explains why it matters.
- [ ] Latest Signals render.
- [ ] Top Priorities are clickable.

### Initiatives

- [ ] Search works.
- [ ] All filters work together.
- [ ] Rows/cards have clear labels.
- [ ] Drawer/modal shows full context.
- [ ] Progress and Next Steps section exists.
- [ ] Raw inputs expand.

### Prioritization

- [ ] Sliders recalculate scores.
- [ ] Stack rank updates.
- [ ] Tier summary renders.
- [ ] Radar chart is replaced.

### Intelligence

- [ ] All eight pattern cards render.
- [ ] Each has a visible So What callout.
- [ ] Counts are computed from current data.
- [ ] Risk/sensitivity matrix works.
- [ ] Reusable workflow patterns group correctly.

### Software Rationalization

- [ ] Only initiatives with target software appear.
- [ ] Addressable spend is computed.
- [ ] Replace/Reduce/Augment counts render.
- [ ] Context explains rationalization is optional.

### Roadmap

- [ ] Current state callout renders.
- [ ] Three horizons render.
- [ ] Add Roadmap Item works in session.
- [ ] No persistence is implied.

### Design

- [ ] Lifestream icon appears in sidebar/header.
- [ ] Banner is used sparingly.
- [ ] Gradients are not overused.
- [ ] Dense data views remain readable.
- [ ] Motion is subtle and respects reduced motion.
- [ ] No fantasy/gamified language dominates.

---

## 17. Recommended Delivery Note After Build

Once deployed, the prototype can be described this way:

```txt
Lifestream is a working prototype for mapping distributed AI initiatives across an organization. It captures initiative context, source signals, reusable patterns, ownership, blockers, risk, prioritization, and software rationalization opportunities in one navigable system. The prototype uses static synthetic data and in-session state only, but demonstrates the operating model for a future production system with structured ingestion, pattern recognition, governance routing, and reusable capability libraries.
```
