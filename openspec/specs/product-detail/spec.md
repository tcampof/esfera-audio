# product-detail Specification

## Purpose
Ficha de producto Hi-Fi con galería, variantes, especificaciones, stock en tiempo real y CTAs de presupuesto y demo/cita.

## Requirements

### Requirement: Rich product page
The product detail page SHALL show gallery, name, brand, VAT-inclusive price, long description, and a tabular specifications block.

#### Scenario: Specs visible
- **WHEN** a visitor opens a product that has specifications
- **THEN** specifications are shown in a readable tabular or structured list

### Requirement: Mandatory variant before quote add
If a product has variants, the system SHALL require a selected variant before adding the product to the quote selection.

#### Scenario: Add without variant blocked
- **WHEN** the visitor tries to add to quote without selecting a required variant
- **THEN** the product is not added
- **AND** the UI indicates that a variant must be selected

### Requirement: Live stock on variant
The product detail page SHALL display stock for the selected variant using the inventory contract (refreshed on load / variant change).

#### Scenario: Variant stock updates
- **WHEN** the visitor selects a different variant
- **THEN** the displayed stock reflects that variant’s inventory response

### Requirement: Quote and appointment CTAs
The product detail page SHALL offer actions to add to quote selection and to reserve a demo/appointment (optionally carrying the product of interest).

#### Scenario: Add to quote
- **WHEN** a valid variant is selected and stock rules allow
- **THEN** “Añadir a presupuesto” adds the line to the quote selection

#### Scenario: Reserve demo
- **WHEN** the visitor chooses “Reservar demo”
- **THEN** they reach the appointment flow with the product context when applicable

### Requirement: Related products
The product detail page SHALL show related products when related IDs exist.

#### Scenario: Related list
- **WHEN** related products are configured
- **THEN** the visitor can navigate to at least one related product
