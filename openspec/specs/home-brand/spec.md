# home-brand Specification

## Purpose
Primera experiencia de marca premium Hi-Fi: home, shell de navegación y pie con datos de tienda, orientados a catálogo y cita (no a checkout).

## Requirements

### Requirement: Brand-first home hero
The home page SHALL present a full-bleed hero where the Esfera Audio brand is the dominant signal, with one headline, one short supporting sentence, and a primary CTA group.

#### Scenario: First viewport composition
- **WHEN** a visitor opens the home page on desktop or mobile
- **THEN** the first viewport shows brand, one claim, one supporting line, and CTAs without dashboard-like clutter or hero cards

### Requirement: Primary CTAs
The home page SHALL offer CTAs to explore the catalog and to book an appointment.

#### Scenario: CTA navigation
- **WHEN** the visitor activates “Explorar catálogo”
- **THEN** they reach the catalog experience
- **WHEN** the visitor activates “Reservar cita”
- **THEN** they reach the appointment form

### Requirement: Global navigation without Imagen
The application shell SHALL provide navigation to audio catalog areas and exclude the Imagen (TV/projectors) category from MVP navigation.

#### Scenario: No Imagen in nav
- **WHEN** the visitor inspects primary navigation
- **THEN** no Imagen/TV/projector category entry is shown

### Requirement: Store footer facts
The footer SHALL display real store contact facts (address in A Coruña, phones, email) and links to legal pages when available.

#### Scenario: Footer contact visible
- **WHEN** the visitor scrolls to the footer
- **THEN** phone and email for Esfera Audio are visible
