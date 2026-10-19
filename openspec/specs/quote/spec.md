# quote Specification

## Purpose
Selección de productos (presupuesto) y solicitud formal sin pago: el lead comercial del MVP.

## Requirements

### Requirement: Persistent guest selection
The system SHALL persist the quote selection for a guest user in local storage (or equivalent client persistence) across page navigations in the same browser.

#### Scenario: Selection survives navigation
- **WHEN** the visitor adds a product and navigates to another catalog page
- **THEN** the selection still contains that product line

### Requirement: Line items with variant and quantity
Each quote line SHALL include product identity, selected variant, quantity, and indicative unit/total price.

#### Scenario: Edit quantity
- **WHEN** the visitor changes quantity on a line
- **THEN** the line totals update accordingly

### Requirement: Stock-aware add rules
The system SHALL prevent adding a variant that fails inventory rules (e.g. out of stock) or SHALL warn according to configured policy; MVP default is to disallow quantity that exceeds available stock.

#### Scenario: Cannot add out-of-stock variant
- **WHEN** a variant is `out_of_stock`
- **THEN** it cannot be added to the quote selection as an available purchase line without an explicit backorder policy (out of MVP default)

### Requirement: Quote request form with Zod validation
The system SHALL collect quote requests via a form validated with Zod (or explicit equivalent), including name, email, phone, message, contact preference, and the attached line items.

#### Scenario: Invalid email blocked
- **WHEN** the visitor submits with an invalid email
- **THEN** the request is not sent
- **AND** a validation error is shown

#### Scenario: Valid submit
- **WHEN** the visitor submits a valid form with at least one line item
- **THEN** stock is revalidated
- **AND** on success a confirmation UI is shown
- **AND** the payload is sent via the configured stub/API/email path

### Requirement: No checkout in MVP
The quote flow MUST NOT collect payment or initiate Redsys/card checkout.

#### Scenario: No payment step
- **WHEN** the visitor completes a quote request
- **THEN** no payment method selection or payment gateway step is presented
