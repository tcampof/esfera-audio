# Mapa Azure Boards ↔ OpenSpec

**Org/proyecto:** [EsferaAudio](https://dev.azure.com/tcampo/EsferaAudio) (org `tcampo`)  
**Epic:** #12 — MVP Esfera Audio — Catálogo + Presupuesto/Cita

| Feature | Azure | Specs (`openspec/specs/`) | Change |
| --- | --- | --- | --- |
| F0 Scaffold y tipado | #13 · US #19 #20 | `project-foundation`, `inventory` | `changes/f0-scaffold-foundation` |
| F1 Home y shell | #14 · US #21 #22 | `home-brand` | `changes/f1-home-brand-shell` |
| F2 Catálogo y PDP | #15 · US #23 #24 #25 | `catalog`, `product-detail`, `search` | `changes/f2-catalog-pdp-search` |
| F3 Presupuesto | #16 · US #26 #27 | `quote` | `changes/f3-quote-request` |
| UX IA moderna | #32 · US #33 | `ux-ia` | `changes/ux-modern-ia` (definición + apply) |
| F4 Cita y contacto | #17 · US #28 #29 | `appointment`, `contact-legal` | _(tras merge apply UX)_ |
| F5 i18n, legales, SEO | #18 · US #30 #31 | `i18n`, `contact-legal` | _(pendiente)_ |

## Flujo de trabajo

1. Leer spec(s) de la capability.
2. Crear/usar change OpenSpec (`/opsx-propose` o carpeta en `changes/`).
3. Completar `tasks.md` → `/opsx-apply` (rama `feature/...`).
4. Verificar escenarios + `typecheck`/`test`.
5. **Commit + PR** a `Main` con `AB#<Feature>` / `AB#<US>` → cerrar ítems en Azure.
6. `/opsx-archive` si hubo deltas; actualizar este mapa si cambia el enlace.
