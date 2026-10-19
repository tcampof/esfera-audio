# Design

## Decisions

1. **zod** + validación en submit (estado de errores por campo).
2. Preferencia de contacto: `email` | `phone` | `whatsapp`.
3. `updateQuoteLineQuantity` / `removeQuoteLine`; cap por `stockQuantity` del variant.
4. Al submit: `Promise.all` `inventory.getStock` por línea; si alguna falla → bloquear con detalle.
5. Stub: `submitQuoteRequest` escribe en `sessionStorage` + `console.info` (sustituible por API).
6. Tras éxito: limpiar quote store y mostrar pantalla de confirmación.

## Non-Goals

Checkout, email real SMTP, auth.
