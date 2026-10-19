import { z } from "zod";

export const contactPreferenceSchema = z.enum(["email", "phone", "whatsapp"]);

export const quoteRequestSchema = z.object({
  name: z.string().trim().min(2, "name_min"),
  email: z.string().trim().email("email_invalid"),
  phone: z
    .string()
    .trim()
    .min(9, "phone_min")
    .regex(/^[+\d\s()-]+$/, "phone_format"),
  message: z.string().trim().min(10, "message_min"),
  contactPreference: contactPreferenceSchema,
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
export type ContactPreference = z.infer<typeof contactPreferenceSchema>;
