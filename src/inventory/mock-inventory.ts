import { mockProducts } from "@/data/mocks/catalog";
import type { StockStatus } from "@/types/hifi";
import type { InventoryPort, StockSnapshot } from "@/inventory/types";

function deriveStatus(quantity: number, declared: StockStatus): StockStatus {
  if (quantity <= 0 && declared !== "backorder" && declared !== "showroom") {
    return "out_of_stock";
  }
  if (quantity > 0 && declared === "out_of_stock") {
    return "in_stock";
  }
  return declared;
}

export class MockInventoryAdapter implements InventoryPort {
  async getStock(variantId: string): Promise<StockSnapshot> {
    for (const product of mockProducts) {
      const variant = product.variants.find((item) => item.id === variantId);
      if (!variant) {
        continue;
      }

      return {
        variantId: variant.id,
        stockQuantity: variant.stockQuantity,
        stockStatus: deriveStatus(variant.stockQuantity, variant.stockStatus),
        stockUpdatedAt: variant.stockUpdatedAt ?? new Date().toISOString(),
      };
    }

    return {
      variantId,
      stockQuantity: 0,
      stockStatus: "out_of_stock",
      stockUpdatedAt: new Date().toISOString(),
    };
  }
}

export const inventory: InventoryPort = new MockInventoryAdapter();
