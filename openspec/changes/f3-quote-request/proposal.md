# Proposal

## Why

F2 deja líneas en localStorage pero sin solicitud formal. US #26–#27 exigen editar cantidades y enviar presupuesto con Zod, sin checkout.

Azure: Feature **F3** (#16) · US **#26** · **#27**.

## What Changes

- Editar/eliminar cantidades en `/presupuesto` (respetando stock disponible)
- Formulario Zod: nombre, email, teléfono, mensaje, preferencia de contacto + líneas
- Revalidación de stock al enviar; confirmación UI; stub de envío (console/log local, sin pago)
- Sin pasos Redsys ni métodos de pago

## Capabilities

### New Capabilities
- _(ninguna — `skip_specs: true`)_

### Modified Capabilities
- _(ninguna)_

## Impact

- Depende de `quote-store` e `InventoryPort`
- Fuera: cita F4, legales F5, checkout/auth/Imagen
