import z from "zod";

export const registerPayloadSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterPayload = z.infer<typeof registerPayloadSchema>;
