import mongoose from 'mongoose';
import { Product } from '@/db/mongo/schema/product';
import { env } from '@/util/env';

export const mongoDb = async () => {
	const mongo = await mongoose.connect(env.MONGO_DATABASE_URL, {
		auth: {
			password: env.MONGO_DATABASE_PASSWORD,
			username: env.MONGO_DATABASE_NAME,
		},
		appName: 'products',
	});

	return {
		Products: mongo.model('product', Product),
	};
};
