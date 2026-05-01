import { useState, useMemo, useCallback } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

/* ── Color system ── */
const C = {
  bg: "#0c0e14", surface: "#14171f", surface2: "#1a1e28", surfaceHover: "#1f2433",
  border: "#262b3a", borderLight: "#2f3548",
  text: "#e2e4eb", textMuted: "#8990a5", textDim: "#555d75",
  accent: "#3b82f6", accentHover: "#2563eb", accentSoft: "rgba(59,130,246,0.10)",
  green: "#22c55e", greenSoft: "rgba(34,197,94,0.10)",
  amber: "#f59e0b", amberSoft: "rgba(245,158,11,0.10)",
  red: "#ef4444", redSoft: "rgba(239,68,68,0.10)",
  purple: "#a78bfa", purpleSoft: "rgba(167,139,250,0.10)",
  cyan: "#22d3ee", cyanSoft: "rgba(34,211,238,0.10)",
  rose: "#f472b6", roseSoft: "rgba(244,114,182,0.10)",
};

const STATUS_C = { Discovery: C.purple, "In Progress": C.accent, Pilot: C.cyan, Deployed: C.green, Blocked: C.red };
const TYPE_C = { "SaaS Replacement": C.amber, "AI Capability": C.accent, "Process Automation": C.cyan, "Net-New Tool": C.green };
const INPUT_TYPE_ICONS = { telegram: "💬", meeting: "📋", email: "📧", process_doc: "📄", builder_log: "🔧", feedback: "📝", architecture: "🏗️", output_sample: "📊", concept: "💡", discovery: "🔍", risk: "⚠️", memo: "📑" };

const DEPARTMENTS = ["Accounting", "Compliance", "Feed Mills", "HR", "IT", "IT / Innovation", "Marketing", "Operations", "Processing", "Sales", "Supply Chain"];
const TYPES = ["SaaS Replacement", "AI Capability", "Process Automation", "Net-New Tool"];
const STATUSES = ["Discovery", "In Progress", "Pilot", "Deployed", "Blocked"];
const CAPABILITIES = ["Data Pipeline", "Workflow Automation", "Reporting & Analytics", "Document Generation", "User-Facing App", "Integration Layer", "Compliance & Audit", "Scheduling & Planning"];
const WEIGHT_DEFAULTS = { impact: 35, effort: 25, risk: 15, alignment: 25 };

/* ── Seed data ── */
const SEED = [
  { id: 1, name: "AP Invoice Processing Engine", dept: "Accounting", type: "SaaS Replacement", status: "In Progress", owner: "Maria Chen", targetSaaS: "Coupa ($180k/yr)", rationalization: "Replace", capabilities: ["Workflow Automation", "Document Generation", "Integration Layer"], scores: { impact: 9, effort: 4, risk: 3, alignment: 8 }, summary: "Vibe-coded replacement for Coupa AP module. Three-way match logic working for standard PO invoices with confidence scoring (\u226585 auto, 60-84 human review, <60 manual). 70% automation target by Q2. Blocked on non-PO invoice routing rules. Coupa renewal: October.",
    inputs: [
      { type: "telegram", source: "Maria Chen \u00b7 #accounting-innovation", date: "Mar 22", text: "Just got the three-way match working for standard PO invoices. Claude handles the PO lookup, matches line items to the GRN, and flags discrepancies. Tested against 50 invoices from last month \u2014 38 processed clean, 9 flagged correctly for price variance, 3 mismatched on unit of measure conversion (lbs vs cwt). Working on the UOM mapping table now. Biggest gap is still non-PO invoices. Hoping to get Doug's input at Thursday's office hours." },
      { type: "meeting", source: "Maria \u2194 Ryan Weekly Sync \u00b7 Week 12", date: "Mar 24", text: "Maria demoed invoice matching prototype. Three-way match logic solid for standard POs. She's building a confidence score routing low-confidence matches to human reviewer queue. Ryan asked her to document it as a reusable workflow template \u2014 Benefits Admin and Procurement will need similar human-in-the-loop routing. 70% automation by Q2. Remaining 30% still needs human review but with pre-populated fields. Coupa renewal is October \u2014 runway but not unlimited." },
      { type: "process_doc", source: "Current-State AP Workflow", date: "Mar 15", text: "Invoice received via email/mail \u2192 scanned \u2192 admin enters header into Coupa manually \u2192 Coupa attempts PO match (60% success rate due to formatting) \u2192 unmatched queued 3-day turnaround \u2192 matched route to manager ($0-5k) or VP ($5k+) \u2192 batch export to ERP Wed/Fri. Pain points: manual data entry bottleneck, matching algorithm unchanged since 2019, non-PO invoices tracked in shared spreadsheet. Average processing: 8.2 days receipt to approval." },
      { type: "builder_log", source: "Claude Code Session \u00b7 Sprint 4", date: "Mar 26", text: "Duration: 2.5 hrs \u00b7 Model: Sonnet \u00b7 Tokens: ~42k. Completed: UOM conversion table (lb/cwt/kg/head) for active commodity codes. Integrated with three-way match. Added confidence scoring 0-100. Threshold: \u226585 auto-approve, 60-84 human review with recommendation, <60 manual. Need to test against February full set (~1,200 invoices). Blocked on: Non-PO routing rules \u2014 scheduled for Thursday." }
    ]
  },
  { id: 2, name: "Financial Reporting Pipeline", dept: "Accounting", type: "SaaS Replacement", status: "In Progress", owner: "Maria Chen + Jordan Ellis", targetSaaS: "Oracle Reports ($220k/yr)", rationalization: "Replace", capabilities: ["Reporting & Analytics", "Data Pipeline", "Document Generation"], scores: { impact: 10, effort: 2, risk: 6, alignment: 9 }, summary: "Highest-value SaaS target. Automating 14 board-level financial report types. CFO prioritized 3 critical reports for Q3 delivery. Intercompany elimination logic complex \u2014 23 adjustment categories. Running parallel with Oracle for 2-month validation. Audit trail non-negotiable. Oracle renewal leverage needed by October.",
    inputs: [
      { type: "email", source: "CFO \u2192 Ryan (forwarded)", date: "Mar 10", text: "The board package has 14 report types. I don't need all 14 simultaneously. The 3 reports that take Jordan 2 full days each month (P&L by BU, consolidated balance sheet, cash flow forecast) automated first. If reliable and audit-ready by Q3, that justifies the investment and gives leverage in Oracle renewal. Remaining 11 migrate on our schedule. I do NOT want to argue with Oracle's sales team in September without a working alternative." },
      { type: "telegram", source: "Jordan Ellis \u00b7 #accounting-innovation", date: "Mar 20", text: "P&L by business unit generating correctly for Seaboard Foods and Seaboard Farms individually. Consolidation is tricky \u2014 intercompany eliminations have 23 adjustment categories, some are judgment calls that change quarter to quarter. Capturing rules as decision tree in prompt but need a version-controlled rules file finance team can update without touching pipeline code. Maria suggested her UOM table pattern. Trying that this week." },
      { type: "risk", source: "Ryan \u00b7 Internal Assessment", date: "Mar 22", text: "Risk level: ELEVATED. Highest-value target ($220k/yr) but highest-stakes. Financial reports go to board and auditors. Accuracy is 100% or it's a problem. Approach: run AI in parallel with Oracle for minimum 2 months. Jordan signs off on every number before sunsetting any Oracle report. Audit trail non-negotiable \u2014 every data point traces to source. InfoSec review required before financial data flows through pipeline. Timeline tight for October leverage." }
    ]
  },
  { id: 3, name: "Employee Onboarding Portal", dept: "HR", type: "Net-New Tool", status: "Pilot", owner: "James Whitfield", targetSaaS: null, rationalization: null, capabilities: ["User-Facing App", "Workflow Automation"], scores: { impact: 7, effort: 6, risk: 2, alignment: 7 }, summary: "Self-service onboarding replacing manual paper checklist. Pilot at Merriam HQ: 43 new hires, completion time 4.5 \u2192 1.8 days. Three gaps: benefits enrollment too manual, IT asset assignment disconnected, plant workers need different requirements. Extending to Guymon plant next month.",
    inputs: [
      { type: "feedback", source: "New Hire Feedback \u00b7 Composite (5 responses)", date: "Mar 28", text: "\"Checklist way easier than the paper packet.\" \"Didn't know who my IT contact was for 2 days \u2014 portal said laptop ready but not where to pick it up.\" \"Benefits enrollment confusing \u2014 asking for documents I don't have yet.\" \"Loved the progress tracker \u2014 made me feel like the company had their act together.\" \"Add a who's-who section with photos and roles for my team.\"" },
      { type: "telegram", source: "James Whitfield \u00b7 #hr-innovation", date: "Mar 27", text: "Pilot stats: 43 new hires at Merriam. Completion time 4.5 days \u2192 1.8 days. Three pain points: (1) benefits enrollment needs too many manual steps \u2014 Lisa's Benefits Admin initiative could feed into this, (2) IT asset assignment not connected \u2014 still emailing IT separately, (3) plant new hires have different reqs (safety training, PPE, shift assignment) and portal doesn't differentiate. Planning Guymon pilot next month if we solve #3." },
      { type: "meeting", source: "James \u2194 Doug Biweekly \u00b7 Week 14", date: "Apr 3", text: "Doug impressed with time reduction. Plant scalability: safety training, PPE issuance, shift assignment steps don't exist for office roles \u2014 needs conditional logic. Doug suggested connecting with Tom Nguyen who built similar QA training checklist \u2014 potential shared component. HRIS integration discussed \u2014 current approach standalone with manual sync. Real integration needs IT and API access. Agreed standalone for now, revisit after pilot across office + plant." }
    ]
  },
  { id: 4, name: "Feed Scheduling Optimizer", dept: "Feed Mills", type: "Process Automation", status: "In Progress", owner: "Carlos Reyes", targetSaaS: null, rationalization: null, capabilities: ["Scheduling & Planning", "Data Pipeline"], scores: { impact: 8, effort: 3, risk: 5, alignment: 9 }, summary: "AI-driven batch sequencing for 14 feed formulations across 3 production lines. Initial results: 22% changeover time reduction. Critical gap: medicated feed segregation not handled correctly (FDA compliance). Needs real-time ingredient delivery delay handling. Live Ops requesting integration with grow-out schedules.",
    inputs: [
      { type: "process_doc", source: "St. Joseph Feed Mill Scheduling", date: "Mar 5", text: "14 distinct formulations, 3 lines. Current scheduling: weekly in Excel based on grow-out house delivery schedule, ingredient inventory, changeover time (15 min similar \u2194 2 hrs medicated/non-medicated), supplier delivery windows. Optimization problem: minimize changeover time, ingredient waste (partial bags expire), delivery delays. Carlos estimates 70% efficiency. 30% lost to suboptimal sequencing, emergency re-scheduling, over-production buffers." },
      { type: "telegram", source: "Carlos Reyes \u00b7 #feedmill-innovation", date: "Mar 18", text: "Fed 18 months of production logs + USDA formulation database into model. AI sequences reduce changeover time 22% vs my manual schedules. BUT medicated feed segregation not correct \u2014 FDA requires complete line flush between medicated/non-medicated, model treats it like normal changeover. Compliance requirement, not nice-to-have. Need to hard-code that constraint. Also need real-time ingredient delivery delay handling." },
      { type: "email", source: "Live Operations \u2192 Carlos", date: "Mar 21", text: "Heads up \u2014 adjusting grow-out schedule for houses 12-18 at Hennessey. Birds running 4 days ahead of target weight, pulling delivery forward. Need finishing ration Thursday instead of Monday. Third time this quarter we've emergency-adjusted. If your AI thing can eventually factor in live growth data, that would be a game changer for both of us." }
    ]
  },
  { id: 5, name: "Brand Asset Generator", dept: "Marketing", type: "AI Capability", status: "Deployed", owner: "Priya Patel", targetSaaS: null, rationalization: null, capabilities: ["Document Generation"], scores: { impact: 6, effort: 8, risk: 1, alignment: 5 }, summary: "Claude-powered marketing collateral generator. 214 artifacts in March across sell sheets, social, distributor materials. Revision rate dropped from 41% (Jan) to 18% (Mar). Sales team requesting auto-populated regional pricing and current competitive data.",
    inputs: [
      { type: "output_sample", source: "Usage Log Summary \u00b7 March 2026", date: "Mar 31", text: "Total artifacts: 214. Breakdown: retail sell sheets (68), social posts (52), distributor one-pagers (34), trade show handouts (28), internal comms (22), export market profiles (10). Avg generation: 3.2 min/asset. Revision rate: 18% (down from 41% in Jan). Top requesters: Sales (89), Marketing (72), Export (31), Executive (22). Brand compliance flags: 4 (2 logo placement, 1 color variant, 1 outdated tagline). All caught pre-distribution." },
      { type: "email", source: "Sales Team \u2192 Priya", date: "Mar 25", text: "Sell sheets for Prairie Fresh Natural line are really good \u2014 Kroger and HEB buyers commented on polish. Two requests: (1) version that auto-populates regional pricing \u2014 I manually update for 6 regions, (2) competitive comparison references 2024 data, Smithfield's numbers are different now. If this could pull current market data and format into template, I'd use it for every buyer meeting." }
    ]
  },
  { id: 6, name: "Security Compliance Scanner", dept: "IT / Innovation", type: "AI Capability", status: "In Progress", owner: "Ryan", targetSaaS: null, rationalization: null, capabilities: ["Compliance & Audit", "Integration Layer"], scores: { impact: 9, effort: 3, risk: 2, alignment: 10 }, summary: "Agentic pipeline: RSS/newsletter ingestion \u2192 security scan \u2192 relevance evaluation \u2192 synthesis + delivery. Gap: Stage 3 evaluation memory getting stale \u2014 needs connection to initiative registry for current context. Updates manually every 2 weeks.",
    inputs: [
      { type: "architecture", source: "Ryan \u00b7 Pipeline v2 Architecture", date: "Mar 15", text: "Stage 1 \u2014 Ingestion: cron monitors 12 RSS feeds + 4 newsletters, parse/dedup. Stage 2 \u2014 Security Screen: fork repos to sandbox, scan CVEs, dependency vulns, suspicious network calls, data exfil patterns, license compliance. Hard gate. Stage 3 \u2014 Relevance: agent with evolving memory of initiatives/stack/priorities, score \u22657/10 flagged. Stage 4 \u2014 Synthesis: summary + relevance rationale + application \u2192 daily digest + Telegram alerts. Gap: Stage 3 memory stale, need initiative registry." },
      { type: "output_sample", source: "Auto-generated Telegram Alert", date: "Mar 28", text: "\ud83d\udd12 SECURITY PASS | \u2b50 8.4/10 | structured-output-parser v2.1 (GitHub, 2.3k stars, MIT). Standardized JSON/XML output parsing for LLM responses with auto-retry and schema validation. 6 current initiatives use ad-hoc parsing \u2014 could replace custom logic in AP Engine, Financial Reporting, Regulatory Monitor. Security: clean. License: MIT. Action: consider as standard library for structured LLM output parsing." }
    ]
  },
  { id: 7, name: "Production QA Visual Monitor", dept: "Processing", type: "AI Capability", status: "Discovery", owner: "Tom Nguyen", targetSaaS: null, rationalization: null, capabilities: ["Data Pipeline", "Reporting & Analytics"], scores: { impact: 8, effort: 2, risk: 7, alignment: 8 }, summary: "Camera-based visual inspection supplementing human QA. Line speed 1,100 head/hr, accuracy drops in final shift hours. Discovery: evaluating hardware ($64-180k), USDA regulatory path, training data needs. 6-12 month initiative. Not a vibe-coding project.",
    inputs: [
      { type: "discovery", source: "Tom Nguyen \u2194 Ryan \u00b7 Bootcamp Office Hours", date: "Mar 18", text: "Current: USDA inspectors + Seaboard staff visual inspection, ~1,100 head/hr. Accuracy drops last 2 hrs of shift. Idea: camera AI flags defects, alerts human inspector. Supplement NOT replacement. Ryan: technically feasible, operationally complex. Camera placement on wet high-speed line = engineering challenge. Model needs labeled defect images from scratch. USDA regs on automated inspection. 6-12 months minimum." },
      { type: "process_doc", source: "Tom's Research Notes", date: "Mar 25", text: "3 camera vendors. Industrial cameras (waterproof, high-speed, food-safe): $8-15k/unit. 4-6 per line \u00d7 2 lines = $64-180k. BUT: 1% more defect catch \u2192 downstream savings dwarf hardware. One recall = $2-5M. USDA FSIS 'New Technology' submission = 60-day review. 'Decision support tool' (alerts humans) doesn't need full approval. Next: 500 labeled defect images from existing QA photos." }
    ]
  },
  { id: 8, name: "Order Status Dashboard", dept: "Sales", type: "SaaS Replacement", status: "Discovery", owner: "Derek Bowman", targetSaaS: "Salesforce Reports ($95k/yr)", rationalization: "Replace", capabilities: ["Reporting & Analytics", "Data Pipeline"], scores: { impact: 7, effort: 5, risk: 4, alignment: 6 }, summary: "Replace Salesforce reporting with auto-refreshing dashboard. 6 regional managers \u00d7 45 min/Monday = 4.5 hrs/week wasted on same report with different filters. Blocker: data connectivity to Salesforce + ERP without touching production.",
    inputs: [
      { type: "telegram", source: "Derek Bowman \u00b7 #sales-innovation", date: "Mar 14", text: "My frustration in one sentence: 6 regional managers each spend 45 min every Monday building the same report with different filters. 4.5 hrs/week of senior sales time. Data is there \u2014 order status, shipments, complaints, volume vs forecast \u2014 locked behind 15 clicks in Salesforce report builder. Auto-refreshing dashboard where each rep sees their region = I'd trade Salesforce Reports tomorrow." },
      { type: "discovery", source: "Derek \u2194 Innovation Team", date: "Mar 19", text: "Priority reports: (1) weekly order status by region, (2) customer complaint trends, (3) volume vs forecast by customer, (4) pricing exception report. Data sources: Salesforce, ERP, Excel (forecasts). Hard part: connecting without touching production systems. Ryan's sandbox policy = read-only API or scheduled exports. Derek checking with IT on available data feeds." }
    ]
  },
  { id: 9, name: "Benefits Administration Portal", dept: "HR", type: "SaaS Replacement", status: "Blocked", owner: "Lisa Park", targetSaaS: "BambooHR ($65k/yr)", rationalization: "Replace", capabilities: ["User-Facing App", "Workflow Automation", "Compliance & Audit"], scores: { impact: 6, effort: 3, risk: 6, alignment: 5 }, summary: "BLOCKED by InfoSec. Prototype processes Category 1 PII (SSN, DOB, medical plans) via external API. Path forward: separate AI workflow/UI from secure PII backend. Significantly increases complexity. Question: worth the effort for $65k/yr?",
    inputs: [
      { type: "email", source: "IT Security \u2192 Lisa, cc: Ryan, Doug", date: "Mar 20", text: "Cannot approve deployment. (1) PII: SSN, DOB, dependents, medical plans = Category 1, cannot process via external AI API. (2) Data residency: benefits data must stay in SOC 2 boundary, browser local storage not auditable. (3) No RBAC \u2014 any employee with URL could view others' benefits. Path forward: (a) local infrastructure, or (b) AI handles workflow/UI while separate secure backend manages PII. Open to discussing option (b)." },
      { type: "telegram", source: "Lisa Park \u00b7 #hr-innovation", date: "Mar 21", text: "Frustrating but fair. InfoSec concerns are legitimate \u2014 built prototype without thinking about data flow because bootcamp used synthetic data. Real benefits data = different security profile. Setting up time for option (b). Makes project much more complex \u2014 might need IT engineering support. @Ryan worth the effort for $65k/yr BambooHR?" }
    ]
  },
  { id: 10, name: "Dynamic Pricing Recommendations", dept: "Sales", type: "AI Capability", status: "Discovery", owner: "Derek Bowman (sponsor)", targetSaaS: null, rationalization: null, capabilities: ["Data Pipeline", "Reporting & Analytics"], scores: { impact: 9, effort: 1, risk: 5, alignment: 7 }, summary: "AI-assisted pricing for commodity pork across 3 pricing models and 200+ customers. High potential but complex data and sensitivity requirements. No builder assigned. Parked until Order Status Dashboard proves data connectivity patterns.",
    inputs: [
      { type: "concept", source: "Derek Bowman \u00b7 Concept Brief", date: "Mar 10", text: "Pork pricing changes daily (CME Lean Hog Index). 3 contract models (formula, negotiated fixed, cost-plus) across 200+ customers. Reps call me or pricing analyst for each complex quote, 30-60 min. Idea: customer + product + volume + date \u2192 recommended price range from CME, contract terms, inventory, margin history. Not auto-quoting \u2014 informed starting point." },
      { type: "risk", source: "Ryan \u00b7 Assessment", date: "Mar 15", text: "High impact but complex. Requires real-time CME feed, customer contracts, cost/margin data. Each = data access challenge given sandbox policy. Pricing strategy = competitive intelligence, even prototype needs access control. No builder with right data engineering + sales domain knowledge. Parking until Order Status Dashboard proves connectivity patterns." }
    ]
  },
  { id: 11, name: "Route Optimization Tool", dept: "Supply Chain", type: "Process Automation", status: "Pilot", owner: "Angela Morrison", targetSaaS: null, rationalization: null, capabilities: ["Scheduling & Planning", "Data Pipeline"], scores: { impact: 8, effort: 5, risk: 4, alignment: 8 }, summary: "AI-optimized delivery routing. 8-week pilot: 11.8% fewer miles, ~$4,200/mo fuel savings on 3 routes. Full fleet extrapolation: $30k+/mo. Bridge clearance fixed. Gaps: construction zones, rural roads. Discussing live haul extension with animal welfare transit constraints.",
    inputs: [
      { type: "memo", source: "Angela Morrison \u2192 Supply Chain VP", date: "Mar 28", text: "8-week pilot, 3 regional routes, 5 days/week. AI vs dispatcher (alternating weeks). 11.8% fewer miles, equal delivery completion. Fuel: ~$4,200/mo. Full fleet (22 routes): $30k+/mo. Driver feedback: 4/6 positive, 2 cited construction zones and truck stops. One route went through residential area with low bridge \u2014 hard fail, fixed." },
      { type: "telegram", source: "Angela Morrison \u00b7 #supplychain-innovation", date: "Apr 1", text: "Bridge clearance fixed \u2014 OSRM truck routing profile excluding restricted roads. Bigger question: OSM data good for 90% but misses rural roads near farms. Commercial routing data (HERE, TomTom) = $15-20k/yr, fraction of fuel savings. Also talking to live haul team about farm-to-plant optimization with animal welfare transit time limits." }
    ]
  },
  { id: 12, name: "USDA Documentation Generator", dept: "Processing", type: "Process Automation", status: "Deployed", owner: "Tom Nguyen", targetSaaS: null, rationalization: null, capabilities: ["Document Generation", "Compliance & Audit"], scores: { impact: 7, effort: 8, risk: 2, alignment: 7 }, summary: "Automated USDA compliance docs across 2 plants. 1,847 documents in 8 weeks. Saves ~15 hrs/week. Error rate: 0.3% vs 4.1% manual. USDA inspector approved. Export team requesting China protocol with bilingual requirement \u2014 first shipment April 15.",
    inputs: [
      { type: "output_sample", source: "Tom Nguyen \u00b7 Deployment Summary", date: "Mar 30", text: "8 weeks, 2 plants. 1,847 docs: HACCP logs, sanitation checklists, shipping certificates, export health certs (Japan, Korea, Mexico, EU). Saves ~15 hrs/week. Process: tablet input \u2192 AI populates \u2192 review + sign \u2192 auto-upload. Error: 0.3% (vs 4.1% manual). USDA inspector: 'No issues. As long as human reviews and signs, no concerns.'" },
      { type: "email", source: "Export Team \u2192 Tom", date: "Apr 2", text: "Need China protocol format \u2014 China reinstated pork imports, 3 new distributors. Different format: ractopamine-free attestation, bilingual (English + Mandarin), AQSIQ establishment number in header. Compliance team has template. Time-sensitive \u2014 first shipment April 15." }
    ]
  },
  { id: 13, name: "Ingredient Sourcing Tracker", dept: "Feed Mills", type: "Net-New Tool", status: "In Progress", owner: "Carlos Reyes", targetSaaS: null, rationalization: null, capabilities: ["Data Pipeline", "Reporting & Analytics"], scores: { impact: 6, effort: 6, risk: 3, alignment: 6 }, summary: "Consolidates 4 disconnected data sources for ingredient tracking. V1 dashboard: inventory, days of supply, deliveries, pricing, <5-day alerts. Already caught lysine shortage 4 days early. Next: automated data refresh replacing 5am CSV uploads.",
    inputs: [
      { type: "telegram", source: "Carlos Reyes \u00b7 #feedmill-innovation", date: "Mar 12", text: "Ingredient data in 4 places: (1) procurement Excel, (2) my spreadsheet, (3) ERP receiving, (4) supplier portals. None talk to each other. Over-ordered soybean meal last month \u2014 procurement showed low, ERP showed 3 days inventory they didn't know about. $8k unnecessary emergency freight." },
      { type: "builder_log", source: "Carlos \u2192 Ryan", date: "Mar 16", text: "Built v1 over weekend. CSV-fed dashboard: inventory by ingredient, days of supply, deliveries, contract vs spot price, <5-day supply alert. Ugly but works. Caught lysine shortage 4 days early. Next: automate refresh instead of 5am CSV uploads." }
    ]
  },
  { id: 14, name: "Social Content Pipeline", dept: "Marketing", type: "SaaS Replacement", status: "In Progress", owner: "Priya Patel", targetSaaS: "Sprout Social ($40k/yr)", rationalization: "Reduce", capabilities: ["Document Generation", "Workflow Automation"], scores: { impact: 5, effort: 7, risk: 2, alignment: 4 }, summary: "Extends Brand Asset Generator with social platform formatting. Strategic decision: Sprout's value is scheduling + analytics, not content creation. Recommendation: keep scheduling/analytics, retire content creation seats, save ~$25k. Case study for 'replace vs reduce vs retain' framework.",
    inputs: [
      { type: "telegram", source: "Priya Patel \u00b7 #marketing-innovation", date: "Mar 22", text: "Extended Brand Asset Generator for social: Instagram (1080\u00d71080, 1080\u00d71350), Facebook, LinkedIn, X. Platform-specific copy. Question: Sprout's value is scheduling + analytics, not content creation. I can generate content but still need scheduling. Build that too or overreach?" },
      { type: "telegram", source: "Ryan \u00b7 Response", date: "Mar 22", text: "Good question and I appreciate you asking instead of just building. This is the kind of decision the PM role should structure. Answer: keep Sprout for scheduling/analytics (hard to replicate), kill content creation seats (per-user cost), save $25k not $40k. Partial rationalization is still rationalization. Map Sprout contract \u2014 per-seat vs platform costs. Good case study for 'replace vs reduce vs retain' across SaaS portfolio." }
    ]
  },
  { id: 15, name: "Internal Knowledge Base", dept: "IT / Innovation", type: "AI Capability", status: "Discovery", owner: "Doug", targetSaaS: null, rationalization: null, capabilities: ["User-Facing App", "Data Pipeline", "Document Generation"], scores: { impact: 7, effort: 3, risk: 3, alignment: 7 }, summary: "Searchable index of ~50 skill.md files, prompt templates, architecture decisions. New cohorts waste 2+ hrs finding resources, builders duplicate existing work. Chicken-and-egg problem. Ryan's fix: require artifact registration for Innovation support. Connects to Security Scanner stale-memory problem.",
    inputs: [
      { type: "concept", source: "Doug \u00b7 Innovation Leads Meeting", date: "Mar 25", text: "Growing knowledge problem. 9 months: ~50 skill files, hundreds of templates, architecture decisions, tribal knowledge in heads or Telegram. New cohort: 2 hrs pointing to resources. 'Has anyone built X?' = 'probably, don't know where.' Proposal: searchable knowledge base with natural language queries. More valuable scaling from 100 to 300+ people." },
      { type: "feedback", source: "Anonymous \u00b7 Bootcamp Cohort 3", date: "Apr 1", text: "Bootcamp materials great but felt lost on my own project. Knew someone had solved my problem but couldn't find it. Spent two days building an output parser Maria had already built better. We need a way to search what's been built." },
      { type: "telegram", source: "Ryan \u00b7 Response to Doug", date: "Mar 26", text: "100% agree. (1) Require new initiatives to register artifacts as condition of Innovation support. Build habit, backfill later. (2) Security Scanner's evaluation agent needs initiative context \u2014 registry solves my stale-memory problem AND feeds knowledge base. Two birds." }
    ]
  },
  { id: 16, name: "Maintenance Scheduling System", dept: "Operations", type: "SaaS Replacement", status: "Discovery", owner: "Unassigned", targetSaaS: "UpKeep CMMS ($75k/yr)", rationalization: "Replace", capabilities: ["Scheduling & Planning", "Workflow Automation"], scores: { impact: 7, effort: 3, risk: 5, alignment: 6 }, summary: "Replace UpKeep \u2014 $75k/yr but using ~30% of features. Maintenance team not technical, used to paper. Discovery not started \u2014 needs PM assignment for user interviews, data audit, and builder assignment.",
    inputs: [
      { type: "email", source: "Operations VP \u2192 Doug", date: "Mar 28", text: "Paying $75k/yr for UpKeep, using maybe 30% of features. Techs use work orders and PM schedules \u2014 don't use asset hierarchy, parts inventory, or analytics. It's a $75k work order system. Can someone build something simpler? Team is not technical \u2014 used to paper, only switched because I made them. Dead simple required." },
      { type: "discovery", source: "Innovation Team Template", date: "Mar 29", text: "SaaS Discovery Checklist \u2014 UpKeep: [ ] utilization audit, [ ] interview 5+ users, [ ] map data (work orders, PM schedules, assets), [ ] integration points, [ ] contract review, [ ] estimate build complexity, [ ] risk assessment, [ ] assign builder + timeline. STATUS: NOT STARTED. Needs PM assignment." }
    ]
  },
  { id: 17, name: "Regulatory Update Monitor", dept: "Compliance", type: "AI Capability", status: "In Progress", owner: "Ryan", targetSaaS: null, rationalization: null, capabilities: ["Data Pipeline", "Compliance & Audit", "Integration Layer"], scores: { impact: 8, effort: 5, risk: 2, alignment: 9 }, summary: "Extension of Security Scanner for regulatory monitoring: USDA FSIS, FDA, EPA, OSHA, state ag regs. Gap: can identify relevance to 'pork processing' but can't map to specific facilities or initiatives. Needs registry for richer context.",
    inputs: [
      { type: "architecture", source: "Ryan \u00b7 Extension Notes", date: "Mar 20", text: "Same architecture as Security Scanner, different sources. Monitors: USDA FSIS, FDA animal feed, EPA emissions, OSHA, state regs (KS/OK/CO). Gap: identifies 'pork processing' relevance but can't map to specific facilities \u2014 Guymon EPA permit, St. Joseph medicated feed VFD rules. Initiative registry = every documented capability makes agents smarter." },
      { type: "output_sample", source: "Flagged Regulatory Update", date: "Mar 28", text: "\ud83d\udccb REGULATORY ALERT | 9.1/10 | USDA FSIS Directive 6100.4 Rev 3. STEC sampling for pork trim: N-60 1x/week \u2192 2x/week, effective June 1. Impact: Guymon + St. Joseph both produce ground pork. QA protocols + HACCP plans need updating. Additional labor: 6-8 hrs/week. USDA Doc Generator needs template updates. Action: route to Tom Nguyen + Compliance." }
    ]
  },
  { id: 18, name: "AID Bootcamp Progress Tracker", dept: "HR", type: "Net-New Tool", status: "In Progress", owner: "James Whitfield + Doug", targetSaaS: null, rationalization: null, capabilities: ["User-Facing App", "Reporting & Analytics"], scores: { impact: 5, effort: 7, risk: 1, alignment: 6 }, summary: "Tracks bootcamp enrollment, completion, and initiative participation. 94 enrolled, 77% of graduates active on initiatives. Gap: no post-graduation skill tracking or builder-to-project matching. Plant employees underrepresented.",
    inputs: [
      { type: "output_sample", source: "Doug \u00b7 Innovation Leads Meeting", date: "Mar 27", text: "Cohorts 1-3: 94 enrolled, 12 departments. Completion: C1 88% (21/24), C2 79% (23/29), C3 in progress (41). Post-bootcamp: 77% contributed to \u22651 initiative. Top: IT (18), Accounting (12), HR (11). Lowest: Live Ops (2), Feed Mills (3), Processing (4) \u2014 hardest to schedule. Missing: ongoing skill tracking after graduation." },
      { type: "telegram", source: "Ryan \u00b7 Feature Request", date: "Mar 28", text: "For Tracker: which graduates are ready for complex initiatives? Mental list doesn't scale past 50. Show: (1) what they've built, (2) capabilities demonstrated (prompt engineering, data pipeline, UI, integration), (3) current load. Skills matrix from actual work, not self-reported." },
      { type: "feedback", source: "Anonymous \u00b7 Cohort 2 Retrospective", date: "Mar 20", text: "Built a meeting notes summarizer. Works, people use it. But don't know what to do next. Telegram channels everywhere but don't know which need help. New skills, no direction. Dashboard showing 'open projects matching your skills' would be amazing." }
    ]
  },
];

/* ── Helpers ── */
function sc(s, w) { const t = w.impact + w.effort + w.risk + w.alignment; return ((s.impact * w.impact + s.effort * w.effort + (10 - s.risk) * w.risk + s.alignment * w.alignment) / t).toFixed(1); }
function Badge({ color, children, soft }) { return <span style={{ background: soft || color + "18", color, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4, letterSpacing: 0.3, whiteSpace: "nowrap", lineHeight: "20px", display: "inline-block" }}>{children}</span>; }
function Metric({ label, value, sub, accent }) { return (<div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 18px", flex: 1, minWidth: 130 }}><div style={{ fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, fontFamily: "monospace" }}>{label}</div><div style={{ fontSize: 26, fontWeight: 700, color: accent || C.text, fontFamily: "monospace" }}>{value}</div>{sub && <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{sub}</div>}</div>); }
const inputS = { background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 6, padding: "8px 12px", color: C.text, fontSize: 13, width: "100%", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
const selectS = { ...inputS, cursor: "pointer" };
const btnP = { background: C.accent, color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" };
const btnG = { background: "transparent", color: C.textMuted, border: `1px solid ${C.border}`, borderRadius: 6, padding: "8px 16px", fontSize: 13, cursor: "pointer" };

/* ── Raw Input Card ── */
function RawInputCard({ input }) {
  const [open, setOpen] = useState(false);
  return (<div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, marginBottom: 5 }}><div onClick={() => setOpen(!open)} style={{ padding: "7px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 13 }}>{INPUT_TYPE_ICONS[input.type] || "\ud83d\udcce"}</span><span style={{ fontSize: 12, color: C.text, fontWeight: 500, flex: 1 }}>{input.source}</span><span style={{ fontSize: 10, color: C.textDim, fontFamily: "monospace" }}>{input.date}</span><span style={{ fontSize: 9, color: C.textDim, transform: open ? "rotate(180deg)" : "none", transition: "0.15s" }}>\u25bc</span></div>{open && <div style={{ padding: "0 12px 10px 34px", fontSize: 12, color: C.textMuted, lineHeight: 1.65, whiteSpace: "pre-wrap", borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>{input.text}</div>}</div>);
}

/* ── Initiative Modal ── */
function InitiativeDetail({ init, weights, onClose }) {
  const s = parseFloat(sc(init.scores, weights));
  const sCol = s >= 7.5 ? C.green : s >= 5.5 ? C.amber : C.red;
  const tier = s >= 7.5 ? "P0" : s >= 6 ? "P1" : "P2";
  return (<div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: 40, overflowY: "auto" }} onClick={onClose}><div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, width: "90%", maxWidth: 780, maxHeight: "calc(100vh - 80px)", overflowY: "auto", padding: 28 }} onClick={e => e.stopPropagation()}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
      <div><h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: C.text }}>{init.name}</h2><div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>{init.owner} \u00b7 {init.dept}</div></div>
      <div style={{ textAlign: "right" }}><div style={{ fontSize: 32, fontWeight: 700, color: sCol, fontFamily: "monospace" }}>{sc(init.scores, weights)}</div><Badge color={sCol}>{tier} Priority</Badge></div>
    </div>
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
      <Badge color={TYPE_C[init.type]}>{init.type}</Badge>
      <Badge color={STATUS_C[init.status]}>{init.status}</Badge>
      {init.targetSaaS && <Badge color={C.amber}>{init.targetSaaS}</Badge>}
      {init.rationalization && <Badge color={C.rose}>{init.rationalization}</Badge>}
    </div>
    <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.7, marginBottom: 18 }}>{init.summary}</p>
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
      {init.capabilities.map(c => <span key={c} style={{ fontSize: 10, color: C.cyan, background: C.cyanSoft, padding: "3px 8px", borderRadius: 3, fontWeight: 500 }}>{c}</span>)}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 22 }}>
      {["impact", "effort", "risk", "alignment"].map(d => (<div key={d} style={{ background: C.bg, borderRadius: 6, padding: 10, textAlign: "center" }}><div style={{ fontSize: 10, color: C.textDim, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>{d}</div><div style={{ fontSize: 20, fontWeight: 700, color: C.text, fontFamily: "monospace" }}>{init.scores[d]}</div><div style={{ height: 3, background: C.border, borderRadius: 2, marginTop: 5 }}><div style={{ height: 3, borderRadius: 2, width: `${init.scores[d] * 10}%`, background: d === "risk" ? C.red : C.accent }} /></div></div>))}
    </div>
    <h3 style={{ fontSize: 13, fontWeight: 600, color: C.text, margin: "0 0 10px", fontFamily: "monospace" }}>RAW INPUTS ({init.inputs.length})</h3>
    {init.inputs.map((inp, i) => <RawInputCard key={i} input={inp} />)}
    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}><button onClick={onClose} style={btnG}>Close</button></div>
  </div></div>);
}

/* ── Insight Card ── */
function InsightCard({ icon, accent, title, children }) {
  return (<div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, borderLeft: `3px solid ${accent}` }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><span style={{ fontSize: 16 }}>{icon}</span><span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{title}</span></div>
    <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.65 }}>{children}</div>
  </div>);
}

/* ── Dashboard ── */
function DashboardView({ inits, weights, onSelect, onNav }) {
  const blocked = inits.filter(i => i.status === "Blocked");
  const unassigned = inits.filter(i => i.owner === "Unassigned" || i.owner.includes("sponsor"));
  const totSaaS = inits.filter(i => i.targetSaaS).reduce((s, i) => { const m = i.targetSaaS.match(/\$(\d+)k/); return s + (m ? parseInt(m[1]) : 0); }, 0);
  const totInputs = inits.reduce((s, i) => s + i.inputs.length, 0);
  const ranked = [...inits].sort((a, b) => sc(b.scores, weights) - sc(a.scores, weights));
  const top3 = ranked.slice(0, 3);

  // Builder load
  const ownerLoad = {}; inits.forEach(i => { (ownerLoad[i.owner] = ownerLoad[i.owner] || []).push(i); });
  const overloaded = Object.entries(ownerLoad).filter(([_, l]) => l.length >= 3).sort((a, b) => b[1].length - a[1].length);

  // Pipeline flow
  const pipeline = STATUSES.map(s => ({ name: s, count: inits.filter(i => i.status === s).length }));
  const pipeTotal = inits.length;

  // SaaS with contracts approaching
  const saasActive = inits.filter(i => i.targetSaaS && i.status !== "Deployed");

  // Capability reuse
  const capCounts = {}; CAPABILITIES.forEach(tag => { capCounts[tag] = inits.filter(i => i.capabilities.includes(tag)).length; });
  const topCap = Object.entries(capCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);

  // Recent inputs (last 5 by date sort heuristic)
  const allInputs = inits.flatMap(i => i.inputs.map(inp => ({ ...inp, initName: i.name, initId: i.id }))).slice(-6);

  return (<div>
    {/* ── Pipeline Pulse ── */}
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "16px 20px", marginBottom: 20 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 12, fontFamily: "monospace" }}>PIPELINE</div>
      <div style={{ display: "flex", gap: 2, marginBottom: 8, height: 32, borderRadius: 6, overflow: "hidden" }}>
        {pipeline.map((p) => {
          const pct = (p.count / pipeTotal) * 100;
          if (pct === 0) return null;
          return (<div key={p.name} style={{ width: `${pct}%`, background: STATUS_C[p.name], display: "flex", alignItems: "center", justifyContent: "center", minWidth: pct > 8 ? 40 : 24, transition: "width 0.3s" }} title={`${p.name}: ${p.count}`}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>{p.count}</span>
          </div>);
        })}
      </div>
      <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
        {pipeline.map(p => (<span key={p.name} style={{ fontSize: 10, color: STATUS_C[p.name], display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: STATUS_C[p.name] }} />{p.name} ({p.count})</span>))}
      </div>
    </div>

    {/* ── Needs Attention ── */}
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: C.red, marginBottom: 10, fontFamily: "monospace", display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.red, animation: "pulse 2s infinite" }} />
        NEEDS ATTENTION
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {blocked.map(i => (
          <InsightCard key={i.id} icon="\ud83d\udeab" accent={C.red} title={i.name}>
            <span style={{ color: C.red, fontWeight: 600 }}>Blocked</span> \u2014 {i.summary.slice(0, 120)}...
            <div style={{ marginTop: 6 }}><Badge color={STATUS_C[i.status]}>{i.status}</Badge> <span style={{ fontSize: 11, color: C.textDim }}>{i.dept} \u00b7 {i.owner}</span></div>
          </InsightCard>
        ))}
        {unassigned.map(i => (
          <InsightCard key={i.id} icon="\ud83d\udc64" accent={C.amber} title={i.name}>
            <span style={{ color: C.amber, fontWeight: 600 }}>No builder assigned</span> \u2014 {i.summary.slice(0, 120)}...
            <div style={{ marginTop: 6 }}><Badge color={STATUS_C[i.status]}>{i.status}</Badge> <span style={{ fontSize: 11, color: C.textDim }}>{i.dept}</span></div>
          </InsightCard>
        ))}
        {overloaded.map(([owner, list]) => (
          <InsightCard key={owner} icon="\u26a0\ufe0f" accent={C.amber} title={`${owner} \u2014 ${list.length} initiatives`}>
            <span style={{ color: C.amber, fontWeight: 600 }}>Concentration risk.</span> Single point of failure across: {list.map(i => i.name).join(", ")}. If this person is unavailable, {list.length} initiatives stall.
          </InsightCard>
        ))}
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
      {/* ── Top Priorities ── */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 12, fontFamily: "monospace" }}>TOP PRIORITIES</div>
        {top3.map((i, idx) => {
          const s = parseFloat(sc(i.scores, weights)); const sCol = s >= 7.5 ? C.green : s >= 5.5 ? C.amber : C.red;
          return (<div key={i.id} onClick={() => onSelect(i)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: idx < 2 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: sCol + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: sCol, fontFamily: "monospace" }}>{idx + 1}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{i.name}</div>
              <div style={{ fontSize: 11, color: C.textMuted }}>{i.dept} \u00b7 {i.owner}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: sCol, fontFamily: "monospace" }}>{sc(i.scores, weights)}</div>
              <Badge color={STATUS_C[i.status]}>{i.status}</Badge>
            </div>
          </div>);
        })}
        <div onClick={() => onNav("prioritize")} style={{ fontSize: 12, color: C.accent, marginTop: 10, cursor: "pointer", fontWeight: 500 }}>View full stack rank \u2192</div>
      </div>

      {/* ── SaaS Rationalization Snapshot ── */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 12, fontFamily: "monospace" }}>SAAS RATIONALIZATION</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 30, fontWeight: 700, color: C.amber, fontFamily: "monospace" }}>${totSaaS}k</span>
          <span style={{ fontSize: 12, color: C.textMuted }}>/yr targeted across {inits.filter(i => i.targetSaaS).length} systems</span>
        </div>
        {saasActive.sort((a, b) => { const ma = a.targetSaaS.match(/\$(\d+)k/); const mb = b.targetSaaS.match(/\$(\d+)k/); return (mb ? parseInt(mb[1]) : 0) - (ma ? parseInt(ma[1]) : 0); }).slice(0, 4).map(i => {
          const m = i.targetSaaS.match(/\$(\d+)k/); const cost = m ? parseInt(m[1]) : 0;
          return (<div key={i.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ flex: 1 }}><div style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>{i.name}</div></div>
            <span style={{ fontSize: 12, fontWeight: 600, color: C.amber, fontFamily: "monospace" }}>${cost}k</span>
            <Badge color={i.rationalization === "Reduce" ? C.rose : i.status === "Blocked" ? C.red : STATUS_C[i.status]}>{i.rationalization === "Reduce" ? "Reduce" : i.status}</Badge>
          </div>);
        })}
        <div onClick={() => onNav("saas")} style={{ fontSize: 12, color: C.accent, marginTop: 10, cursor: "pointer", fontWeight: 500 }}>View all targets \u2192</div>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
      {/* ── Capability Heatmap ── */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 12, fontFamily: "monospace" }}>CAPABILITY DENSITY</div>
        <p style={{ fontSize: 11, color: C.textMuted, margin: "0 0 12px" }}>Where shared infrastructure investment pays off most.</p>
        {Object.entries(capCounts).sort((a, b) => b[1] - a[1]).map(([tag, count]) => {
          const pct = (count / inits.length) * 100;
          const intensity = Math.min(1, count / 8);
          return (<div key={tag} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: C.text }}>{tag}</span>
              <span style={{ fontSize: 11, color: count >= 5 ? C.cyan : C.textMuted, fontWeight: count >= 5 ? 700 : 400, fontFamily: "monospace" }}>{count}</span>
            </div>
            <div style={{ height: 6, background: C.bg, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: 6, borderRadius: 3, width: `${pct}%`, background: count >= 5 ? C.cyan : count >= 3 ? C.accent : C.textDim, opacity: 0.4 + intensity * 0.6, transition: "width 0.3s" }} />
            </div>
          </div>);
        })}
        <div onClick={() => onNav("patterns")} style={{ fontSize: 12, color: C.accent, marginTop: 10, cursor: "pointer", fontWeight: 500 }}>View portfolio intelligence \u2192</div>
      </div>

      {/* ── Recent Activity ── */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 12, fontFamily: "monospace" }}>LATEST SIGNALS</div>
        <p style={{ fontSize: 11, color: C.textMuted, margin: "0 0 10px" }}>Most recent raw inputs across all initiatives.</p>
        {allInputs.slice(-5).reverse().map((inp, idx) => (
          <div key={idx} style={{ padding: "7px 0", borderBottom: idx < 4 ? `1px solid ${C.border}` : "none", display: "flex", gap: 8, alignItems: "flex-start" }}>
            <span style={{ fontSize: 13, marginTop: 1 }}>{INPUT_TYPE_ICONS[inp.type] || "\ud83d\udcce"}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.text }}>{inp.initName}</div>
              <div style={{ fontSize: 11, color: C.textMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{inp.source}</div>
            </div>
            <span style={{ fontSize: 10, color: C.textDim, fontFamily: "monospace", whiteSpace: "nowrap" }}>{inp.date}</span>
          </div>
        ))}
      </div>
    </div>

    {/* ── Portfolio Pulse Row ── */}
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Metric label="Total Initiatives" value={inits.length} sub={`${inits.filter(i => i.status === "In Progress").length} active`} />
      <Metric label="Departments" value={new Set(inits.map(i => i.dept)).size} sub={`${new Set(inits.map(i => i.owner)).size} builders`} />
      <Metric label="Raw Inputs" value={totInputs} sub="data points captured" accent={C.cyan} />
      <Metric label="Deployed" value={inits.filter(i => i.status === "Deployed").length} sub={`${inits.filter(i => i.status === "Pilot").length} in pilot`} accent={C.green} />
    </div>
  </div>);
}

/* ── Initiatives List ── */
function InitiativesView({ inits, weights, onSelect }) {
  const [fD, setFD] = useState("All"); const [fT, setFT] = useState("All"); const [fS, setFS] = useState("All"); const [sort, setSort] = useState("score");
  const filtered = useMemo(() => {
    let l = [...inits]; if (fD !== "All") l = l.filter(i => i.dept === fD); if (fT !== "All") l = l.filter(i => i.type === fT); if (fS !== "All") l = l.filter(i => i.status === fS);
    if (sort === "score") l.sort((a, b) => sc(b.scores, weights) - sc(a.scores, weights)); else if (sort === "dept") l.sort((a, b) => a.dept.localeCompare(b.dept)); else l.sort((a, b) => STATUSES.indexOf(a.status) - STATUSES.indexOf(b.status));
    return l;
  }, [inits, fD, fT, fS, sort, weights]);
  return (<div>
    <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
      <select value={fD} onChange={e => setFD(e.target.value)} style={selectS}><option value="All">All Departments</option>{DEPARTMENTS.map(d => <option key={d}>{d}</option>)}</select>
      <select value={fT} onChange={e => setFT(e.target.value)} style={selectS}><option value="All">All Types</option>{TYPES.map(t => <option key={t}>{t}</option>)}</select>
      <select value={fS} onChange={e => setFS(e.target.value)} style={selectS}><option value="All">All Statuses</option>{STATUSES.map(s => <option key={s}>{s}</option>)}</select>
      <select value={sort} onChange={e => setSort(e.target.value)} style={selectS}><option value="score">Sort: Score</option><option value="dept">Sort: Dept</option><option value="status">Sort: Status</option></select>
      <span style={{ fontSize: 12, color: C.textMuted, marginLeft: "auto" }}>{filtered.length} results</span>
    </div>
    {filtered.map(i => { const s = parseFloat(sc(i.scores, weights)); const sCol = s >= 7.5 ? C.green : s >= 5.5 ? C.amber : C.red;
      return (<div key={i.id} onClick={() => onSelect(i)} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, marginBottom: 5, padding: "11px 16px", cursor: "pointer", display: "grid", gridTemplateColumns: "2fr 110px 85px 1fr 50px", alignItems: "center", gap: 8 }} onMouseEnter={e => e.currentTarget.style.borderColor = C.accent} onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
        <div><div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{i.name}</div><div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>{i.owner} \u00b7 {i.inputs.length} inputs</div></div>
        <Badge color={TYPE_C[i.type]}>{i.type}</Badge>
        <Badge color={STATUS_C[i.status]}>{i.status}</Badge>
        <div style={{ fontSize: 11, color: C.textDim, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{i.targetSaaS || "\u2014"}</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: sCol, textAlign: "right", fontFamily: "monospace" }}>{sc(i.scores, weights)}</div>
      </div>);
    })}
  </div>);
}

/* ── Prioritization ── */
function PrioritizeView({ inits, weights, setWeights }) {
  const ranked = useMemo(() => [...inits].sort((a, b) => sc(b.scores, weights) - sc(a.scores, weights)), [inits, weights]);
  const top5 = ranked.slice(0, 5);
  const radarData = ["impact", "effort", "risk", "alignment"].map(dim => { const p = { dim: dim === "risk" ? "Low Risk" : dim.charAt(0).toUpperCase() + dim.slice(1) }; top5.forEach((it, i) => { p[`v${i}`] = dim === "risk" ? 10 - it.scores.risk : it.scores[dim]; }); return p; });
  const rC = [C.accent, C.green, C.amber, C.purple, C.cyan];
  return (<div>
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 20, marginBottom: 20 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 4, fontFamily: "monospace" }}>SCORING WEIGHTS</div>
      <p style={{ fontSize: 12, color: C.textMuted, margin: "4px 0 16px" }}>Drag to model strategic priorities. Scores recalculate everywhere in real time.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {Object.entries(weights).map(([k, v]) => (<div key={k}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8 }}>{k}</span><span style={{ fontSize: 13, fontWeight: 700, color: C.accent, fontFamily: "monospace" }}>{v}%</span></div><input type="range" min={0} max={100} value={v} onChange={e => setWeights({ ...weights, [k]: parseInt(e.target.value) })} style={{ width: "100%", accentColor: C.accent }} /></div>))}
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 12, fontFamily: "monospace" }}>STACK RANK</div>
        {ranked.map((i, idx) => { const s = parseFloat(sc(i.scores, weights)); const sCol = s >= 7.5 ? C.green : s >= 5.5 ? C.amber : C.red; const tier = s >= 7.5 ? "P0" : s >= 6 ? "P1" : "P2";
          return (<div key={i.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: idx < ranked.length - 1 ? `1px solid ${C.border}` : "none" }}>
            <span style={{ fontSize: 11, color: C.textDim, fontFamily: "monospace", width: 18, textAlign: "right" }}>{idx + 1}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: tier === "P0" ? C.green : tier === "P1" ? C.amber : C.textDim, fontFamily: "monospace", width: 22 }}>{tier}</span>
            <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 12, color: C.text, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{i.name}</div><div style={{ fontSize: 10, color: C.textDim }}>{i.dept}</div></div>
            <span style={{ fontSize: 14, fontWeight: 700, color: sCol, fontFamily: "monospace" }}>{sc(i.scores, weights)}</span>
          </div>);
        })}
      </div>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 14, fontFamily: "monospace" }}>TOP 5 RADAR</div>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={radarData}><PolarGrid stroke={C.border} /><PolarAngleAxis dataKey="dim" tick={{ fill: C.textMuted, fontSize: 11 }} /><PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />{top5.map((_, i) => <Radar key={i} dataKey={`v${i}`} stroke={rC[i]} fill={rC[i]} fillOpacity={0.06} strokeWidth={2} />)}<Tooltip contentStyle={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 11 }} /></RadarChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6, justifyContent: "center" }}>{top5.map((it, i) => <span key={it.id} style={{ fontSize: 10, color: rC[i], display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: rC[i] }} />{it.name.length > 20 ? it.name.slice(0, 20) + "\u2026" : it.name}</span>)}</div>
      </div>
    </div>
  </div>);
}

/* ── Initiative metadata (tools & AI maturity) ── */
const INIT_META = {
  1: { tools: ["Claude Code", "VS Code"], aiLevel: "Augment", approach: "AI matches invoices, human reviews exceptions" },
  2: { tools: ["Claude Code", "VS Code"], aiLevel: "Augment", approach: "AI generates reports, human validates every number" },
  3: { tools: ["Claude", "VS Code"], aiLevel: "Assist", approach: "AI-powered portal, human manages workflow" },
  4: { tools: ["Claude Code", "Python", "USDA API"], aiLevel: "Augment", approach: "AI optimizes schedules, human approves and adjusts" },
  5: { tools: ["Claude API"], aiLevel: "Augment", approach: "AI generates collateral, human reviews before distribution" },
  6: { tools: ["Claude Code", "Python", "GitHub API"], aiLevel: "Automate", approach: "Agentic pipeline: ingest \u2192 scan \u2192 evaluate \u2192 deliver" },
  7: { tools: ["TBD"], aiLevel: "Experiment", approach: "Exploring computer vision feasibility" },
  8: { tools: ["TBD"], aiLevel: "Assist", approach: "Dashboard replacing manual report building" },
  9: { tools: ["Claude", "VS Code"], aiLevel: "Assist", approach: "AI handles workflow UI, separate PII backend" },
  10: { tools: ["TBD"], aiLevel: "Experiment", approach: "Concept stage \u2014 no builder assigned" },
  11: { tools: ["Python", "OSRM"], aiLevel: "Augment", approach: "AI suggests routes, dispatcher reviews" },
  12: { tools: ["Claude API", "Tablet UI"], aiLevel: "Augment", approach: "AI populates compliance docs, human reviews and signs" },
  13: { tools: ["Claude", "CSV tools"], aiLevel: "Assist", approach: "AI-powered dashboard over manual data exports" },
  14: { tools: ["Claude API"], aiLevel: "Assist", approach: "AI generates content, human schedules via Sprout" },
  15: { tools: ["TBD"], aiLevel: "Assist", approach: "Search interface over existing artifacts" },
  16: { tools: ["TBD"], aiLevel: "Experiment", approach: "Discovery \u2014 no builder assigned" },
  17: { tools: ["Claude Code", "Python", "RSS feeds"], aiLevel: "Automate", approach: "Agentic pipeline: monitor \u2192 evaluate \u2192 alert" },
  18: { tools: ["Claude", "VS Code"], aiLevel: "Assist", approach: "Tracking dashboard for bootcamp metrics" },
};

const AI_LEVEL_C = { Assist: C.cyan, Augment: C.accent, Automate: C.green, Experiment: C.purple };
const AI_LEVEL_DESC = {
  Assist: "AI helps generate, summarize, or present \u2014 human makes all decisions and takes action",
  Augment: "AI does the heavy lifting \u2014 human reviews, validates, and approves before output is used",
  Automate: "AI executes end-to-end with minimal human intervention \u2014 agentic workflows",
  Experiment: "Exploring feasibility \u2014 not yet producing operational output",
};

/* ── Portfolio Intelligence ── */
function PatternsView({ inits }) {
  // Compute pattern data
  const capMap = {}; CAPABILITIES.forEach(tag => { capMap[tag] = inits.filter(i => i.capabilities.includes(tag)); });
  const overlaps = Object.entries(capMap).filter(([_, l]) => l.length >= 2).map(([tag, l]) => ({ tag, inits: l, depts: [...new Set(l.map(x => x.dept))] })).filter(o => o.depts.length >= 2).sort((a, b) => b.inits.length - a.inits.length);
  const ownerLoad = {}; inits.forEach(i => { (ownerLoad[i.owner] = ownerLoad[i.owner] || []).push(i); }); const heavy = Object.entries(ownerLoad).filter(([_, l]) => l.length >= 2).sort((a, b) => b[1].length - a[1].length);

  // AI maturity distribution
  const levelCounts = { Assist: 0, Augment: 0, Automate: 0, Experiment: 0 };
  inits.forEach(i => { const m = INIT_META[i.id]; if (m) levelCounts[m.aiLevel]++; });
  const totalWithMeta = Object.values(levelCounts).reduce((a, b) => a + b, 0);

  // Tool proliferation
  const toolCounts = {};
  inits.forEach(i => { const m = INIT_META[i.id]; if (m) m.tools.forEach(t => { if (t !== "TBD") toolCounts[t] = (toolCounts[t] || 0) + 1; }); });
  const toolEntries = Object.entries(toolCounts).sort((a, b) => b[1] - a[1]);

  // Feedback loop gap (initiatives with no output_sample or feedback inputs)
  const noFeedback = inits.filter(i => !i.inputs.some(inp => ["feedback", "output_sample", "memo"].includes(inp.type)));
  const withFeedback = inits.filter(i => i.inputs.some(inp => ["feedback", "output_sample", "memo"].includes(inp.type)));

  // Data isolation (initiatives with data pipeline cap but no integration layer)
  const dataIsolated = inits.filter(i => i.capabilities.includes("Data Pipeline") && !i.capabilities.includes("Integration Layer"));

  const [activePattern, setActivePattern] = useState(0);

  const patterns = [
    {
      id: "assist", icon: "\ud83e\udde0", title: "The Assist Layer Ceiling", accent: C.cyan,
      signal: `${levelCounts.Assist + levelCounts.Experiment} of ${totalWithMeta} initiatives (${Math.round((levelCounts.Assist + levelCounts.Experiment) / totalWithMeta * 100)}%) are in Assist or Experiment mode`,
      finding: "Most initiatives sit in a narrow band: AI helps generate, summarize, or present information, but humans make all decisions and take all actions. Only 2 initiatives have reached Automate level (agentic end-to-end execution). This is a strong foundation but limited operational leverage \u2014 the portfolio is generating outputs, not driving outcomes.",
      implication: "Prioritize graduating high-performing Assist initiatives to Augment. Identify which initiatives could reach Automate with investment in feedback loops and confidence scoring. The AP Invoice Engine's confidence-score pattern is the model: route high-confidence decisions to auto-execution, keep humans on exceptions.",
      renderDetail: () => (
        <div>
          <div style={{ display: "flex", gap: 3, marginBottom: 12, height: 28, borderRadius: 6, overflow: "hidden" }}>
            {Object.entries(levelCounts).map(([level, count]) => {
              const pct = (count / totalWithMeta) * 100; if (pct === 0) return null;
              return (<div key={level} style={{ width: `${pct}%`, background: AI_LEVEL_C[level], display: "flex", alignItems: "center", justifyContent: "center", minWidth: 30 }} title={`${level}: ${count}`}><span style={{ fontSize: 11, fontWeight: 700, color: "#fff", textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>{count}</span></div>);
            })}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
            {Object.entries(AI_LEVEL_C).map(([level, color]) => (<span key={level} style={{ fontSize: 10, color, display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: color }} />{level} ({levelCounts[level]})</span>))}
          </div>
          {Object.entries(levelCounts).filter(([_, c]) => c > 0).map(([level]) => (
            <div key={level} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: AI_LEVEL_C[level], marginBottom: 2 }}>{level}</div>
              <div style={{ fontSize: 10, color: C.textDim, marginBottom: 4 }}>{AI_LEVEL_DESC[level]}</div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {inits.filter(i => INIT_META[i.id]?.aiLevel === level).map(i => (<span key={i.id} style={{ fontSize: 10, color: C.text, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 3, padding: "2px 6px" }}>{i.name}</span>))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "context", icon: "\ud83d\udd17", title: "Fragmented Data \u2014 No Shared Context Layer", accent: C.amber,
      signal: `${dataIsolated.length} initiatives build data pipelines independently with no integration layer`,
      finding: "Each team pulls from its own data sources with no consistent schema, shared data access pattern, or visibility into what others have built. Initiatives like Order Status Dashboard, Dynamic Pricing, Financial Reporting, and Ingredient Sourcing all need read access to production systems but each one is solving that connectivity problem independently. Meanwhile, Ryan's evaluation agents (Security Scanner, Regulatory Monitor) are degrading because they lack current context about what the portfolio is actually doing.",
      implication: "Solving data connectivity once creates a reusable pattern. A shared read-only data access layer (scheduled exports from Salesforce, ERP, market feeds into a sandbox-compliant staging area) would unblock 4+ initiatives simultaneously. The initiative registry itself is the first shared context layer \u2014 it feeds the evaluation agents and prevents duplicate discovery.",
      renderDetail: () => (
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.text, marginBottom: 8 }}>Initiatives building isolated data pipelines:</div>
          {dataIsolated.map(i => (<div key={i.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 12, color: C.text, fontWeight: 500, flex: 1 }}>{i.name}</span>
            <span style={{ fontSize: 10, color: C.textDim }}>{i.dept}</span>
            <Badge color={STATUS_C[i.status]}>{i.status}</Badge>
          </div>))}
          <div style={{ marginTop: 12, padding: 10, background: C.accentSoft, borderRadius: 6, border: `1px solid ${C.accent}33` }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.accent }}>Connected opportunity</div>
            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2, lineHeight: 1.5 }}>Security Scanner + Regulatory Monitor both need initiative context to score relevance. This registry IS the shared context layer they\u2019re missing.</div>
          </div>
        </div>
      ),
    },
    {
      id: "tools", icon: "\ud83d\udee0\ufe0f", title: "Tool Proliferation Without Standardization", accent: C.rose,
      signal: `${toolEntries.length} distinct tools across ${inits.length} initiatives`,
      finding: "Claude Code, VS Code, Python, Claude API, OSRM, GitHub API, RSS feeds, CSV tools, Tablet UIs \u2014 builders are choosing tools based on personal preference and discovery rather than organizational standards. This isn't inherently bad (velocity is high), but learning isn't compounding. When Maria builds a confidence-scoring pattern in Claude Code, that knowledge doesn't transfer to Carlos building in Python. When Ryan's agentic pipeline uses a specific output parsing approach, 5 other initiatives solve the same problem differently.",
      implication: "Don't restrict tool choice \u2014 that kills grassroots momentum. Instead, standardize patterns: output parsing, confidence scoring, human-in-the-loop routing, data access. The Internal Knowledge Base initiative (Initiative 15) is the mechanism for this. Adopt proven libraries (like the structured-output-parser the Security Scanner flagged) org-wide.",
      renderDetail: () => (
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.text, marginBottom: 10 }}>Tool usage across portfolio:</div>
          {toolEntries.map(([tool, count]) => (
            <div key={tool} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <span style={{ fontSize: 12, color: C.text }}>{tool}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: count >= 4 ? C.accent : C.textMuted, fontFamily: "monospace" }}>{count}</span>
              </div>
              <div style={{ height: 5, background: C.bg, borderRadius: 3 }}>
                <div style={{ height: 5, borderRadius: 3, width: `${(count / inits.length) * 100}%`, background: C.rose, opacity: 0.5 + (count / inits.length) * 0.5 }} />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "feedback", icon: "\ud83d\udd04", title: "Missing Feedback Loops", accent: C.red,
      signal: `${noFeedback.length} of ${inits.length} initiatives have no feedback, usage data, or outcome metrics captured`,
      finding: "Most outputs are generated but not evaluated. Initiatives produce artifacts, reports, documents, and recommendations \u2014 but very few track whether those outputs were accurate, useful, or impactful. Without feedback data, prioritization is based on estimates rather than evidence. The question \u2018was this worth building?\u2019 can\u2019t be answered.",
      implication: "Introduce lightweight evaluation at the initiative level: output quality sampling, usage frequency, time saved, error rate before/after. This doesn't need to be heavy \u2014 even a monthly \u2018is this still being used and is it accurate?\u2019 check creates the data needed to justify scaling winners and sunsetting experiments. The Brand Asset Generator is the model: they track revision rate (41% \u2192 18%) which directly shows quality improvement.",
      renderDetail: () => (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.red, marginBottom: 6 }}>No feedback captured ({noFeedback.length})</div>
              {noFeedback.map(i => (<div key={i.id} style={{ fontSize: 11, color: C.textMuted, padding: "3px 0" }}>{i.name}</div>))}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.green, marginBottom: 6 }}>Has outcome data ({withFeedback.length})</div>
              {withFeedback.map(i => (<div key={i.id} style={{ fontSize: 11, color: C.textMuted, padding: "3px 0" }}>{i.name}</div>))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "momentum", icon: "\ud83d\ude80", title: "Strong Grassroots Momentum", accent: C.green,
      signal: `${new Set(inits.map(i => i.owner)).size} unique builders across ${new Set(inits.map(i => i.dept)).size} departments in <9 months`,
      finding: "Teams are building actively without waiting for permission. High engagement across skill levels \u2014 from AID Bootcamp Cohort 1 graduates to the Head of Innovation himself. The 94 bootcamp enrollees, 77% post-graduation participation rate, and organic spread to 30+ departments is exactly the kind of bottom-up adoption that top-down programs spend millions trying to create. This is the single greatest asset in the portfolio.",
      implication: "Structure without constraining. The PM role exists to add the layer of prioritization, pattern recognition, and portfolio visibility that lets this momentum compound instead of plateau. Every system, process, or requirement added should pass one test: \u2018does this help builders build better, or does it just make managers feel informed?\u2019 If it\u2019s the latter, skip it.",
      renderDetail: () => (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {[{ label: "Builders", value: new Set(inits.map(i => i.owner)).size, color: C.green },
              { label: "Departments", value: new Set(inits.map(i => i.dept)).size, color: C.accent },
              { label: "Raw Inputs", value: inits.reduce((s, i) => s + i.inputs.length, 0), color: C.cyan },
            ].map(m => (<div key={m.label} style={{ background: C.bg, borderRadius: 6, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: m.color, fontFamily: "monospace" }}>{m.value}</div>
              <div style={{ fontSize: 10, color: C.textDim, textTransform: "uppercase", letterSpacing: 0.8 }}>{m.label}</div>
            </div>))}
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 4, flexWrap: "wrap" }}>
            {heavy.map(([owner, list]) => (<span key={owner} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: list.length >= 3 ? C.amberSoft : C.bg, color: list.length >= 3 ? C.amber : C.textMuted, border: `1px solid ${list.length >= 3 ? C.amber + "33" : C.border}` }}>{owner} ({list.length})</span>))}
          </div>
        </div>
      ),
    },
  ];

  return (<div>
    {/* Pattern selector */}
    <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
      {patterns.map((p, idx) => (
        <div key={p.id} onClick={() => setActivePattern(idx)} style={{ background: activePattern === idx ? p.accent + "18" : C.surface, border: `1px solid ${activePattern === idx ? p.accent + "44" : C.border}`, borderRadius: 8, padding: "10px 14px", cursor: "pointer", flex: 1, minWidth: 110, transition: "all 0.15s" }}>
          <div style={{ fontSize: 15, marginBottom: 4 }}>{p.icon}</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: activePattern === idx ? p.accent : C.text, lineHeight: 1.3 }}>{p.title}</div>
        </div>
      ))}
    </div>

    {/* Active pattern detail */}
    {(() => { const p = patterns[activePattern]; return (
      <div style={{ background: C.surface, border: `1px solid ${p.accent}33`, borderRadius: 10, padding: 22, marginBottom: 20, borderLeft: `4px solid ${p.accent}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ fontSize: 22 }}>{p.icon}</span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{p.title}</div>
            <div style={{ fontSize: 12, color: p.accent, fontWeight: 600, fontFamily: "monospace", marginTop: 2 }}>{p.signal}</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Finding</div>
            <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.65 }}>{p.finding}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6, marginTop: 14 }}>Implication</div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.65 }}>{p.implication}</div>
          </div>
          <div style={{ background: C.bg, borderRadius: 8, padding: 14 }}>
            {p.renderDetail()}
          </div>
        </div>
      </div>
    ); })()}

    {/* Capability overlap (kept, moved below) */}
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 20 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 4, fontFamily: "monospace" }}>CROSS-DEPARTMENT CAPABILITY OVERLAPS</div>
      <p style={{ fontSize: 12, color: C.textMuted, margin: "4px 0 14px" }}>Same capability across different departments \u2014 shared infrastructure opportunities.</p>
      {overlaps.slice(0, 5).map(o => (<div key={o.tag} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${C.border}` }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><Badge color={C.cyan} soft={C.cyanSoft}>{o.tag}</Badge><span style={{ fontSize: 12, color: C.textMuted }}>{o.inits.length} initiatives \u00b7 {o.depts.length} departments</span></div><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{o.inits.map(i => <span key={i.id} style={{ fontSize: 10, color: C.text, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 3, padding: "2px 6px" }}>{i.name} <span style={{ color: C.textDim }}>({i.dept})</span></span>)}</div></div>))}
    </div>
  </div>);
}

/* ── SaaS ── */
function SaaSView({ inits, onSelect }) {
  const saas = inits.filter(i => i.targetSaaS); const total = saas.reduce((s, i) => { const m = i.targetSaaS.match(/\$(\d+)k/); return s + (m ? parseInt(m[1]) : 0); }, 0);
  const chD = saas.map(i => { const m = i.targetSaaS.match(/\$(\d+)k/); return { name: i.name.length > 24 ? i.name.slice(0, 24) + "\u2026" : i.name, cost: m ? parseInt(m[1]) : 0, status: i.status, rat: i.rationalization }; }).sort((a, b) => b.cost - a.cost);
  return (<div>
    <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
      <Metric label="Total Targeted" value={`$${total}k/yr`} accent={C.amber} />
      <Metric label="Systems" value={saas.length} />
      <Metric label="In Flight" value={saas.filter(i => ["In Progress", "Pilot"].includes(i.status)).length} accent={C.green} sub="in progress or pilot" />
      <Metric label="Strategy" value={`${saas.filter(i => i.rationalization === "Replace").length}R / ${saas.filter(i => i.rationalization === "Reduce").length}D`} accent={C.rose} sub="replace / reduce" />
    </div>
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 20, marginBottom: 20 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 14, fontFamily: "monospace" }}>ANNUAL COST BY TARGET</div>
      <ResponsiveContainer width="100%" height={200}><BarChart data={chD} layout="vertical"><XAxis type="number" tick={{ fill: C.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}k`} /><YAxis type="category" dataKey="name" width={180} tick={{ fill: C.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} /><Bar dataKey="cost" radius={[0, 4, 4, 0]} barSize={18}>{chD.map((e, i) => <Cell key={i} fill={e.status === "Blocked" ? C.red : e.rat === "Reduce" ? C.rose : C.amber} />)}</Bar><Tooltip contentStyle={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 12 }} formatter={v => [`$${v}k/yr`]} /></BarChart></ResponsiveContainer>
      <div style={{ display: "flex", gap: 16, marginTop: 10, justifyContent: "center" }}>
        <span style={{ fontSize: 11, color: C.amber, display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: C.amber }} /> Replace</span>
        <span style={{ fontSize: 11, color: C.rose, display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: C.rose }} /> Reduce</span>
        <span style={{ fontSize: 11, color: C.red, display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: C.red }} /> Blocked</span>
      </div>
    </div>
    {saas.sort((a, b) => { const ma = a.targetSaaS.match(/\$(\d+)k/); const mb = b.targetSaaS.match(/\$(\d+)k/); return (mb ? parseInt(mb[1]) : 0) - (ma ? parseInt(ma[1]) : 0); }).map(i => (
      <div key={i.id} onClick={() => onSelect(i)} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 12, marginBottom: 5, display: "grid", gridTemplateColumns: "2fr 1fr 85px 75px", gap: 8, alignItems: "center", cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.borderColor = C.accent} onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
        <div><div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{i.name}</div><div style={{ fontSize: 11, color: C.textMuted }}>{i.dept} \u00b7 {i.owner}</div></div>
        <Badge color={C.amber}>{i.targetSaaS}</Badge><Badge color={STATUS_C[i.status]}>{i.status}</Badge><Badge color={C.rose}>{i.rationalization}</Badge>
      </div>))}
  </div>);
}

/* ── Add Initiative Form ── */
function AddInitForm({ onAdd, onCancel }) {
  const [f, setF] = useState({ name: "", dept: DEPARTMENTS[0], type: TYPES[0], status: STATUSES[0], owner: "", targetSaaS: "", rationalization: "", summary: "", capabilities: [], scores: { impact: 5, effort: 5, risk: 5, alignment: 5 } });
  const s = (k, v) => setF({ ...f, [k]: v }); const ss = (k, v) => setF({ ...f, scores: { ...f.scores, [k]: parseInt(v) } });
  const tc = (c) => setF({ ...f, capabilities: f.capabilities.includes(c) ? f.capabilities.filter(x => x !== c) : [...f.capabilities, c] });
  const submit = () => { if (!f.name || !f.owner) return; onAdd({ ...f, id: Date.now(), targetSaaS: f.targetSaaS || null, rationalization: f.rationalization || null, inputs: [] }); };
  return (<div style={{ background: C.surface, border: `1px solid ${C.accent}44`, borderRadius: 10, padding: 24 }}>
    <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700, color: C.text }}>Register New Initiative</h3>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
      <div style={{ gridColumn: "span 2" }}><label style={{ display: "block", fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Initiative Name *</label><input value={f.name} onChange={e => s("name", e.target.value)} style={inputS} placeholder="e.g. Vendor Performance Dashboard" /></div>
      <div><label style={{ display: "block", fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Department</label><select value={f.dept} onChange={e => s("dept", e.target.value)} style={selectS}>{DEPARTMENTS.map(d => <option key={d}>{d}</option>)}</select></div>
      <div><label style={{ display: "block", fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Type</label><select value={f.type} onChange={e => s("type", e.target.value)} style={selectS}>{TYPES.map(t => <option key={t}>{t}</option>)}</select></div>
      <div><label style={{ display: "block", fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Status</label><select value={f.status} onChange={e => s("status", e.target.value)} style={selectS}>{STATUSES.map(st => <option key={st}>{st}</option>)}</select></div>
      <div><label style={{ display: "block", fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Owner *</label><input value={f.owner} onChange={e => s("owner", e.target.value)} style={inputS} placeholder="Name (role)" /></div>
      <div><label style={{ display: "block", fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Target SaaS</label><input value={f.targetSaaS} onChange={e => s("targetSaaS", e.target.value)} style={inputS} placeholder="e.g. Coupa ($180k/yr)" /></div>
      <div><label style={{ display: "block", fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Rationalization</label><select value={f.rationalization} onChange={e => s("rationalization", e.target.value)} style={selectS}><option value="">N/A</option><option>Replace</option><option>Reduce</option><option>Retain (TBD)</option></select></div>
      <div style={{ gridColumn: "span 2" }}><label style={{ display: "block", fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Summary</label><textarea value={f.summary} onChange={e => s("summary", e.target.value)} style={{ ...inputS, minHeight: 70, resize: "vertical" }} placeholder="Current state, key gaps, objectives..." /></div>
    </div>
    <div><label style={{ display: "block", fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Capabilities</label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{CAPABILITIES.map(c => (<span key={c} onClick={() => tc(c)} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 4, cursor: "pointer", fontWeight: 500, background: f.capabilities.includes(c) ? C.cyanSoft : C.bg, color: f.capabilities.includes(c) ? C.cyan : C.textDim, border: `1px solid ${f.capabilities.includes(c) ? C.cyan + "44" : C.border}` }}>{c}</span>))}</div>
    </div>
    <div style={{ marginTop: 18, marginBottom: 20 }}>
      <div style={{ fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>Dimension Scores</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {["impact", "effort", "risk", "alignment"].map(d => (<div key={d}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontSize: 11, color: C.textMuted, textTransform: "uppercase" }}>{d}</span><span style={{ fontSize: 13, fontWeight: 700, color: C.accent, fontFamily: "monospace" }}>{f.scores[d]}</span></div><input type="range" min={1} max={10} value={f.scores[d]} onChange={e => ss(d, e.target.value)} style={{ width: "100%", accentColor: C.accent }} /></div>))}
      </div>
    </div>
    <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}><button onClick={onCancel} style={btnG}>Cancel</button><button onClick={submit} style={{ ...btnP, opacity: f.name && f.owner ? 1 : 0.4 }}>Add Initiative</button></div>
  </div>);
}

/* ── Add Raw Input Form ── */
function AddInputForm({ inits, onAdd, onCancel }) {
  const IT = ["telegram", "meeting", "email", "process_doc", "builder_log", "feedback", "architecture", "output_sample", "concept", "discovery", "risk", "memo"];
  const [tid, setTid] = useState(inits[0]?.id); const [type, setType] = useState("telegram"); const [source, setSource] = useState(""); const [date, setDate] = useState(""); const [text, setText] = useState("");
  const submit = () => { if (!source || !text || !tid) return; onAdd(tid, { type, source, date: date || "Today", text }); setSource(""); setText(""); setDate(""); };
  return (<div style={{ background: C.surface, border: `1px solid ${C.cyan}44`, borderRadius: 10, padding: 24 }}>
    <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700, color: C.text }}>Capture Raw Input</h3>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
      <div style={{ gridColumn: "span 2" }}><label style={{ display: "block", fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Initiative *</label><select value={tid} onChange={e => setTid(parseInt(e.target.value))} style={selectS}>{inits.map(i => <option key={i.id} value={i.id}>{i.name} ({i.dept})</option>)}</select></div>
      <div><label style={{ display: "block", fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Input Type</label><select value={type} onChange={e => setType(e.target.value)} style={selectS}>{IT.map(t => <option key={t} value={t}>{INPUT_TYPE_ICONS[t]} {t.replace(/_/g, " ")}</option>)}</select></div>
      <div><label style={{ display: "block", fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Date</label><input value={date} onChange={e => setDate(e.target.value)} style={inputS} placeholder="e.g. Apr 5" /></div>
      <div style={{ gridColumn: "span 2" }}><label style={{ display: "block", fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Source *</label><input value={source} onChange={e => setSource(e.target.value)} style={inputS} placeholder="e.g. Maria Chen \u00b7 #accounting-innovation" /></div>
      <div style={{ gridColumn: "span 2" }}><label style={{ display: "block", fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Content *</label><textarea value={text} onChange={e => setText(e.target.value)} style={{ ...inputS, minHeight: 120, resize: "vertical" }} placeholder="Paste the raw input \u2014 Telegram message, meeting notes, email, builder log, feedback form, etc." /></div>
    </div>
    <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}><button onClick={onCancel} style={btnG}>Cancel</button><button onClick={submit} style={{ ...btnP, opacity: source && text ? 1 : 0.4 }}>Add Input</button></div>
  </div>);
}

/* ── Vision / Roadmap ── */
function VisionView() {
  const horizons = [
    { phase: "H1", label: "Weeks 1\u20134", title: "Foundation", accent: C.green, items: [
      { what: "Manual initiative registry", detail: "Every active initiative gets a structured card: owner, status, capabilities, scoring, raw context. Replaces tribal knowledge and Telegram scanning as the source of truth for what\u2019s happening." },
      { what: "Structured intake workflow", detail: "Standardized process for registering new initiatives and capturing raw inputs (meeting notes, builder logs, feedback). Low friction \u2014 paste and tag, not fill out a 20-field form." },
      { what: "Prioritization framework v1", detail: "Four-dimension weighted scoring (impact, effort readiness, risk, strategic alignment) with adjustable weights. Transparent basis for what gets resourced and what waits." },
      { what: "Weekly portfolio briefing", detail: "Dashboard replaces the \u2018open 30 Telegram channels\u2019 morning ritual. What needs attention, what\u2019s blocked, what\u2019s shipping. Actionable, not decorative." },
    ]},
    { phase: "H2", label: "Months 2\u20133", title: "Integration", accent: C.accent, items: [
      { what: "Telegram ingestion layer", detail: "Bot monitors existing innovation channels. New messages auto-tagged to the relevant initiative based on channel mapping and content. PM reviews and approves rather than manually copying." },
      { what: "AI-assisted scoring", detail: "New initiatives get a suggested priority score based on description similarity to existing initiatives, capability overlap, and stated objectives. PM adjusts, not auto-decides." },
      { what: "Pattern detection automation", detail: "System identifies cross-department capability overlaps and suggests consolidation opportunities. Surfaces \u2018three teams building similar data pipelines\u2019 before the third one starts." },
      { what: "SaaS rationalization tracker", detail: "Contract renewal dates, cost displacement tracking, replace/reduce/retain decisions with evidence. Feeds directly into vendor negotiations." },
    ]},
    { phase: "H3", label: "Months 4\u20136", title: "Intelligence", accent: C.purple, items: [
      { what: "Initiative registry feeds evaluation agents", detail: "The Security Compliance Scanner and Regulatory Update Monitor pull current initiative context from this registry. Solves the stale-memory problem \u2014 evaluation agents know what Seaboard is actively building." },
      { what: "Builder-to-initiative matching", detail: "Connects to Bootcamp Tracker. When a new initiative needs a builder, the system recommends graduates whose demonstrated capabilities match the project requirements." },
      { what: "Portfolio ROI modeling", detail: "Track token spend, time savings, SaaS cost displacement, and error rate improvements per initiative. Build the \u2018formula for evaluating ROI\u2019 that doesn\u2019t exist yet for AI output vs. consulting fees." },
      { what: "Predictive pipeline health", detail: "Based on historical patterns, flag initiatives at risk of stalling before they stall. \u2018Initiatives in Discovery for >6 weeks without a builder assigned have an 80% chance of going dormant.\u2019" },
    ]},
  ];

  return (<div>
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 20, marginBottom: 24 }}>
      <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.7, margin: 0 }}>
        This prototype demonstrates the core architecture: structured initiative registry, weighted prioritization, pattern detection, and raw input capture. Below is how it evolves from a prototype into the operational nervous system for Seaboard\u2019s Innovation portfolio. Each horizon builds on the last \u2014 nothing in H2 requires rearchitecting H1. The key principle: <span style={{ color: C.text, fontWeight: 600 }}>start with human-driven structure, layer in automation only after the patterns are validated.</span>
      </p>
    </div>

    {horizons.map((h, hIdx) => (
      <div key={h.phase} style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: h.accent + "18", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: h.accent, fontFamily: "monospace", lineHeight: 1 }}>{h.phase}</span>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{h.title}</div>
            <div style={{ fontSize: 12, color: h.accent, fontWeight: 600, fontFamily: "monospace" }}>{h.label}</div>
          </div>
          {hIdx < 2 && <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${h.accent}44, transparent)`, marginLeft: 8 }} />}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, paddingLeft: 56 }}>
          {h.items.map((item, i) => (
            <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 14, borderTop: `2px solid ${h.accent}22` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6 }}>{item.what}</div>
              <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6 }}>{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    ))}

    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 20, marginTop: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8, fontFamily: "monospace" }}>DESIGN PRINCIPLES</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        {[
          { title: "Structure before automation", desc: "Manual processes first. Automate only after the workflow is validated and the edge cases are understood. Premature automation encodes bad assumptions." },
          { title: "Security by architecture", desc: "Innovation data classified by sensitivity. Portfolio metadata and scoring flows freely. Production data, PII, and pricing intelligence never touch the AI layer." },
          { title: "Transparent prioritization", desc: "Every stakeholder can see why their initiative is P0, P1, or P2 and what would change the ranking. No black boxes. Adjustable weights mean leadership can model different strategies." },
        ].map((p, i) => (
          <div key={i} style={{ padding: 14, background: C.bg, borderRadius: 6 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.accent, marginBottom: 6 }}>{p.title}</div>
            <div style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.6 }}>{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </div>);
}

const NAV = [
  { key: "dashboard", label: "Briefing", icon: "\u25eb" },
  { key: "initiatives", label: "Initiatives", icon: "\u2630" },
  { key: "prioritize", label: "Prioritize", icon: "\u25a6" },
  { key: "patterns", label: "Intelligence", icon: "\u25c9" },
  { key: "saas", label: "SaaS Targets", icon: "$" },
  { key: "vision", label: "Roadmap", icon: "\u25b7" },
  { key: "add", label: "Add Initiative", icon: "+" },
  { key: "input", label: "Add Input", icon: "\ud83d\udcce" },
];
const DESC = { dashboard: "What needs your attention right now", initiatives: "Browse, filter, inspect all initiatives with raw input data", prioritize: "Weighted scoring \u2014 adjust to model strategic priorities", patterns: "Systemic portfolio patterns \u2014 what the data reveals about how innovation is actually working", saas: "Software rationalization targets and progress", vision: "How this prototype becomes a production tool", add: "Register a new initiative in the portfolio", input: "Capture a raw data point against an existing initiative" };

export default function App() {
  const [view, setView] = useState("dashboard");
  const [weights, setWeights] = useState(WEIGHT_DEFAULTS);
  const [inits, setInits] = useState(SEED);
  const [selected, setSelected] = useState(null);
  const addInit = useCallback((init) => { setInits(p => [...p, init]); setView("initiatives"); }, []);
  const addInput = useCallback((id, input) => { setInits(p => p.map(i => i.id === id ? { ...i, inputs: [...i.inputs, input] } : i)); setView("initiatives"); }, []);

  return (<div style={{ background: C.bg, color: C.text, minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif", display: "flex" }}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <div style={{ width: 200, background: C.surface, borderRight: `1px solid ${C.border}`, padding: "16px 0", flexShrink: 0, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "0 16px", marginBottom: 22 }}><div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Innovation Portfolio</div><div style={{ fontSize: 10, color: C.textDim, marginTop: 2, fontFamily: "monospace", letterSpacing: 1 }}>COMMAND CENTER</div></div>
      <nav style={{ flex: 1 }}>{NAV.map((n, idx) => (<div key={n.key}>{idx === 6 && <div style={{ height: 1, background: C.border, margin: "8px 16px" }} />}<div onClick={() => setView(n.key)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: view === n.key ? 600 : 400, color: view === n.key ? C.accent : C.textMuted, background: view === n.key ? C.accentSoft : "transparent", borderRight: view === n.key ? `2px solid ${C.accent}` : "2px solid transparent" }}><span style={{ fontSize: 14, width: 18, textAlign: "center" }}>{n.icon}</span>{n.label}</div></div>))}</nav>
      <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}` }}><div style={{ fontSize: 9, color: C.textDim, fontFamily: "monospace", lineHeight: 1.6, letterSpacing: 0.5 }}>PROTOTYPE v1.0<br />Seaboard Foods<br />{inits.length} initiatives \u00b7 {inits.reduce((s, i) => s + i.inputs.length, 0)} inputs</div></div>
    </div>
    <div style={{ flex: 1, padding: 24, overflowY: "auto", maxHeight: "100vh" }}>
      <div style={{ marginBottom: 20 }}><h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{NAV.find(n => n.key === view)?.label}</h1><p style={{ fontSize: 13, color: C.textMuted, margin: "4px 0 0" }}>{DESC[view]}</p></div>
      {view === "dashboard" && <DashboardView inits={inits} weights={weights} onSelect={setSelected} onNav={setView} />}
      {view === "initiatives" && <InitiativesView inits={inits} weights={weights} onSelect={setSelected} />}
      {view === "prioritize" && <PrioritizeView inits={inits} weights={weights} setWeights={setWeights} />}
      {view === "patterns" && <PatternsView inits={inits} />}
      {view === "saas" && <SaaSView inits={inits} onSelect={setSelected} />}
      {view === "vision" && <VisionView />}
      {view === "add" && <AddInitForm onAdd={addInit} onCancel={() => setView("dashboard")} />}
      {view === "input" && <AddInputForm inits={inits} onAdd={addInput} onCancel={() => setView("dashboard")} />}
    </div>
    {selected && <InitiativeDetail init={selected} weights={weights} onClose={() => setSelected(null)} />}
  </div>);
}
