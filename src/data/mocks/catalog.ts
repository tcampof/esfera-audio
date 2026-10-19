import type { Category, Product } from "@/types/hifi";

/** Catálogo mock de audio — sin categoría Imagen (D3). */
export const mockCategories: Category[] = [
  { id: "cat-novedades", slug: "novedades", name: "Novedades", parentId: null, sortOrder: 1 },
  { id: "cat-promociones", slug: "promociones", name: "Promociones", parentId: null, sortOrder: 2 },
  { id: "cat-auriculares", slug: "auriculares-dap", name: "Auriculares – DAP", parentId: null, sortOrder: 3 },
  { id: "cat-analogico", slug: "sonido-analogico", name: "Sonido analógico", parentId: null, sortOrder: 4 },
  { id: "cat-digital", slug: "sonido-digital", name: "Sonido digital", parentId: null, sortOrder: 5 },
  {
    id: "cat-amplificadores",
    slug: "amplificadores",
    name: "Amplificadores",
    parentId: null,
    description: "Integrados, previos y etapas",
    sortOrder: 6,
  },
  {
    id: "cat-altavoces",
    slug: "altavoces",
    name: "Altavoces",
    parentId: null,
    description: "Altavoces Hi-Fi y home cinema",
    sortOrder: 7,
  },
  {
    id: "cat-altavoces-activos",
    slug: "altavoces-activos",
    name: "Altavoces activos",
    parentId: "cat-altavoces",
    sortOrder: 1,
  },
  { id: "cat-cables", slug: "cables-accesorios", name: "Cables – Accesorios", parentId: null, sortOrder: 8 },
  { id: "cat-muebles", slug: "muebles-soportes", name: "Muebles y soportes", parentId: null, sortOrder: 9 },
  { id: "cat-project", slug: "project-design-box", name: "Project Design Box", parentId: null, sortOrder: 10 },
  { id: "cat-sonos", slug: "sonos-sistema", name: "Sonos Sistema", parentId: null, sortOrder: 11 },
  { id: "cat-compactos", slug: "equipos-compactos", name: "Equipos compactos", parentId: null, sortOrder: 12 },
  { id: "cat-exposicion", slug: "ofertas-exposicion", name: "Ofertas exposición", parentId: null, sortOrder: 13 },
  { id: "cat-conjuntos", slug: "conjuntos-audio", name: "Conjuntos audio", parentId: null, sortOrder: 14 },
];

export const mockProducts: Product[] = [
  {
    id: "prod-vulkkano-a5",
    slug: "vulkkano-a5-arc-mkii",
    name: "VULKKANO A5 ARC MKII",
    brand: "VULKKANO",
    shortDescription: "Altavoces activos 60W con Bluetooth y HDMI ARC.",
    description:
      "Altavoces activos 2 x 10W HF y 2 x 20W LF, Bluetooth. Respuesta 40 Hz - 20.000 Hz. Ideal como sistema compacto estéreo o 2.1 con subwoofer.",
    categoryIds: ["cat-altavoces-activos", "cat-altavoces", "cat-novedades"],
    images: [],
    basePriceCents: 18900,
    vatIncluded: true,
    stockStatus: "in_stock",
    featured: true,
    variants: [
      {
        id: "var-vulkkano-negro",
        sku: "VULK-A5-BLK",
        name: "NEGRO",
        priceCents: 18900,
        stockQuantity: 4,
        stockStatus: "in_stock",
        stockUpdatedAt: "2026-10-19T08:00:00.000Z",
      },
      {
        id: "var-vulkkano-blanco",
        sku: "VULK-A5-WHT",
        name: "BLANCO",
        priceCents: 18900,
        stockQuantity: 0,
        stockStatus: "out_of_stock",
        stockUpdatedAt: "2026-10-19T08:00:00.000Z",
      },
      {
        id: "var-vulkkano-walnut",
        sku: "VULK-A5-WAL",
        name: "WALNUT",
        priceCents: 18900,
        stockQuantity: 2,
        stockStatus: "in_stock",
        stockUpdatedAt: "2026-10-19T08:00:00.000Z",
      },
    ],
    specifications: [
      { label: "Potencia RMS", value: "60", unit: "W" },
      { label: "Respuesta", value: "40 Hz – 20 kHz" },
      { label: "Entradas", value: "Bluetooth, RCA, Óptica, USB-C, HDMI ARC" },
    ],
    relatedProductIds: ["prod-cambridge-axa35", "prod-regal-io"],
  },
  {
    id: "prod-cambridge-axa35",
    slug: "cambridge-audio-axa35",
    name: "CAMBRIDGE AUDIO AXA35",
    brand: "CAMBRIDGE AUDIO",
    shortDescription: "Amplificador integrado 2x35W con phono MM.",
    description: "Amplificador CAMBRIDGE AUDIO AXA35. 2x35W, 4 RCA, phono MM y control remoto.",
    categoryIds: ["cat-amplificadores", "cat-promociones"],
    images: [],
    basePriceCents: 42900,
    compareAtPriceCents: 45900,
    vatIncluded: true,
    stockStatus: "in_stock",
    variants: [
      {
        id: "var-axa35-default",
        sku: "CA-AXA35",
        name: "Estándar",
        priceCents: 42900,
        stockQuantity: 1,
        stockStatus: "in_stock",
        stockUpdatedAt: "2026-10-19T08:00:00.000Z",
      },
    ],
    specifications: [
      { label: "Potencia", value: "2 x 35", unit: "W" },
      { label: "Phono", value: "MM" },
    ],
    relatedProductIds: ["prod-vulkkano-a5"],
  },
  {
    id: "prod-regal-io",
    slug: "rega-io",
    name: "REGA IO",
    brand: "REGA",
    shortDescription: "Integrado compacto 30W x 2, fácil de configurar.",
    description: "Amplificador REGA IO. Integrado compacto de 30W x 2. Ideal con altavoces de estantería.",
    categoryIds: ["cat-amplificadores", "cat-novedades"],
    images: [],
    basePriceCents: 49900,
    vatIncluded: true,
    stockStatus: "out_of_stock",
    variants: [
      {
        id: "var-rega-io",
        sku: "REGA-IO",
        name: "Negro",
        priceCents: 49900,
        stockQuantity: 0,
        stockStatus: "out_of_stock",
        stockUpdatedAt: "2026-10-19T08:00:00.000Z",
      },
    ],
    specifications: [
      { label: "Potencia", value: "2 x 30", unit: "W" },
      { label: "Entradas", value: "2 x Line, 1 x MM phono" },
    ],
    relatedProductIds: ["prod-cambridge-axa35"],
  },
  {
    id: "prod-bluesound-pulse",
    slug: "bluesound-pulse-flex-2i",
    name: "BLUESOUND PULSE FLEX 2i",
    brand: "BLUESOUND",
    shortDescription: "Altavoz streaming Hi-Res MQA, DAC 32/192.",
    description: "Altavoz digital 25 W con streaming MQA y multiroom BluOS.",
    categoryIds: ["cat-altavoces-activos", "cat-altavoces", "cat-sonos"],
    images: [],
    basePriceCents: 29000,
    compareAtPriceCents: 32900,
    vatIncluded: true,
    stockStatus: "in_stock",
    featured: true,
    variants: [
      {
        id: "var-pulse-black",
        sku: "BS-FLEX-BK",
        name: "Negro",
        priceCents: 29000,
        stockQuantity: 5,
        stockStatus: "in_stock",
        stockUpdatedAt: "2026-10-19T08:00:00.000Z",
      },
      {
        id: "var-pulse-white",
        sku: "BS-FLEX-WH",
        name: "Blanco",
        priceCents: 29000,
        stockQuantity: 3,
        stockStatus: "in_stock",
        stockUpdatedAt: "2026-10-19T08:00:00.000Z",
      },
    ],
    specifications: [
      { label: "Potencia", value: "25", unit: "W" },
      { label: "DAC", value: "32 / 192" },
    ],
    relatedProductIds: ["prod-vulkkano-a5"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return mockProducts.find((product) => product.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return mockCategories.find((category) => category.slug === slug);
}
