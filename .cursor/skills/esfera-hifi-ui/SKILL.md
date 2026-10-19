---
name: esfera-hifi-ui
description: >-
  Premium dark Hi-Fi UI constraints for Esfera Audio frontend. Use when building or changing
  Home, layout, catalog grids, product detail, forms, or any visual/UX work; also when the user
  mentions hero, marca, Tailwind, shadcn, or diseño.
---

# Esfera Hi-Fi UI

## Brand rules (Home / first viewport)

- One composition, not a dashboard.
- Brand is hero-level; headline must not overpower brand.
- Full-bleed hero; **no** cards in hero; **no** floating badges/overlays on hero media.
- CTAs: catalog + appointment (not checkout).

## Information architecture (required)

- **Primary nav = intentions** (stereo, cinema, vinyl, multiroom, projects)—not the full category tree.
- Full technical catalog remains reachable as a **secondary** path (“Ver todo el catálogo”).
- Home below hero: small set of intention destinations, not a product dashboard.
- PDP: decision layer first (variant, stock, quote, demo); dense specs after.
- Quote: advisory selection / budget request with clear steps—not a checkout cart.
- Do **not** start F4 until IA modern apply is done or explicitly planned against `docs/ux-ia.md`.

## Look

- Dark elegant Hi-Fi: graphite/black, restrained metal/amber accent.
- Avoid AI-default looks: purple gradients, cream+terracotta, dense broadsheet.
- Expressive typography (not Inter/Roboto/Arial/system as primary display).
- Prefer atmosphere (gradient/texture/product imagery) over flat fills.

## Components

- Cards only when they contain a user interaction; otherwise prefer layout without card chrome.
- One job per section: one headline + short support.
- Motion: 2–3 intentional moments max (hero enter, product hover, page transition).

## Forms (presupuesto / cita)

- Clear labels, Zod validation messages in Spanish (default locale).
- No payment UI in MVP.

## References

- `docs/ux-ia.md` · PRD §7 · `openspec/specs/ux-ia/spec.md` · `openspec/specs/home-brand/spec.md`
