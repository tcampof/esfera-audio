# contact-legal Specification

## Purpose
Página de contacto con datos reales de la tienda y páginas legales exigibles (confianza y cumplimiento básico).

## Requirements

### Requirement: Contact page with store data
The contact page SHALL display Esfera Audio S.L. store data: address in A Coruña, landline, mobile, and email.

#### Scenario: Contact facts visible
- **WHEN** a visitor opens Contacto
- **THEN** they can see phone `981 141 092` (or current PRD value) and email `info@esfera-audio.com`

### Requirement: Legal pages
The system SHALL provide pages for terms, privacy policy, and withdrawal rights, linked from the footer.

#### Scenario: Footer legal links
- **WHEN** the visitor uses footer legal links
- **THEN** each of the three legal pages is reachable
