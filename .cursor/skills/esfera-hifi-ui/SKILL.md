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

- PRD §7 · user frontend design rules · `openspec/specs/home-brand/spec.md`
