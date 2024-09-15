import { z } from 'zod';

export const envSchema = z.object({
  APP_PORT: z.string().transform((port) => parseInt(port, 10)),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  JWT_SECRET: z.string(),
  FRONTEND_URL: z.string().url(),
  FRONTEND_LOGIN_CALLBACK_ENDPOINT: z.string(),

  DB_HOST: z.string(),
  DB_PORT: z.string().transform((port) => parseInt(port, 10)),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DATABASE_URL: z.string().url(),

  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z
    .string()
    .transform((port) => parseInt(port, 10))
    .default('6379'),

  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GITHUB_CALLBACK_URL: z.string().url(),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.string().url(),
});

export type EnvConfig = z.infer<typeof envSchema>;
