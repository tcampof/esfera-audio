# Design

## Context

Spec: `home-brand`. Skill UI: `esfera-hifi-ui`. Datos de tienda en PRD §1.

## Goals / Non-Goals

**Goals:**
- Primera viewport = una composición de marca
- Nav sin Imagen; footer con tel/email/dirección
- CTAs que navegan a rutas reales (aunque destino sea stub)

**Non-Goals:**
- Listado de productos, filtros, forms Zod
- CMS de banners / novedades ricos (puede quedar un ancla mínima)

## Decisions

1. **react-router-dom** para `/`, `/catalogo`, `/cita`.
2. **Shell** `AppShell` con `SiteHeader` + `SiteFooter` + `<Outlet />`.
3. **Hero** full-bleed con gradiente + textura sutil (sin card ni overlay badge); marca tipográfica grande.
4. Fuentes: display serif (**Cormorant Garamond**) + UI sans (**Manrope**) vía `@fontsource`.
5. Nav top-level desde `mockCategories` filtrando `parentId === null` y excluyendo cualquier slug/nombre Imagen.
6. Motions: fade/slide del hero al cargar; hover suave en CTAs (máx. 2–3).

## Risks / Trade-offs

- Stubs de catálogo/cita pueden parecer “rotos” → copy claro “Próximamente / F2–F4”.
- Imágenes de producto reales aún no hay → atmósfera con CSS, no stock fotos genéricas.
