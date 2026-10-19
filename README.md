# Esfera Audio

Web premium Hi-Fi (práctica **Harness Engineering / SDD**). MVP: catálogo de audio + presupuesto / cita. Candidato a propuesta comercial si el resultado se defiende.

## Arranque (F0)

```bash
npm install
npm run dev
```

Guardrails:

```bash
npm run typecheck
npm run test
```

## Documentación

| Artefacto | Ruta |
| --- | --- |
| PRD | [`docs/PRD.md`](docs/PRD.md) |
| Harness agente | [`AGENTS.md`](AGENTS.md) |
| Skills | [`docs/skills.md`](docs/skills.md) |
| Specs OpenSpec | [`openspec/specs/`](openspec/specs/) |
| Change F0 | [`openspec/changes/f0-scaffold-foundation/`](openspec/changes/f0-scaffold-foundation/) |
| Mapa Azure ↔ specs | [`docs/backlog-map.md`](docs/backlog-map.md) |
| Backlog | [Azure Boards EsferaAudio](https://dev.azure.com/tcampo/EsferaAudio) |

## Skills

Índice: [`docs/skills.md`](docs/skills.md) — dominio `esfera-*` + OpenSpec `openspec-*`.

## Flujo agente (OpenSpec)

1. Skill `esfera-harness` (contexto/alcance)  
2. `/opsx-explore` → `/opsx-propose` → `/opsx-apply`  
3. Skill `esfera-verify-ac` antes de dar por cerrado  
4. `/opsx-archive` si hubo deltas  

Change activo F0: **`f0-scaffold-foundation`** (implementado: scaffold + tipos + i18n + inventario mock).
