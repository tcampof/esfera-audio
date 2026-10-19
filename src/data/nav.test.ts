import { describe, expect, it } from "vitest";
import { getIntentions } from "@/data/intentions";
import { getPrimaryNavCategories } from "@/data/nav";

describe("getPrimaryNavCategories", () => {
  it("excludes Imagen / TV / projector categories from catalog category list", () => {
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

  it("keeps technical categories secondary — primary experience uses intentions", () => {
    expect(getIntentions().length).toBeLessThan(getPrimaryNavCategories().length);
  });
});
