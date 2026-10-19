import { beforeEach, describe, expect, it } from "vitest";
import { addQuoteLine, clearQuoteLinesForTests, getQuoteItemCount } from "@/quote/quote-store";
import { submitQuoteRequest } from "@/quote/submit-quote";

describe("submitQuoteRequest", () => {
  beforeEach(() => {
    clearQuoteLinesForTests();
  });

  it("blocks empty quote", async () => {
    const result = await submitQuoteRequest({
      name: "Tomas Campo",
      email: "a@b.com",
      phone: "622432433",
      message: "Mensaje de prueba suficientemente largo",
      contactPreference: "email",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("empty");
    }
  });

  it("accepts stocked lines and clears the selection", async () => {
    addQuoteLine({ productId: "prod-vulkkano-a5", variantId: "var-vulkkano-negro" });
    const result = await submitQuoteRequest({
      name: "Tomas Campo",
      email: "a@b.com",
      phone: "622432433",
      message: "Mensaje de prueba suficientemente largo",
      contactPreference: "whatsapp",
    });
    expect(result.ok).toBe(true);
    expect(getQuoteItemCount()).toBe(0);
  });
});
