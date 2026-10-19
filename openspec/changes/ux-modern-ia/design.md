# Design

## Context

Ver `docs/ux-ia.md`. Visual system actual se mantiene; cambia IA e interacción.

## Goals / Non-Goals

**Goals:** contrato de experiencia aprobable por PR; trazabilidad Azure/OpenSpec.  
**Non-Goals (este PR):** implementar componentes nuevos; F4/F5.

## Decisions

1. **Intenciones** como nav primaria; árbol técnico secundario.
2. **PDP en dos actos** (decisión → confianza/specs).
3. **Presupuesto** = selección para asesorar (stepper), no carrito de checkout.
4. Implementación en change/apply **después** del merge de esta propuesta y **antes** de F4.

## Risks

- Ampliar mocks/intenciones sin contenido real → usar copy + filtros de categoría existentes al implementar.
- Resistencia a “esconder” el árbol → catálogo completo sigue a un clic.
