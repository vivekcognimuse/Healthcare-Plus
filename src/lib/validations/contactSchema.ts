import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  organization: z.string().min(1, "Organization is required"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  inquiryType: z.enum(["general", "press", "careers", "partnerships"], {
    required_error: "Please choose an inquiry type",
  }),
  message: z.string().min(1, "Message is required"),
  updates: z.boolean().optional().default(false),
});
