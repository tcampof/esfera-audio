---
name: esfera-openspec-change
description: >-
  Creates and drives OpenSpec changes for Esfera Audio (proposal, design, tasks, apply, archive)
  aligned with Azure Features F0–F5. Use when proposing a change, writing specs/deltas, applying
  tasks, archiving, or when the user says opsx, openspec, or “change F1/F2…”.
---

# Esfera OpenSpec Change

Prefer the bundled OpenSpec skills for mechanics (`openspec-propose`, `openspec-apply-change`, etc.). This skill adds **project rules**.

## Create / update a change

1. Name: kebab-case, phase prefix when possible (`f0-…`, `f1-home-brand`, `f2-catalog-pdp`).
2. In `proposal.md` link Azure IDs (Feature + User Stories) from `docs/backlog-map.md`.
3. State **out of scope** explicitly (checkout / Imagen / auth unless PRD changed).
4. Artifacts in **Spanish**; structural headings + SHALL/MUST in **English**.
5. If behavior is already fully in `openspec/specs/` and the change only implements it → `skip_specs: true` in `.openspec.yaml` (like F0).
6. If behavior is new/changed → delta under `changes/<name>/specs/<capability>/spec.md` with ADDED/MODIFIED requirements.

## Apply

1. Follow `tasks.md` in order.
2. Do not invent tasks outside the change.
3. After implementation run skill `esfera-verify-ac` (or at least `npm run typecheck` && `npm run test`).
4. Mark tasks `[x]` in `tasks.md` as you go.

## Archive

Only after verify. If deltas exist, archive/sync so `openspec/specs/` stays the source of truth. Update `docs/backlog-map.md` if mappings changed.

## Commit

After apply + verify for a change (and after archive if applicable), **create a git commit** for that change alone. Harness rule: one finished delivery → one commit. No push unless the user asks.

## Validate

```bash
npx openspec validate --all
npx openspec status --change "<name>"
```
