import { z } from "zod";

export const REGISTRATION_FORM_SCHEMA = z.object({
  tenantName: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  location: z.string().nonempty(),
  channelId: z.string().uuid(),
  recipient: z.string().nonempty(),
  terms: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type RegistrationFormSchema = z.infer<typeof REGISTRATION_FORM_SCHEMA>;
