import { mockCategories } from "@/data/mocks/catalog";
import type { Category } from "@/types/hifi";

function isImagenCategory(category: Category): boolean {
  const haystack = `${category.slug} ${category.name}`.toLowerCase();
  return (
    haystack.includes("imagen") ||
    haystack.includes("television") ||
    haystack.includes("televisión") ||
    haystack.includes("proyector")
  );
}

/** Categorías de primer nivel para nav MVP (sin Imagen). */
export function getPrimaryNavCategories(): Category[] {
  return mockCategories
    .filter((category) => category.parentId === null)
    .filter((category) => !isImagenCategory(category))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
