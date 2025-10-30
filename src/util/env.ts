import { z } from 'zod';

const envSchema = z.object({
	PORT: z.coerce.number().optional().default(3000),
	HOST: z.string().optional().default('0.0.0.0'),
	FRONT_END_URL: z.string().url().optional().default('*'),

	MONGO_DATABASE_URL: z.string().url(),
	MONGO_DATABASE_NAME: z.string().min(3),
	MONGO_DATABASE_PASSWORD: z.string().min(3),

	POSTGRES_DATABASE_URL: z.string().url(),

	REDIS_DATABASE_URL: z.string().url(),

	JWT_REFRESH_SECRET_KEY: z.string().min(10).max(200),
	JWT_ACCESS_SECRET_KEY: z.string().min(10).max(200),
});

export const env = envSchema.parse(process.env);
