# Proposal

## Why

F0 dejó un placeholder técnico. Sin Home y shell de marca no hay experiencia premium ni CTAs de catálogo/cita exigidos por el PRD y la spec `home-brand`.

Azure: Feature **F1** (#14) · US **#21** (Home) · US **#22** (nav/footer).

## What Changes

- Layout global: navegación audio (sin Imagen) + footer con datos reales de tienda
- Home full-bleed con marca dominante, claim, subtítulo y CTAs Explorar catálogo / Reservar cita
- Rutas placeholder `/catalogo` y `/cita` para que los CTAs naveguen (contenido real en F2/F4)
- Tipografía y theme Hi-Fi oscuro; 2–3 motions suaves
- Ampliar diccionario i18n `common` para shell/home

## Capabilities

### New Capabilities
- _(ninguna — `skip_specs: true`)_ Spec viva: `openspec/specs/home-brand/`

### Modified Capabilities
- _(ninguna)_

## Impact

- Añade `react-router-dom` y fuentes
- Sustituye el placeholder F0 de `App.tsx`
- Fuera de alcance: catálogo real, PDP, presupuesto, formularios de cita, checkout, Imagen, auth
