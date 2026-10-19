# i18n Specification

## Purpose
Interfaz multi-idioma: español por defecto e infraestructura lista para inglés (D6).

## Requirements

### Requirement: Spanish default
The application SHALL default to Spanish (`es`) for UI strings.

#### Scenario: First visit language
- **WHEN** a visitor opens the app without a saved language preference
- **THEN** UI chrome is shown in Spanish

### Requirement: Dictionary-based UI copy
User-visible chrome strings SHALL be loaded from locale dictionaries (or equivalent i18n mechanism), not hardcoded en masse in components.

#### Scenario: Shared string key
- **WHEN** a chrome label exists in the Spanish dictionary
- **THEN** components render that label via the i18n layer

### Requirement: English roadmap readiness
The system SHALL support selecting English (`en`) when translations exist; missing keys MAY fall back to Spanish.

#### Scenario: Language switch when EN present
- **WHEN** the visitor selects English and EN strings exist for a key
- **THEN** that key renders in English
