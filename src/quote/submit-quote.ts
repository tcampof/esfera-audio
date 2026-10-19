import { getProductById } from "@/data/mocks/catalog";
import { inventory } from "@/inventory/mock-inventory";
import type { QuoteRequestInput } from "@/quote/quote-schema";
import {
  clearQuoteLines,
  getQuoteLines,
  type QuoteLine,
} from "@/quote/quote-store";

export interface QuoteSubmitPayload extends QuoteRequestInput {
  lines: Array<{
    productId: string;
    productName: string;
    variantId: string;
    variantName: string;
    quantity: number;
    unitPriceCents: number;
    lineTotalCents: number;
  }>;
  submittedAt: string;
}

export type StockFailure = {
  variantId: string;
  reason: "out_of_stock" | "exceeds_stock" | "unknown";
};

export type RevalidateResult =
  | { ok: true; lines: QuoteLine[] }
  | { ok: false; failures: StockFailure[] };

export type SubmitQuoteResult =
  | { ok: true; payload: QuoteSubmitPayload }
  | { ok: false; code: "empty" }
  | { ok: false; code: "stock"; failures: StockFailure[] };

export async function revalidateQuoteStock(lines: QuoteLine[]): Promise<RevalidateResult> {
  const failures: StockFailure[] = [];

  for (const line of lines) {
    const product = getProductById(line.productId);
    const variant = product?.variants.find((item) => item.id === line.variantId);
    if (!product || !variant) {
      failures.push({ variantId: line.variantId, reason: "unknown" });
      continue;
    }

    const stock = await inventory.getStock(line.variantId);
    if (stock.stockQuantity <= 0 || stock.stockStatus === "out_of_stock") {
      failures.push({ variantId: line.variantId, reason: "out_of_stock" });
      continue;
    }
    if (line.quantity > stock.stockQuantity) {
      failures.push({ variantId: line.variantId, reason: "exceeds_stock" });
    }
  }

  if (failures.length > 0) {
    return { ok: false, failures };
  }
  return { ok: true, lines };
}

/** Stub de entrega: sin pago. Persiste payload para inspección y limpia la cesta. */
export async function submitQuoteRequest(input: QuoteRequestInput): Promise<SubmitQuoteResult> {
  const lines = getQuoteLines();
  if (lines.length === 0) {
    return { ok: false, code: "empty" };
  }

  const stockCheck = await revalidateQuoteStock(lines);
  if (!stockCheck.ok) {
    return { ok: false, code: "stock", failures: stockCheck.failures };
  }

  const enriched = lines.map((line) => {
    const product = getProductById(line.productId);
    const variant = product?.variants.find((item) => item.id === line.variantId);
    if (!product || !variant) {
      throw new Error(`Missing catalog row for ${line.productId}/${line.variantId}`);
    }
    return {
      productId: line.productId,
      productName: product.name,
      variantId: line.variantId,
      variantName: variant.name,
      quantity: line.quantity,
      unitPriceCents: variant.priceCents,
      lineTotalCents: variant.priceCents * line.quantity,
    };
  });

  const payload: QuoteSubmitPayload = {
    ...input,
    lines: enriched,
    submittedAt: new Date().toISOString(),
  };

  if (typeof sessionStorage !== "undefined") {
    sessionStorage.setItem("esfera.lastQuoteRequest", JSON.stringify(payload));
  }
  console.info("[esfera] quote request stub", payload);

  clearQuoteLines();
  return { ok: true, payload };
}
