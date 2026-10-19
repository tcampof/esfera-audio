# UX / IA — Esfera Audio (propuesta moderna)

**Estado:** propuesta de producto (aprobar antes de implementar).  
**Azure:** Feature **AB#32** · US **AB#33**  
**Spec:** `openspec/specs/ux-ia/spec.md`  
**Change:** `openspec/changes/ux-modern-ia`  
**Cuándo implementar:** tras merge de este PR, **antes de F4** (cita/contacto), para no consolidar el patrón “listado legacy”.

---

## 1. Diagnóstico

### Qué ya funciona (mantener)
- Look & feel premium oscuro (tipografía Cormorant/Manrope, acento metálico).
- Marca fuerte en Home (hero full-bleed).
- Modelo comercial correcto: catálogo → presupuesto / cita (sin checkout).

### Qué se siente “legacy” (cambiar)
La web actual de Esfera (ePages) y, en parte, nuestro MVP F1–F3, comparten la misma **lógica de interacción**:

| Patrón legacy | Efecto |
| --- | --- |
| Menú = árbol completo de categorías | Parálisis; parece inventario de almacén |
| Listado + sidebar de filtros como eje | “Tienda genérica 2010”, no asesoría Hi-Fi |
| PDP = ficha densa (todo al mismo nivel) | Decisión (presupuesto/demo) se diluye |
| Presupuesto = carrito al final | Sensación de e-commerce sin pago = frustración |
| Misma estructura en móvil | Desktop encogido, no journey móvil |

**Conclusión:** el diseño visual ya es moderno; la **arquitectura de información (IA) y los journeys** aún imitan el legacy. Hay que separar *look* de *experience*.

---

## 2. Principios de experiencia

1. **Asesoría primero, inventario después** — la web guía; el catálogo profundo es secundario.
2. **Una intención por pantalla** — no dashboard ni “todo el menú visible”.
3. **Decisión visible** — en PDP, presupuesto/demo ganan a la especificación técnica.
4. **Progreso perceptible** — el visitante sabe en qué paso está (explorar → elegir → pedir ayuda).
5. **Mobile = journey propio** — no versión reducida del árbol ePages.
6. **Sin checkout** — el clímax es *hablar con Esfera*, no pagar.

---

## 3. Modelo de navegación (IA)

### Sustituir
- Nav primaria = lista larga de categorías de producto.

### Proponer — dos capas

**Capa A — Intenciones (primary)**  
Entradas cortas orientadas a necesidad:

| Intención | Ejemplos de landing |
| --- | --- |
| Escuchar música (estéreo) | Sets / guías + productos destacados |
| Cine en casa | Barras, paquetes A/V, amp AV |
| Vinilo | Giradiscos, phono, cuidado |
| Toda la casa (multiroom) | Streaming, Sonos/Bluesound |
| Proyectos / instalación | Project Design Box → cita |
| Catálogo completo | Entrada secundaria “Ver todo el catálogo” |

**Capa B — Catálogo técnico (secondary)**  
Árbol Altavoces / Amplificadores / … (como hoy) **solo** dentro de “Catálogo” o tras una intención. Sin Imagen (D3).

**Header mínimo (siempre)**  
Logo · Explorar (intenciones o catálogo) · Buscar · Presupuesto (count) · Reservar cita  

No mostrar 14 categorías en desktop como nav principal.

---

## 4. Journeys objetivo

### J1 — Descubrir → enamorar → CTA
`Home` → intención o destacado → PDP ligera → **Presupuesto** o **Cita**

### J2 — Sé lo que quiero
`Buscar` / Catálogo filtrado → PDP → Presupuesto

### J3 — Quiero que me ayuden
`Home` o PDP → **Reservar cita** (motivo + producto opcional) → confirmación

### J4 — Armar sistema
Varios PDP → Presupuesto (líneas) → formulario Zod → confirmación (sin pago)

---

## 5. Pantallas — propuesta vs F1–F3 actual

### Home
**Hoy:** hero + nav de categorías.  
**Propuesta:**
- Hero marca (igual de fuerte).
- Debajo: **4–6 intenciones** como destinos (no cards de producto en el primer viewport).
- Una franja editorial “Novedades / en sala” (poca densidad).
- CTAs: Explorar · Reservar cita (ya existen).

### Catálogo
**Hoy:** sidebar filtros + grid (patrón ePages).  
**Propuesta:**
- Entrada por **intención** o “Catálogo completo”.
- Grid editorial (más aire, menos “tabla de almacén”).
- Filtros en **sheet/drawer** o barra compacta (no sidebar eternamente visible en desktop).
- Empty states humanos (“¿Buscas vinilo? Prueba esta intención”).

### PDP
**Hoy:** ficha completa en un bloque.  
**Propuesta — dos actos:**
1. **Acto decisión:** marca, nombre, precio, variante, stock, CTAs Presupuesto + Demo.
2. **Acto confianza:** descripción, specs colapsables/tabular, relacionados.
- Relacionados = “completa tu sistema”, no solo cross-sell genérico.

### Presupuesto
**Hoy:** lista + form (correcto funcionalmente; tono carrito).  
**Propuesta:**
- Framing: **“Tu selección para asesorar”**, no “cesta”.
- Stepper visual: Selección → Datos → Enviado.
- Resumen de líneas + total orientativo + copy explícito “sin pago online”.

### Cita (F4, alinear ya)
- Misma familia visual que presupuesto.
- Motivos claros (demo producto / proyecto / otro).
- Prefill desde PDP.

### Búsqueda
- Mantener global en header.
- Resultados agrupados: Intenciones/categorías · Productos.
- Empty state con atajos a intenciones.

---

## 6. Anti-patrones (no volver a)

- Menú horizontal con todo el árbol de categorías.
- Tres columnas tipo ePages (menú | contenido | cesta/banners).
- Badges/promos flotando sobre el hero.
- Checkout, cupones de pago, Redsys en MVP.
- Categoría Imagen en v1.
- Auth obligatoria para pedir presupuesto.

---

## 7. Criterios de aceptación (producto)

- [ ] Un visitante entiende en &lt;5 s que puede **pedir presupuesto o cita**, no comprar online.
- [ ] La nav primaria **no** es el árbol completo de categorías.
- [ ] Existe camino **intención → producto → presupuesto/cita**.
- [ ] Catálogo técnico sigue accesible (D2: catálogo completo audio).
- [ ] Mobile no depende del menú de 14 ítems.
- [ ] Look actual (oscuro, tipografía) se preserva; cambia la IA.

---

## 8. Plan de implementación (después de aprobar este doc)

| Paso | Qué |
| --- | --- |
| 1 | Merge PR de esta propuesta |
| 2 | Change apply `ux-modern-ia` (o hijo): Home intenciones, nav, catálogo, PDP, copy presupuesto |
| 3 | Luego **F4** cita/contacto ya sobre la nueva IA |
| 4 | F5 legales/i18n EN |

No implementar F4 encima del patrón listado-legacy actual.
