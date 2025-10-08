import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';

export const deliveries = pgTable('deliveries', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: uuid('user_id').references(() => users.id),

	name: text('name').notNull(),
	image: text('image').notNull(),
	price: integer('price').notNull(),
	deliveryDate: text('delivery_date').notNull(),

	createAt: timestamp('create_at', {
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
});
