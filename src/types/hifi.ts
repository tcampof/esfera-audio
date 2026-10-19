export type StockStatus = "in_stock" | "out_of_stock" | "backorder" | "showroom";
export type LocaleCode = "es" | "en";

export interface Specification {
  label: string;
  value: string;
  unit?: string;
}

export interface ProductVariant {
  id: string;
  sku?: string;
  name: string;
  priceCents: number;
  /** Unidades disponibles desde inventario en tiempo real (D4). */
  stockQuantity: number;
  stockStatus: StockStatus;
  stockUpdatedAt?: string;
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
  /** Agregado o del variant por defecto; preferir variant.stock* en UI. */
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
