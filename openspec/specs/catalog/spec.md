# catalog Specification

## Purpose
Exploración del catálogo completo de audio (jerarquía, listados y filtros), sin la categoría Imagen.

## Requirements

### Requirement: Full audio category tree
The system SHALL expose the full audio category tree agreed in the PRD (speakers, amplifiers, analog, digital, headphones, cables, furniture, Sonos, compact systems, news, promotions, exhibition offers, bundles, Project Design Box) and MUST NOT expose Imagen.

#### Scenario: Browse top-level audio categories
- **WHEN** a visitor opens the catalog
- **THEN** they can navigate top-level audio categories including at least Altavoces and Amplificadores
- **AND** Imagen is absent

### Requirement: Product listing cards
Category and filtered views SHALL list products with name, brand, price, and a stock availability indicator derived from the inventory contract.

#### Scenario: Listing shows price and stock badge
- **WHEN** a category with products is displayed
- **THEN** each product shows price and a stock-related badge or label

### Requirement: Faceted filters
The system SHALL allow filtering by category, brand, price range, and availability.

#### Scenario: Filter by brand
- **WHEN** the visitor selects a brand filter
- **THEN** only products of that brand remain visible

#### Scenario: Filter by availability
- **WHEN** the visitor filters to in-stock items
- **THEN** products that are out of stock are hidden
