# Design

## Context

Specs: `catalog`, `product-detail`, `search`. Inventario: `MockInventoryAdapter`.

## Goals / Non-Goals

**Goals:** navegación catálogo, filtros, PDP usable, search, quote lines en localStorage.  
**Non-Goals:** checkout, form presupuesto completo, API stock real.

## Decisions

1. Estado de filtros vía `URLSearchParams` en `/catalogo` (shareable).
2. `quote-store` (localStorage) con `addLine({ productId, variantId, qty })`; UI toast/banner mínimo al añadir.
3. PDP bloquea add sin variante; revalida stock antes de add.
4. Search en header (desktop + mobile) → `/buscar?q=`.
5. Mocks: todas las categorías top-level del PRD audio; varios productos con stock mixto.

## Risks

- Árbol “completo” con pocos SKUs → OK para MVP demo; import real = fase posterior.
