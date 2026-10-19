import { getProductById } from "@/data/mocks/catalog";

const STORAGE_KEY = "esfera.quote.v1";

export interface QuoteLine {
  productId: string;
  variantId: string;
  quantity: number;
}

/** Fallback when `localStorage` is unavailable (e.g. Vitest node). */
let memoryLines: QuoteLine[] = [];

export interface AddQuoteLineInput {
  productId: string;
  variantId: string;
  quantity?: number;
}

export type AddQuoteLineResult =
  | { ok: true; lines: QuoteLine[] }
  | { ok: false; reason: "missing_variant" | "out_of_stock" | "unknown_product" };

function readLines(): QuoteLine[] {
  if (typeof localStorage === "undefined") {
    return memoryLines.map((line) => ({ ...line }));
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((item): item is QuoteLine => {
      if (typeof item !== "object" || item === null) {
        return false;
      }
      const row = item as Record<string, unknown>;
      return (
        typeof row.productId === "string" &&
        typeof row.variantId === "string" &&
        typeof row.quantity === "number"
      );
    });
  } catch {
    return [];
  }
}

function writeLines(lines: QuoteLine[]): void {
  memoryLines = lines.map((line) => ({ ...line }));
  if (typeof localStorage === "undefined") {
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
}

export function clearQuoteLinesForTests(): void {
  memoryLines = [];
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function getQuoteLines(): QuoteLine[] {
  return readLines();
}

export function getQuoteItemCount(): number {
  return readLines().reduce((sum, line) => sum + line.quantity, 0);
}

export function addQuoteLine(input: AddQuoteLineInput): AddQuoteLineResult {
  const product = getProductById(input.productId);
  if (!product) {
    return { ok: false, reason: "unknown_product" };
  }

  const variant = product.variants.find((item) => item.id === input.variantId);
  if (!variant) {
    return { ok: false, reason: "missing_variant" };
  }

  if (variant.stockQuantity <= 0 || variant.stockStatus === "out_of_stock") {
    return { ok: false, reason: "out_of_stock" };
  }

  const quantity = input.quantity ?? 1;
  const lines = readLines();
  const existing = lines.find(
    (line) => line.productId === input.productId && line.variantId === input.variantId,
  );
  if (existing) {
    existing.quantity += quantity;
  } else {
    lines.push({
      productId: input.productId,
      variantId: input.variantId,
      quantity,
    });
  }
  writeLines(lines);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("esfera-quote-changed"));
  }
  return { ok: true, lines };
}
