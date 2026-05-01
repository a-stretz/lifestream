# Lifestream Codex Style Guide

## Purpose

Use this guide to maintain the visual, language, and interaction vision for the Lifestream system while building the prototype.

This is not a branding layer. It is a product system. The visual style should help users understand activity, relationships, reusable patterns, and human participation across distributed AI initiatives.

The product should feel like a clean internal intelligence tool first, and a Lifestream themed system second.

---

# 1. Core Product Concept

Lifestream is a system for making distributed innovation visible, structured, and actionable.

It helps users:

- See active initiatives across the organization
- Understand relationships between initiatives
- Identify repeated workflow patterns
- Recognize reusable AI capabilities
- Track contributors and participation
- Turn scattered experimentation into coordinated momentum

The interface should communicate that innovation is moving, connecting, and evolving without making the product feel like a game or fantasy interface.

---

# 2. Core System Language

Use these terms consistently when they clarify the product model.

## Lifestream

**Definition:** The living flow of innovation across the organization.

**Represents:**

- The full system
- Movement across initiatives
- Visibility into distributed work
- Connection between fragmented efforts
- Learning and evolution over time

**Use when describing:**

- The system as a whole
- Initiative activity
- Cross-team innovation flow
- Pattern discovery
- Momentum across the organization

**Example language:**

- “Lifestream surfaces patterns across distributed initiatives.”
- “The Lifestream shows where ideas are gaining momentum.”
- “This view helps teams understand how initiatives are connected.”

## Materia

**Definition:** Modular, reusable building blocks that structure initiatives and encode intelligence.

**Represents:**

- AI plays
- Workflow patterns
- Tags and classification units
- Agent capabilities
- Evaluation logic
- Reusable components of work

**Properties:**

- Composable
- Reusable
- Evolvable
- Scalable

**Use when describing:**

- Repeated patterns
- Reusable workflows
- Common initiative structures
- AI capabilities that can be applied across teams

**Example language:**

- “This initiative uses three core Materia.”
- “Document Processing is emerging as reusable Materia.”
- “This pattern should be formalized into Materia.”

## Wielders

**Definition:** Active participants who apply and shape Materia to move initiatives forward.

Wielders are not a formal role, rank, or permission level. A Wielder is anyone actively contributing to an initiative, applying reusable patterns, creating new patterns, or evolving existing work.

**Represents:**

- User presence
- Contribution
- Creation
- Participation
- Initiative momentum

**Use when describing:**

- Contributors
- Active users
- Initiative participants
- People shaping or extending reusable work

**Example language:**

- “Three Wielders are active on this initiative.”
- “New Wielders are emerging in operations.”
- “Wielders are combining existing Materia to scale this effort.”

## Core Framing Line

Lifestream captures the flow. Materia gives it structure. Wielders drive it forward.

---

# 3. Tone and Voice

## Primary Tone

The product voice should be:

- Clear
- Intentional
- Slightly elevated
- Operationally grounded
- Lightly narrative, but not fantasy-heavy

## Balance

Use roughly:

- 70% operational clarity
- 30% narrative language

The system should never sound like a role-playing game, fantasy product, or marketing campaign.

## Preferred Words

Use words like:

- flow
- signals
- patterns
- momentum
- illuminate
- surface
- connect
- evolve
- shape
- activity
- structure
- reuse
- discovery

## Avoid Overused or Vague Words

Avoid words like:

- leverage
- synergy
- transformation, unless specific
- optimize, unless specific
- magical
- mystical
- quest
- spell
- guild
- artifact, unless referring to actual work outputs

## Writing Rules

1. Clarity first.
2. Every metaphor must map to real product behavior.
3. Do not force Lifestream, Materia, or Wielders into every sentence.
4. Use standard product language for requirements, implementation, and technical details.
5. Use narrative language for system overviews, executive summaries, onboarding, and empty states.

---

# 4. Visual Design Philosophy

The visual system should communicate movement, connection, activity, and reusable intelligence.

This should be expressed through:

- Flowing gradients
- Subtle motion
- Connected nodes
- Distinct reusable chips and cards
- Clean dashboards
- Visible contributor presence
- Clear state changes

Do not apply the aesthetic as decoration. Every visual choice should help the user understand something about the system.

## Visual Meaning Map

| Visual Element | Product Meaning |
|---|---|
| Flowing gradient | Activity across initiatives |
| Subtle motion | Live system behavior |
| Connected nodes | Relationships between initiatives |
| Glowing chip | Reusable or high-signal Materia |
| Brighter node | High activity or high priority |
| Dimmed node | Inactive, low signal, or low confidence |
| Avatar group | Active Wielders contributing to work |
| Contribution trail | Who shaped an initiative or pattern |
| Flow divider | Transition between related work sections |

---

# 5. Color Tokens

Use these colors as the core visual identity.

```ts
export const lifestreamColors = {
  streamBlue: "#00E5FF",
  deepTeal: "#008BC5",
  energyOrange: "#FFA000",
  vividMagenta: "#FF3CAF",
  cosmicPurple: "#7B2CFF",
  deepNavy: "#07111F",
  ink: "#101828",
  slate: "#475467",
  mist: "#F2F4F7",
  white: "#FFFFFF"
};
```

## Color Usage

### Stream Blue
Use for primary flow, links, active states, and system energy.

### Deep Teal
Use for stable structure, system surfaces, and operational grounding.

### Energy Orange
Use sparingly for highlights, alerts, high-energy activity, and important signals.

### Vivid Magenta
Use as an accent for creative activity, emerging patterns, or experimental signals.

### Cosmic Purple
Use for AI-related intelligence, pattern recognition, and higher-order system views.

### Deep Navy
Use for dark backgrounds, headers, and high-contrast hero areas.

## Color Discipline

Do not use all accent colors at once on every surface. Most screens should use one dominant accent and one secondary accent.

---

# 6. Surface-Level Design Rules

## A. Entry Point Surfaces

Use stronger visual treatment on:

- Landing page
- Login screen
- Executive overview page
- System introduction screen

Design guidance:

- Use full Lifestream energy
- Use flowing gradients
- Use the main icon prominently
- Use a subtle background flow
- Keep text concise and readable

Purpose:

- Signal that this is not a standard internal tool
- Communicate movement, coordination, and intelligence
- Create a memorable first impression

## B. Core Workspace Surfaces

Use more restrained visual treatment on:

- Dashboard
- Initiative explorer
- Pattern view
- Initiative detail page
- Search and filtering views

Design guidance:

- Keep layout clean and readable
- Use gradients only in headers, section accents, dividers, chips, and selected states
- Avoid heavy backgrounds behind dense content
- Prioritize scanning, sorting, filtering, and comparison

Purpose:

- Keep the system practical
- Preserve usability
- Avoid visual fatigue

## C. Utility and Data Surfaces

Use minimal visual treatment on:

- Tables
- Forms
- Configuration screens
- Admin views
- Data-entry screens
- Technical implementation views

Design guidance:

- Use standard UI patterns
- Use color only for state, priority, and classification
- Avoid decorative gradients
- Avoid animation unless it communicates loading, filtering, or state changes

Purpose:

- Make operational work fast and clear

---

# 7. Component Implementation Rules

Build reusable components instead of recreating the aesthetic manually on each page.

## Required Components

### LifestreamHeader

Used for major pages and overview areas.

Should include:

- Page title
- Short explanatory subtitle
- Optional subtle flowing gradient background
- Optional activity indicator

Use strongest version only on landing or executive overview pages.

### MateriaChip

Used for tags, AI plays, workflow types, and reusable patterns.

Should include:

- Label
- Type classification
- Color identity
- Optional small icon
- Subtle gradient border or glow

Do not make every chip visually loud. Default state should be clean. Active or high-signal Materia can glow slightly.

Example Materia types:

- Document Processing
- LLM Classification
- Workflow Automation
- Knowledge Retrieval
- Quality Evaluation
- Customer Support Assist
- Data Extraction
- Agent Workflow

### InitiativeCard

Used to summarize an initiative.

Should include:

- Initiative title
- Department or team
- Status
- Priority or signal strength
- Materia chips
- Wielder presence
- Last activity
- Short summary

Visual guidance:

- Clean card first
- Use subtle gradient border only for selected, active, or high-signal states
- Do not overuse shadows or glow

### FlowDivider

Used between sections that are conceptually connected.

Should include:

- Very subtle gradient line
- Optional small motion effect

Use sparingly.

### WielderAvatarGroup

Used to show contributor presence.

Should include:

- User avatars or initials
- Count of active contributors
- Optional tooltip or hover state showing contribution details

Do not overcomplicate this. Wielders should feel like normal contributors with a system-specific name.

### InitiativeConnectionLine

Used in maps or graph views.

Should show relationships between initiatives.

Visual meaning:

- Solid line: confirmed relationship
- Dashed line: possible or inferred relationship
- Animated line: active or recently changed relationship
- Dimmed line: weak or low-confidence relationship

### EmptyState

Used when no initiatives, Materia, or patterns are available.

Should use:

- Circle-flow icon
- Short helpful message
- Optional narrative language
- Clear next action

Example:

“No initiatives are flowing through this view yet. Add a source, import notes, or create the first initiative to begin mapping the Lifestream.”

---

# 8. Icon and Banner Rules

## Main Circle-Flow Icon

Use the circle-flow icon as:

- System logo
- Navigation anchor
- Loading state
- Empty state symbol
- Small product mark in headers

Icons are used frequently. Banners are used sparingly.

## Banner Style 1: Full Energy

Use only for:

- Landing page
- Login screen
- Executive overview page
- Major presentation view

Characteristics:

- More expressive gradient
- Stronger flow motif
- More visual energy

## Banner Style 2: Refined

Use for:

- Dashboard header
- Initiative explorer
- Pattern view
- Section headers

Characteristics:

- More controlled
- Lower contrast
- Less animation
- More whitespace

---

# 9. Motion Rules

Motion should make the system feel alive, but never distract from work.

## Use Motion For

- Loading states
- Filter transitions
- Newly detected relationships
- Initiative activity changes
- Active connection lines
- Subtle dashboard background flow

## Motion Guidelines

- Slow
- Subtle
- Smooth
- Rare
- Meaningful

## Avoid

- Fast loops
- Constant shimmer
- Excessive particles
- Animated text
- Motion behind dense tables
- Motion that competes with reading

## Specific Motion Patterns

### Flowing Gradient

Use in headers, dividers, loading states, and selected high-level surfaces.

### Particle Drift

Use only on landing, overview, or empty states. Keep opacity very low.

### Animated Connection Lines

Use only when showing active relationships or recent changes.

### Loading Flow

Use the circle-flow icon or a minimal flowing line for loading states.

---

# 10. State and Meaning Rules

Visuals should communicate system state.

## Activity State

- Bright node: high activity
- Normal node: active but stable
- Dimmed node: low activity
- Pulsing node: recently updated

## Confidence State

- Solid border: confirmed
- Dashed border: inferred
- Muted color: low confidence
- Accent glow: high-confidence pattern

## Priority State

- Orange accent: urgent or high-impact
- Purple accent: AI or intelligence-heavy
- Blue accent: active flow or current selection
- Teal accent: stable operational pattern
- Magenta accent: emerging or experimental pattern

## Reuse State

- Glowing Materia chip: reusable pattern
- Stacked chips: repeated across initiatives
- Linked chip: connected to multiple initiatives

---

# 11. Layout Rules

## General Layout

Use clean, modern SaaS layout patterns.

Recommended structure:

- Left navigation
- Main dashboard area
- Filter/search controls near the top
- Cards, tables, or graph views in the main body
- Detail drawer or side panel for initiative details

## Density

The product should be easy to scan.

Use:

- Clear headers
- Strong section grouping
- Consistent spacing
- Cards for summaries
- Tables for comparison
- Drawers for details

Avoid:

- Wall-of-text layouts
- Overlapping visual elements
- Too many gradients in one viewport
- Decorative elements that reduce readability

---

# 12. Implementation Priority

When building or revising the prototype, prioritize in this order.

## Priority 1: Usability

The product must be clear, readable, and useful.

Users should quickly understand:

- What initiatives exist
- Who is involved
- What patterns are emerging
- Which work is active
- Where reusable opportunities exist

## Priority 2: Concept Mapping

Ensure the product model is represented clearly:

- Lifestream = overall system flow
- Materia = reusable pattern or capability
- Wielders = active contributors

## Priority 3: Component Consistency

Use reusable components for headers, chips, cards, avatars, dividers, maps, and empty states.

## Priority 4: Visual Identity

Apply gradients, glow, color, and iconography consistently and sparingly.

## Priority 5: Motion

Add motion only after the static interface works well.

---

# 13. Do and Do Not Rules

## Do

- Keep core workflows clean and readable
- Use the visual system to explain state and relationships
- Use gradients in headers, chips, dividers, selected states, and empty states
- Use Materia as reusable tags, cards, or pattern modules
- Use Wielders as contributor presence
- Use motion to show live behavior
- Keep narrative language disciplined
- Preserve a professional internal-tool feel

## Do Not

- Put gradients everywhere
- Overuse glow effects
- Turn every label into a metaphor
- Make the interface feel like a fantasy game
- Animate dense dashboards constantly
- Hide important information behind visual effects
- Prioritize aesthetic over clarity
- Use Lifestream language where standard product language is clearer

---

# 14. Example Page Applications

## Dashboard

Should show:

- Total initiatives
- Active initiatives
- Emerging Materia patterns
- Active Wielders
- Recent activity
- High-signal opportunities

Design:

- Refined header with subtle flow
- Clean metric cards
- Materia chips in initiative cards
- Minimal motion
- Strong readability

## Initiative Explorer

Should show:

- Search
- Filters
- Initiative cards or table
- Materia tags
- Status
- Contributors
- Activity level

Design:

- Clean workspace
- Gradient only for selected filters or high-signal states
- Optional side detail drawer

## Pattern View

Should show:

- Repeated Materia
- Related initiatives
- Reuse potential
- Teams involved
- Opportunity score

Design:

- More visual than the dashboard
- Use node relationships or grouped cards
- Animated lines only for active or selected relationships

## Initiative Detail Page

Should show:

- Initiative summary
- Source inputs
- Related Materia
- Wielders
- Activity timeline
- Similar initiatives
- Recommended next steps

Design:

- Mostly clean and operational
- Use Lifestream visuals only to show relationships and state

---

# 15. Codex Build Reminder

When implementing any screen, follow this short rule set:

1. Build the useful product first.
2. Apply the Lifestream aesthetic only where it clarifies flow, activity, relationships, reuse, or participation.
3. Use Materia for reusable patterns, tags, workflows, AI plays, and capabilities.
4. Use Wielders for visible human participation and contribution signals.
5. Use gradients sparingly in headers, chips, dividers, selected states, and empty states.
6. Use motion only for meaningful system behavior.
7. Keep dashboards, forms, and tables clean.
8. Do not let the theme overpower clarity.

---

# 16. One-Line Summary

Lifestream makes innovation visible and connected, Materia makes it structured and reusable, and Wielders make it real.
