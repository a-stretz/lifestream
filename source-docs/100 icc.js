// Seaboard Foods Innovation Portfolio — Full Initiative Dataset (88 initiatives)
// Paste this as SEED const in innovation-command-center.jsx
// Each initiative includes: id, name, dept, type, status, owner, targetSaaS, rationalization,
// capabilities, scores, summary, aiLevel, sensitivity, blocker, pattern, riskTier, cluster, tools, inputs[]

const SEED = [
  // ── ORIGINAL 18 (backfilled with new schema fields) ──
  { id: 1, name: "AP Invoice Processing Engine", dept: "Accounting", type: "SaaS Replacement", status: "In Progress", owner: "Maria Chen", targetSaaS: "Coupa ($180k/yr)", rationalization: "Replace", capabilities: ["Workflow Automation", "Document Generation", "Integration Layer"], scores: { impact: 9, effort: 4, risk: 3, alignment: 8 }, aiLevel: "Augment", sensitivity: "Confidential", blocker: null, pattern: "HITL Routing", riskTier: "Medium", cluster: "Finance Automation", tools: ["Claude Code", "VS Code"], summary: "Vibe-coded replacement for Coupa AP module. Three-way match logic working for standard PO invoices with confidence scoring (≥85 auto, 60-84 human review, <60 manual). 70% automation target by Q2. Blocked on non-PO invoice routing rules. Coupa renewal: October.",
    inputs: [
      { type: "telegram", source: "Maria Chen · #accounting-innovation", date: "Mar 22", text: "Just got the three-way match working for standard PO invoices. Claude handles the PO lookup, matches line items to the GRN, and flags discrepancies. Tested against 50 invoices — 38 clean, 9 flagged correctly for price variance, 3 mismatched on UOM (lbs vs cwt). Working on UOM mapping table. Biggest gap: non-PO invoices." },
      { type: "meeting", source: "Maria ↔ Ryan Weekly Sync · Week 12", date: "Mar 24", text: "Three-way match solid for standard POs. Building confidence score routing low-confidence to human review queue. Ryan asked to document as reusable template — Benefits Admin and Procurement need similar HITL routing. 70% automation by Q2. Coupa renewal October." },
      { type: "process_doc", source: "Current-State AP Workflow", date: "Mar 15", text: "Invoice received → scanned → manual Coupa entry → PO match (60% success) → unmatched queued 3 days → approval routing → ERP export. Pain: manual bottleneck, matching unchanged since 2019, non-PO in spreadsheet. Avg 8.2 days receipt to approval." },
      { type: "builder_log", source: "Claude Code Session · Sprint 4", date: "Mar 26", text: "2.5 hrs, Sonnet, ~42k tokens. Built UOM conversion table. Confidence scoring 0-100. Threshold: ≥85 auto, 60-84 human review, <60 manual. Need to test against Feb full set (~1,200 invoices). Blocked: non-PO routing rules." }
    ]
  },
  { id: 2, name: "Financial Reporting Pipeline", dept: "Accounting", type: "SaaS Replacement", status: "In Progress", owner: "Maria Chen + Jordan Ellis", targetSaaS: "Oracle Reports ($220k/yr)", rationalization: "Replace", capabilities: ["Reporting & Analytics", "Data Pipeline", "Document Generation"], scores: { impact: 10, effort: 2, risk: 6, alignment: 9 }, aiLevel: "Augment", sensitivity: "Restricted", blocker: "Security", pattern: "Document Extraction", riskTier: "High", cluster: "Finance Automation", tools: ["Claude Code", "VS Code"], summary: "Highest-value SaaS target. Automating 14 board-level reports. CFO prioritized 3 for Q3. Intercompany eliminations complex — 23 categories. Parallel validation with Oracle required. Audit trail non-negotiable. October renewal leverage.",
    inputs: [
      { type: "email", source: "CFO → Ryan (forwarded)", date: "Mar 10", text: "Board package has 14 report types. Need 3 critical reports automated first (P&L by BU, consolidated balance sheet, cash flow forecast). If audit-ready by Q3, justifies investment and Oracle renewal leverage." },
      { type: "telegram", source: "Jordan Ellis · #accounting-innovation", date: "Mar 20", text: "P&L generating correctly per entity. Consolidation tricky — 23 intercompany elimination categories. Need version-controlled rules file finance team can update without touching code." },
      { type: "risk", source: "Ryan · Internal Assessment", date: "Mar 22", text: "ELEVATED risk. Accuracy must be 100%. Parallel run minimum 2 months. InfoSec review required. Timeline tight for October leverage." }
    ]
  },
  { id: 3, name: "Employee Onboarding Portal", dept: "HR", type: "Net-New Tool", status: "Pilot", owner: "James Whitfield", targetSaaS: null, rationalization: null, capabilities: ["User-Facing App", "Workflow Automation"], scores: { impact: 7, effort: 6, risk: 2, alignment: 7 }, aiLevel: "Assist", sensitivity: "Confidential", blocker: null, pattern: "Approval Workflow", riskTier: "Medium", cluster: "HR & People", tools: ["Claude", "VS Code"], summary: "Self-service onboarding replacing paper checklist. Pilot: 43 new hires, completion 4.5→1.8 days. Gaps: benefits enrollment, IT asset assignment, plant worker differentiation.",
    inputs: [
      { type: "feedback", source: "New Hire Composite (5)", date: "Mar 28", text: "Checklist easier than paper. IT contact unclear first 2 days. Benefits enrollment confusing. Progress tracker appreciated. Want who's-who section." },
      { type: "telegram", source: "James Whitfield · #hr-innovation", date: "Mar 27", text: "43 new hires processed. 4.5→1.8 days. Pain points: (1) benefits manual, (2) IT disconnected, (3) plant reqs different. Guymon pilot next month." },
      { type: "meeting", source: "James ↔ Doug Biweekly · Week 14", date: "Apr 3", text: "Plant needs conditional logic (safety, PPE, shift). Tom Nguyen may have shared component. HRIS standalone for now, revisit after cross-environment pilot." }
    ]
  },
  { id: 4, name: "Feed Scheduling Optimizer", dept: "Feed Mills", type: "Process Automation", status: "In Progress", owner: "Carlos Reyes", targetSaaS: null, rationalization: null, capabilities: ["Scheduling & Planning", "Data Pipeline"], scores: { impact: 8, effort: 3, risk: 5, alignment: 9 }, aiLevel: "Augment", sensitivity: "Internal", blocker: "Compliance", pattern: "Scheduling", riskTier: "High", cluster: "Plant Operations", tools: ["Claude Code", "Python", "USDA API"], summary: "AI batch sequencing for 14 formulations, 3 lines. 22% changeover reduction. FDA medicated feed segregation not handled. Live Ops wants grow-out integration.",
    inputs: [
      { type: "process_doc", source: "St. Joseph Feed Mill Scheduling", date: "Mar 5", text: "14 formulations, 3 lines. Weekly Excel scheduling. Optimization: minimize changeover, waste, delays. 70% efficient, 30% lost to suboptimal sequencing and emergency rescheduling." },
      { type: "telegram", source: "Carlos Reyes · #feedmill-innovation", date: "Mar 18", text: "18 months production data + USDA formulation DB. AI reduces changeover 22%. BUT medicated segregation wrong — FDA requires full line flush. Must hard-code constraint." },
      { type: "email", source: "Live Operations → Carlos", date: "Mar 21", text: "Birds 4 days ahead at Hennessey, need finishing ration Thursday not Monday. Third emergency adjust this quarter. If AI can factor live growth data, game changer." }
    ]
  },
  { id: 5, name: "Brand Asset Generator", dept: "Marketing", type: "AI Capability", status: "Deployed", owner: "Priya Patel", targetSaaS: null, rationalization: null, capabilities: ["Document Generation"], scores: { impact: 6, effort: 8, risk: 1, alignment: 5 }, aiLevel: "Augment", sensitivity: "Internal", blocker: null, pattern: "Document Extraction", riskTier: "Low", cluster: "Marketing & Brand", tools: ["Claude API"], summary: "214 artifacts/month. Revision rate 41%→18%. Sales requesting regional pricing auto-population and current competitive data.",
    inputs: [
      { type: "output_sample", source: "Usage Log · March", date: "Mar 31", text: "214 artifacts: sell sheets (68), social (52), distributor (34), trade show (28), internal (22), export (10). 3.2 min avg. 18% revision rate. 4 brand compliance flags caught." },
      { type: "email", source: "Sales → Priya", date: "Mar 25", text: "Prairie Fresh Natural sell sheets are great. Need auto-populated regional pricing (6 regions) and current competitive data. Would use for every buyer meeting." }
    ]
  },
  { id: 6, name: "Security Compliance Scanner", dept: "IT / Innovation", type: "AI Capability", status: "In Progress", owner: "Ryan", targetSaaS: null, rationalization: null, capabilities: ["Compliance & Audit", "Integration Layer"], scores: { impact: 9, effort: 3, risk: 2, alignment: 10 }, aiLevel: "Automate", sensitivity: "Internal", blocker: null, pattern: "Monitoring", riskTier: "Medium", cluster: "Innovation Infrastructure", tools: ["Claude Code", "Python", "GitHub API"], summary: "Agentic pipeline: RSS ingestion → security scan → relevance evaluation → delivery. Stage 3 memory stale — needs initiative registry connection.",
    inputs: [
      { type: "architecture", source: "Ryan · Pipeline v2", date: "Mar 15", text: "4-stage pipeline. Ingestion (12 RSS + 4 newsletters), Security Screen (CVE, deps, exfil, license), Relevance (agent with initiative context, ≥7/10 flagged), Synthesis (summary + rationale). Gap: Stage 3 stale." },
      { type: "output_sample", source: "Telegram Alert", date: "Mar 28", text: "🔒 PASS | 8.4/10 | structured-output-parser v2.1. Standardized LLM output parsing. 6 initiatives use ad-hoc parsing. MIT license, clean scan. Action: adopt as standard." }
    ]
  },
  { id: 7, name: "Production QA Visual Monitor", dept: "Processing", type: "AI Capability", status: "Discovery", owner: "Tom Nguyen", targetSaaS: null, rationalization: null, capabilities: ["Data Pipeline", "Reporting & Analytics"], scores: { impact: 8, effort: 2, risk: 7, alignment: 8 }, aiLevel: "Experiment", sensitivity: "Internal", blocker: "Technical Feasibility", pattern: "Monitoring", riskTier: "Regulated", cluster: "Plant Operations", tools: ["TBD"], summary: "Camera-based QA supplement. 1,100 head/hr line. Discovery: hardware $64-180k, USDA regulatory path, 500 labeled images needed. 6-12 month initiative.",
    inputs: [
      { type: "discovery", source: "Tom ↔ Ryan · Office Hours", date: "Mar 18", text: "Accuracy drops last 2 hrs of shift. AI flags defects for human inspector. Supplement not replacement. 6-12 months minimum, not a vibe-coding project." },
      { type: "process_doc", source: "Tom's Research", date: "Mar 25", text: "Cameras $8-15k/unit, 8-12 needed. One recall = $2-5M. USDA 'decision support' path avoids full New Technology review. Need 500 labeled images." }
    ]
  },
  { id: 8, name: "Order Status Dashboard", dept: "Sales", type: "SaaS Replacement", status: "Discovery", owner: "Derek Bowman", targetSaaS: "Salesforce Reports ($95k/yr)", rationalization: "Replace", capabilities: ["Reporting & Analytics", "Data Pipeline"], scores: { impact: 7, effort: 5, risk: 4, alignment: 6 }, aiLevel: "Assist", sensitivity: "Confidential", blocker: "Data Access", pattern: "Dashboard", riskTier: "Medium", cluster: "Commercial & Sales", tools: ["TBD"], summary: "Replace Salesforce reporting. 6 managers × 45 min/Monday = 4.5 hrs/week on same report. Blocker: Salesforce + ERP data connectivity.",
    inputs: [
      { type: "telegram", source: "Derek Bowman · #sales-innovation", date: "Mar 14", text: "6 managers spend 45 min each Monday building same report with different filters. Auto-refreshing dashboard showing each rep's region = I'd trade Salesforce Reports tomorrow." },
      { type: "discovery", source: "Derek ↔ Innovation Team", date: "Mar 19", text: "Priority: order status, complaint trends, volume vs forecast, pricing exceptions. Sources: Salesforce, ERP, Excel. Need read-only API or scheduled exports." }
    ]
  },
  { id: 9, name: "Benefits Administration Portal", dept: "HR", type: "SaaS Replacement", status: "Blocked", owner: "Lisa Park", targetSaaS: "BambooHR ($65k/yr)", rationalization: "Replace", capabilities: ["User-Facing App", "Workflow Automation", "Compliance & Audit"], scores: { impact: 6, effort: 3, risk: 6, alignment: 5 }, aiLevel: "Assist", sensitivity: "Highly Sensitive", blocker: "Security", pattern: "Approval Workflow", riskTier: "Regulated", cluster: "HR & People", tools: ["Claude", "VS Code"], summary: "BLOCKED by InfoSec. Category 1 PII via external API. Path: separate AI workflow from PII backend. Worth $65k/yr effort?",
    inputs: [
      { type: "email", source: "IT Security → Lisa", date: "Mar 20", text: "Cannot approve. PII (SSN, DOB, medical) = Category 1. Browser storage not auditable. No RBAC. Path: AI handles workflow/UI, separate backend for PII." },
      { type: "telegram", source: "Lisa Park · #hr-innovation", date: "Mar 21", text: "Fair concerns. Real benefits data different from bootcamp synthetic data. Option (b) makes it much more complex. Worth it for $65k/yr?" }
    ]
  },
  { id: 10, name: "Dynamic Pricing Recommendations", dept: "Sales", type: "AI Capability", status: "Discovery", owner: "Derek Bowman (sponsor)", targetSaaS: null, rationalization: null, capabilities: ["Data Pipeline", "Reporting & Analytics"], scores: { impact: 9, effort: 1, risk: 5, alignment: 7 }, aiLevel: "Experiment", sensitivity: "Restricted", blocker: "Data Access", pattern: "HITL Routing", riskTier: "High", cluster: "Commercial & Sales", tools: ["TBD"], summary: "AI pricing for commodity pork, 3 pricing models, 200+ customers. No builder assigned. Parked until Order Status Dashboard proves connectivity.",
    inputs: [
      { type: "concept", source: "Derek Bowman", date: "Mar 10", text: "Daily CME pricing × 3 contract models × 200+ customers. Reps spend 30-60 min per complex quote. Need informed starting point, not auto-quoting." },
      { type: "risk", source: "Ryan Assessment", date: "Mar 15", text: "Complex data requirements. Pricing = competitive intelligence. No right builder. Parking until Order Status proves connectivity." }
    ]
  },
  { id: 11, name: "Route Optimization Tool", dept: "Supply Chain", type: "Process Automation", status: "Pilot", owner: "Angela Morrison", targetSaaS: null, rationalization: null, capabilities: ["Scheduling & Planning", "Data Pipeline"], scores: { impact: 8, effort: 5, risk: 4, alignment: 8 }, aiLevel: "Augment", sensitivity: "Internal", blocker: null, pattern: "Scheduling", riskTier: "Medium", cluster: "Logistics & Supply Chain", tools: ["Python", "OSRM"], summary: "8-week pilot: 11.8% fewer miles, ~$4,200/mo savings on 3 routes. Full fleet: $30k+/mo. Bridge issue fixed. Discussing live haul extension.",
    inputs: [
      { type: "memo", source: "Angela → Supply Chain VP", date: "Mar 28", text: "3 routes, alternating weeks. 11.8% fewer miles, equal completion. ~$4,200/mo. Full fleet (22 routes): $30k+/mo. One bridge clearance fail, fixed." },
      { type: "telegram", source: "Angela · #supplychain-innovation", date: "Apr 1", text: "OSRM truck profile added. OSM data good for 90%, misses rural farm roads. Commercial routing $15-20k/yr, fraction of savings. Live haul team interested." }
    ]
  },
  { id: 12, name: "USDA Documentation Generator", dept: "Processing", type: "Process Automation", status: "Deployed", owner: "Tom Nguyen", targetSaaS: null, rationalization: null, capabilities: ["Document Generation", "Compliance & Audit"], scores: { impact: 7, effort: 8, risk: 2, alignment: 7 }, aiLevel: "Augment", sensitivity: "Internal", blocker: null, pattern: "Document Extraction", riskTier: "Medium", cluster: "Compliance & Safety", tools: ["Claude API", "Tablet UI"], summary: "1,847 docs in 8 weeks, 2 plants. Saves ~15 hrs/week. Error 0.3% vs 4.1% manual. USDA approved. China protocol needed — bilingual, April 15 deadline.",
    inputs: [
      { type: "output_sample", source: "Tom · Deployment Summary", date: "Mar 30", text: "HACCP logs, sanitation checklists, shipping certs, export health certs. 0.3% error vs 4.1% manual. USDA inspector: 'No issues.'" },
      { type: "email", source: "Export Team → Tom", date: "Apr 2", text: "Need China protocol — ractopamine-free attestation, bilingual (English/Mandarin), AQSIQ number. First shipment April 15." }
    ]
  },
  { id: 13, name: "Ingredient Sourcing Tracker", dept: "Feed Mills", type: "Net-New Tool", status: "In Progress", owner: "Carlos Reyes", targetSaaS: null, rationalization: null, capabilities: ["Data Pipeline", "Reporting & Analytics"], scores: { impact: 6, effort: 6, risk: 3, alignment: 6 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Dashboard", riskTier: "Low", cluster: "Plant Operations", tools: ["Claude", "CSV tools"], summary: "Consolidates 4 data sources. V1: inventory, days of supply, pricing, <5-day alerts. Caught lysine shortage 4 days early. Next: automated refresh.",
    inputs: [
      { type: "telegram", source: "Carlos · #feedmill-innovation", date: "Mar 12", text: "Data in 4 places. Over-ordered soybean meal because procurement and ERP didn't sync. $8k unnecessary freight." },
      { type: "builder_log", source: "Carlos → Ryan", date: "Mar 16", text: "V1 built over weekend. CSV-fed dashboard. Caught lysine shortage 4 days early. Next: automate refresh." }
    ]
  },
  { id: 14, name: "Social Content Pipeline", dept: "Marketing", type: "SaaS Replacement", status: "In Progress", owner: "Priya Patel", targetSaaS: "Sprout Social ($40k/yr)", rationalization: "Reduce", capabilities: ["Document Generation", "Workflow Automation"], scores: { impact: 5, effort: 7, risk: 2, alignment: 4 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Document Extraction", riskTier: "Low", cluster: "Marketing & Brand", tools: ["Claude API"], summary: "Platform-specific social formatting. Strategic: Sprout value is scheduling, not content. Keep scheduling, retire content seats, save ~$25k. 'Replace vs reduce vs retain' case study.",
    inputs: [
      { type: "telegram", source: "Priya · #marketing-innovation", date: "Mar 22", text: "Extended for Instagram, Facebook, LinkedIn, X with platform-specific copy. Question: build scheduling too or overreach?" },
      { type: "telegram", source: "Ryan · Response", date: "Mar 22", text: "Keep Sprout for scheduling/analytics, kill content creation seats. $25k not $40k. Good case study for 'replace vs reduce vs retain.'" }
    ]
  },
  { id: 15, name: "Internal Knowledge Base", dept: "IT / Innovation", type: "AI Capability", status: "Discovery", owner: "Doug", targetSaaS: null, rationalization: null, capabilities: ["User-Facing App", "Data Pipeline", "Document Generation"], scores: { impact: 7, effort: 3, risk: 3, alignment: 7 }, aiLevel: "Assist", sensitivity: "Internal", blocker: "Ownership", pattern: "Search/Retrieval", riskTier: "Low", cluster: "Innovation Infrastructure", tools: ["TBD"], summary: "Searchable index of ~50 skill.md files, templates, decisions. Builders duplicate existing work. Ryan: require artifact registration. Connects to scanner stale-memory problem.",
    inputs: [
      { type: "concept", source: "Doug · Innovation Leads", date: "Mar 25", text: "~50 skill files, hundreds of templates, tribal knowledge. New cohort: 2 hrs finding resources. Need searchable knowledge base." },
      { type: "feedback", source: "Anonymous · Cohort 3", date: "Apr 1", text: "Spent two days building output parser Maria already built better. Need search." },
      { type: "telegram", source: "Ryan Response", date: "Mar 26", text: "Require artifact registration. Scanner agent needs initiative context — registry solves stale memory AND feeds knowledge base." }
    ]
  },
  { id: 16, name: "Maintenance Scheduling System", dept: "Operations", type: "SaaS Replacement", status: "Discovery", owner: "Unassigned", targetSaaS: "UpKeep CMMS ($75k/yr)", rationalization: "Replace", capabilities: ["Scheduling & Planning", "Workflow Automation"], scores: { impact: 7, effort: 3, risk: 5, alignment: 6 }, aiLevel: "Experiment", sensitivity: "Internal", blocker: "Ownership", pattern: "Scheduling", riskTier: "Medium", cluster: "Plant Operations", tools: ["TBD"], summary: "Replace UpKeep — $75k/yr, using 30% of features. Team not technical. Discovery not started — needs PM assignment.",
    inputs: [
      { type: "email", source: "Operations VP → Doug", date: "Mar 28", text: "$75k/yr for work orders and PM schedules. 30% feature utilization. Need dead simple replacement." },
      { type: "discovery", source: "Innovation Team Template", date: "Mar 29", text: "Discovery checklist: utilization audit, user interviews, data mapping, integration points, contract review, build estimate. NOT STARTED." }
    ]
  },
  { id: 17, name: "Regulatory Update Monitor", dept: "Compliance", type: "AI Capability", status: "In Progress", owner: "Ryan", targetSaaS: null, rationalization: null, capabilities: ["Data Pipeline", "Compliance & Audit", "Integration Layer"], scores: { impact: 8, effort: 5, risk: 2, alignment: 9 }, aiLevel: "Automate", sensitivity: "Internal", blocker: null, pattern: "Monitoring", riskTier: "Medium", cluster: "Compliance & Safety", tools: ["Claude Code", "Python", "RSS feeds"], summary: "Extension of Security Scanner for regulatory monitoring. Gap: can't map to specific facilities or initiatives. Needs registry for context.",
    inputs: [
      { type: "architecture", source: "Ryan · Extension Notes", date: "Mar 20", text: "Same pipeline, different sources: USDA FSIS, FDA, EPA, OSHA, state regs (KS/OK/CO). Agent can't map to specific facilities." },
      { type: "output_sample", source: "Regulatory Alert", date: "Mar 28", text: "📋 9.1/10 | USDA FSIS 6100.4 Rev 3. STEC sampling 1x→2x/week. Impacts Guymon + St. Joseph. USDA Doc Generator needs template update." }
    ]
  },
  { id: 18, name: "AID Bootcamp Progress Tracker", dept: "HR", type: "Net-New Tool", status: "In Progress", owner: "James Whitfield + Doug", targetSaaS: null, rationalization: null, capabilities: ["User-Facing App", "Reporting & Analytics"], scores: { impact: 5, effort: 7, risk: 1, alignment: 6 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Dashboard", riskTier: "Low", cluster: "Innovation Infrastructure", tools: ["Claude", "VS Code"], summary: "94 enrolled, 77% graduates active. Gap: no post-graduation skill tracking or builder-project matching. Plant underrepresented.",
    inputs: [
      { type: "output_sample", source: "Doug · Leads Meeting", date: "Mar 27", text: "Cohorts 1-3: 94 enrolled, 12 depts. C1 88%, C2 79%, C3 in progress. Post-bootcamp: 77% contributed. Plant lowest." },
      { type: "telegram", source: "Ryan · Feature Request", date: "Mar 28", text: "Which graduates are ready for complex initiatives? Skills matrix from actual work, not self-reported." },
      { type: "feedback", source: "Anonymous · Cohort 2", date: "Mar 20", text: "Built meeting notes summarizer. Works. But don't know what to do next. Want 'open projects matching your skills' dashboard." }
    ]
  },

  // ── EXPANSION INITIATIVES 19-88 ──
  // Each follows the same schema with new fields populated

  { id: 19, name: "Expense Report Auto-Audit", dept: "Accounting", type: "Process Automation", status: "Discovery", owner: "Jordan Ellis", targetSaaS: "Concur ($partial)", rationalization: "Reduce", capabilities: ["Compliance & Audit", "Workflow Automation", "Reporting & Analytics"], scores: { impact: 6, effort: 6, risk: 3, alignment: 6 }, aiLevel: "Augment", sensitivity: "Confidential", blocker: null, pattern: "Exception Triage", riskTier: "Medium", cluster: "Finance Automation", tools: ["Claude Code", "VS Code"], summary: "Pre-audit layer for expense reports. Rules engine for meal limits, hotel caps, duplicate receipts. 120 test reports: 84 clean, 29 review, 7 false positives from split receipts. Needs structured policy table.",
    inputs: [
      { type: "email", source: "Controller → Jordan", date: "Apr 1", text: "Expense review is weekly bottleneck. Managers inconsistent — one flags upgrades, another ignores. Need pre-audit routing exceptions to managers." },
      { type: "builder_log", source: "Expense Audit Prototype", date: "Apr 2", text: "1.8 hrs, Sonnet. Rules: meal limits, hotel caps, duplicate detection, missing receipts. Labels: clean/review/exception/insufficient. 120 tests: 84 clean, 29 review, 7 false positives. Blocked: need structured policy by role." }
    ]
  },
  { id: 20, name: "Vendor Contract Clause Extractor", dept: "Legal / Procurement", type: "AI Capability", status: "In Progress", owner: "Rachel Kim", targetSaaS: null, rationalization: null, capabilities: ["Document Generation", "Compliance & Audit", "Data Pipeline"], scores: { impact: 7, effort: 5, risk: 5, alignment: 7 }, aiLevel: "Augment", sensitivity: "Confidential", blocker: null, pattern: "Document Extraction", riskTier: "High", cluster: "Finance Automation", tools: ["Claude Code", "VS Code"], summary: "Extracts renewal dates, termination notice, auto-renewal, price escalation, liability caps from vendor contracts. Struggles with amendments and scanned PDFs. Legal needs source page + confidence per field.",
    inputs: [
      { type: "telegram", source: "Rachel Kim · #procurement-innovation", date: "Apr 3", text: "Clause extractor working on simple agreements. Pulls renewal, termination, auto-renewal, pricing, liability, data processing, audit rights. Struggles with amendments and exhibits. Need source page + excerpt for Legal trust." },
      { type: "meeting", source: "Legal Review Notes", date: "Apr 4", text: "Extractor useful as triage, not decision-maker. Every clause needs page + confidence. Priority: renewal risk — auto-renewing contracts within 120 days needing 60-day notice. Mark 'not found' clearly." }
    ]
  },
  { id: 21, name: "Cash Flow Variance Explainer", dept: "Finance", type: "Reporting & Analytics", status: "Pilot", owner: "Jordan Ellis", targetSaaS: null, rationalization: null, capabilities: ["Reporting & Analytics", "Document Generation", "Data Pipeline"], scores: { impact: 7, effort: 6, risk: 4, alignment: 7 }, aiLevel: "Augment", sensitivity: "Restricted", blocker: null, pattern: "Document Extraction", riskTier: "High", cluster: "Finance Automation", tools: ["Claude Code", "VS Code"], summary: "Generates first-draft cash flow commentary. Groups variances into operating, working capital, financing, timing. Over-explains small variances — needs materiality threshold.",
    inputs: [
      { type: "email", source: "CFO → Finance", date: "Apr 1", text: "Commentary takes too long and reads like copied numbers. Need draft explaining what changed and why. Jordan edits before monthly package." },
      { type: "builder_log", source: "Cash Variance v2", date: "Apr 4", text: "Connected GL, AR aging, inventory, freight accrual. Groups by operating/working capital/financing/timing. Correctly identified March dip from corn purchases + delayed national account receipts. Issue: over-explains small variances." }
    ]
  },
  { id: 22, name: "Intercompany Reconciliation Assistant", dept: "Accounting", type: "Process Automation", status: "Discovery", owner: "Maria Chen + Jordan Ellis", targetSaaS: "Oracle ($partial)", rationalization: "Reduce", capabilities: ["Data Pipeline", "Workflow Automation", "Compliance & Audit"], scores: { impact: 8, effort: 3, risk: 6, alignment: 8 }, aiLevel: "Augment", sensitivity: "Restricted", blocker: "Data Access", pattern: "HITL Routing", riskTier: "High", cluster: "Finance Automation", tools: ["Claude Code"], summary: "Matcher for intercompany transactions. 71% match rate, misses from timing differences. Needs confidence score and human review queue like AP Engine.",
    inputs: [
      { type: "process_doc", source: "Intercompany Reconciliation", date: "Apr 1", text: "Export entity transactions from Oracle, manually match receivables/payables. Common mismatches: timing, freight allocation, currency, coding errors. Takes 2-3 days during close." },
      { type: "telegram", source: "Maria · #accounting-innovation", date: "Apr 3", text: "71% match rate on synthetic data. Misses mostly timing (Mar 31 vs Apr 1). +/- 5 day window improved but created false matches on recurring freight. Needs confidence score + HITL queue." }
    ]
  },
  { id: 23, name: "Budget Forecast Adjustment Tool", dept: "Finance", type: "AI Capability", status: "Discovery", owner: "CFO sponsoring", targetSaaS: null, rationalization: null, capabilities: ["Reporting & Analytics", "Data Pipeline", "Document Generation"], scores: { impact: 8, effort: 2, risk: 5, alignment: 8 }, aiLevel: "Experiment", sensitivity: "Restricted", blocker: "Data Access", pattern: "HITL Routing", riskTier: "High", cluster: "Finance Automation", tools: ["TBD"], summary: "AI-suggested forecast adjustments from operating signals. High-value but premature — needs Financial Reporting and Ingredient Sourcing to mature first.",
    inputs: [
      { type: "concept", source: "CFO Concept Note", date: "Apr 2", text: "Forecasts too slow. Feed pricing, hog weights, export demand shift within a month. Want suggested adjustments each BU owner can accept/override/comment." },
      { type: "risk", source: "Ryan Assessment", date: "Apr 3", text: "High-value but premature. Requires trusted data feeds. Sequence after Financial Reporting and Ingredient Sourcing. Frame as 'forecast support' not 'automated forecasting.'" }
    ]
  },
  { id: 24, name: "Recurring Payment Monitor", dept: "Accounting / Procurement", type: "Process Automation", status: "In Progress", owner: "Rachel Kim", targetSaaS: null, rationalization: null, capabilities: ["Reporting & Analytics", "Compliance & Audit", "Data Pipeline"], scores: { impact: 6, effort: 7, risk: 2, alignment: 8 }, aiLevel: "Assist", sensitivity: "Confidential", blocker: null, pattern: "Exception Triage", riskTier: "Low", cluster: "Finance Automation", tools: ["Claude", "CSV tools"], summary: "Found 17 untracked recurring charges. Creates review queue with evidence. Feeds SaaS rationalization. Fast win — one canceled duplicate justifies prototype.",
    inputs: [
      { type: "telegram", source: "Rachel · #procurement-innovation", date: "Apr 5", text: "Found 17 recurring charges not in SaaS tracker. $499/mo, $1,200/quarter, $8k annual. Several have unknown ownership. Feeds directly into rationalization." },
      { type: "meeting", source: "Rachel ↔ Doug", date: "Apr 6", text: "Separate: legitimate recurring, duplicate subs, unknown ownership. First version: review queue with invoice history, frequency, department, last requester. Don't auto-recommend cancellation." }
    ]
  },
  { id: 25, name: "Audit Trail Generator", dept: "Finance / Compliance", type: "Compliance & Audit", status: "Discovery", owner: "Jordan Ellis", targetSaaS: null, rationalization: null, capabilities: ["Document Generation", "Compliance & Audit", "Workflow Automation"], scores: { impact: 7, effort: 4, risk: 5, alignment: 7 }, aiLevel: "Assist", sensitivity: "Restricted", blocker: "Security", pattern: "Document Extraction", riskTier: "High", cluster: "Compliance & Safety", tools: ["TBD"], summary: "Generates audit packets for selected controls. Cannot invent evidence. First pilot: low-risk controls (AP aging review, vendor master changes).",
    inputs: [
      { type: "process_doc", source: "Internal Audit Request", date: "Apr 3", text: "Finance spends too much time pulling evidence. Tool generates packet: what was done, who approved, when, source records, exceptions." },
      { type: "risk", source: "Ryan Risk Note", date: "Apr 4", text: "Trust bar is high. Cannot summarize unsupported activity. Every statement needs source link. Start with low-risk recurring controls." }
    ]
  },
  { id: 26, name: "Fixed Asset Depreciation Tracker", dept: "Accounting", type: "Process Automation", status: "Discovery", owner: "Maria Chen", targetSaaS: null, rationalization: null, capabilities: ["Data Pipeline", "Reporting & Analytics", "Compliance & Audit"], scores: { impact: 5, effort: 6, risk: 3, alignment: 5 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "HITL Routing", riskTier: "Low", cluster: "Finance Automation", tools: ["Claude", "VS Code"], summary: "Suggests asset category, useful life, depreciation start from purchase descriptions. Struggles with bundled projects — needs split-allocation workflow.",
    inputs: [
      { type: "process_doc", source: "Fixed Asset Workflow", date: "Apr 2", text: "Capital purchases tracked in Excel. Operations sends incomplete details. Classification, useful life, dates entered manually. Errors caught at close." },
      { type: "builder_log", source: "Maria Builder Note", date: "Apr 5", text: "Prototype reads purchase files, suggests category/life/start date. Works for obvious equipment. Struggles with bundled projects — needs split-allocation." }
    ]
  },
  { id: 27, name: "Invoice Fraud Detection Layer", dept: "Accounting / IT Security", type: "AI Capability", status: "Discovery", owner: "Ryan + Maria Chen", targetSaaS: null, rationalization: null, capabilities: ["Compliance & Audit", "Data Pipeline", "Reporting & Analytics"], scores: { impact: 8, effort: 4, risk: 4, alignment: 8 }, aiLevel: "Augment", sensitivity: "Restricted", blocker: "Security", pattern: "Exception Triage", riskTier: "High", cluster: "Finance Automation", tools: ["Claude Code"], summary: "Separate fraud risk score from AP matching confidence. Flags: new bank account, urgent language, threshold-adjacent amounts, domain mismatch, remittance changes. Needs InfoSec review.",
    inputs: [
      { type: "process_doc", source: "Security Debrief", date: "Apr 1", text: "Fraudulent vendor payment caught manually. Exposed weakness in relying on individual memory for suspicious indicators." },
      { type: "telegram", source: "Maria · #accounting-innovation", date: "Apr 4", text: "Added fraud flags as separate score from matching confidence. High-confidence match can still be high-risk payment if bank details changed. Need InfoSec input." }
    ]
  },
  { id: 28, name: "Month-End Close Checklist Engine", dept: "Accounting", type: "Net-New Tool", status: "Pilot", owner: "Jordan Ellis", targetSaaS: null, rationalization: null, capabilities: ["Workflow Automation", "Reporting & Analytics", "User-Facing App"], scores: { impact: 6, effort: 8, risk: 2, alignment: 6 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Approval Workflow", riskTier: "Low", cluster: "Finance Automation", tools: ["Claude", "VS Code"], summary: "43 close tasks with owners, dependencies, due dates, blockers. Dependency visibility shows downstream impacts. Generates daily close summary for Controller.",
    inputs: [
      { type: "telegram", source: "Jordan · #accounting-innovation", date: "Apr 6", text: "Close checklist v1 live. 43 tasks with dependencies. When AP accruals late, shows which downstream reports affected. Generates daily close summary." },
      { type: "feedback", source: "Controller", date: "Apr 7", text: "Better than spreadsheet — see blockers in one place. Add templates by close day (Day -1 through Day 3) and 'at risk' flag for 4+ hour dependency delays." }
    ]
  },
  { id: 29, name: "Shift Scheduling Optimizer", dept: "HR / Processing", type: "Process Automation", status: "Discovery", owner: "James Whitfield", targetSaaS: "Kronos ($partial)", rationalization: "Augment", capabilities: ["Scheduling & Planning", "Data Pipeline", "Workflow Automation"], scores: { impact: 8, effort: 3, risk: 6, alignment: 8 }, aiLevel: "Augment", sensitivity: "Confidential", blocker: "Compliance", pattern: "Scheduling", riskTier: "High", cluster: "Plant Operations", tools: ["TBD"], summary: "Optimize shift assignments for 2,000+ plant workers. Must handle certifications, labor law, seniority, union rules. Kronos stays as system of record — this augments, not replaces.",
    inputs: [
      { type: "concept", source: "HR VP + Plant HR", date: "Apr 3", text: "Shift scheduling handles 2,000+ across two plants. Must account for certifications, mandatory rest, overtime rules, seniority, cross-training, and union agreements." },
      { type: "risk", source: "HR Legal", date: "Apr 4", text: "Must not violate labor law, collective bargaining, or overtime rules. AI suggests, supervisor decides. Need audit trail. Start with one shift type at one facility." }
    ]
  },
  { id: 30, name: "Attrition Risk Predictor", dept: "HR", type: "Reporting & Analytics", status: "Discovery", owner: "HR VP sponsoring", targetSaaS: null, rationalization: null, capabilities: ["Reporting & Analytics", "Data Pipeline"], scores: { impact: 7, effort: 2, risk: 7, alignment: 6 }, aiLevel: "Experiment", sensitivity: "Highly Sensitive", blocker: "Compliance", pattern: null, riskTier: "Regulated", cluster: "HR & People", tools: ["TBD"], summary: "Pattern detection for turnover signals. MUST be aggregate-only first phase — no individual scoring, no protected class variables. Ethics review required.",
    inputs: [
      { type: "concept", source: "HR VP", date: "Apr 5", text: "Exit interview data, tenure, absenteeism, shift assignment, pay history. Want pattern detection by role, facility, tenure band. Not individual risk labels." },
      { type: "risk", source: "InfoSec / Ethics Review", date: "Apr 6", text: "Elevated review required. No individual scoring. No protected class variables. Start descriptive, not predictive. HR Legal must review any use of performance data." }
    ]
  },
  { id: 31, name: "Internal Mobility Matcher", dept: "HR / Innovation", type: "Net-New Tool", status: "In Progress", owner: "James Whitfield", targetSaaS: null, rationalization: null, capabilities: ["User-Facing App", "Reporting & Analytics", "Document Generation"], scores: { impact: 6, effort: 6, risk: 3, alignment: 7 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Search/Retrieval", riskTier: "Low", cluster: "HR & People", tools: ["Claude", "VS Code"], summary: "Matches bootcamp graduates to project opportunities. Shows strong/stretch/not recommended. Project owner approval required.",
    inputs: [
      { type: "feedback", source: "Employee", date: "Apr 4", text: "Finished bootcamp, want technical project work 2-5 hrs/week. Job board only shows formal positions, not project opportunities." },
      { type: "builder_log", source: "Mobility Matcher v1", date: "Apr 7", text: "Matching logic: demonstrated capabilities, cohort, department, availability. Output: strong/stretch/not recommended. Added project owner approval step." }
    ]
  },
  { id: 32, name: "Training Completion Tracker", dept: "HR / Compliance", type: "SaaS Replacement", status: "Discovery", owner: "Lisa Park", targetSaaS: "Cornerstone ($partial)", rationalization: "Augment", capabilities: ["Reporting & Analytics", "Compliance & Audit", "Workflow Automation"], scores: { impact: 6, effort: 5, risk: 4, alignment: 6 }, aiLevel: "Assist", sensitivity: "Confidential", blocker: null, pattern: "Dashboard", riskTier: "Medium", cluster: "Compliance & Safety", tools: ["TBD"], summary: "Plant-friendly training status: eligible/missing refresher/expired certification. Role-based rules, plant-specific views. Pilot: forklift, lockout-tagout, sanitation, HACCP.",
    inputs: [
      { type: "email", source: "Compliance Training Coordinator", date: "Apr 3", text: "Cornerstone reports unusable for plant supervisors. Need plain language: eligible, missing refresher, expired cert, cannot assign to role." },
      { type: "process_doc", source: "Process Notes", date: "Apr 4", text: "Requirements vary by role, facility, task, export market. Plant = group sessions by shift. First pilot: forklift, lockout-tagout, sanitation, HACCP." }
    ]
  },
  { id: 33, name: "Incident Report Generator", dept: "HR / Safety", type: "Process Automation", status: "Pilot", owner: "Safety Manager (Guymon)", targetSaaS: null, rationalization: null, capabilities: ["Document Generation", "Compliance & Audit", "Workflow Automation"], scores: { impact: 7, effort: 6, risk: 5, alignment: 7 }, aiLevel: "Assist", sensitivity: "Confidential", blocker: null, pattern: "HITL Routing", riskTier: "Regulated", cluster: "Compliance & Safety", tools: ["Claude", "Tablet UI"], summary: "Supervisor enters plain language → generates incident summary, witness checklist, corrective actions, OSHA log draft. Safety Manager reviews before OSHA entry.",
    inputs: [
      { type: "telegram", source: "Safety Team", date: "Apr 7", text: "Works for minor incidents and near misses. Supervisors like not remembering every field. Safety likes completeness." },
      { type: "risk", source: "Risk Review", date: "Apr 8", text: "Must not classify medical severity beyond approved definitions. Prompt for facts, don't speculate. Human review before OSHA logs." }
    ]
  },
  { id: 34, name: "Candidate Screening Assistant", dept: "HR / Recruiting", type: "AI Capability", status: "Discovery", owner: "Recruiting Manager", targetSaaS: null, rationalization: null, capabilities: ["Reporting & Analytics", "Document Generation", "Workflow Automation"], scores: { impact: 7, effort: 4, risk: 7, alignment: 5 }, aiLevel: "Assist", sensitivity: "Highly Sensitive", blocker: "Compliance", pattern: "HITL Routing", riskTier: "Regulated", cluster: "HR & People", tools: ["TBD"], summary: "Resume summarization and completeness checks. NOT scoring or ranking. Job-related criteria only. Recruiter remains decision-maker.",
    inputs: [
      { type: "process_doc", source: "Recruiter Note", date: "Apr 5", text: "High-volume plant roles create backlogs. Need structured summaries: experience, certs, location, shift preference, open questions." },
      { type: "risk", source: "HR Legal", date: "Apr 6", text: "Must not make employment decisions. No protected class inference. Job-related criteria only. First MVP: summarization and completeness only." }
    ]
  },
  { id: 35, name: "Employee Sentiment Analyzer", dept: "HR", type: "Reporting & Analytics", status: "Discovery", owner: "HR Business Partner team", targetSaaS: null, rationalization: null, capabilities: ["Reporting & Analytics", "Document Generation"], scores: { impact: 5, effort: 5, risk: 6, alignment: 5 }, aiLevel: "Assist", sensitivity: "Highly Sensitive", blocker: "Compliance", pattern: null, riskTier: "Regulated", cluster: "HR & People", tools: ["TBD"], summary: "Themes from surveys and exit interviews by facility, role, tenure. Must aggregate and anonymize. No Telegram/chat ingestion without policy approval.",
    inputs: [
      { type: "meeting", source: "HRBP Meeting", date: "Apr 4", text: "Manual analysis focuses on loudest comments. Want themes by facility, role, tenure, issue type. Goal: see patterns earlier." },
      { type: "risk", source: "Ryan Assessment", date: "Apr 5", text: "Useful but sensitive. Aggregate only. No connecting named comments to individuals. Process anonymized survey exports. Good example where governance defines the boundary." }
    ]
  },
  { id: 36, name: "PTO Approval Workflow", dept: "HR / Operations", type: "Process Automation", status: "Discovery", owner: "Plant HR Lead", targetSaaS: "Kronos ($partial)", rationalization: "Augment", capabilities: ["Workflow Automation", "Scheduling & Planning", "User-Facing App"], scores: { impact: 6, effort: 4, risk: 5, alignment: 5 }, aiLevel: "Assist", sensitivity: "Confidential", blocker: null, pattern: "HITL Routing", riskTier: "Medium", cluster: "HR & People", tools: ["TBD"], summary: "Coverage risk indicator for PTO approvals. Supervisors still decide — tool shows impact of approval on staffing/certifications.",
    inputs: [
      { type: "feedback", source: "Supervisor", date: "Apr 3", text: "PTO approved manually without clear coverage view. Three people with same cert already out. Need coverage risk, not auto-deny." },
      { type: "process_doc", source: "Process Note", date: "Apr 4", text: "Inputs: PTO balance, shift schedule, certifications, min staffing, approved PTO, blackout periods. MVP: risk indicator + suggested alternatives." }
    ]
  },
  { id: 37, name: "Safety Training Compliance Tracker", dept: "Safety / HR", type: "Compliance & Audit", status: "In Progress", owner: "Safety Manager + Lisa Park", targetSaaS: null, rationalization: null, capabilities: ["Compliance & Audit", "Reporting & Analytics", "Workflow Automation"], scores: { impact: 7, effort: 7, risk: 3, alignment: 7 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Dashboard", riskTier: "Medium", cluster: "Compliance & Safety", tools: ["Claude", "VS Code"], summary: "Shows expired certifications by facility/role. 'Cannot assign' flags are most actionable feature. Supervisor alerts 14 days before expiry.",
    inputs: [
      { type: "telegram", source: "Safety Manager", date: "Apr 6", text: "Training matrix uploaded, dashboard works. Expired certs by facility and role. 'Cannot assign' flag is actionable. Employee can work packaging but not sanitation until chemical handling refresher." },
      { type: "feedback", source: "Feature Request", date: "Apr 7", text: "Add 14-day pre-expiry alerts. Printable shift roster with training status only, not full history. HR wants audit export of notifications." }
    ]
  },
  { id: 38, name: "New Manager Coaching Assistant", dept: "HR", type: "AI Capability", status: "Discovery", owner: "James Whitfield", targetSaaS: null, rationalization: null, capabilities: ["User-Facing App", "Document Generation"], scores: { impact: 5, effort: 6, risk: 4, alignment: 5 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Search/Retrieval", riskTier: "Low", cluster: "HR & People", tools: ["Claude"], summary: "Guidance for new supervisors on common HR questions. Points to approved policy, templates, escalation rules. Must include escalation triggers for sensitive topics.",
    inputs: [
      { type: "concept", source: "HR Concept Note", date: "Apr 5", text: "New supervisors ask same questions: attendance conversations, coaching docs, escalation, difficult conversations. Guidance from approved policy and templates." },
      { type: "risk", source: "HR Legal Review", date: "Apr 6", text: "Must not provide legal advice. Points to policy, suggests structure, reminds when HR should be involved. Escalation triggers for termination, harassment, discrimination, medical accommodation." }
    ]
  },
  { id: 39, name: "Shipment Delay Prediction Engine", dept: "Supply Chain", type: "AI Capability", status: "In Progress", owner: "Angela Morrison", targetSaaS: null, rationalization: null, capabilities: ["Data Pipeline", "Reporting & Analytics", "Scheduling & Planning"], scores: { impact: 8, effort: 5, risk: 4, alignment: 8 }, aiLevel: "Augment", sensitivity: "Internal", blocker: null, pattern: "Monitoring", riskTier: "Medium", cluster: "Logistics & Supply Chain", tools: ["Python", "Claude Code"], summary: "Flagged 12 high-risk shipments, 8 actually late. Misses from plant loading delays not captured. Sales wants 6-hour early warning.",
    inputs: [
      { type: "telegram", source: "Angela · #supplychain-innovation", date: "Apr 7", text: "Delay model v1 useful. Inputs: carrier history, route, weather, loading delays, appointment windows. 12 flagged, 8 late. Misses from dock data gaps." },
      { type: "email", source: "Sales Escalation", date: "Apr 8", text: "If this can warn Sales 6 hours before customer calls, we need it. Even imperfect prediction lets us proactively reset expectations." }
    ]
  },
  { id: 40, name: "Cold Chain Temperature Monitor", dept: "Supply Chain / QA", type: "AI Capability", status: "Discovery", owner: "QA Logistics Lead", targetSaaS: null, rationalization: null, capabilities: ["Data Pipeline", "Compliance & Audit", "Reporting & Analytics"], scores: { impact: 8, effort: 3, risk: 7, alignment: 8 }, aiLevel: "Assist", sensitivity: "Internal", blocker: "Compliance", pattern: "Exception Triage", riskTier: "Regulated", cluster: "Compliance & Safety", tools: ["TBD"], summary: "Classify temperature excursions by severity. QA makes disposition decisions. First MVP: historical analysis, not real-time. Food safety thresholds from QA, not model.",
    inputs: [
      { type: "process_doc", source: "QA Logistics Note", date: "Apr 5", text: "Temperature data available but exception review inconsistent. Loading spike ≠ sustained transit issue. Need severity classification. Current: someone opens PDFs after delivery." },
      { type: "risk", source: "Risk Assessment", date: "Apr 6", text: "Food safety = high risk. QA makes final disposition. First MVP: historical risk summaries only. All thresholds from QA-approved rules, not model inference." }
    ]
  },
  { id: 41, name: "Dock Scheduling Optimizer", dept: "Supply Chain / Processing", type: "Process Automation", status: "Pilot", owner: "Angela Morrison", targetSaaS: null, rationalization: null, capabilities: ["Scheduling & Planning", "Workflow Automation", "Reporting & Analytics"], scores: { impact: 7, effort: 6, risk: 3, alignment: 7 }, aiLevel: "Augment", sensitivity: "Internal", blocker: null, pattern: "Scheduling", riskTier: "Medium", cluster: "Logistics & Supply Chain", tools: ["Python", "Claude Code"], summary: "Guymon dock pilot: carrier wait 71→46 min. Failure mode: late production updates. Override button requested by supervisors.",
    inputs: [
      { type: "memo", source: "Pilot Memo", date: "Apr 8", text: "2-week Guymon outbound. Wait time 71→46 min. Sequences by product availability, trailer type, bay constraints, customer priority. Failure: late production updates." },
      { type: "feedback", source: "Dock Supervisor", date: "Apr 9", text: "Need override button. Sometimes carrier running out of hours or customer load must go first. Let me override and capture reason." }
    ]
  },
  { id: 42, name: "Carrier Performance Scoring", dept: "Supply Chain / Procurement", type: "Reporting & Analytics", status: "Discovery", owner: "Angela Morrison", targetSaaS: null, rationalization: null, capabilities: ["Reporting & Analytics", "Data Pipeline"], scores: { impact: 6, effort: 6, risk: 3, alignment: 6 }, aiLevel: "Assist", sensitivity: "Internal", blocker: "Data Access", pattern: "Dashboard", riskTier: "Low", cluster: "Logistics & Supply Chain", tools: ["Python", "CSV tools"], summary: "Consistent carrier scorecard: on-time, claims, temperature, tender acceptance, cost. Needed before next carrier negotiation cycle.",
    inputs: [
      { type: "concept", source: "Procurement Note", date: "Apr 6", text: "Carrier selection too relationship-driven. Need consistent scorecard across lanes: on-time, claims, temperature, tender acceptance, cost per mile." },
      { type: "telegram", source: "Angela · #supplychain", date: "Apr 7", text: "Started with shipment data merge from 3 sources. Can build scorecard by carrier and lane. Some carriers look great on cost but terrible on claims." }
    ]
  },
  { id: 43, name: "Inventory Rebalancing Recommender", dept: "Sales / Supply Chain", type: "AI Capability", status: "Discovery", owner: "Derek Bowman + Angela Morrison", targetSaaS: null, rationalization: null, capabilities: ["Reporting & Analytics", "Data Pipeline", "Scheduling & Planning"], scores: { impact: 7, effort: 3, risk: 4, alignment: 7 }, aiLevel: "Experiment", sensitivity: "Confidential", blocker: "Data Access", pattern: "HITL Routing", riskTier: "Medium", cluster: "Logistics & Supply Chain", tools: ["TBD"], summary: "Identify regional inventory imbalances and recommend transfer/discount/redirect. Depends on Order Status and Route Optimization data connectivity.",
    inputs: [
      { type: "concept", source: "Sales Ops Brief", date: "Apr 6", text: "Some regions short, others hold excess near expiration. Need recommendations: transfer, discount, redirect, hold. Requires product age, demand, freight cost, margin impact." },
      { type: "risk", source: "Ryan Assessment", date: "Apr 7", text: "Good candidate after Order Status + Route Optimization prove data patterns. Risk: recommendations that look good on inventory but bad on margin. First MVP: identify imbalances, show tradeoffs." }
    ]
  },
  { id: 44, name: "Freight Cost Anomaly Detector", dept: "Supply Chain / Accounting", type: "Process Automation", status: "In Progress", owner: "Angela Morrison + AP team", targetSaaS: null, rationalization: null, capabilities: ["Data Pipeline", "Compliance & Audit", "Reporting & Analytics"], scores: { impact: 7, effort: 6, risk: 3, alignment: 7 }, aiLevel: "Augment", sensitivity: "Confidential", blocker: null, pattern: "Exception Triage", riskTier: "Medium", cluster: "Logistics & Supply Chain", tools: ["Claude Code", "Python"], summary: "Matches freight invoices to shipment records and contracts. Found 14/220 questionable charges, mostly detention without supporting timestamps. Needs clause extractor from Initiative 20.",
    inputs: [
      { type: "email", source: "AP → Angela", date: "Apr 5", text: "Freight invoices with accessorials (detention, layover, fuel surcharge) — AP can't validate without shipment events and contract terms." },
      { type: "builder_log", source: "Freight Anomaly v1", date: "Apr 8", text: "Matched invoices to shipments and contracts. 14/220 questionable. Mostly detention where timestamps don't support billed hours. Blocked: contract terms are PDFs — need clause extractor." }
    ]
  },
  { id: 45, name: "Live Haul Coordination Dashboard", dept: "Live Operations", type: "Net-New Tool", status: "Discovery", owner: "Live Ops Transportation Lead", targetSaaS: null, rationalization: null, capabilities: ["Scheduling & Planning", "Data Pipeline", "Reporting & Analytics"], scores: { impact: 9, effort: 2, risk: 7, alignment: 9 }, aiLevel: "Experiment", sensitivity: "Internal", blocker: "Technical Feasibility", pattern: "Dashboard", riskTier: "High", cluster: "Plant Operations", tools: ["TBD"], summary: "Complex scheduling: farm locations, animal welfare transit limits, weather, plant capacity, biosecurity. Start with visibility dashboard, not optimization.",
    inputs: [
      { type: "discovery", source: "Live Ops Interview", date: "Apr 7", text: "More constraints than normal freight: welfare limits, weather, plant capacity, trailer availability, driver hours, biosecurity, target weights. Coordination via calls and spreadsheets." },
      { type: "risk", source: "Ryan Assessment", date: "Apr 8", text: "Not a bootcamp project. First step: visibility dashboard — planned pickups, plant windows, route status, constraint violations. Don't start with optimization." }
    ]
  },
  { id: 46, name: "Backhaul Opportunity Finder", dept: "Supply Chain", type: "Reporting & Analytics", status: "Discovery", owner: "Angela Morrison", targetSaaS: null, rationalization: null, capabilities: ["Data Pipeline", "Scheduling & Planning", "Reporting & Analytics"], scores: { impact: 6, effort: 5, risk: 3, alignment: 6 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Search/Retrieval", riskTier: "Low", cluster: "Logistics & Supply Chain", tools: ["Python"], summary: "Surface nearby pickup opportunities after delivery. Uses route data from optimization pilot. Show matches, don't auto-book.",
    inputs: [
      { type: "concept", source: "Dispatcher Note", date: "Apr 7", text: "Trucks return empty. Need to identify compatible loads by delivery location, trailer type, temperature, driver hours, return route." },
      { type: "telegram", source: "Angela · #supplychain", date: "Apr 8", text: "Already have route data from pilot. Add delivery time and trailer availability to surface possible backhauls. Internal transfers first or external load boards?" }
    ]
  },
  { id: 47, name: "Packaging Material Forecasting", dept: "Procurement / Processing", type: "AI Capability", status: "In Progress", owner: "Procurement Packaging Buyer", targetSaaS: null, rationalization: null, capabilities: ["Data Pipeline", "Reporting & Analytics", "Scheduling & Planning"], scores: { impact: 6, effort: 6, risk: 3, alignment: 6 }, aiLevel: "Augment", sensitivity: "Internal", blocker: null, pattern: "Monitoring", riskTier: "Low", cluster: "Plant Operations", tools: ["Claude", "CSV tools"], summary: "Forecasts packaging demand from production schedule. Caught bilingual export label shortage. Substitution logic needs approval workflow.",
    inputs: [
      { type: "telegram", source: "Procurement Buyer", date: "Apr 7", text: "Labels, boxes, film tied to customer orders and country requirements. Caught shortage of bilingual Mexico export labels for next month." },
      { type: "feedback", source: "Processing Supervisor", date: "Apr 8", text: "Substitutions complicated — Sales promised branded cases, QA requires specific labels for export. Need 'substitution allowed' field and approval." }
    ]
  },
  { id: 48, name: "Export Documentation Tracker", dept: "Export / Compliance", type: "Process Automation", status: "Pilot", owner: "Export Documentation Lead", targetSaaS: null, rationalization: null, capabilities: ["Compliance & Audit", "Workflow Automation", "Document Generation"], scores: { impact: 8, effort: 6, risk: 5, alignment: 8 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Approval Workflow", riskTier: "High", cluster: "Compliance & Safety", tools: ["Claude", "VS Code"], summary: "Country-specific document checklists for Japan, Korea, Mexico, China. Flags outdated certificate templates. Export Compliance retains final review.",
    inputs: [
      { type: "output_sample", source: "Export Team Update", date: "Apr 8", text: "V1 covers 4 markets. Shows required docs, owner, due date, status, missing fields. Flags outdated templates — people were using old language requirements." },
      { type: "risk", source: "Compliance Review", date: "Apr 9", text: "Export errors delay shipments or create regulatory problems. Tool assembles and validates, does not certify. Final review stays with Export Compliance. Need template version audit trail." }
    ]
  },
  { id: 49, name: "Line Downtime Root Cause Analyzer", dept: "Processing / Operations", type: "Reporting & Analytics", status: "Discovery", owner: "Plant Operations Manager", targetSaaS: null, rationalization: null, capabilities: ["Reporting & Analytics", "Data Pipeline"], scores: { impact: 8, effort: 4, risk: 4, alignment: 8 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Dashboard", riskTier: "Medium", cluster: "Plant Operations", tools: ["Python", "Claude Code"], summary: "Clustered 6 months of downtime logs into 12 root cause categories. Found 'equipment down' hid 3 distinct patterns. Needs follow-up prompts for vague descriptions.",
    inputs: [
      { type: "process_doc", source: "Downtime Logs", date: "Apr 6", text: "Supervisors log inconsistently: 'jam,' 'belt issue,' 'waiting on QA.' Weekly reports show minutes but not reliable root causes." },
      { type: "builder_log", source: "Downtime Analyzer v1", date: "Apr 9", text: "Cleaned 6 months, clustered into 12 categories. 'Equipment down' hid: conveyor jams after sanitation, scale calibration delays, packaging film breaks. Need follow-up prompt for vague descriptions." }
    ]
  },
  { id: 50, name: "Yield Optimization Assistant", dept: "Processing / Finance", type: "AI Capability", status: "Discovery", owner: "Plant Controller", targetSaaS: null, rationalization: null, capabilities: ["Data Pipeline", "Reporting & Analytics"], scores: { impact: 9, effort: 2, risk: 6, alignment: 9 }, aiLevel: "Experiment", sensitivity: "Confidential", blocker: "Data Access", pattern: "Dashboard", riskTier: "High", cluster: "Plant Operations", tools: ["TBD"], summary: "Small yield changes = large financial impact. First phase: data readiness and dashboarding. Staged roadmap: visibility → explanation → recommendation.",
    inputs: [
      { type: "concept", source: "Plant Controller", date: "Apr 7", text: "Track input/output weight, trim, rework, waste, line speed. Analysis is retrospective — shift already over. Need real-time visibility into where yield loss occurs." },
      { type: "risk", source: "Ryan Assessment", date: "Apr 8", text: "High upside but data quality is the blocker. Noisy source data = false explanations. First: data readiness + dashboarding, not optimization." }
    ]
  },
  { id: 51, name: "Energy Consumption Monitor", dept: "Operations / Facilities", type: "Reporting & Analytics", status: "Discovery", owner: "Facilities Manager", targetSaaS: null, rationalization: null, capabilities: ["Data Pipeline", "Reporting & Analytics"], scores: { impact: 7, effort: 4, risk: 3, alignment: 7 }, aiLevel: "Assist", sensitivity: "Internal", blocker: "Data Access", pattern: "Monitoring", riskTier: "Low", cluster: "Plant Operations", tools: ["Python", "CSV tools"], summary: "Tie energy usage to production schedules. Actionable alerts ('Compressor 3 ran 40% longer during non-production hours'), not just KWh charts.",
    inputs: [
      { type: "concept", source: "Facilities Manager", date: "Apr 5", text: "Spikes discovered after utility bill arrives. Refrigeration, compressed air, boilers, lighting, HVAC not tied to production." },
      { type: "feedback", source: "Maintenance", date: "Apr 6", text: "Don't show KWh chart. Show 'Compressor 3 ran 40% longer than normal during non-production.' Need equipment-level mapping first." }
    ]
  },
  { id: 52, name: "Sanitation Compliance Tracker", dept: "Processing / QA", type: "Compliance & Audit", status: "In Progress", owner: "Tom Nguyen + Sanitation Lead", targetSaaS: null, rationalization: null, capabilities: ["Compliance & Audit", "Workflow Automation", "User-Facing App"], scores: { impact: 8, effort: 7, risk: 5, alignment: 8 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Approval Workflow", riskTier: "Regulated", cluster: "Compliance & Safety", tools: ["Claude", "Tablet UI"], summary: "Tablet-based pre-op checklist. Timestamps zones, supervisor sign-off, flags missed items before line starts. Needs immutable edit history for USDA.",
    inputs: [
      { type: "telegram", source: "Tom · #processing-innovation", date: "Apr 8", text: "Tablet pre-op checklist. Timestamps zones, supervisor sign-off, flags missed items. No more illegible paper forms." },
      { type: "feedback", source: "USDA Inspector", date: "Apr 9", text: "Digital records acceptable if complete, reviewable, signed. Need immutable edit history: original, corrected, who, when, reason." }
    ]
  },
  { id: 53, name: "Equipment Failure Predictor", dept: "Maintenance / Operations", type: "AI Capability", status: "Discovery", owner: "Maintenance Manager", targetSaaS: null, rationalization: null, capabilities: ["Data Pipeline", "Reporting & Analytics", "Scheduling & Planning"], scores: { impact: 8, effort: 2, risk: 5, alignment: 8 }, aiLevel: "Experiment", sensitivity: "Internal", blocker: "Data Access", pattern: "Monitoring", riskTier: "Medium", cluster: "Plant Operations", tools: ["TBD"], summary: "Years of work order history but not clean. Start with data cleanup + asset hierarchy normalization. Prediction later. First MVP: repeat-failure assets and PM compliance gaps.",
    inputs: [
      { type: "concept", source: "Maintenance Manager", date: "Apr 7", text: "Some techs write detailed notes, others write 'fixed.' Need early warning on conveyors, compressors, pumps, refrigeration based on repeat work orders and parts usage." },
      { type: "risk", source: "Ryan Assessment", date: "Apr 8", text: "Start with data cleanup and asset normalization. Prediction depends on good asset IDs, failure codes, timestamps. First MVP: repeat-failure assets and PM gaps." }
    ]
  },
  { id: 54, name: "Worker Safety Risk Detection", dept: "Safety / Processing", type: "AI Capability", status: "Discovery", owner: "Safety Director", targetSaaS: null, rationalization: null, capabilities: ["Reporting & Analytics", "Compliance & Audit", "Data Pipeline"], scores: { impact: 8, effort: 1, risk: 8, alignment: 8 }, aiLevel: "Experiment", sensitivity: "Highly Sensitive", blocker: "Compliance", pattern: null, riskTier: "Regulated", cluster: "Compliance & Safety", tools: ["TBD"], summary: "Camera-based unsafe condition detection. HIGH RISK — privacy, trust, labor/legal review required. Safer first: de-identified observation analysis. Camera AI later phase only.",
    inputs: [
      { type: "concept", source: "Safety Director", date: "Apr 7", text: "Explore camera-based detection of missing PPE, blocked walkways, forklift proximity, restricted zones. For alerting, not discipline." },
      { type: "risk", source: "Ryan Assessment", date: "Apr 8", text: "High-risk initiative. Privacy review, employee communication, labor/legal review. Start with de-identified observations. Camera AI only if governance is clear." }
    ]
  },
  { id: 55, name: "Production Throughput Dashboard", dept: "Processing / Operations", type: "Reporting & Analytics", status: "Pilot", owner: "Plant Operations Manager", targetSaaS: null, rationalization: null, capabilities: ["Reporting & Analytics", "Data Pipeline", "User-Facing App"], scores: { impact: 7, effort: 6, risk: 3, alignment: 7 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Dashboard", riskTier: "Low", cluster: "Plant Operations", tools: ["Claude", "CSV tools"], summary: "Planned vs actual throughput by line, shift, product, downtime category. Updates from CSV exports every 30 min. Phone view needs simplification — 5 items only.",
    inputs: [
      { type: "output_sample", source: "Pilot Summary", date: "Apr 8", text: "Dashboard shows planned vs actual by line/shift/product/downtime. Updates from scheduled CSV exports every 30 min. Supervisors use large screen near station." },
      { type: "feedback", source: "Supervisor", date: "Apr 9", text: "Useful on big screen, not on phone — too dense. Shift view needs only: target, actual, variance, top blocker, next action. Plant tools need simpler screens." }
    ]
  },
  { id: 56, name: "Waste Reduction Analyzer", dept: "Processing / Sustainability", type: "Reporting & Analytics", status: "Discovery", owner: "Sustainability Manager", targetSaaS: null, rationalization: null, capabilities: ["Reporting & Analytics", "Data Pipeline", "Document Generation"], scores: { impact: 6, effort: 4, risk: 3, alignment: 6 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Dashboard", riskTier: "Low", cluster: "Plant Operations", tools: ["Python", "CSV tools"], summary: "Distinguish avoidable/process/packaging/rework waste by reason. Need waste by line and shift within 24 hours tied to product or equipment issues.",
    inputs: [
      { type: "concept", source: "Sustainability Manager", date: "Apr 6", text: "Waste tracked for reporting, not analyzed operationally. Need to distinguish avoidable vs process waste and tie spikes to product runs or equipment." },
      { type: "feedback", source: "Plant Manager", date: "Apr 7", text: "Monthly report doesn't change behavior. Show waste by line and shift within 24 hours. Tell me if it's product or equipment. Otherwise another unused report." }
    ]
  },
  { id: 57, name: "Shift Handoff Summary Generator", dept: "Processing / Operations", type: "Process Automation", status: "In Progress", owner: "Plant Supervisor", targetSaaS: null, rationalization: null, capabilities: ["Document Generation", "Workflow Automation"], scores: { impact: 6, effort: 8, risk: 2, alignment: 6 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Document Extraction", riskTier: "Low", cluster: "Plant Operations", tools: ["Claude", "Tablet UI"], summary: "Outgoing supervisor enters status, issues, gaps, equipment, QA holds, safety notes → clean handoff for next shift. Need required fields and 'decisions made during shift' section.",
    inputs: [
      { type: "telegram", source: "Supervisor", date: "Apr 8", text: "Handoff generator simple but useful. Creates clean summary, highlights maintenance/QA follow-ups." },
      { type: "feedback", source: "Night Shift", date: "Apr 9", text: "Need consistency — some supervisors write too much, some too little. Required fields + 'no update' checkboxes + 'decisions made during shift' section." }
    ]
  },
  { id: 58, name: "Quality Deviation Tracker", dept: "QA / Processing", type: "Compliance & Audit", status: "Pilot", owner: "Tom Nguyen", targetSaaS: null, rationalization: null, capabilities: ["Compliance & Audit", "Reporting & Analytics", "Workflow Automation"], scores: { impact: 8, effort: 6, risk: 5, alignment: 8 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Exception Triage", riskTier: "Medium", cluster: "Compliance & Safety", tools: ["Claude", "VS Code"], summary: "Captures deviation type, product, lot, severity, disposition, corrective action. Trend detection surfaced repeated labeling deviations. Needs escalation rules and linked documentation.",
    inputs: [
      { type: "output_sample", source: "Tom Deployment Note", date: "Apr 9", text: "V1 captures issue type, product, lot, line, severity, disposition, corrective action, owner, closeout. Trend detection surfaced repeated labeling deviations hidden in spreadsheet." },
      { type: "feedback", source: "QA Manager", date: "Apr 10", text: "Add escalation: same type 3x in 14 days → notify QA manager + Ops. Hold/rework requires linked docs. No closure without corrective action owner." }
    ]
  },
  { id: 59, name: "Customer Order Pattern Analyzer", dept: "Sales", type: "Reporting & Analytics", status: "Discovery", owner: "Derek Bowman", targetSaaS: null, rationalization: null, capabilities: ["Reporting & Analytics", "Data Pipeline"], scores: { impact: 7, effort: 5, risk: 3, alignment: 6 }, aiLevel: "Assist", sensitivity: "Confidential", blocker: "Data Access", pattern: "Monitoring", riskTier: "Medium", cluster: "Commercial & Sales", tools: ["TBD"], summary: "Alert for order frequency changes, product mix shifts, cancellations. Should plug into Order Status Dashboard, not be separate. Surface obvious pattern changes earlier.",
    inputs: [
      { type: "concept", source: "Sales Manager", date: "Apr 7", text: "Customer volume drops slowly over 8 weeks, no one acts until QBR. Need alerts for frequency changes, mix shifts, cancellations, margin drift." },
      { type: "telegram", source: "Derek · #sales-innovation", date: "Apr 8", text: "Plug into Order Status Dashboard, not separate app. Rep opens region view, sees 'customers with unusual pattern changes' ranked by revenue impact. Keep it simple." }
    ]
  },
  { id: 60, name: "Sales Call Summary Generator", dept: "Sales", type: "Process Automation", status: "Pilot", owner: "Sales Enablement Lead", targetSaaS: null, rationalization: null, capabilities: ["Document Generation", "Workflow Automation", "User-Facing App"], scores: { impact: 5, effort: 8, risk: 2, alignment: 5 }, aiLevel: "Assist", sensitivity: "Confidential", blocker: null, pattern: "Document Extraction", riskTier: "Low", cluster: "Commercial & Sales", tools: ["Claude"], summary: "Rough call notes → structured summary: customer asks, pricing, volume risk, follow-ups, next meeting. Saves 10 min/call. Needs standard tags and confidential pricing controls.",
    inputs: [
      { type: "feedback", source: "Sales Rep", date: "Apr 8", text: "Hate entering Salesforce notes. Generator turns rough notes into clean summary. Saves 10 min/call. Can edit before saving." },
      { type: "process_doc", source: "Sales Ops", date: "Apr 9", text: "Good adoption. Need standard fields: product line, opportunity type, customer issue, follow-up date. Prevent confidential pricing in broad team summaries." }
    ]
  },
  { id: 61, name: "Promotion Effectiveness Tracker", dept: "Sales / Marketing", type: "Reporting & Analytics", status: "Discovery", owner: "Priya Patel + Derek Bowman", targetSaaS: null, rationalization: null, capabilities: ["Reporting & Analytics", "Data Pipeline", "Document Generation"], scores: { impact: 6, effort: 4, risk: 3, alignment: 5 }, aiLevel: "Assist", sensitivity: "Confidential", blocker: "Data Access", pattern: "Dashboard", riskTier: "Low", cluster: "Commercial & Sales", tools: ["TBD"], summary: "Post-promotion readout: lift, margin, sell-through, repeat, demand pull-forward. Question isn't 'did volume go up?' — it's 'did we make money and should we repeat?'",
    inputs: [
      { type: "concept", source: "Marketing", date: "Apr 7", text: "No consistent post-promotion readout. Need lift, margin, sell-through, customer feedback, repeat purchase by customer and product." },
      { type: "telegram", source: "Derek Response", date: "Apr 8", text: "Include baseline comparison, margin impact, trade spend, operational issues. Promotion that creates demand we can't fulfill isn't a win." }
    ]
  },
  { id: 62, name: "Customer Risk Scoring Model", dept: "Sales / Finance", type: "AI Capability", status: "Discovery", owner: "Derek Bowman", targetSaaS: null, rationalization: null, capabilities: ["Reporting & Analytics", "Data Pipeline"], scores: { impact: 7, effort: 3, risk: 5, alignment: 6 }, aiLevel: "Experiment", sensitivity: "Confidential", blocker: "Data Access", pattern: "Monitoring", riskTier: "Medium", cluster: "Commercial & Sales", tools: ["TBD"], summary: "Early warning on at-risk accounts. Needs reason codes and evidence, not black-box scoring. Some customers remain active but become unprofitable.",
    inputs: [
      { type: "concept", source: "Sales Leadership", date: "Apr 8", text: "Signals: order decline, complaints, late payments, pricing disputes, competitor activity. Not just churn — some become unprofitable while active." },
      { type: "risk", source: "Ryan Assessment", date: "Apr 9", text: "Needs reason codes and evidence. 'Volume down 18% vs baseline, complaints increased, payment terms exceeded twice.' Avoid black-box scoring." }
    ]
  },
  { id: 63, name: "Contract Renewal Alert System", dept: "Sales / Legal", type: "Process Automation", status: "In Progress", owner: "Sales Operations Manager", targetSaaS: null, rationalization: null, capabilities: ["Workflow Automation", "Compliance & Audit", "Reporting & Analytics"], scores: { impact: 6, effort: 7, risk: 3, alignment: 6 }, aiLevel: "Assist", sensitivity: "Confidential", blocker: null, pattern: "Monitoring", riskTier: "Low", cluster: "Commercial & Sales", tools: ["Claude", "VS Code"], summary: "Alerts at 120/90/60/30 days before renewal dates. Already found 2 agreements with pricing reviews coming up that no one had calendared. Legal needs source document per field.",
    inputs: [
      { type: "telegram", source: "Sales Ops", date: "Apr 9", text: "V1 pulls contract end date, notice period, pricing review, account owner. Alerts at 120/90/60/30 days. Found 2 agreements with reviews next month, uncalendared." },
      { type: "feedback", source: "Legal", date: "Apr 10", text: "Amendment dates may conflict with original. System must show source document per field. If source unknown, mark incomplete and route to Legal." }
    ]
  },
  { id: 64, name: "Initiative Registry Auto-Builder", dept: "IT / Innovation", type: "AI Capability", status: "In Progress", owner: "Ryan", targetSaaS: null, rationalization: null, capabilities: ["Data Pipeline", "Document Generation", "Reporting & Analytics"], scores: { impact: 9, effort: 7, risk: 2, alignment: 10 }, aiLevel: "Automate", sensitivity: "Internal", blocker: null, pattern: "Document Extraction", riskTier: "Low", cluster: "Innovation Infrastructure", tools: ["Claude Code", "Python"], summary: "Ingests raw artifacts (Telegram, builder logs, READMEs) and extracts initiative structure. Auto-populates registry for human review. Added rationalization mode field.",
    inputs: [
      { type: "architecture", source: "Ryan Architecture Note", date: "Apr 8", text: "Registry shouldn't rely on perfect forms. Ingest raw artifacts: Telegram, logs, READMEs. Extract department, owner, status, capabilities, targets, blockers, risk, next action. Human confirms." },
      { type: "output_sample", source: "Prototype Test", date: "Apr 9", text: "Ran against 18 initiatives. Correctly identified owner, department, status mostly. Struggled with multiple sponsors and partial SaaS replacement. Added rationalization mode field." }
    ]
  },
  { id: 65, name: "Reusable Workflow Template Library", dept: "IT / Innovation", type: "Net-New Tool", status: "Discovery", owner: "Doug + Ryan", targetSaaS: null, rationalization: null, capabilities: ["Document Generation", "User-Facing App", "Workflow Automation"], scores: { impact: 8, effort: 6, risk: 2, alignment: 10 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Search/Retrieval", riskTier: "Low", cluster: "Innovation Infrastructure", tools: ["Claude Code", "VS Code"], summary: "Standardize repeating patterns: confidence scoring, output parsing, approval routing, exception dashboards, audit logs. New builders start from proven templates instead of reinventing.",
    inputs: [
      { type: "concept", source: "Doug Concept Note", date: "Apr 7", text: "Keep rebuilding same patterns: confidence score → human review, output parsing, approval routing, exception dashboards, audit logs. Should become templates." },
      { type: "feedback", source: "Bootcamp Participant", date: "Apr 8", text: "Understood my use case but not what architecture pattern to use. Spent 2 days building approval workflow Maria already built. Template library would save time." }
    ]
  },
  { id: 66, name: "Data Access Request Router", dept: "IT / Security", type: "Process Automation", status: "Discovery", owner: "IT Security Analyst", targetSaaS: null, rationalization: null, capabilities: ["Workflow Automation", "Compliance & Audit", "Integration Layer"], scores: { impact: 8, effort: 5, risk: 4, alignment: 9 }, aiLevel: "Assist", sensitivity: "Confidential", blocker: null, pattern: "Approval Workflow", riskTier: "Medium", cluster: "Innovation Infrastructure", tools: ["TBD"], summary: "Standardized data access request flow. Captures purpose, classification, fields, retention, API exposure. Highest-leverage internal tool — data access blocks 4+ initiatives.",
    inputs: [
      { type: "process_doc", source: "IT Security Note", date: "Apr 8", text: "Innovation projects ask for data inconsistently. Need intake capturing purpose, classification, fields, retention, storage, model exposure, approver." },
      { type: "telegram", source: "Ryan Response", date: "Apr 9", text: "Probably highest-leverage internal tool. Data access blocks Order Status, Pricing, Finance, Ingredient Sourcing, more. Standard intake speeds safe projects, stops unsafe ones earlier." }
    ]
  },
  { id: 67, name: "Model Performance Monitoring Dashboard", dept: "IT / Innovation", type: "AI Capability", status: "Discovery", owner: "Ryan", targetSaaS: null, rationalization: null, capabilities: ["Reporting & Analytics", "Compliance & Audit", "Data Pipeline"], scores: { impact: 8, effort: 4, risk: 3, alignment: 9 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Monitoring", riskTier: "Medium", cluster: "Innovation Infrastructure", tools: ["Python", "Claude Code"], summary: "Monitoring for deployed AI tools: accuracy, correction rate, override rate, latency, failures, adoption. Without monitoring, deployed tools silently decay.",
    inputs: [
      { type: "architecture", source: "Ryan Architecture Note", date: "Apr 9", text: "Common dimensions: output accuracy, correction rate, human override, latency, failure rate, data freshness, adoption. Make degradation visible before trust is lost." },
      { type: "output_sample", source: "Example Monitoring", date: "Apr 10", text: "AP Engine correction rate 8%→18% after new vendor format. USDA Doc Gen stayed <0.5%. Brand Asset revision rate dropped after template updates. These signals show where to invest." }
    ]
  },
  { id: 68, name: "AI Usage Governance Tracker", dept: "IT / Innovation / Security", type: "Compliance & Audit", status: "Discovery", owner: "Doug + IT Security", targetSaaS: null, rationalization: null, capabilities: ["Compliance & Audit", "Reporting & Analytics", "Workflow Automation"], scores: { impact: 9, effort: 5, risk: 4, alignment: 10 }, aiLevel: "Assist", sensitivity: "Confidential", blocker: null, pattern: "Approval Workflow", riskTier: "Medium", cluster: "Innovation Infrastructure", tools: ["TBD"], summary: "Lightweight governance: who builds what, which tools, what data, what's deployed. Auto-populate from Initiative Registry. Don't make it a 12-page form.",
    inputs: [
      { type: "concept", source: "Doug Leadership Note", date: "Apr 9", text: "Broad adoption but visibility lagging. Leadership wants: who builds what, tools used, sensitive data, external APIs, deployment status. Need basic governance without bureaucracy." },
      { type: "risk", source: "Ryan Assessment", date: "Apr 10", text: "Required: initiative name, owner, dept, tool/model, data classification, external API, deployment status, business process, review status. Auto-populate from registry. If too heavy, people avoid it." }
    ]
  },
  { id: 69, name: "Supplier Risk Monitor", dept: "Procurement / Supply Chain", type: "AI Capability", status: "Discovery", owner: "Procurement Director", targetSaaS: null, rationalization: null, capabilities: ["Data Pipeline", "Reporting & Analytics", "Compliance & Audit"], scores: { impact: 7, effort: 3, risk: 5, alignment: 7 }, aiLevel: "Experiment", sensitivity: "Internal", blocker: "Data Access", pattern: "Monitoring", riskTier: "Medium", cluster: "Logistics & Supply Chain", tools: ["TBD"], summary: "Supplier risk briefs from internal + external signals. Risk: overreacting to noisy news. First version: risk briefs for review, not automatic changes.",
    inputs: [
      { type: "concept", source: "Procurement Director", date: "Apr 7", text: "Need earlier warning: late deliveries, quality issues, disputes, price volatility, financial distress, regulatory issues, over-dependence." },
      { type: "risk", source: "Ryan Assessment", date: "Apr 8", text: "Good for external + internal synthesis. Risk: overreacting to noise. First version: risk briefs for review. Connect to Ingredient Sourcing and Carrier Scorecard later." }
    ]
  },
  { id: 70, name: "Purchase Order Intake Assistant", dept: "Procurement", type: "Process Automation", status: "In Progress", owner: "Rachel Kim", targetSaaS: null, rationalization: null, capabilities: ["Workflow Automation", "Document Generation", "User-Facing App"], scores: { impact: 6, effort: 7, risk: 2, alignment: 6 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "HITL Routing", riskTier: "Low", cluster: "Finance Automation", tools: ["Claude", "VS Code"], summary: "Converts messy email requests into structured PO drafts. Catches missing fields, asks follow-ups. Reduced incomplete PO requests. Needs category routing logic.",
    inputs: [
      { type: "telegram", source: "Rachel · #procurement", date: "Apr 9", text: "PO intake converts email requests into structured drafts: requester, dept, vendor, item, quantity, date, cost center, approval route. Catches missing fields." },
      { type: "feedback", source: "Procurement Manager", date: "Apr 10", text: "Good for standard purchases. Not for capital, contracted services, or legal review. Add category detection for different approval logic." }
    ]
  },
  { id: 71, name: "Product Specification Search Assistant", dept: "QA / Sales / Export", type: "AI Capability", status: "In Progress", owner: "QA Documentation Specialist", targetSaaS: null, rationalization: null, capabilities: ["User-Facing App", "Data Pipeline", "Document Generation"], scores: { impact: 7, effort: 6, risk: 4, alignment: 7 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Search/Retrieval", riskTier: "Medium", cluster: "Commercial & Sales", tools: ["Claude Code", "VS Code"], summary: "Search over product spec PDFs for fat content, packaging, shelf life, allergen, country eligibility. Must cite exact spec + version. Customer-specific specs override standard.",
    inputs: [
      { type: "email", source: "Sales Request", date: "Apr 7", text: "Need faster spec access during buyer calls. Reps ask QA same questions repeatedly: fat content, case weight, shelf life, allergens, storage." },
      { type: "process_doc", source: "QA Documentation", date: "Apr 8", text: "Must cite exact spec and version. Customer-specific specs override standard. Must not answer from outdated spec. Read-only, QA approval before external sharing." }
    ]
  },
  { id: 72, name: "Customer Complaint Triage Assistant", dept: "QA / Sales", type: "Process Automation", status: "Discovery", owner: "Tom Nguyen + Sales Ops", targetSaaS: null, rationalization: null, capabilities: ["Workflow Automation", "Compliance & Audit", "Reporting & Analytics"], scores: { impact: 8, effort: 5, risk: 5, alignment: 8 }, aiLevel: "Assist", sensitivity: "Confidential", blocker: null, pattern: "Exception Triage", riskTier: "High", cluster: "Compliance & Safety", tools: ["TBD"], summary: "Structured complaint intake with severity triage. Routes urgent issues immediately. Generates follow-up questions for reps. Creates QA case summary.",
    inputs: [
      { type: "process_doc", source: "QA Process Note", date: "Apr 8", text: "Complaints arrive through Sales, customer service, email, calls. Severity triage inconsistent. Foreign material ≠ labeling issue. QA wants structured routing." },
      { type: "feedback", source: "Sales", date: "Apr 9", text: "Reps need to know what to ask: lot code, photos, quantity, storage, delivery date, hold status. Generate follow-up questions and QA case summary. Don't let serious complaints sit in inbox." }
    ]
  },
  { id: 73, name: "Recall Readiness Drill Tool", dept: "QA / Compliance", type: "Compliance & Audit", status: "Discovery", owner: "Compliance Director", targetSaaS: null, rationalization: null, capabilities: ["Compliance & Audit", "Workflow Automation", "Reporting & Analytics"], scores: { impact: 9, effort: 4, risk: 6, alignment: 9 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Approval Workflow", riskTier: "Regulated", cluster: "Compliance & Safety", tools: ["TBD"], summary: "Simulate product issues, assign tasks, track response times, produce after-action reports. Support tabletop drills first. Real recall use requires much higher review standard.",
    inputs: [
      { type: "concept", source: "Compliance Director", date: "Apr 8", text: "Recall exercises scatter evidence. Drill tool: simulate issue, assign tasks, track response, collect documentation, produce after-action report." },
      { type: "process_doc", source: "QA Manager", date: "Apr 9", text: "Critical: lot traceability checklist, customer notification status, inventory hold, regulatory notification decision, communications log, action owners. Tabletop first." }
    ]
  },
  { id: 74, name: "Lab Result Trend Analyzer", dept: "QA / Food Safety", type: "Reporting & Analytics", status: "In Progress", owner: "Food Safety Manager", targetSaaS: null, rationalization: null, capabilities: ["Data Pipeline", "Reporting & Analytics", "Compliance & Audit"], scores: { impact: 8, effort: 6, risk: 5, alignment: 8 }, aiLevel: "Augment", sensitivity: "Internal", blocker: null, pattern: "Monitoring", riskTier: "High", cluster: "Compliance & Safety", tools: ["Python", "Claude Code"], summary: "Environmental swab + product test trend detection. Surfaced recurring Zone 3 pattern hidden in spreadsheets. Supports investigation, does not determine regulatory reporting.",
    inputs: [
      { type: "telegram", source: "Food Safety Manager", date: "Apr 9", text: "Analyzer imports swab results, product tests, corrective action logs. Flags recurring positives by zone, line, organism, period. Surfaced Zone 3 pattern hard to see in spreadsheets." },
      { type: "risk", source: "Compliance", date: "Apr 10", text: "Identifies trends, supports investigation. Does not determine regulatory reporting. Needs filters: organism, facility, zone, date range, product family, corrective action status." }
    ]
  },
  { id: 75, name: "Animal Health Observation Logger", dept: "Live Operations", type: "Net-New Tool", status: "Discovery", owner: "Live Ops Field Supervisor", targetSaaS: null, rationalization: null, capabilities: ["User-Facing App", "Data Pipeline", "Reporting & Analytics"], scores: { impact: 7, effort: 4, risk: 5, alignment: 8 }, aiLevel: "Assist", sensitivity: "Internal", blocker: "Technical Feasibility", pattern: "Dashboard", riskTier: "Medium", cluster: "Plant Operations", tools: ["TBD"], summary: "Mobile logger for farm observations: health, water/feed, mortality, medication, environment. Must work offline with poor connectivity. AI is secondary to structured capture.",
    inputs: [
      { type: "concept", source: "Field Supervisor", date: "Apr 7", text: "Farm teams document inconsistently. Need mobile logger for health observations, water/feed, mortality, medication, environment. Must work offline and sync later." },
      { type: "risk", source: "Ryan Assessment", date: "Apr 8", text: "Offline mode, simple input, rugged devices more important than AI. First MVP: structured capture + trend dashboard. Anomaly detection later." }
    ]
  },
  { id: 76, name: "Feed Formula Change Impact Estimator", dept: "Feed Mills / Live Operations", type: "AI Capability", status: "Discovery", owner: "Feed Nutrition Analyst", targetSaaS: null, rationalization: null, capabilities: ["Reporting & Analytics", "Data Pipeline", "Scheduling & Planning"], scores: { impact: 8, effort: 2, risk: 7, alignment: 8 }, aiLevel: "Experiment", sensitivity: "Internal", blocker: "Compliance", pattern: "HITL Routing", riskTier: "Regulated", cluster: "Plant Operations", tools: ["TBD"], summary: "Estimate operational impact of formula changes before approval: scheduling, availability, animal performance, medication constraints, delivery. Nutritionists remain decision owners.",
    inputs: [
      { type: "concept", source: "Nutrition Analyst", date: "Apr 7", text: "Ingredient prices change quickly. Formula adjustments affect scheduling, availability, animal performance, medication constraints, delivery. Need impact estimation before approval." },
      { type: "risk", source: "Risk Assessment", date: "Apr 8", text: "Touches animal nutrition and production outcomes. Cannot be casual AI recommendation. Calculate operational implications from approved scenarios. Nutritionists decide." }
    ]
  },
  { id: 77, name: "Farm Visit Report Generator", dept: "Live Operations", type: "Process Automation", status: "Pilot", owner: "Live Ops Field Supervisor", targetSaaS: null, rationalization: null, capabilities: ["Document Generation", "User-Facing App", "Workflow Automation"], scores: { impact: 5, effort: 8, risk: 3, alignment: 6 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Document Extraction", riskTier: "Low", cluster: "Plant Operations", tools: ["Claude", "Tablet UI"], summary: "Field observations by section → clean report. Needs severity labels, follow-up owners, comparison to previous visit. Short structured prompts for phone input.",
    inputs: [
      { type: "feedback", source: "Field Rep", date: "Apr 9", text: "Enter observations by section: feed, water, ventilation, health, facility, action items. Generator creates clean report I can edit before sending." },
      { type: "process_doc", source: "Live Ops Manager", date: "Apr 10", text: "Add severity labels and follow-up owners. Show comparison to previous visit. Don't make field reps type long notes on phone — use short structured prompts." }
    ]
  },
  { id: 78, name: "Biosecurity Compliance Checklist", dept: "Live Operations / Compliance", type: "Compliance & Audit", status: "Discovery", owner: "Biosecurity Coordinator", targetSaaS: null, rationalization: null, capabilities: ["Compliance & Audit", "User-Facing App", "Workflow Automation"], scores: { impact: 8, effort: 5, risk: 6, alignment: 9 }, aiLevel: "Assist", sensitivity: "Confidential", blocker: null, pattern: "Approval Workflow", riskTier: "Regulated", cluster: "Compliance & Safety", tools: ["TBD"], summary: "Digital biosecurity capture: visitor logs, vehicle sanitation, PPE, controlled access, downtime requirements. Offline capability needed. Access controls matter.",
    inputs: [
      { type: "concept", source: "Biosecurity Coordinator", date: "Apr 8", text: "Checklists completed but not consistently reviewed. Need digital capture for visitor logs, vehicle sanitation, PPE, access points, exceptions." },
      { type: "risk", source: "Risk Review", date: "Apr 9", text: "Operationally sensitive data. Access controls matter. First MVP: facility-level compliance visibility + exception routing. Offline capture needed." }
    ]
  },
  { id: 79, name: "Export Market Requirements Assistant", dept: "Export / Compliance / Sales", type: "AI Capability", status: "Discovery", owner: "Export Compliance Lead", targetSaaS: null, rationalization: null, capabilities: ["Compliance & Audit", "User-Facing App", "Document Generation"], scores: { impact: 8, effort: 4, risk: 6, alignment: 8 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Search/Retrieval", riskTier: "High", cluster: "Compliance & Safety", tools: ["Claude Code"], summary: "Quick answers on product eligibility, documents, labeling by country. Must cite source regulation. Answer 'needs compliance review' when unclear. Internal Q&A only.",
    inputs: [
      { type: "email", source: "Export Sales", date: "Apr 7", text: "Reps need quick answers: can this product ship to this country? What docs? What labeling? Requirements change and people rely on memory." },
      { type: "risk", source: "Compliance", date: "Apr 8", text: "Must cite source regulation or approved requirement. If unclear, say 'needs compliance review.' Internal Q&A only, no customer commitments without human approval." }
    ]
  },
  { id: 80, name: "Demand Forecast Exception Explainer", dept: "Sales / Supply Chain", type: "Reporting & Analytics", status: "Discovery", owner: "Demand Planning Manager", targetSaaS: null, rationalization: null, capabilities: ["Reporting & Analytics", "Data Pipeline", "Document Generation"], scores: { impact: 7, effort: 5, risk: 4, alignment: 7 }, aiLevel: "Assist", sensitivity: "Confidential", blocker: "Data Access", pattern: "Document Extraction", riskTier: "Medium", cluster: "Commercial & Sales", tools: ["TBD"], summary: "Explain forecast errors by product and customer: promotion, pull-forward, competitor shortage, forecast miss. Show evidence and uncertainty. Focus demand review on exceptions.",
    inputs: [
      { type: "concept", source: "Demand Planning", date: "Apr 8", text: "Forecast errors happen but explaining them quickly is harder. Was demand higher from promotion, pull-forward, competitor shortage, or miss? Need exception commentary." },
      { type: "feedback", source: "Sales", date: "Apr 9", text: "Don't make this blame Sales. Sometimes customers change late, sometimes production can't fulfill. Show evidence and uncertainty. Focus demand meeting on exceptions that matter." }
    ]
  },
  { id: 81, name: "Production Plan Constraint Checker", dept: "Operations / Supply Chain", type: "Process Automation", status: "In Progress", owner: "Production Planner", targetSaaS: null, rationalization: null, capabilities: ["Scheduling & Planning", "Data Pipeline", "Compliance & Audit"], scores: { impact: 8, effort: 5, risk: 5, alignment: 8 }, aiLevel: "Augment", sensitivity: "Internal", blocker: null, pattern: "Exception Triage", riskTier: "Medium", cluster: "Plant Operations", tools: ["Claude Code", "Python"], summary: "Reads draft production plan and flags: packaging shortage, label mismatch, changeover conflict, labor gaps, QA holds, ship date conflicts. Caught 2 packaging issues pre-finalization.",
    inputs: [
      { type: "telegram", source: "Planner", date: "Apr 10", text: "Constraint checker caught two packaging issues last week before plan finalized. Flags packaging, label, changeover, labor, QA hold, ship date conflicts." },
      { type: "feedback", source: "Operations Manager", date: "Apr 11", text: "Valuable — catches problems before execution. Don't overload with warnings. Severity: hard stop, review needed, informational. Missing export label = hard stop." }
    ]
  },
  { id: 82, name: "Maintenance Parts Inventory Assistant", dept: "Maintenance / Procurement", type: "SaaS Replacement", status: "Discovery", owner: "Maintenance Manager", targetSaaS: "UpKeep Parts ($partial)", rationalization: "Replace", capabilities: ["Data Pipeline", "Reporting & Analytics", "Workflow Automation"], scores: { impact: 7, effort: 4, risk: 4, alignment: 7 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Dashboard", riskTier: "Low", cluster: "Plant Operations", tools: ["TBD"], summary: "Critical spare parts tracked inconsistently. First priority: part normalization and duplicate detection. Reorder recommendations after inventory master is trusted.",
    inputs: [
      { type: "process_doc", source: "Maintenance Note", date: "Apr 8", text: "Parts in UpKeep, spreadsheets, or only known by maintenance leads. Stockouts cause downtime, over-ordering ties up cash." },
      { type: "feedback", source: "Procurement", date: "Apr 9", text: "Vendor part numbers are messy — same bearing under different descriptions. First: normalization and duplicate detection. Reorder recommendations later." }
    ]
  },
  { id: 83, name: "IT Helpdesk Triage Assistant", dept: "IT", type: "SaaS Replacement", status: "Pilot", owner: "IT Support Lead", targetSaaS: "Zendesk ($partial)", rationalization: "Reduce", capabilities: ["Workflow Automation", "User-Facing App", "Reporting & Analytics"], scores: { impact: 7, effort: 7, risk: 3, alignment: 7 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Exception Triage", riskTier: "Low", cluster: "Innovation Infrastructure", tools: ["Claude", "VS Code"], summary: "Auto-categorizes IT tickets, suggests resolutions, escalates complex issues. Reduces Zendesk seat dependency for L1 triage. Plant tickets need simpler interface.",
    inputs: [
      { type: "telegram", source: "IT Support Lead", date: "Apr 9", text: "Triage assistant auto-categorizes tickets, suggests L1 resolutions, escalates complex issues. Reduces time to first response. Plant tickets need simpler submission interface." },
      { type: "feedback", source: "IT Manager", date: "Apr 10", text: "Good for L1 deflection. Keep Zendesk for escalation tracking and SLA reporting. Reduces seat count but doesn't eliminate Zendesk. Partial rationalization." }
    ]
  },
  { id: 84, name: "Software License Usage Monitor", dept: "IT / Finance", type: "Reporting & Analytics", status: "In Progress", owner: "Doug + Finance analyst", targetSaaS: null, rationalization: null, capabilities: ["Reporting & Analytics", "Data Pipeline", "Compliance & Audit"], scores: { impact: 8, effort: 6, risk: 2, alignment: 10 }, aiLevel: "Assist", sensitivity: "Confidential", blocker: null, pattern: "Dashboard", riskTier: "Low", cluster: "Innovation Infrastructure", tools: ["Claude", "CSV tools"], summary: "Pulls license counts, active users, login frequency, renewal dates. Found inactive-user seats and departments with concentrated power users. Show addressable savings by renewal window.",
    inputs: [
      { type: "telegram", source: "Doug Update", date: "Apr 10", text: "Monitor pulls licenses, active users, login frequency, dept ownership, renewal, cost. Found inactive seats and departments where 2 power users and everyone else logs in quarterly." },
      { type: "process_doc", source: "Finance Note", date: "Apr 11", text: "Don't assume every inactive seat can cancel immediately — some annual. Show addressable savings by renewal window: immediate, 90 days, next renewal cycle." }
    ]
  },
  { id: 85, name: "Secure Prompt Review Workflow", dept: "IT Security / Innovation", type: "Compliance & Audit", status: "Discovery", owner: "IT Security Analyst", targetSaaS: null, rationalization: null, capabilities: ["Compliance & Audit", "Workflow Automation", "Document Generation"], scores: { impact: 6, effort: 7, risk: 3, alignment: 8 }, aiLevel: "Assist", sensitivity: "Confidential", blocker: null, pattern: "Approval Workflow", riskTier: "Medium", cluster: "Innovation Infrastructure", tools: ["TBD"], summary: "Flag data classification issues in shared prompts: secrets, customer names, employee data, credentials. Suggest redactions and create clean version. Fast approval for non-sensitive.",
    inputs: [
      { type: "process_doc", source: "Security Note", date: "Apr 9", text: "Builders sharing prompts with internal process details, vendor names, data examples. Need lightweight review for reusable templates. Prevent sensitive data leakage." },
      { type: "telegram", source: "Ryan Response", date: "Apr 10", text: "Make it practical. Flag data classification issues, secrets, customer/employee data, credentials. Suggest redactions. Don't make builders wait 2 days unless sensitive." }
    ]
  },
  { id: 86, name: "GitHub Prototype Inventory", dept: "IT / Innovation", type: "Reporting & Analytics", status: "Discovery", owner: "Innovation Engineer", targetSaaS: null, rationalization: null, capabilities: ["Data Pipeline", "Compliance & Audit", "Reporting & Analytics"], scores: { impact: 7, effort: 6, risk: 3, alignment: 9 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Monitoring", riskTier: "Low", cluster: "Innovation Infrastructure", tools: ["Python", "GitHub API"], summary: "Scans org repos for owner, purpose, last commit, dependencies, deployment status, README quality. Prevents orphaned tools. Adds 'production dependency' and 'business process' fields.",
    inputs: [
      { type: "concept", source: "Innovation Engineer", date: "Apr 9", text: "Prototypes scattered across personal repos, team repos, zips, local machines. Need inventory: owner, purpose, last commit, dependencies, deployment, README quality, initiative mapping." },
      { type: "feedback", source: "Doug", date: "Apr 10", text: "Prevents orphaned tools. If someone leaves, need to know what they built and who owns it. Add 'production dependency?' and 'business process impacted?'" }
    ]
  },
  { id: 87, name: "Prototype Deployment Checklist", dept: "IT / Innovation", type: "Compliance & Audit", status: "In Progress", owner: "Doug", targetSaaS: null, rationalization: null, capabilities: ["Compliance & Audit", "Workflow Automation", "Document Generation"], scores: { impact: 8, effort: 8, risk: 2, alignment: 9 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Approval Workflow", riskTier: "Medium", cluster: "Innovation Infrastructure", tools: ["Claude", "VS Code"], summary: "Pre-pilot checklist: owner, data classification, user group, auth, rollback plan, logging, monitoring, limitations. Needs risk tiers so low-risk tools move fast.",
    inputs: [
      { type: "concept", source: "Doug Checklist Draft", date: "Apr 10", text: "Before pilot: owner, support contact, data classification, users, auth, access controls, rollback, logging, monitoring, known limitations, training, business approval. Not enterprise bureaucracy." },
      { type: "feedback", source: "Builder", date: "Apr 11", text: "Checklist fair but make it contextual. Marketing content generator ≠ benefits portal. Add risk tiers so low-risk moves quickly. Otherwise people avoid the process." }
    ]
  },
  { id: 88, name: "Meeting Action Item Extractor", dept: "Cross-Functional", type: "Process Automation", status: "Deployed", owner: "James Whitfield", targetSaaS: null, rationalization: null, capabilities: ["Document Generation", "Workflow Automation"], scores: { impact: 5, effort: 9, risk: 1, alignment: 5 }, aiLevel: "Assist", sensitivity: "Internal", blocker: null, pattern: "Document Extraction", riskTier: "Low", cluster: "Innovation Infrastructure", tools: ["Claude"], summary: "Used in 63 meetings. Extracts decisions, action items, owners, due dates, unresolved questions. Good adoption tool — low risk, helps beginners experience AI value.",
    inputs: [
      { type: "output_sample", source: "Usage Summary", date: "Apr 10", text: "63 meetings across HR, IT, Innovation, Accounting. Extracts decisions, action items, owners, due dates, unresolved questions, follow-ups. Clean recap in 2 minutes." },
      { type: "telegram", source: "Ryan Note", date: "Apr 11", text: "Not strategic AI product but good adoption tool. Low risk, high usability. Helps beginners experience value. Add integration to Initiative Registry for automatic status updates." }
    ]
  },
];
