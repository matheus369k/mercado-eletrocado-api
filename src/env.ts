import { z } from 'zod';

const envSchema = z.object({
	PORT: z.coerce.number().optional().default(3000),
	HOST: z.string().optional().default('0.0.0.0'),
	DATABASE_URL: z.string().url(),
	MONGO_DATABASE_NAME: z.string().min(3),
	MONGO_DATABASE_PASSWORD: z.string().min(3),
	FRONT_END_URL: z.string().url().optional().default('*'),
});

export const env = envSchema.parse(process.env);
