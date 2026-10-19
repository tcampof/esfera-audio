# Proposal

## Why

El repo está vacío de aplicación. Antes de Home o catálogo hace falta el **cimiento tipado** (Harness + SDD): toolchain, tipos de dominio, i18n ES y contrato de inventario mock. Sin esto, cualquier feature viola `AGENTS.md` y el PRD §5/§8.

Azure: Feature **F0** (#13) · US **#19** (scaffold) · US **#20** (contrato inventario).

## What Changes

- Scaffold Vite + React + TypeScript + Tailwind + shadcn/ui
- `src/types/hifi.ts` con entidades de catálogo (sin `any`)
- i18n con locale `es` por defecto
- Mocks de categorías/productos audio (sin Imagen) con stock
- Contrato tipado de inventario + adapter mock + test
- Scripts `typecheck` y `test` en verde
- Shell mínimo que compile (sin Home premium; eso es F1)

## Capabilities

### New Capabilities
- _(ninguna — `skip_specs: true`)_ Las capacidades `project-foundation` e `inventory` ya están especificadas en `openspec/specs/`.

### Modified Capabilities
- _(ninguna)_

## Impact

- Crea la app desde cero en la raíz del repo
- Dependencias npm nuevas
- No afecta Azure más allá de poder cerrar #19/#20 al verificar AC
- Fuera de alcance: UI de catálogo, presupuesto, cita, checkout, Imagen, auth
