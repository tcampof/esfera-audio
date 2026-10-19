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

Al terminar un change, Feature o **User Story**:

1. **verify** (`typecheck` / `test` / escenarios)
2. **commit** en rama de feature
3. **PR** a `Main` con `AB#<id>` (amarra git ↔ Azure Boards)
4. **Azure** → estado Closed

No cerrar US solo con commit local. No push directo a `Main` salvo excepción (`AGENTS.md` §3).
