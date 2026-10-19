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
  | {
      ok: false;
      reason: "missing_variant" | "out_of_stock" | "unknown_product" | "exceeds_stock";
    };

function notifyChanged(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("esfera-quote-changed"));
  }
}

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
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }
  notifyChanged();
}

export function clearQuoteLinesForTests(): void {
  memoryLines = [];
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function clearQuoteLines(): void {
  writeLines([]);
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
  const nextQty = (existing?.quantity ?? 0) + quantity;
  if (nextQty > variant.stockQuantity) {
    return { ok: false, reason: "exceeds_stock" };
  }

  if (existing) {
    existing.quantity = nextQty;
  } else {
    lines.push({
      productId: input.productId,
      variantId: input.variantId,
      quantity,
    });
  }
  writeLines(lines);
  return { ok: true, lines };
}

export function updateQuoteLineQuantity(
  productId: string,
  variantId: string,
  quantity: number,
): AddQuoteLineResult {
  if (quantity <= 0) {
    removeQuoteLine(productId, variantId);
    return { ok: true, lines: readLines() };
  }

  const product = getProductById(productId);
  if (!product) {
    return { ok: false, reason: "unknown_product" };
  }
  const variant = product.variants.find((item) => item.id === variantId);
  if (!variant) {
    return { ok: false, reason: "missing_variant" };
  }
  if (variant.stockQuantity <= 0 || variant.stockStatus === "out_of_stock") {
    return { ok: false, reason: "out_of_stock" };
  }
  if (quantity > variant.stockQuantity) {
    return { ok: false, reason: "exceeds_stock" };
  }

  const lines = readLines();
  const existing = lines.find(
    (line) => line.productId === productId && line.variantId === variantId,
  );
  if (!existing) {
    return { ok: false, reason: "missing_variant" };
  }
  existing.quantity = quantity;
  writeLines(lines);
  return { ok: true, lines };
}

export function removeQuoteLine(productId: string, variantId: string): void {
  writeLines(
    readLines().filter(
      (line) => !(line.productId === productId && line.variantId === variantId),
    ),
  );
}
