# project-foundation Specification

## Purpose
Base técnica del proyecto: tipado estricto del dominio Hi-Fi, toolchains de calidad y datos mock de desarrollo listos para sustituir por APIs reales.

## Requirements

### Requirement: Strict domain typing
The system SHALL define catalog domain types in `src/types/hifi.ts` including at least `Product`, `Category`, `Specification`, and `ProductVariant`, without using TypeScript `any`.

#### Scenario: Types compile under strict check
- **WHEN** a developer runs `npm run typecheck`
- **THEN** the project typechecks successfully with the domain types available for import

### Requirement: Quality gate scripts
The system SHALL expose `npm run typecheck` and `npm run test` scripts that the agent MUST run before marking work complete.

#### Scenario: Empty or minimal suite passes on scaffold
- **WHEN** the foundation change is complete
- **THEN** both `typecheck` and `test` exit with success

### Requirement: Development catalog mocks
The system SHALL provide mock audio categories and products for local development that exclude the Imagen category tree.

#### Scenario: Mock catalog has no Imagen
- **WHEN** the mock catalog is loaded
- **THEN** no category representing TV/projectors/Imagen is present
- **AND** at least one product includes a variant with stock fields
