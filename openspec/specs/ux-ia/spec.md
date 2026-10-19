# ux-ia Specification

## Purpose
Define the modern information architecture and interaction model for Esfera Audio so the experience feels like Hi-Fi advisory—not a legacy ePages catalog shell—while keeping the premium dark visual language.

## Requirements

### Requirement: Intention-first primary navigation
The primary navigation SHALL emphasize short visitor intentions (e.g. stereo music, home cinema, vinyl, whole-home audio, projects) and MUST NOT present the full product category tree as the default primary nav.

#### Scenario: Primary nav without full tree
- **WHEN** a visitor views the site header on desktop
- **THEN** the primary nav does not list the complete set of catalog categories as the main links
- **AND** a path to the full audio catalog remains available as a secondary action

### Requirement: Intention landings before deep catalog
The system SHALL provide intention-oriented entry points from Home that lead into curated or filtered catalog views before exposing the full technical category tree.

#### Scenario: Home intentions
- **WHEN** a visitor opens the home page below the hero
- **THEN** they see a small set of intention destinations (not a dense product dashboard)
- **AND** activating one leads toward relevant products or a guided catalog view

### Requirement: Decision-first product detail
The product detail experience SHALL prioritize purchase-assistance decisions (variant, stock, add to quote, book demo) above long technical specification blocks.

#### Scenario: CTAs before dense specs
- **WHEN** a visitor opens a product detail page
- **THEN** quote and demo actions are visible without scrolling past a long specs table first (on a typical desktop viewport)

### Requirement: Quote framed as advisory selection
The quote flow SHALL be presented as an advisory selection / budget request without payment UI, with clear progress from selection to contact details to confirmation.

#### Scenario: No payment in quote
- **WHEN** a visitor completes a quote request
- **THEN** no payment method or gateway step is shown
- **AND** copy indicates the purpose is to request advice/quote

### Requirement: Preserve catalog completeness
Despite intention-first IA, the system SHALL keep the full audio catalog reachable (excluding Imagen in MVP) including search and technical category browsing.

#### Scenario: Full catalog still reachable
- **WHEN** a visitor chooses to browse the complete catalog
- **THEN** they can reach category and filter-based product listing for audio categories without Imagen
