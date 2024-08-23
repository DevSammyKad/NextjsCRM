import { z } from "zod";

export const leadSchema = z.object({
  name: z.string(),
  age: z.number().int().positive(),
  email: z.string(),
  phone: z.string(),
  source: z.enum([
    "FACEBOOK",
    "GOOGLE_ADS",
    "LINKEDIN",
    "TWITTER",
    "INSTAGRAM",
    "REFERRAL",
    "WEBSITE",
    "EMAIL_CAMPAIGN",
    "EVENTS",
    "COLD_CALL",
  ]), // Correct enum handling
  status: z.enum([
    "NEW",
    "CONVERTED",
    "CONTACTED",
    "FOLLOW_UP",
    "MISSED",
    "CLOSED",
  ]), // Correct enum handling
  note: z.string().optional(),
});
