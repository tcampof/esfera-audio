# search Specification

## Purpose
Búsqueda global de productos y categorías dentro del ámbito de audio del MVP.

## Requirements

### Requirement: Global search entry
The application SHALL provide a global search input reachable from the main shell.

#### Scenario: Search from shell
- **WHEN** the visitor types a query and submits search
- **THEN** a results view is shown

### Requirement: Product and category results
Search results SHALL include matching products and may include matching categories, limited to the audio catalog (no Imagen).

#### Scenario: Brand query finds products
- **WHEN** the visitor searches for a known brand present in mocks/catalog
- **THEN** at least one matching product appears if data contains that brand

### Requirement: Empty state
When there are no matches, the system SHALL show a clear empty state.

#### Scenario: No matches
- **WHEN** the visitor searches a string with no matches
- **THEN** an explicit no-results message is displayed
