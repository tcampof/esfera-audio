---
name: esfera-verify-ac
description: >-
  Adversarial verification for Esfera Audio: green tests are not enough. Checks OpenSpec
  scenarios, Azure acceptance criteria, MVP exclusions, and typecheck/test. Use when closing
  a phase, finishing a change, before archive, or when the user asks to verify, review AC,
  or run adversarial review.
---

# Esfera Verify (Adversarial)

Tests verdes ≠ correcto. Refutar, no solo confirmar.

## Checklist

Copy and fill:

```
Verify:
- [ ] npm run typecheck
- [ ] npm run test
- [ ] npx openspec validate --all
- [ ] Each WHEN/THEN in touched specs has evidence (test, manual note, or demo path)
- [ ] Azure AC for linked US still hold (backlog-map)
- [ ] MVP exclusions intact: no checkout, no Imagen nav, no auth
- [ ] No `any` in new TS
- [ ] Quote/appointment forms use Zod if touched
```

## Method

1. List claims from the change’s specs (or `openspec/specs/<capability>`).
2. For each scenario, ask: **“¿Qué haría fallar esto?”** — try to break it.
3. Report:
   - **PASS** — evidence
   - **FAIL** — how to reproduce + fix
   - **UNPROVEN** — no evidence yet (do not archive)

## Output format

```markdown
## Veredicto: PASS | FAIL | UNPROVEN
### Escenarios
| Spec / Scenario | Resultado | Evidencia |
| --- | --- | --- |
### Exclusiones MVP
- checkout: OK/FAIL
- Imagen: OK/FAIL
- auth: OK/FAIL
### Comandos
- typecheck: …
- test: …
### Git
- [ ] Commit creado para esta entrega (obligatorio en harness)
```

## After PASS

Create the git commit for the finished work before starting the next change/Feature.
