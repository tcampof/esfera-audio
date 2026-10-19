import { describe, expect, it } from "vitest";
import { MockInventoryAdapter } from "@/inventory/mock-inventory";

describe("MockInventoryAdapter", () => {
  const inventory = new MockInventoryAdapter();

  it("returns in_stock when quantity is greater than zero", async () => {
    const stock = await inventory.getStock("var-vulkkano-negro");
    expect(stock.stockQuantity).toBeGreaterThan(0);
    expect(stock.stockStatus).toBe("in_stock");
  });

  it("returns out_of_stock when quantity is zero", async () => {
    const stock = await inventory.getStock("var-vulkkano-blanco");
    expect(stock.stockQuantity).toBe(0);
    expect(stock.stockStatus).toBe("out_of_stock");
  });

  it("returns out_of_stock for unknown variant ids", async () => {
    const stock = await inventory.getStock("var-does-not-exist");
    expect(stock.stockQuantity).toBe(0);
    expect(stock.stockStatus).toBe("out_of_stock");
  });
});
