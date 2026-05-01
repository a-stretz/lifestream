# Lifestream AI-Assisted Developer System Guide

## Purpose

This guide defines how an AI-assisted developer should maintain the product vision, language system, visual system, and interaction model for Lifestream.

Lifestream is not a tool with a decorative theme applied on top. It is a UI system, conceptual model, and operating layer for making distributed AI innovation visible, structured, reusable, and scalable.

The goal of this document is to ensure that every artifact, prototype, screen, component, interaction, and piece of documentation remains cohesive, intentional, readable, and grounded in the actual behavior of the system.

The developer should use this guide to make product, design, and implementation decisions that preserve the Lifestream vision while keeping the interface practical, clean, and useful.

---

# 1. Core Product Philosophy

## 1.1 Treat Lifestream as a UI System, Not Branding

Do not treat the visual style as decoration.

The design system defines:

- how information is structured visually
- how users understand system state
- how the system communicates meaning without relying only on text
- how initiatives, patterns, users, and reusable capabilities relate to one another
- how activity, momentum, and reuse are made visible across the organization

The system should never feel like a normal internal tool with a fantasy skin. The language, visuals, and interactions should reinforce the product’s actual purpose.

## 1.2 The Core Product Idea

Lifestream exists to introduce lightweight structure into decentralized AI innovation.

It helps an organization:

- capture fragmented initiative signals
- understand what work is happening across teams
- identify repeated patterns
- turn one-off experiments into reusable building blocks
- surface high-value opportunities
- make contributors visible
- preserve momentum without slowing down experimentation

## 1.3 The Real Takeaway

You are not building:

> a tool with a cool theme

You are building:

> a system where structure, language, visuals, and interaction patterns all reinforce how innovation flows, connects, evolves, and scales.

---

# 2. Core System Language

The Lifestream language layer should remain consistent across the product. These terms are not decorative labels. Each one maps to a real system concept.

## 2.1 Lifestream

### Definition

Lifestream is the living flow of innovation across the organization.

### Represents

- the full system
- the movement of ideas and initiatives
- visibility across fragmented work
- connection between teams, patterns, and opportunities
- learning and evolution over time

### Usage

Use Lifestream when referring to the overall system, the flowing layer of organizational activity, or the product’s larger conceptual model.

### Positioning Statement

Lifestream is the living flow of innovation across the organization. It captures signals, connects fragmented efforts, and reveals the patterns that turn distributed ideas into coordinated momentum. As it learns and evolves, Lifestream illuminates the paths forward, strengthening existing initiatives while surfacing new opportunities. Its structure is intentionally light, designed to unlock potential and support scalable growth while keeping the creative fire alive.

### Product Meaning

In the product, Lifestream should correspond to:

- system-wide visibility
- activity across initiatives
- movement between ideas, patterns, and outcomes
- organizational learning
- connected initiative intelligence

### Visual Meaning

In the UI, Lifestream maps to:

- subtle flowing gradients
- stream-like backgrounds or headers
- animated movement in system-level surfaces
- connected initiative pathways
- activity streams that feel like live system behavior, not static lists

---

## 2.2 Materia

### Definition

Materia are modular, reusable building blocks that structure initiatives and encode intelligence.

### Represents

- AI plays
- workflow patterns
- tags and classification units
- agent capabilities
- evaluation logic
- reusable product or process modules
- repeated solution patterns across departments

### Key Properties

Materia should feel:

- composable
- reusable
- evolvable
- scalable
- identifiable
- structured

### Usage Examples

- “This initiative uses three core Materia.”
- “We are seeing repeated Materia patterns across teams.”
- “This should be formalized into reusable Materia.”

### Product Meaning

In the product, Materia should correspond to:

- tags
- reusable workflow cards
- pattern modules
- AI capability blocks
- structured classification chips
- libraries of repeated initiative logic

### Visual Meaning

In the UI, Materia maps to:

- visual tokens
- pills
- chips
- reusable cards
- small classified modules
- color-coded capability blocks
- gradient borders or subtle glows when a pattern is important or reusable

### Example Materia Types

| Materia | Meaning | Suggested Visual Treatment |
|---|---|---|
| Document Processing | Reusable document intake, parsing, or summarization capability | Teal and purple chip |
| LLM Classification | AI classification or routing logic | Orange and pink chip |
| Workflow Automation | Repeatable process automation pattern | Blue and purple card |
| Human Review Loop | Human-in-the-loop validation or approval step | Magenta accent chip |
| Evaluation Logic | QA, scoring, testing, or LLM-as-judge pattern | Purple and cyan chip |
| Data Extraction | Structured extraction from messy inputs | Teal and blue chip |
| Initiative Discovery | Signal capture and opportunity surfacing workflow | Multi-color stream chip |

---

## 2.3 Wielders

### Definition

Wielders, or Materia Wielders, are active participants who apply and shape Materia to drive initiatives forward.

### Key Principle

Wielders are not a role, job title, seniority level, or permission tier. Wielders represent a state of participation.

A person becomes a Wielder when they actively contribute to, shape, combine, or apply reusable initiative patterns.

### What Wielders Do

Wielders:

- contribute to initiatives
- apply existing Materia
- create new Materia
- combine and evolve patterns
- shape reusable workflows
- identify useful signals
- move initiatives forward

### Usage Examples

- “Wielders are actively shaping this initiative.”
- “New Wielders are emerging in operations.”
- “This Materia was created by Wielders across multiple teams.”

### Product Meaning

In the product, Wielders should correspond to:

- visible contributors
- user avatars
- initiative participants
- contribution trails
- people who created, modified, validated, or reused Materia
- user presence and activity indicators

### Visual Meaning

In the UI, Wielders map to:

- avatar groups
- activity trails
- contributor badges
- “active on this initiative” indicators
- visible authorship and participation metadata
- contribution timelines

Example product language:

- “3 Wielders active on this initiative”
- “Last shaped by Jordan, Priya, and Marcus”
- “Materia reused by 8 Wielders across 4 departments”

---

## 2.4 System Relationship Summary

| Concept | Core Meaning | Product Role | Visual Role |
|---|---|---|---|
| Lifestream | Flow, visibility, connection | The full system and activity layer | Gradients, motion, streams, connected paths |
| Materia | Structure, capability, reuse | Modular tags, patterns, workflows, AI plays | Chips, cards, tokens, glowing modules |
| Wielders | Action, creation, momentum | Active participants and contributors | Avatars, trails, presence, contribution markers |

### Core Framing Line

> Lifestream captures the flow. Materia gives it structure. Wielders drive it forward.

---

# 3. Naming Discipline

## 3.1 Narrative Language Is a Tool, Not a Requirement

The narrative layer exists to make the system memorable and cohesive. It should never obscure clarity.

Use the narrative layer when it helps explain the system’s conceptual model. Use direct product language when precision matters.

## 3.2 When to Use Narrative Language

Use terms like Lifestream, Materia, and Wielders when:

- explaining how the system works at a conceptual level
- communicating product vision
- describing system-wide behavior
- aligning stakeholders around flow, patterns, and reuse
- creating executive summaries or high-level product narratives
- describing relationships between initiatives and reusable patterns

Examples:

- “Lifestream surfaces patterns across distributed initiatives.”
- “This Materia can be reused across multiple workflows.”
- “Wielders are combining existing Materia to scale this effort.”

## 3.3 When to Use Direct Language

Use standard product and operational language when:

- defining requirements
- writing user stories
- documenting implementation logic
- describing technical behavior
- communicating with engineers
- specifying acceptance criteria
- explaining database models, APIs, or workflows

Examples:

- “Users can tag an initiative with one or more reusable workflow patterns.”
- “The system displays contributors associated with each initiative.”
- “The dashboard groups initiatives by department, status, pattern, and reuse potential.”

## 3.4 Avoid Forced Language

Do not force narrative terms into every sentence.

Bad:

> The Wielder activates the Materia inside the Lifestream to unlock transformation synergy.

Better:

> The user adds a reusable workflow pattern to the initiative so other teams can discover and reuse it.

## 3.5 Guiding Rule

Clarity first. Consistency second. Tone third.

---

# 4. Tone and Voice Guidelines

## 4.1 Primary Tone

The Lifestream voice should be:

- clear
- intentional
- slightly elevated
- grounded
- structured
- useful
- lightly narrative

The product should feel distinct, but not theatrical.

## 4.2 Tone Balance

Use this balance:

- 70% operational clarity
- 30% narrative or metaphor

This means most language should explain real product behavior. The narrative layer should add cohesion, not replace meaning.

## 4.3 Preferred Language Patterns

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
- reveal
- structure
- reusable
- activity
- initiative
- contribution
- discovery

## 4.4 Avoid Overused or Vague Language

Avoid words like:

- leverage
- synergy
- transformation, unless specific
- optimize, unless tied to a measurable improvement
- unlock, unless the sentence explains what is actually unlocked
- magical
- gamified
- quest, unless intentionally adopted as an initiative naming convention

## 4.5 Writing Style Rules

### Be Precise

Every sentence should map to a real function of the system.

### Avoid Over-Explanation

Do not describe implementation mechanics inside high-level summaries.

### Maintain Concept Integrity

Each concept should always mean the same thing:

- Lifestream = flow
- Materia = building blocks
- Wielders = participants

### Use Metaphor With Discipline

Metaphors should clarify, not decorate.

---

# 5. Messaging Pillars

All communication should reinforce at least one of these pillars.

## 5.1 Visibility

Making distributed innovation understandable.

Product examples:

- initiative dashboards
- activity maps
- department-level visibility
- contributor trails
- signal capture

UI examples:

- brighter active nodes
- surfaced related initiatives
- visible activity streams
- contribution metadata

## 5.2 Structure Without Constraint

Adding clarity without slowing teams down.

Product examples:

- lightweight intake
- flexible tagging
- pattern classification
- reusable Materia library
- optional enrichment rather than rigid process gates

UI examples:

- easy-to-apply Materia chips
- editable initiative cards
- low-friction contribution flows
- simple progressive detail

## 5.3 Pattern Recognition

Identifying repeatable, scalable opportunities.

Product examples:

- repeated workflow detection
- similar initiative clustering
- reusable AI play surfacing
- department-to-department pattern matching

UI examples:

- connected nodes
- grouped Materia
- highlighted repeated patterns
- pattern view dashboards

## 5.4 Momentum

Turning scattered efforts into coordinated progress.

Product examples:

- initiative status tracking
- active contributor visibility
- reusable pattern adoption
- signal-to-action workflows

UI examples:

- animated flow lines
- active state indicators
- recent activity streams
- visible forward movement

## 5.5 Discovery

Surfacing new and adjacent opportunities.

Product examples:

- recommended related initiatives
- suggested Materia
- emerging pattern detection
- initiative opportunity scoring

UI examples:

- illuminated emerging nodes
- discovery panels
- related pattern suggestions
- surfaced adjacent opportunities

---

# 6. Visual System Foundations

## 6.1 Design Must Map to System Meaning

Every visual element should answer:

> What does this tell the user about the system?

Visual style should communicate state, relationship, activity, reuse, or importance.

Do not add gradients, glows, particles, or motion unless they communicate something useful.

## 6.2 Core Visual Concepts

| Visual Element | System Meaning |
|---|---|
| Flowing gradient | Activity across initiatives |
| Slow motion | Live system behavior |
| Connection line | Relationship between initiatives or patterns |
| Glowing Materia | Reusable or high-value building block |
| Brighter node | High activity or strong signal |
| Dimmed node | Inactive, low-confidence, or lower-signal item |
| Particle drift | Ambient organizational activity |
| Avatar trail | Human contribution and shaping activity |
| Gradient chip | Classified reusable pattern |
| Stream divider | Relationship between sections or activity groups |

## 6.3 Visual Priority

The design should create a clear hierarchy:

1. readability
2. system state
3. relationships
4. visual distinctiveness
5. narrative atmosphere

Atmosphere should never outrank clarity.

---

# 7. Design-to-System Mapping Layer

This mapping layer is critical. It tells the developer how to translate conceptual language into UI behavior.

## 7.1 Lifestream to UI Layer

Lifestream maps to the system’s flow layer.

### Conceptual Meaning

Lifestream represents movement, visibility, organizational learning, and connection.

### UI Translation

Use Lifestream visual language in:

- dashboard backgrounds
- headers
- executive overview pages
- initiative maps
- activity streams
- system-level navigation
- loading states
- empty states

### Implementation Examples

| Product Surface | Lifestream Treatment |
|---|---|
| Dashboard background | Subtle flowing gradient or ambient stream effect |
| Header | Controlled energy gradient with soft motion |
| Initiative map | Flowing connections between initiative nodes |
| Activity feed | Stream metaphor instead of a plain chronological list |
| Loading state | Animated circular flow icon |
| Empty state | Soft stream icon with clear plain-language guidance |

## 7.2 Materia to UI Components

Materia maps to reusable component units.

### Conceptual Meaning

Materia represents structured, reusable intelligence.

### UI Translation

Use Materia visual language in:

- tags
- chips
- reusable workflow cards
- AI play modules
- pattern modules
- capability libraries
- evaluation logic blocks

### Implementation Examples

| Product Element | Materia Treatment |
|---|---|
| Tags | Glowing gradient chips |
| Reusable workflows | Materia cards |
| AI plays | Color-coded capability modules |
| Classification labels | Small chips with consistent type colors |
| Evaluation logic | Structured cards with confidence and source metadata |

### Required Materia Attributes

Each Materia object should have:

- label
- type
- color identity
- description
- usage count or reuse signal, when available
- associated initiatives
- owner or creator, when available
- confidence or maturity, when relevant

## 7.3 Wielders to User Presence

Wielders map to visible actors in the system.

### Conceptual Meaning

Wielders represent active participation, authorship, and momentum.

### UI Translation

Use Wielder visual language in:

- avatars
- active contributor indicators
- contribution trails
- initiative ownership metadata
- user activity history
- “shaped by” sections

### Implementation Examples

| Product Element | Wielder Treatment |
|---|---|
| User avatars | Visible contributor identity tied to activity |
| Active initiative state | “X Wielders active” indicator |
| Contribution history | Trail showing who shaped what |
| Materia authorship | Creator or contributor attribution |
| Department participation | Grouped Wielder avatars by department or function |

---

# 8. Product Surfaces and Visual Usage

## 8.1 Entry Point Surfaces

Use the fullest visual energy at entry points.

### Use Banner Style 1: Full Energy

Recommended for:

- landing page
- login screen
- executive overview page
- first-time experience
- system introduction page

### Purpose

The entry point should signal that this is not a standard internal operations tool. It should create immediate distinction while still feeling credible and professional.

### Design Guidance

- Use the richest flow treatment here.
- Allow more visible gradient movement.
- Use the icon prominently.
- Keep text clear and grounded.
- Do not overcrowd the screen.

## 8.2 Core Workspace Surfaces

Use a more refined version of the visual style in day-to-day product areas.

### Use Banner Style 2: Refined

Recommended for:

- dashboards
- initiative explorer
- pattern view
- Materia library
- initiative detail pages
- department views
- contributor views

### Purpose

The workspace should remain on-theme but not overwhelming. Users will spend real time here, so the interface must stay readable and efficient.

### Design Guidance

- Use controlled gradients.
- Keep content surfaces clean.
- Use glow sparingly.
- Prioritize tables, cards, filters, and search usability.
- Use motion only where it communicates state or relationship.

## 8.3 Icons

Icons are the most important repeated visual element in the product.

Use the circle-flow icon as:

- system logo
- navigation anchor
- loading state
- empty state marker
- compact product identity
- favicon or app icon
- small status indicator when appropriate

### Key Rule

Icons are used frequently. Banners are used sparingly.

The icon should carry the visual identity in repeated interface moments. Large atmospheric banners should be reserved for high-impact surfaces.

---

# 9. Component System

If building in React, Next.js, or a similar front-end framework, define the visual system as reusable tokens and components rather than one-off styling.

## 9.1 Design Tokens

Create a shared token file for colors, gradients, shadows, spacing, border radii, and motion durations.

### Core Color Tokens

```ts
export const colors = {
  streamBlue: "#00E5FF",
  deepTeal: "#008BC5",
  energyOrange: "#FFA000",
  vividMagenta: "#FF3CAF",
  cosmicPurple: "#7B2CFF"
};
```

### Suggested Supporting Tokens

```ts
export const neutrals = {
  voidBlack: "#070A12",
  deepSpace: "#101525",
  panelNavy: "#151B2E",
  softSlate: "#7E8AA6",
  paleMist: "#EAF2FF",
  white: "#FFFFFF"
};
```

### Gradient Tokens

```ts
export const gradients = {
  lifestreamFull: "linear-gradient(135deg, #00E5FF 0%, #7B2CFF 48%, #FF3CAF 72%, #FFA000 100%)",
  lifestreamRefined: "linear-gradient(135deg, rgba(0,229,255,0.22), rgba(123,44,255,0.18), rgba(255,60,175,0.14))",
  materiaTealPurple: "linear-gradient(135deg, #00E5FF, #7B2CFF)",
  materiaOrangePink: "linear-gradient(135deg, #FFA000, #FF3CAF)",
  subtlePanel: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))"
};
```

### Motion Tokens

```ts
export const motion = {
  slowFlow: "18s",
  ambientDrift: "28s",
  connectionPulse: "2.4s",
  hoverLift: "160ms",
  quickFade: "120ms"
};
```

## 9.2 Required Core Components

Build the system around reusable components.

### LifestreamHeader

Used for major surfaces and system-level identity.

Responsibilities:

- communicate the Lifestream visual layer
- support full-energy and refined variants
- provide page context
- optionally show system activity summary

Suggested props:

```ts
type LifestreamHeaderProps = {
  title: string;
  subtitle?: string;
  variant?: "full" | "refined" | "minimal";
  activityCount?: number;
  children?: React.ReactNode;
};
```

### MateriaChip

Used for reusable patterns, AI plays, workflow tags, and classification labels.

Responsibilities:

- show Materia label
- communicate Materia type through color identity
- optionally indicate reuse, maturity, confidence, or source

Suggested props:

```ts
type MateriaChipProps = {
  label: string;
  type: "classification" | "workflow" | "ai-play" | "evaluation" | "agent-capability" | "data";
  intensity?: "low" | "medium" | "high";
  reusable?: boolean;
  count?: number;
};
```

### MateriaCard

Used when a Materia object needs more detail than a chip.

Responsibilities:

- explain the reusable building block
- show where it appears
- show reuse potential
- show maturity or confidence when available

Suggested content:

- title
- type
- description
- associated initiatives
- reuse count
- creator or contributor
- maturity level
- related Materia

### InitiativeCard

Used to display an initiative in dashboard, explorer, and pattern views.

Responsibilities:

- summarize the initiative
- show department or team
- show activity state
- show attached Materia
- show Wielder participation
- show status, signal strength, and reuse potential

Suggested props:

```ts
type InitiativeCardProps = {
  title: string;
  department: string;
  summary: string;
  status: "discovered" | "active" | "paused" | "scaling" | "archived";
  signalStrength?: "low" | "medium" | "high";
  materia: Materia[];
  wielders: User[];
  updatedAt: string;
};
```

### FlowDivider

Used to separate major sections while preserving the stream motif.

Responsibilities:

- create visual rhythm
- imply movement between sections
- avoid heavy horizontal rules

Usage:

- between dashboard sections
- between initiative clusters
- before pattern summaries
- inside executive overview pages

### WielderAvatarGroup

Used to show active contributors.

Responsibilities:

- show visible human participation
- communicate contributor count
- optionally show departments or roles

Suggested props:

```ts
type WielderAvatarGroupProps = {
  users: User[];
  maxVisible?: number;
  label?: string;
  showActivityState?: boolean;
};
```

### ActivityStream

Used instead of a generic activity feed.

Responsibilities:

- show movement in the system
- connect events to initiatives, Materia, and Wielders
- make system learning visible

Example events:

- “New Materia identified from Operations workflow.”
- “Finance initiative matched to existing Document Processing Materia.”
- “3 Wielders contributed to the Logistics Exception workflow.”

### InitiativeMap

Used to show relationships between initiatives.

Responsibilities:

- show connected work
- show repeated patterns
- reveal clusters
- indicate signal strength and activity

Visual requirements:

- nodes should represent initiatives
- connection lines should represent shared Materia, department overlap, similar workflow, or contributor relationships
- line animation should be subtle and only used when communicating active filtering, discovery, or relationship emphasis

---

# 10. Motion and Interaction Rules

## 10.1 Motion Gives the System Life

Static design creates branding. Motion creates system behavior.

Motion should make Lifestream feel alive, but it must remain subtle and controlled.

## 10.2 Recommended Motion Patterns

Use:

- slow flowing gradient animation in headers
- subtle particle drift on dashboard backgrounds
- connection lines that animate when filtering or revealing relationships
- gentle hover lift on cards
- soft glow increase on active or reusable Materia
- animated circle-flow icon for loading states

## 10.3 Motion Rules

Motion should be:

- slow
- subtle
- purposeful
- state-driven
- non-distracting
- easy to ignore when the user is focused on work

Avoid:

- constant fast animation
- flashing states
- aggressive particle effects
- animation on every component
- decorative motion with no system meaning

## 10.4 Motion-to-Meaning Map

| Motion | Meaning |
|---|---|
| Slow flowing gradient | System is active and evolving |
| Pulsing connection line | Relationship is being highlighted |
| Soft Materia glow | Reusable or high-value pattern |
| Node brightening | Increased activity or stronger signal |
| Particle drift | Ambient organizational activity |
| Animated icon loop | Loading, searching, or processing |
| Smooth cluster expansion | Pattern discovery or filtered relationship reveal |

---

# 11. State and Meaning Rules

## 11.1 Visuals Must Communicate State

Do not use visual effects generically. Every visual state should communicate meaning.

## 11.2 Initiative State Examples

| Initiative State | Visual Treatment |
|---|---|
| Newly discovered | Soft glow, new badge, low-intensity node |
| Active | Brighter node, visible Wielder avatars, recent activity |
| High signal | Stronger border or brighter connection lines |
| Low signal | Muted card, reduced opacity, fewer visual effects |
| Scaling | Strong connection lines, repeated Materia indicators |
| Paused | Dimmed node, neutral chip, reduced motion |
| Archived | Static, low-contrast, clearly marked historical |

## 11.3 Materia State Examples

| Materia State | Visual Treatment |
|---|---|
| New | Small new indicator, subtle glow |
| Reused | Reuse count visible, stronger chip border |
| High value | Brighter gradient edge, priority marker |
| Experimental | Dashed border or lighter visual treatment |
| Validated | Stable color treatment, confidence marker |
| Retired | Muted color, archived label |

## 11.4 Wielder State Examples

| Wielder State | Visual Treatment |
|---|---|
| Active contributor | Avatar visible in initiative card |
| Recent contributor | Avatar with recent activity indicator |
| Materia creator | Attribution on Materia card |
| Cross-team contributor | Department badge or grouped avatar display |
| Inactive contributor | Historical attribution without active indicator |

---

# 12. Layout and Information Architecture

## 12.1 Main Product Areas

The Lifestream product should likely include these core surfaces:

1. Executive Overview
2. Initiative Explorer
3. Initiative Detail Page
4. Pattern View
5. Materia Library
6. Wielder or Contributor View
7. Activity Stream
8. Discovery Intake or Signal Capture

## 12.2 Executive Overview

Purpose:

- summarize system-wide activity
- show strategic visibility
- communicate momentum
- reveal high-value patterns

Should include:

- total initiatives
- active departments
- repeated Materia patterns
- high-signal opportunities
- recent activity
- top reusable patterns
- emerging clusters

Visual treatment:

- may use fuller Lifestream visual language
- should stay executive-readable
- use charts, cards, and grouped summaries
- avoid dense operational details

## 12.3 Initiative Explorer

Purpose:

- help users browse, filter, and understand initiatives

Should include:

- searchable initiative cards or table
- filters by department, status, Materia, signal strength, and Wielders
- visible attached Materia
- activity state
- reuse potential

Visual treatment:

- refined Lifestream style
- clean cards or table
- strong filtering usability
- controlled use of color and glow

## 12.4 Initiative Detail Page

Purpose:

- provide a single source of context for one initiative

Should include:

- title
- summary
- department
- owner or contributors
- Wielders
- status
- problem being solved
- current workflow
- attached Materia
- related initiatives
- activity history
- opportunity or ROI notes
- next recommended actions

Visual treatment:

- restrained
- content-forward
- Materia and Wielders clearly visible
- relationship panel for connected initiatives

## 12.5 Pattern View

Purpose:

- reveal repeated patterns across distributed initiatives

Should include:

- repeated Materia clusters
- similar initiatives
- departments using similar workflows
- opportunities for standardization or reuse
- recommended AI plays or reusable components

Visual treatment:

- connection lines and node clusters are appropriate here
- use motion when filtering or selecting a pattern
- make relationships visible, not decorative

## 12.6 Materia Library

Purpose:

- serve as the reusable pattern and capability library

Should include:

- Materia cards
- type filters
- reuse count
- maturity status
- associated initiatives
- contributor attribution
- related Materia

Visual treatment:

- Materia chips and cards are the hero elements
- use color identity consistently
- avoid excessive glow on every card

## 12.7 Wielder View

Purpose:

- show participation and contribution across the system

Should include:

- active contributors
- initiatives shaped
- Materia created or reused
- departments involved
- recent contribution trails

Visual treatment:

- avatars and contribution trails
- human-readable activity context
- avoid turning participation into a game leaderboard unless explicitly intended

## 12.8 Activity Stream

Purpose:

- show the living flow of the system

Should include:

- newly discovered initiatives
- new Materia detected
- Materia reused across teams
- Wielder contributions
- related initiatives surfaced
- status changes
- signal changes

Visual treatment:

- should feel like a stream, not a plain log
- group related events when possible
- use timestamps, actors, and system-generated insights clearly

---

# 13. Practical UI Rules

## 13.1 Do Not Put Gradients Everywhere

Gradients should be reserved for:

- headers
- selected states
- key Materia components
- relationship highlights
- empty states
- system-level identity moments

Avoid using gradients on every button, every card, or every label.

## 13.2 Use Glow Sparingly

Glow should indicate:

- importance
- reuse
- active system behavior
- high signal
- selected state

Glow should not be the default state for all elements.

## 13.3 Keep Workflows Clean

Operational screens should remain readable and efficient.

Prioritize:

- clear labels
- logical grouping
- strong contrast
- predictable controls
- simple filters
- readable tables and cards

## 13.4 Do Not Turn Every Label Into a Metaphor

Use normal language for normal actions.

Prefer:

- Add initiative
- Save Materia
- Filter by department
- View related initiatives
- Mark as active

Avoid:

- Summon initiative
- Infuse Materia
- Awaken Wielder
- Channel stream

The product can have a narrative layer without becoming cheesy or confusing.

## 13.5 Use Visual System to Enhance, Not Replace Clarity

A user should understand the product even if all decorative visuals were removed.

The visual layer should make the product more intuitive, not more dependent on interpretation.

---

# 14. Developer Implementation Guidance

## 14.1 Build the Visual System Early

Before building many screens, define:

- color tokens
- gradient tokens
- component variants
- animation rules
- chip types
- initiative states
- Materia states
- avatar group behavior
- layout primitives

This avoids inconsistent one-off styling.

## 14.2 Recommended Front-End Structure

Suggested folders:

```txt
/src
  /components
    /lifestream
      LifestreamHeader.tsx
      FlowDivider.tsx
      FlowIcon.tsx
    /materia
      MateriaChip.tsx
      MateriaCard.tsx
      MateriaLibrary.tsx
    /initiatives
      InitiativeCard.tsx
      InitiativeMap.tsx
      InitiativeDetail.tsx
    /wielders
      WielderAvatarGroup.tsx
      ContributionTrail.tsx
    /activity
      ActivityStream.tsx
  /styles
    tokens.ts
    gradients.ts
    motion.ts
  /data
    sampleInitiatives.ts
    sampleMateria.ts
    sampleWielders.ts
  /lib
    initiativeRelationships.ts
    materiaClassification.ts
```

## 14.3 Suggested Data Model Concepts

### Initiative

```ts
type Initiative = {
  id: string;
  title: string;
  summary: string;
  department: string;
  status: "discovered" | "active" | "paused" | "scaling" | "archived";
  signalStrength: "low" | "medium" | "high";
  materiaIds: string[];
  wielderIds: string[];
  relatedInitiativeIds: string[];
  sourceSignals: string[];
  createdAt: string;
  updatedAt: string;
};
```

### Materia

```ts
type Materia = {
  id: string;
  label: string;
  type: "classification" | "workflow" | "ai-play" | "evaluation" | "agent-capability" | "data";
  description: string;
  colorIdentity: "teal-purple" | "orange-pink" | "blue-purple" | "magenta-cyan";
  maturity: "experimental" | "emerging" | "validated" | "retired";
  reuseCount: number;
  associatedInitiativeIds: string[];
  createdBy?: string;
};
```

### Wielder

```ts
type Wielder = {
  id: string;
  name: string;
  department: string;
  avatarUrl?: string;
  activeInitiativeIds: string[];
  createdMateriaIds: string[];
  contributionCount: number;
  lastActiveAt: string;
};
```

### Activity Event

```ts
type ActivityEvent = {
  id: string;
  type: "initiative_created" | "materia_added" | "pattern_detected" | "wielder_contributed" | "relationship_found" | "status_changed";
  title: string;
  description: string;
  initiativeId?: string;
  materiaId?: string;
  wielderId?: string;
  timestamp: string;
};
```

## 14.4 AI-Assisted Developer Instructions

When using AI to build or modify the system, the developer should instruct the AI to:

- preserve the Lifestream, Materia, and Wielder concept mapping
- use narrative language only where it improves understanding
- keep operational workflows direct and readable
- use reusable components rather than one-off styles
- map every visual effect to a system meaning
- avoid overusing glow, gradients, and fantasy language
- keep the system polished, professional, and credible
- prioritize clarity and usability over theme

Suggested instruction to include in coding prompts:

> Maintain the Lifestream design system. Lifestream represents flow and visibility, Materia represents reusable structured building blocks, and Wielders represent active contributors. Use gradients, motion, glow, and connection lines only when they communicate activity, relationship, reuse, state, or importance. Keep the product clean, readable, and operationally credible. Do not overuse fantasy language or decorative effects.

---

# 15. Accessibility and Readability Rules

## 15.1 Contrast Comes First

All text must remain readable on gradient or dark backgrounds.

Do not place body text directly over high-energy gradients unless there is a dark overlay or solid content panel.

## 15.2 Motion Should Respect User Preferences

Support reduced motion settings.

If the user prefers reduced motion:

- stop ambient gradient animation
- stop particle drift
- remove connection line pulsing
- preserve static visual state indicators

## 15.3 Do Not Use Color Alone

Color should not be the only indicator of meaning.

Pair color with:

- labels
- icons
- text
- badges
- tooltips
- state descriptions

## 15.4 Keep Data Views Practical

For dense operational views:

- use tables when appropriate
- avoid heavy visual effects
- keep filters obvious
- preserve scanability
- do not hide important information behind atmospheric design

---

# 16. Examples of Correct and Incorrect Application

## 16.1 Correct: Materia Chip

A reusable workflow pattern appears as a chip with a subtle gradient border, clear label, and type.

Example:

```txt
[Document Processing]  Workflow Pattern  Reused 7 times
```

This works because the visual treatment communicates reuse and classification.

## 16.2 Incorrect: Decorative Gradient Label

Every normal department tag uses a bright animated gradient.

This fails because it makes routine information look artificially important and reduces readability.

## 16.3 Correct: Flowing Connection Line

Two initiatives share the same Materia, so the pattern view draws a subtle connection line between them.

This works because the line communicates a real relationship.

## 16.4 Incorrect: Random Animated Lines

Animated lines move across the dashboard without representing initiative relationships.

This fails because the animation becomes decoration rather than system meaning.

## 16.5 Correct: Wielder Avatar Trail

An initiative detail page shows the people who created, edited, or reused its Materia.

This works because it makes human contribution visible.

## 16.6 Incorrect: Gamified Wielder Rankings

A leaderboard ranks Wielders by contribution count without context.

This may create unhealthy incentives and makes the system feel game-like rather than operationally useful.

---

# 17. Deliverable Usage Rules

## 17.1 Use Narrative Layer In

Use Lifestream language in:

- vision statements
- system overviews
- executive summaries
- landing pages
- onboarding screens
- stakeholder-facing concept docs
- high-level demo narration

## 17.2 Use Direct Language In

Use plain product language in:

- PRDs
- user stories
- acceptance criteria
- technical documentation
- API descriptions
- implementation notes
- engineering handoff documents
- QA plans

## 17.3 Mixed Usage Example

High-level overview:

> Lifestream surfaces patterns across distributed AI initiatives and helps teams turn scattered experiments into reusable momentum.

Implementation detail:

> The initiative explorer allows users to filter initiatives by department, status, Materia type, signal strength, and contributor activity.

This is the right balance.

---

# 18. Build Checklist

Use this checklist before shipping any new screen, component, or prototype iteration.

## 18.1 Concept Integrity

- Does Lifestream still mean flow, visibility, and connection?
- Does Materia still mean reusable building blocks?
- Do Wielders still mean active participants?
- Is the narrative layer clarifying rather than distracting?

## 18.2 Visual Meaning

- Does every gradient, glow, line, or animation communicate something?
- Are active, inactive, high-signal, and reusable states visually distinct?
- Are relationships between initiatives visible when relevant?
- Are repeated patterns easy to identify?

## 18.3 Usability

- Is the screen readable?
- Are filters and actions obvious?
- Can a non-technical user understand the page?
- Is the interface still useful without the atmospheric layer?

## 18.4 Component Consistency

- Are Materia chips consistent?
- Are initiative cards consistent?
- Are Wielder avatars used consistently?
- Are colors and gradients coming from shared tokens?
- Are motion rules consistent across components?

## 18.5 Tone

- Is the copy clear?
- Is the metaphor disciplined?
- Is the product language credible?
- Is there too much fantasy language?
- Is there too much generic corporate language?

---

# 19. AI Prompt Block for Future Development

Use this prompt block when asking an AI-assisted developer or coding agent to modify or extend the product.

```txt
You are working on the Lifestream system.

Maintain the product’s conceptual and visual integrity.

Core language:
- Lifestream = the living flow of innovation across the organization. It represents visibility, movement, activity, learning, and connection.
- Materia = modular, reusable building blocks that structure initiatives and encode intelligence. Materia can represent AI plays, workflow patterns, tags, classifications, agent capabilities, or evaluation logic.
- Wielders = active participants who apply and shape Materia to move initiatives forward. Wielders are not a role or tier. They are a state of participation.

Core design rules:
- Treat the design as a UI system, not branding.
- Every visual element should communicate system meaning: activity, relationship, reuse, state, importance, or contribution.
- Use flowing gradients to represent activity across initiatives.
- Use motion to represent live system behavior.
- Use connection lines to represent real relationships between initiatives, patterns, or contributors.
- Use Materia chips and cards for reusable workflow patterns and AI capabilities.
- Use Wielder avatars and contribution trails to make human activity visible.
- Keep the interface clean, readable, and operationally credible.
- Do not overuse gradients, glow, animation, or fantasy language.
- Icons may be used frequently. Large banners should be used sparingly.

Preferred components:
- LifestreamHeader
- MateriaChip
- MateriaCard
- InitiativeCard
- FlowDivider
- WielderAvatarGroup
- ActivityStream
- InitiativeMap

Tone:
- 70% operational clarity
- 30% narrative layer
- Clear, intentional, slightly elevated, and grounded.
- Avoid corporate filler and excessive fantasy language.

Before implementing, ensure every new component or screen maps back to real system behavior.
```

---

# 20. Final Principle

Lifestream is not a brand overlay.

It is a conceptual and visual model for how innovation flows, structures, connects, and scales.

If the language does not map to real behavior in the system, it should not be used.

If the visual effect does not communicate state, relationship, reuse, activity, or contribution, it should not be added.

## One-Line Summary

Lifestream makes innovation visible and connected, Materia makes it structured and reusable, and Wielders make it real.
