import type { Config } from 'drizzle-kit';
import { env } from './src/util/env';

export default {
	schema: 'src/db/postgres/schema/*',
	out: 'src/db/postgres/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.POSTGRES_DATABASE_URL,
	},
	casing: 'snake_case',
} satisfies Config;
