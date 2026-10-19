import type { StockStatus } from "@/types/hifi";

export interface StockSnapshot {
  variantId: string;
  stockQuantity: number;
  stockStatus: StockStatus;
  stockUpdatedAt?: string;
}

/** Contrato de inventario en tiempo real (mock hoy → API viva en Fase 6). */
export interface InventoryPort {
  getStock(variantId: string): Promise<StockSnapshot>;
}
