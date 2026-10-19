import type { Category, Product } from "@/types/hifi";

/** Catálogo mock de audio — sin categoría Imagen (D3). */
export const mockCategories: Category[] = [
  {
    id: "cat-altavoces",
    slug: "altavoces",
    name: "Altavoces",
    parentId: null,
    description: "Altavoces Hi-Fi y home cinema",
    sortOrder: 1,
  },
  {
    id: "cat-altavoces-activos",
    slug: "altavoces-activos",
    name: "Altavoces activos",
    parentId: "cat-altavoces",
    sortOrder: 1,
  },
  {
    id: "cat-amplificadores",
    slug: "amplificadores",
    name: "Amplificadores",
    parentId: null,
    description: "Integrados, previos y etapas",
    sortOrder: 2,
  },
];

export const mockProducts: Product[] = [
  {
    id: "prod-vulkkano-a5",
    slug: "vulkkano-a5-arc-mkii",
    name: "VULKKANO A5 ARC MKII",
    brand: "VULKKANO",
    shortDescription: "Altavoces activos 60W con Bluetooth y HDMI ARC.",
    description:
      "Altavoces activos 2 x 10W HF y 2 x 20W LF, Bluetooth. Respuesta 40 Hz - 20.000 Hz.",
    categoryIds: ["cat-altavoces-activos"],
    images: ["/placeholders/speaker.svg"],
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
    relatedProductIds: ["prod-cambridge-axa35"],
  },
  {
    id: "prod-cambridge-axa35",
    slug: "cambridge-audio-axa35",
    name: "CAMBRIDGE AUDIO AXA35",
    brand: "CAMBRIDGE AUDIO",
    shortDescription: "Amplificador integrado 2x35W con phono MM.",
    description: "Amplificador CAMBRIDGE AUDIO AXA35. 2x35W, 4 RCA, phono MM.",
    categoryIds: ["cat-amplificadores"],
    images: ["/placeholders/amp.svg"],
    basePriceCents: 42900,
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
  },
];
