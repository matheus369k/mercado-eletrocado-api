import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';

export const favorites = pgTable('favorites', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: uuid('user_id').references(() => users.id),

	name: text('name').notNull(),
	image: text('image').notNull(),
	price: text('price').notNull(),

	createAt: timestamp('create_at', {
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
});
