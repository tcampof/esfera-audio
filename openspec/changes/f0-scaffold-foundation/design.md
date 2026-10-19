# Design

## Context

Greenfield. Specs de referencia: `openspec/specs/project-foundation/spec.md` e `openspec/specs/inventory/spec.md`. PRD §5 (tipos) y §8 Fase 0. Stack fijado en `AGENTS.md`.

## Goals / Non-Goals

**Goals:**
- App que arranca en local con tipado estricto
- Contrato de stock desacoplado (mock hoy → API en Fase 6)
- i18n ES cableado desde el día 0
- Guardrail typecheck + test operable

**Non-Goals:**
- Home premium, catálogo, rutas de negocio (F1+)
- Inventario real / Redsys / auth
- Diseño visual final (solo theme tokens mínimos si shadcn lo requiere)

## Decisions

1. **Vite + React + TS** como scaffold oficial del PRD (no Next en MVP).
2. **Precios en céntimos** (`priceCents`) en tipos; UI formateará EUR es-ES más adelante.
3. **InventoryPort** (nombre orientativo): interfaz `getStock(variantId) → { stockQuantity, stockStatus, stockUpdatedAt? }`; `MockInventoryAdapter` en `src/data/` o `src/inventory/`.
4. **Mocks JSON/TS** en `src/data/mocks/` con 2–3 categorías y 2–3 productos con variantes.
5. **i18n**: librería ligera compatible con React (p. ej. `i18next` o equivalente simple); solo namespace `common` en F0.
6. **Tests**: Vitest (alineado con Vite) con al menos un test del mock de inventario.

## Risks / Trade-offs

- Elegir shadcn demasiado pronto puede frenar F0 → inicializar lo mínimo y ampliar en F1.
- Mock de stock “suficientemente real” vs simple: preferir API clara sobre datos ricos.
- Encoding Windows en scripts: preferir UTF-8 en archivos fuente.
