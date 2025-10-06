import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),

	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	cep: text('cep').notNull(),
	avatar: text('avatar'),

	createAt: timestamp('create_at', {
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
});
