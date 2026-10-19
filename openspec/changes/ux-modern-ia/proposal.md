# Proposal

## Why

El look premium (F1) gusta, pero la interacción F1–F3 aún recuerda al catálogo legacy ePages (árbol de categorías + listado + ficha densa). Antes de F4 hay que fijar una IA moderna (asesoría Hi-Fi) para no consolidar el patrón equivocado.

Azure: Feature **AB#32** · US **AB#33**.

## What Changes

**En este PR (definición):**
- `docs/ux-ia.md` — propuesta de journeys, nav por intenciones, anti-patrones
- Spec `openspec/specs/ux-ia`
- Actualización PRD §7, skill `esfera-hifi-ui`, backlog-map

**Fuera de este PR (implementación posterior):**
- Redesign Home / nav / catálogo / PDP / framing de presupuesto según la spec
- F4 cita alineada a la nueva IA

## Capabilities

### New Capabilities
- _(spec ya creada en `openspec/specs/ux-ia` — `skip_specs: true`)_

### Modified Capabilities
- _(ninguna en este PR de docs; apply futuro puede MODIFICAR home-brand/catalog/product-detail/quote)_

## Impact

- No cambia UI runtime en este PR
- Bloquea empezar F4 hasta aplicar (o planificar) la implementación UX
