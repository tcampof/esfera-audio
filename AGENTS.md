# AGENTS.md / .cursorrules — Esfera Audio Hi-Fi App

## 1. Contexto del Proyecto
- Aplicación web e-commerce premium para equipos de sonido de alta fidelidad (Hi-Fi).
- Stack: React + TypeScript + Vite + Tailwind CSS + shadcn/ui.
- Dominio: catálogo completo de audio (Altavoces, Amplificadores, Fuentes, Auriculares, Cables, Sonos, etc.). **Sin categoría Imagen en MVP.**
- Modelo comercial MVP: **catálogo + solicitud de presupuesto / reserva de cita** (sin checkout online).
- Inventario: **tiempo real** por producto/variante (contrato tipado; mock solo en desarrollo).
- i18n: **ES default**, app i18n-ready (EN en roadmap). Checkout futuro: **Redsys + transferencia**.
- **PRD:** `/docs/PRD.md` (auditoría + decisiones §3.4 + fases).
- **OpenSpec:** `/openspec/` — specs vivas + changes. Config: `openspec/config.yaml`.
- **Mapa backlog:** `/docs/backlog-map.md` (Azure ↔ specs ↔ changes).
- **Propósito dual:** práctica del máster (Harness Engineering / SDD). Si es sólido → propuesta comercial a Esfera Audio.
- **Máster:** `/docs/mastersed/capitulosMaster.md`.
- **Backlog:** [Azure EsferaAudio](https://dev.azure.com/tcampo/EsferaAudio) (org `tcampo`).

## 2. Método — Harness Engineering + SDD + OpenSpec
Trabajar con los **3 pilares**: Herramienta/harness · Contexto · Prompt.

1. **Contexto vivo:** este archivo + PRD + `openspec/specs/` + change activo + backlog-map.
2. **Cadena:** PRD → Azure (historias/AC) → spec capability → change (proposal/design/tasks) → execute → archive.
3. **Loop:** Explore (`/opsx-explore`) → Propose (`/opsx-propose`) → Apply (`/opsx-apply`) → Archive (`/opsx-archive`).
4. **Verificación:** tests verdes ≠ correcto; contrastar escenarios WHEN/THEN de la spec y AC de Azure; revisión adversarial en hitos.
5. **Documentación viva:** actualizar PRD / specs / backlog-map cuando cambie el negocio.

**Change activo inicial:** `openspec/changes/f0-scaffold-foundation` (F0 / US #19–#20).

### Skills del proyecto (leer índice `docs/skills.md`)
- `esfera-harness` — orquestación SDD / alcance MVP  
- `esfera-openspec-change` — changes OpenSpec + enlace Azure  
- `esfera-verify-ac` — verificación adversarial al cerrar  
- `esfera-hifi-ui` — UI premium Hi-Fi  
- Más `openspec-*` (explore/propose/apply/…) instaladas por OpenSpec init  

## 3. Reglas del Harness (Feedforward Controls)
1. **Tipado Estricto:** Prohibido `any`. Entidades de catálogo tipadas en `/src/types/hifi.ts`.
2. **UX Premium:** Interfaz oscura/elegante Hi-Fi.
3. **Formularios:** Presupuesto / Cita con Zod o validación explícita.
4. **Guardrail:** Antes de cerrar tarea → `npm run typecheck` y `npm run test`.
5. **Commit al cerrar:** Al terminar un change, una Feature/US entregable o un hito de harness (specs/skills/PRD), **crear commit git** en el repo. No acumular varias entregas sin commit. Mensaje en estilo del repo (qué/por qué); no push salvo que el usuario lo pida.
6. **Fuente de verdad:** PRD §3.4 + `openspec/specs/`. No inventar checkout, Imagen ni auth en MVP.
7. **OpenSpec first:** no implementar features de negocio sin spec (o change con `skip_specs` justificado solo para tooling puro).
