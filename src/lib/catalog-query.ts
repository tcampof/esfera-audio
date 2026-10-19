import { getIntentionById } from "@/data/intentions";
import { mockCategories, mockProducts } from "@/data/mocks/catalog";
import type { Product, StockStatus } from "@/types/hifi";

export interface CatalogFilters {
  categorySlug?: string;
  /** Intention id from docs/ux-ia (stereo, vinyl, …). */
  intentionId?: string;
  brand?: string;
  minPriceCents?: number;
  maxPriceCents?: number;
  inStockOnly?: boolean;
}

function categoryIdsForSlug(slug: string): Set<string> {
  const category = mockCategories.find((item) => item.slug === slug);
  const allowedIds = new Set<string>();
  if (!category) {
    return allowedIds;
  }
  allowedIds.add(category.id);
  for (const child of mockCategories) {
    if (child.parentId === category.id) {
      allowedIds.add(child.id);
    }
  }
  return allowedIds;
}

function categoryIdsForIntention(intentionId: string): Set<string> {
  const intention = getIntentionById(intentionId);
  const allowedIds = new Set<string>();
  if (!intention) {
    return allowedIds;
  }
  for (const slug of intention.categorySlugs) {
    for (const id of categoryIdsForSlug(slug)) {
      allowedIds.add(id);
    }
  }
  return allowedIds;
}

export function getUniqueBrands(): string[] {
  return [...new Set(mockProducts.map((product) => product.brand))].sort((a, b) =>
    a.localeCompare(b, "es"),
  );
}

export function filterProducts(filters: CatalogFilters): Product[] {
  return mockProducts.filter((product) => {
    if (filters.intentionId) {
      const allowedIds = categoryIdsForIntention(filters.intentionId);
      if (allowedIds.size === 0 || !product.categoryIds.some((id) => allowedIds.has(id))) {
        return false;
      }
    } else if (filters.categorySlug) {
      const allowedIds = categoryIdsForSlug(filters.categorySlug);
      if (allowedIds.size === 0 || !product.categoryIds.some((id) => allowedIds.has(id))) {
        return false;
      }
    }

    if (filters.brand && product.brand !== filters.brand) {
      return false;
    }

    if (filters.minPriceCents !== undefined && product.basePriceCents < filters.minPriceCents) {
      return false;
    }

    if (filters.maxPriceCents !== undefined && product.basePriceCents > filters.maxPriceCents) {
      return false;
    }

    if (filters.inStockOnly) {
      const hasStock = product.variants.some(
        (variant) => variant.stockQuantity > 0 && variant.stockStatus !== "out_of_stock",
      );
      if (!hasStock) {
        return false;
      }
    }

    return true;
  });
}

export function searchCatalog(query: string): {
  products: Product[];
  categories: typeof mockCategories;
} {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return { products: [], categories: [] };
  }

  const products = mockProducts.filter((product) => {
    const haystack = `${product.name} ${product.brand} ${product.shortDescription}`.toLowerCase();
    return haystack.includes(normalized);
  });

  const categories = mockCategories.filter((category) => {
    const haystack = `${category.name} ${category.slug}`.toLowerCase();
    return haystack.includes(normalized) && !haystack.includes("imagen");
  });

  return { products, categories };
}

export function stockBadgeLabel(status: StockStatus): string {
  switch (status) {
    case "in_stock":
      return "En stock";
    case "out_of_stock":
      return "Sin stock";
    case "backorder":
      return "Bajo pedido";
    case "showroom":
      return "Exposición";
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}
