import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  // Database
  DATABASE_URL: z.string(),

  // Email Config for GearVault
  EMAIL_HOST: z.string().min(1),
  EMAIL_PORT: z.coerce.number().default(465),
  EMAIL_USER: z.string().email(),
  EMAIL_PASS: z.string().min(1),

  // Custom Auth
  AUTH_SECRET: z.string().min(32),

  // JWT
  JWT_SECRET: z.string().min(32),

  //   APP_URL
  APP_URL: z.string().url(),
});

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  const errors = error.flatten().fieldErrors;
  console.error("❌ Environment Configuration Error:");
  console.table(errors);
  throw new Error("Fix environment variables before starting GearVault.");
}

export const env = data;

// Type-level export for use in other files
export type Env = z.infer<typeof envSchema>;
