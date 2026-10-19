import { mockCategories, mockProducts } from "@/data/mocks/catalog";
import type { Product, StockStatus } from "@/types/hifi";

export interface CatalogFilters {
  categorySlug?: string;
  brand?: string;
  minPriceCents?: number;
  maxPriceCents?: number;
  inStockOnly?: boolean;
}

export function getUniqueBrands(): string[] {
  return [...new Set(mockProducts.map((product) => product.brand))].sort((a, b) =>
    a.localeCompare(b, "es"),
  );
}

export function filterProducts(filters: CatalogFilters): Product[] {
  return mockProducts.filter((product) => {
    if (filters.categorySlug) {
      const category = mockCategories.find((item) => item.slug === filters.categorySlug);
      if (!category) {
        return false;
      }
      const allowedIds = new Set<string>([category.id]);
      for (const child of mockCategories) {
        if (child.parentId === category.id) {
          allowedIds.add(child.id);
        }
      }
      if (!product.categoryIds.some((id) => allowedIds.has(id))) {
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
