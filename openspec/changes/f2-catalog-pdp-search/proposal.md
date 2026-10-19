# Proposal

## Why

Tras F1, catálogo y cita son stubs. Las US #23–#25 exigen explorar audio, ver PDP con variantes/stock y buscar. Sin esto no hay camino a presupuesto (F3).

Azure: Feature **F2** (#15) · US **#23** · **#24** · **#25**.

## What Changes

- Catálogo real sobre mocks: árbol audio completo (sin Imagen), listado, filtros (categoría, marca, precio, stock)
- PDP: galería/placeholder, variantes, specs, stock vía `InventoryPort`, related, CTAs presupuesto + demo
- Selección de presupuesto mínima en localStorage (formulario completo = F3)
- Búsqueda global en header → resultados productos/categorías + empty state
- Ampliar mocks de categorías/productos

## Capabilities

### New Capabilities
- _(ninguna — specs ya en `openspec/specs/`)_

### Modified Capabilities
- _(ninguna)_

## Impact

- Rutas `/catalogo`, `/producto/:slug`, `/buscar`
- Fuera: formulario Zod de presupuesto (F3), cita completa (F4), legales (F5), checkout/Imagen/auth
