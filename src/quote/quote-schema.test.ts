import { describe, expect, it } from "vitest";
import { quoteRequestSchema } from "@/quote/quote-schema";

describe("quoteRequestSchema", () => {
  it("rejects invalid email", () => {
    const result = quoteRequestSchema.safeParse({
      name: "Tomas Campo",
      email: "not-an-email",
      phone: "622432433",
      message: "Quiero un sistema estéreo para salón.",
      contactPreference: "email",
    });
    expect(result.success).toBe(false);
  });

  it("accepts a valid payload", () => {
    const result = quoteRequestSchema.safeParse({
      name: "Tomas Campo",
      email: "tcampof@gmail.com",
      phone: "622 432 433",
      message: "Quiero un sistema estéreo para salón.",
      contactPreference: "phone",
    });
    expect(result.success).toBe(true);
  });
});
