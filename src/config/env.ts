import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  DIRECT_URL: z.string().optional(),
  AI_PROVIDER: z.enum(["openai", "anthropic", "mock"]).default("mock"),
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().default("gpt-4o-mini"),
  OPENAI_EMBEDDING_MODEL: z.string().default("text-embedding-3-small"),
  ADMIN_JWT_SECRET: z.string().min(16, "ADMIN_JWT_SECRET must be at least 16 characters"),
  ADMIN_DEFAULT_PASSWORD: z.string().optional(),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(30),
  RATE_LIMIT_WINDOW_SECONDS: z.coerce.number().default(60),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("❌ Invalid environment variables:", JSON.stringify(result.error.format(), null, 2));
    if (process.env.NODE_ENV === "production") {
      throw new Error("Invalid environment variables");
    }
    // Return sensible defaults for dev/test
    return {
      NODE_ENV: "development",
      NEXT_PUBLIC_APP_URL: "http://localhost:3000",
      DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/ask_bangladesh",
      DIRECT_URL: "postgresql://postgres:postgres@localhost:5432/ask_bangladesh",
      AI_PROVIDER: "mock",
      OPENAI_API_KEY: "mock-key",
      OPENAI_MODEL: "gpt-4o-mini",
      OPENAI_EMBEDDING_MODEL: "text-embedding-3-small",
      ADMIN_JWT_SECRET: "development-fallback-secret-minimum-32-chars",
      ADMIN_DEFAULT_PASSWORD: "admin",
      RATE_LIMIT_MAX_REQUESTS: 100,
      RATE_LIMIT_WINDOW_SECONDS: 60,
    };
  }

  return result.data;
}

export const env = validateEnv();
