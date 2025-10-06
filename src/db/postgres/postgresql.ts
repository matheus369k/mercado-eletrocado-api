import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '@/util/env';
import * as schema from './schema';

export const postgresClient = postgres(env.POSTGRES_DATABASE_URL);
export const postgresDb = drizzle(postgresClient, {
	schema,
});
