# inventory Specification

## Purpose
Contrato de inventario en tiempo real por variante de producto, con implementación mock en desarrollo sustituible por una fuente viva sin cambiar el comportamiento observable de la UI.

## Requirements

### Requirement: Stock read by variant
The system SHALL expose a stock-read capability that, given a variant identifier, returns quantity available, a derived `stockStatus`, and optionally a last-updated timestamp.

#### Scenario: In-stock variant
- **WHEN** stock is requested for a variant with quantity greater than zero
- **THEN** the response includes `stockQuantity` > 0 and `stockStatus` of `in_stock` (or equivalent allowed status)

#### Scenario: Out-of-stock variant
- **WHEN** stock is requested for a variant with quantity zero and not on backorder
- **THEN** the response includes `stockQuantity` of 0 and `stockStatus` of `out_of_stock`

### Requirement: Mock swappable for live source
The system SHALL isolate the stock data source behind a typed contract so production can use a live inventory API while development MAY use an in-memory mock.

#### Scenario: UI depends only on contract
- **WHEN** the mock implementation is replaced by a live adapter that satisfies the same contract
- **THEN** list and product views continue to consume stock without changing their public API surface

### Requirement: Revalidate before quote submit
The system SHALL revalidate stock for every line item when a quote request is submitted.

#### Scenario: Stock dropped before submit
- **WHEN** a user submits a quote and a selected variant is no longer available per the inventory contract
- **THEN** the submission is blocked or clearly warned according to product rules
- **AND** the user is informed which item failed validation
