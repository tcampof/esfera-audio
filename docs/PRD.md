# PRD — Esfera Audio (Nueva App Hi-Fi)

**Versión:** 0.3 (decisiones D1–D6 cerradas)  
**Fuente:** inspección de https://www.esfera-audio.com/ (ePages / StoreES)  
**Fecha:** 2026-10-19  
**Stack objetivo (AGENTS.md):** React + TypeScript + Vite + Tailwind + shadcn/ui  
**Modo:** práctica Harness Engineering / SDD (máster); candidato a propuesta comercial a Esfera Audio si el MVP es defendible.  
**Backlog Azure Boards:** org `tcampo` · proyecto [EsferaAudio](https://dev.azure.com/tcampo/EsferaAudio) (Epic #12 + Features F0–F5 + User Stories).  
**OpenSpec:** `openspec/specs/` (contrato vivo) · changes en `openspec/changes/` · mapa en `docs/backlog-map.md`.  
> Nota: no fue posible crear la organización Azure DevOps `EsferaAudio` (Microsoft exige suscripción Azure Owner/Contributor). Se usó proyecto homónimo bajo `https://dev.azure.com/tcampo`.  

---

## 1. Visión del producto

Esfera Audio es una tienda física y online de A Coruña especializada en **alta fidelidad, cine en casa, audio distribuido e imagen**. La web actual es un catálogo e-commerce clásico (plataforma ePages) con diseño legacy de 3 columnas. La nueva app debe ser una experiencia **premium, oscura y elegante** centrada en **catálogo completo de audio + solicitud de presupuesto / reserva de cita** (sin checkout online en el MVP).

### Posicionamiento (copy actual a preservar en espíritu)

> Empresa situada en A Coruña dedicada a Proyectos Audiovisuales, Asesoramiento e Integración en Sistemas de Alta Fidelidad, Cine en Casa y Audio Distribuido en el Hogar. Selección de tecnología en busca de emociones humanas: autenticidad, claridad y emoción.

### Datos de negocio verificados

| Campo | Valor |
| --- | --- |
| Razón social | Esfera Audio S.L. |
| CIF | B-15996507 |
| Dirección (contacto) | Paseo Ronda, 33 Bajo (Ciudad Jardín, Riazor), 15011 A Coruña |
| Tel. fijo | 981 141 092 |
| Móvil | 622 432 433 |
| Email | info@esfera-audio.com |
| Horario | Lun–Vie 09:00–13:30 / 16:30–19:30 · Sáb–Dom cerrado |
| Pagos actuales | Transferencia bancaria · Tarjeta (Redsys) |
| Envío | 48/72 h · Portes gratis ≥ 150 € · IVA incluido en precio mostrado |
| Marcas destacadas en home | DALI (distribuidor oficial / garantía 10 años), LOEWE, Bluesound, Audiolab, Naim, Wharfedale… |

---

## 2. Auditoría del sitio actual (as-is)

### 2.1 Plataforma y UX

- Motor: **ePages StoreES** (`/epages/ea1415.sf/…`).
- Layout fijo 3 columnas: menú lateral + contenido + cesta/banners.
- UI densa, tipografía genérica, poco responsive; hay “Vista móvil” aparte.
- Cookies banner, impresión de páginas, sellos SSL / awards en sidebar.
- Home mezcla claim de marca + banners de promoción (DALI EQUI, Audiolab, etc.).

### 2.2 Navegación principal (categorías de 1er nivel)

Orden observado en menú:

1. Contacto / Política de privacidad (contenido legal mezclado con catálogo)
2. **Novedades**
3. **Promociones**
4. **Imagen** (TV, proyectores, pantallas)
5. **Auriculares – DAP**
6. **Sonido analógico** (vinilo)
7. **Sonido digital** (CD/SACD/DAC/streaming)
8. **Amplificadores**
9. **Altavoces**
10. **Cables – Accesorios – Red**
11. **Muebles y soportes**
12. **Project Design Box** (servicios / proyectos)
13. **Sonos Sistema**
14. **Equipos compactos**
15. **Ofertas exposición**
16. **Conjuntos audio**

Búsqueda: “Asistente de búsqueda” + filtros por fabricante (FacetedSearch).

### 2.3 Taxonomía de catálogo (detalle)

#### Altavoces
Activos · Estantería · Suelo · Canal central · Traseros · Satélites AV · Empotrables · Exteriores · WiFi/Bluetooth/Multiroom · Barras de sonido · Sistemas A/V · Subwoofers · Accesorios

#### Amplificadores y etapas
Integrados · Preamp estéreo · Etapas estéreo/mono · Preamp AV · Procesadores AV · Receptores AV · Etapas multicanal AV · Amp auriculares · Conjuntos · Accesorios

#### Sonido analógico – Vinilo
Giradiscos · Brazos · Cápsulas MM/MC/Mono · Previos phono · Cables phono · Limpiadiscos · Accesorios · Portacápsulas · Repuestos agujas · Receptores FM/AM/DAB

#### Sonido digital
DAC · Lectores CD/SACD · Transporte · Servidores de música · Network/streaming · Blu-ray · Corrector acústico digital · Reproductor multimedia · Accesorios

#### Auriculares – DAP
Hi-Fi/High End · Inalámbricos · Intraurales · Portátiles · ANC · Con micrófono · Amp auriculares · Audio portátil · Accesorios

#### Cables / Red / Accesorios
Altavoz · RCA/XLR analógico · Digital RCA/XLR · Coaxial · Óptico · USB · HDMI · Subwoofer · Cables red · Giradiscos · Regletas · Acondicionadores · Absorbentes · Accesorios HDMI

#### Imagen
Pantallas TV · Proyectores · Pantallas proyección (manuales/motorizadas/fijas/tensionadas/curvas/acústicas/empotrar) · Reproductor multimedia · Soportes proyector · Accesorios

#### Muebles y soportes
Muebles Hi-Fi/AV · Soportes altavoz · Soportes TV · Sillones relax home cinema

### 2.4 Ficha de producto (patrón observado)

Ejemplo auditado: **VULKKANO A5 ARC MKII** (189,00 €).

| Elemento | Comportamiento actual |
| --- | --- |
| Breadcrumbs | Inicio › Categoría › Subcategoría › Producto |
| Galería | Imagen principal + thumbnails |
| Precio | Con IVA; mensajes de entrega y portes |
| Stock | “En existencias” / “No hay existencias” |
| Variantes | Select obligatorio (ej. ACABADO: NEGRO / BLANCO / WALNUT) |
| Cantidad | Stepper + / − |
| CTA | Añadir a la cesta |
| Secundarios | Recomendar · Hacer una pregunta · Imprimir · Valoraciones |
| Contenido | Descripción larga + bloque de **especificaciones técnicas** |
| Cross-sell | “También recomendamos” + categorías relacionadas |
| Fabricante | Facetas / búsqueda por marca |

### 2.5 Cuenta de cliente (verificado con login)

Área **Mi cuenta** incluye:

- Administrar datos personales  
- Direcciones de envío  
- Cambiar contraseña  
- Mis pedidos  
- Listas de la compra  
- Newsletters  
- Información adicional  
- Nº de cliente, grupo (“Clientes registrados”), modelo fiscal  

Registro: flujo “Regístrese como nuevo cliente”. Recuperación de contraseña disponible.

### 2.6 Checkout (verificado end-to-end hasta paso cesta)

Flujo en **4 pasos**:

1. **Cesta** — cantidades, cupón, forma de envío, forma de pago, comentarios  
2. **Dirección** — facturación y envío  
3. **Pedido** — confirmar y realizar  
4. **Redsys** — pago con tarjeta (si aplica)

Observaciones:

- Pago: Transferencia bancaria | Pago con tarjeta (Redsys).  
- Desglose: base imponible + IVA 21% + total.  
- Cupones: campo “Código de cupón”.  
- Guardar cesta / wishlist para continuar más adelante.  
- Variante obligatoria antes de añadir (sin acabado no entra en cesta).

### 2.7 Lo que la web actual NO resuelve bien (oportunidades)

- No hay experiencia de marca premium (hero, storytelling, showroom).  
- **Reserva de cita / demo en tienda** no es un flujo de primer nivel (solo contacto).  
- Catálogo mezclado con páginas legales en el mismo menú.  
- Proyecto / integración (Project Design Box) poco destacado como servicio.  
- UX móvil y rendimiento por debajo del estándar actual.  
- Sin filtrado moderno (precio, specs, disponibilidad) de calidad.  
- Sin configurador de sistemas Hi-Fi / home cinema.

---

## 3. Producto objetivo (to-be)

### 3.1 Objetivos

1. Sustituir la tienda ePages por una web **premium** alineada con el sector Hi-Fi.  
2. Exponer el **catálogo completo de audio** (sin categoría Imagen en v1) con precios y ficha rica.  
3. Convertir interés en lead: **solicitud de presupuesto** y **reserva de cita** (demo / proyecto).  
4. Tipado estricto y formularios validados (Zod) — ver `AGENTS.md`.  
5. Permitir que un **agente de Cursor** construya la app por fases usando este PRD + `AGENTS.md`.

### 3.2 Personas

| Persona | Necesidad |
| --- | --- |
| Aficionado Hi-Fi | Explorar por categoría/marca/specs; pedir presupuesto o reservar demo |
| Cliente cine en casa | Paquetes A/V, barras, altavoces surround, integración (sin TV/proyectores en v1) |
| Cliente “todo en uno” | Sonos, equipos compactos, streaming |
| Cliente proyecto | Diseño de sala, audio multiroom, instalación → cita / presupuesto |
| Cliente recurrente | Volver al catálogo; reenviar presupuesto; contactar asesor |

### 3.3 Alcance MVP (cerrado)

**Incluir**

- Home de marca (hero + claim + CTA cita + CTA catálogo)  
- **Catálogo completo de audio** (todas las categorías del árbol auditado **excepto Imagen**)  
- Listado con filtros: categoría, marca, precio, stock  
- Ficha producto: galería, variantes, specs tipadas, stock  
- CTAs de producto: **Añadir a presupuesto** + **Reservar demo**  
- **Selección / presupuesto**: lista de productos (con variante) → formulario solicitar presupuesto (Zod)  
- Contacto + **Reserva de cita** (form Zod)  
- Páginas legales (privacidad, condiciones, derecho de retirada)  
- Búsqueda por texto  

**Excluir explícitamente del MVP**

- Categoría **Imagen** (TV, proyectores, pantallas de proyección y accesorios de imagen)  
- Checkout online, pasarela de pago, carrito de compra transaccional  
- Auth / Mi cuenta / historial de pedidos (diferido; leads van por formulario)

**Fuera de MVP (fase 2+)**

- Checkout + pagos (Redsys / transferencia)  
- Categoría Imagen  
- Auth y cuenta de cliente  
- Configurador de sistemas / matching amp↔speakers  
- Wishlist sincronizada / listas avanzadas  
- Newsletters marketing automation  
- Comparador multiproducto  
- CMS completo para banners/promos  
- App admin de catálogo (import desde CSV/feed)

### 3.4 Decisiones de negocio

#### Cerradas

| # | Decisión | Resolución | Fecha |
| --- | --- | --- | --- |
| **D1** | Modelo comercial online | **Catálogo + presupuesto / cita** (sin checkout en MVP) | 2026-10-19 |
| **D2** | Alcance de catálogo | **Catálogo completo** (todas las categorías de audio del sitio actual) | 2026-10-19 |
| **D3** | Imagen (TV/proyectores) en v1 | **No** — fuera del MVP | 2026-10-19 |
| **D4** | Modelo de inventario | **Inventario en tiempo real** (stock por producto/variante desde fuente viva) | 2026-10-19 |
| **D5** | Pasarela (cuando haya checkout) | **Sí — Redsys + transferencia bancaria** | 2026-10-19 |
| **D6** | Multi-idioma | **Sí** — ES primario; app preparada para i18n (mínimo EN en roadmap) | 2026-10-19 |

**Modelo confirmado:** catálogo audio completo con stock en tiempo real → presupuesto / cita. Sin Imagen en MVP. Sin checkout en MVP; cuando exista, Redsys + transferencia. UI multi-idioma desde arquitectura.

---

## 4. Requisitos funcionales

### RF-01 Home
- Brand hero a full-bleed; un claim; un subtítulo; CTAs: Explorar catálogo / Reservar cita.  
- Sección marcas / novedades (sin clutter de stats).  
- Enlace a showroom / horario / ubicación.

### RF-02 Catálogo
- Árbol de categorías tipado (`Category`) — **audio completo; sin nodo Imagen**.  
- Incluye: Novedades, Promociones, Auriculares, Analógico, Digital, Amplificadores, Altavoces, Cables, Muebles, Project Design Box, Sonos, Compactos, Ofertas exposición, Conjuntos.  
- Grid/list responsive; badges: oferta, sin stock, novedad.  
- Filtros facetados: marca, rango precio, disponibilidad (**stock en tiempo real**).  
- Orden: relevancia, precio ↑↓, nombre.

### RF-03 Producto
- Entidad `Product` con variantes (`Variant`), specs (`Specification[]`), media, brand, stock en tiempo real.  
- Stock por variante desde API/fuente viva; UI no cachea disponibilidad como verdad estática.  
- Añadir a presupuesto solo con variante válida y stock > 0 (o permitir bajo pedido con aviso, según respuesta de inventario).  
- Bloque specs tabular; related products.  
- Acciones: añadir a presupuesto, reservar demo, preguntar / contactar.

### RF-03b Inventario en tiempo real (D4)
- Fuente de verdad de stock externa o backend (no hardcode en mocks de producción).  
- En listado/PDP: cantidad disponible o estado derivado (`in_stock` / `out_of_stock` / `backorder` / `showroom`) refrescado al cargar.  
- En selección de presupuesto: revalidar stock al enviar la solicitud.  
- Mock local solo en Fase 0–2 de desarrollo; contrato tipado listo para swap a API.

### RF-04 Selección y solicitud de presupuesto
- Persistencia local de la selección (guest).  
- Líneas con producto, variante, cantidad y precio orientativo.  
- Formulario Zod: nombre, email, teléfono, mensaje, preferencia de contacto; lista de ítems adjunta.  
- Confirmación UI + envío a `info@esfera-audio.com` (o API).  
- **No** hay pago ni checkout en MVP.  
- **Post-MVP (D5):** checkout con **Redsys (tarjeta) + transferencia bancaria**.

### RF-05 Reserva de cita
- Formulario: nombre, email, teléfono, fecha preferida, motivo (demo producto / proyecto / otro), mensaje; opcionalmente producto de interés desde PDP.  
- Validación Zod.  
- Confirmación UI + envío a `info@esfera-audio.com` (o API).

### RF-06 Contacto y legales
- Página contacto con datos de tienda.  
- Condiciones, privacidad, derecho de retirada.

### RF-07 Búsqueda
- Buscador global con resultados de productos y categorías (ámbito audio).

---

## 5. Modelo de datos (tipos — `src/types/hifi.ts`)

Contrato mínimo para el agente (sin `any`):

```ts
export type StockStatus = "in_stock" | "out_of_stock" | "backorder" | "showroom";
export type LocaleCode = "es" | "en"; // D6 — ampliar según necesidad

export interface Specification {
  label: string;
  value: string;
  unit?: string;
}

export interface ProductVariant {
  id: string;
  sku?: string;
  name: string; // e.g. "NEGRO"
  priceCents: number;
  /** Unidades disponibles desde inventario en tiempo real (D4). */
  stockQuantity: number;
  stockStatus: StockStatus;
  stockUpdatedAt?: string; // ISO timestamp de la última lectura
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  shortDescription: string;
  description: string;
  categoryIds: string[];
  images: string[];
  basePriceCents: number;
  compareAtPriceCents?: number;
  vatIncluded: boolean;
  /** Agregado o del variant por defecto; siempre preferir variant.stock* en UI. */
  stockStatus: StockStatus;
  variants: ProductVariant[];
  specifications: Specification[];
  relatedProductIds?: string[];
  featured?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  parentId: string | null;
  description?: string;
  sortOrder: number;
}
```

Precios en **céntimos** para evitar float. UI en EUR; locales `es` (default) + `en` (D6).

---

## 6. Requisitos no funcionales

- TypeScript estricto; cero `any`.  
- UI oscura/premium; tipografía expresiva (no Inter/Roboto por defecto).  
- Accesible: focus, contraste, labels.  
- Performance: LCP razonable en home y PDP; stock no debe bloquear el render inicial (skeleton / stale-while-revalidate OK).  
- SEO: titles/meta, URLs legibles por categoría/producto; rutas o prefijos i18n-ready.  
- **i18n (D6):** strings de UI vía diccionarios (no hardcode masivo); ES default; EN en roadmap cercano.  
- Guardrail: `npm run typecheck` y `npm run test` antes de cerrar tarea.

---

## 7. IA / Design system (constraints)

Alineado con reglas de frontend del proyecto:

- Primera viewport = una composición de marca, no dashboard.  
- Hero full-bleed; sin cards en hero; sin overlays tipo badge flotante.  
- Evitar looks genéricos IA (púrpura, cream+terracotta, broadsheet).  
- Oscuro elegante Hi-Fi: negros, grafito, acento metálico/ámbar contenido.  
- 2–3 motions intencionados (entrada hero, hover producto, transición página).

---

## 8. Plan de construcción para el agente

Orden sugerido de PRs / milestones:

| Fase | Entrega | Criterio de hecho |
| --- | --- | --- |
| 0 | Scaffold Vite+React+TS+Tailwind+shadcn; `hifi.ts`; i18n ES; mock stock | typecheck + test verdes |
| 1 | Layout shell (nav, footer, theme); Home | Visual brand test; CTAs catálogo + cita |
| 2 | Catálogo audio + filtros + PDP + contrato inventario | Stock por variante; sin Imagen |
| 3 | Selección + solicitud de presupuesto | Form Zod; revalidación de stock al enviar |
| 4 | Reserva de cita + Contacto | Forms Zod; enlace desde PDP |
| 5 | i18n EN + legales + SEO | Switcher idioma; Lighthouse smoke |
| 6 | Inventario real + import catálogo | Sustituir mocks por API/feed vivo |
| 7+ | Checkout (Redsys + transferencia) + Imagen + Auth | Post-MVP (D3/D5) |

Cada fase debe respetar `AGENTS.md` y este PRD. Si hay conflicto, **ganan las decisiones cerradas de §3.4**.

---

## 9. Evidencias de inspección

Capturas en `docs/inspection/`:

- `home.png` — home y layout legacy  
- `login.png` — identificación  
- `account.png` — sesión iniciada  
- `product.png` — PDP con variante  
- `cart-checkout.png` — paso 1 checkout  

Cuenta de prueba usada solo para auditoría de área privada (no almacenar credenciales en el repo).

---

## 10. Próximos pasos sugeridos

1. ~~Validar D1–D6~~ — **todas cerradas**.  
2. Definir proveedor/API de inventario en tiempo real (Fase 6; contrato desde Fase 0–2).  
3. Arrancar **Fase 0** del agente con este PRD + `AGENTS.md`.
