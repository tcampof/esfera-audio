---
name: esfera-harness
description: >-
  Orchestrates Esfera Audio Harness Engineering (3 pillars, SDD, OpenSpec, Azure backlog).
  Use when starting any feature, choosing next work, applying F0–F5, or when the user
  mentions harness, SDD, PRD, OpenSpec, backlog, or Esfera Audio MVP scope.
---

# Esfera Harness

## Before coding

1. Read `AGENTS.md` and `docs/backlog-map.md`.
2. Confirm scope against `docs/PRD.md` §3.3–3.4 (**no** checkout, Imagen, or auth in MVP).
3. Identify the OpenSpec capability under `openspec/specs/<capability>/spec.md`.
4. Use or create a change under `openspec/changes/` (see skill `esfera-openspec-change`).
5. Only then implement.

## Three pillars

| Pilar | Dónde vive |
| --- | --- |
| Herramienta | Cursor + OpenSpec skills (`openspec-*`) + estas skills `esfera-*` |
| Contexto | `AGENTS.md`, PRD, `openspec/config.yaml`, specs, Azure EsferaAudio |
| Prompt | Change proposal/design/tasks; no “code first” |

## Default next work

If the user says “continúa” / “siguiente fase” without naming a change:

1. Run `npx openspec list` — prefer active change (today: `f0-scaffold-foundation`).
2. Else pick next Feature from `docs/backlog-map.md` (F0→F5).
3. Announce the choice and wait only if ambiguous.

## Close-out (obligatorio)

When a change, Feature/US deliverable, or harness doc milestone is **done**:

1. `npm run typecheck` && `npm run test` (if app code touched).
2. Run `esfera-verify-ac` evidence when closing an OpenSpec change.
3. **Commit** on a feature branch (one delivery unit).
4. **Push branch + open PR** to `Main`, linking Azure with `AB#<id>` in title/body.
5. Update Azure work item state (Closed) when the delivery is accepted/merged.
6. Do **not** push straight to `Main` unless the user explicitly asks.

## Hard stops

Stop and ask if the request implies: online checkout, Redsys, Imagen/TV category, or user accounts.
