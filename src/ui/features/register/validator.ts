import { z } from "zod";

export const REGISTRATION_FORM_SCHEMA = z
  .object({
    tenantName: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    location: z.object({
      longtitude: z.number().min(-180).max(180),
      latitude: z.number().min(-90).max(90),
    }),
    channelId: z.string().uuid(),
    recipient: z.string().nonempty(),
    terms: z.boolean().refine((value) => value === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

export type RegistrationFormSchema = z.infer<typeof REGISTRATION_FORM_SCHEMA>;
