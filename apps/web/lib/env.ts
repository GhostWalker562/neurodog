import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),
  NODE_ENV: z.string().min(1).optional(),
});

export type Env = z.infer<typeof envSchema>;

// If an error is thrown here, you are missing required environment variables
export const env = envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
