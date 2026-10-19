# Tasks

## 1. Scaffold

- [x] 1.1 Crear app Vite + React + TypeScript en la raíz (o `apps/web` si se decide monorepo; default: raíz)
- [x] 1.2 Configurar Tailwind CSS
- [x] 1.3 Inicializar shadcn/ui (mínimo viable)
- [x] 1.4 Añadir scripts `typecheck` y `test` (Vitest) en `package.json`

## 2. Dominio e i18n

- [x] 2.1 Crear `src/types/hifi.ts` según PRD §5 (Product, Category, Specification, ProductVariant, StockStatus, LocaleCode)
- [x] 2.2 Configurar i18n con locale default `es` y diccionario `common` mínimo
- [x] 2.3 Crear mocks audio (categorías + productos con variantes y stock) sin Imagen

## 3. Inventario

- [x] 3.1 Definir contrato tipado de lectura de stock por `variantId`
- [x] 3.2 Implementar adapter mock alimentado por los mocks
- [x] 3.3 Test unitario: in_stock / out_of_stock según cantidades

## 4. Shell y cierre

- [x] 4.1 Página placeholder que importe tipos/mocks e i18n (compila; sin Home premium)
- [x] 4.2 Ejecutar `npm run typecheck` y `npm run test` en verde
- [x] 4.3 Actualizar README con cómo arrancar (`npm install`, `npm run dev`)
