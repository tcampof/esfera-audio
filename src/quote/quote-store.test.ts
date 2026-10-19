import { beforeEach, describe, expect, it } from "vitest";
import { addQuoteLine, clearQuoteLinesForTests, getQuoteItemCount } from "@/quote/quote-store";

describe("addQuoteLine", () => {
  beforeEach(() => {
    clearQuoteLinesForTests();
  });

  it("requires a known variant", () => {
    const result = addQuoteLine({ productId: "prod-vulkkano-a5", variantId: "missing" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("missing_variant");
    }
  });

  it("rejects out-of-stock variants", () => {
    const result = addQuoteLine({
      productId: "prod-vulkkano-a5",
      variantId: "var-vulkkano-blanco",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("out_of_stock");
    }
  });

  it("adds in-stock variants", () => {
    const result = addQuoteLine({
      productId: "prod-vulkkano-a5",
      variantId: "var-vulkkano-negro",
    });
    expect(result.ok).toBe(true);
    expect(getQuoteItemCount()).toBe(1);
  });
});
