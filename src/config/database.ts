import mongoose from 'mongoose';
import { env } from 'src/env';

export const mongoConnectionDatabase = async () => {
	try {
		await mongoose.connect(env.DATABASE_URL, {
			auth: {
				password: env.MONGO_DATABASE_PASSWORD,
				username: env.MONGO_DATABASE_NAME,
			},
			dbName: 'products',
		});
		console.log('success connection mongo database');
	} catch (error) {
		console.log(`error connection mongo database: ${error}`);
	}
};
