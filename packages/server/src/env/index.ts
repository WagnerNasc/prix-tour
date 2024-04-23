import dotenv from 'dotenv'
import { z } from 'zod'
dotenv.config({ path: '../../.env' })

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3000),
  DATABASE_USER: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_PORT: z.coerce.number().default(5432),
  DATABASE_PASSWORD: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_URL: z.string(),
  ANONYMIZATION_SECRET: z.string(),
  ANONYMIZATION_NUMBER: z.coerce.number(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
