import { describe, expect, it } from "vitest";
import { getIntentionById, getIntentions, intentionCatalogPath } from "@/data/intentions";

describe("intentions", () => {
  it("exposes a small primary set without dumping the full category tree", () => {
    const list = getIntentions();
    expect(list.length).toBeGreaterThanOrEqual(4);
    expect(list.length).toBeLessThanOrEqual(6);
    expect(list.every((item) => item.categorySlugs.length > 0)).toBe(true);
  });

  it("resolves known intention ids for catalog deep-links", () => {
    expect(getIntentionById("vinyl")?.id).toBe("vinyl");
    expect(intentionCatalogPath("stereo")).toBe("/catalogo?intention=stereo");
  });
});
