# Skills del proyecto (Harness)

Las skills **OpenSpec** (`openspec-*`) son genéricas del CLI. Las skills **`esfera-*`** aportan el dominio y el método del máster.

| Skill | Cuándo |
| --- | --- |
| `esfera-harness` | Empezar trabajo, elegir fase, respetar MVP/SDD |
| `esfera-openspec-change` | Crear/aplicar/archivar changes con reglas Esfera + Azure |
| `esfera-verify-ac` | Cerrar fase: escenarios, AC, exclusiones, typecheck/test |
| `esfera-hifi-ui` | Cualquier UI/UX Home, catálogo, PDP, forms |

| Skill OpenSpec (instaladas) | Cuándo |
| --- | --- |
| `openspec-explore` | Explorar idea antes de proponer |
| `openspec-propose` | Crear change |
| `openspec-apply-change` | Implementar tasks |
| `openspec-update-change` | Revisar plan |
| `openspec-sync-specs` | Sync deltas → specs |
| `openspec-archive-change` | Archivar change terminado |

Ruta: `.cursor/skills/<name>/SKILL.md`

## Cierre de entrega

Al terminar un change, Feature/US o hito de harness: **verify → commit git**. No acumular varias entregas sin commit. Push solo si el usuario lo pide (`AGENTS.md` §3).
