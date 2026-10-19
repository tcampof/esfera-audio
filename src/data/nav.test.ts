import { describe, expect, it } from "vitest";
import { getPrimaryNavCategories } from "@/data/nav";

describe("getPrimaryNavCategories", () => {
  it("excludes Imagen / TV / projector categories from primary nav", () => {
    const nav = getPrimaryNavCategories();
    const forbidden = nav.some((category) => {
      const haystack = `${category.slug} ${category.name}`.toLowerCase();
      return (
        haystack.includes("imagen") ||
        haystack.includes("television") ||
        haystack.includes("televisión") ||
        haystack.includes("proyector")
      );
    });
    expect(forbidden).toBe(false);
    expect(nav.length).toBeGreaterThan(0);
  });
});
