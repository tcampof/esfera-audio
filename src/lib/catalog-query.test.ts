import { describe, expect, it } from "vitest";
import { filterProducts, searchCatalog } from "@/lib/catalog-query";

describe("filterProducts", () => {
  it("filters by brand", () => {
    const result = filterProducts({ brand: "REGA" });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((product) => product.brand === "REGA")).toBe(true);
  });

  it("hides out-of-stock when inStockOnly is set", () => {
    const result = filterProducts({ inStockOnly: true });
    expect(result.every((product) => product.variants.some((v) => v.stockQuantity > 0))).toBe(
      true,
    );
    expect(result.some((product) => product.slug === "rega-io")).toBe(false);
  });
});

describe("searchCatalog", () => {
  it("finds products by brand query", () => {
    const { products } = searchCatalog("bluesound");
    expect(products.some((product) => product.brand === "BLUESOUND")).toBe(true);
  });

  it("returns empty products for unknown query", () => {
    const { products, categories } = searchCatalog("zzzz-no-match");
    expect(products).toHaveLength(0);
    expect(categories).toHaveLength(0);
  });
});
