import { z } from 'zod';

const envSchema = z.object({
	PORT: z.coerce.number().optional().default(3000),
	DATABASE_URL: z.string().url(),
	MONGO_DATABASE_NAME: z.string().min(3),
	MONGO_DATABASE_PASSWORD: z.string().min(3),
});

export const env = envSchema.parse(process.env);
