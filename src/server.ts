import Fastify from 'fastify';
import { env } from './env';
import { mongoConnectionDatabase } from './mongo/connection';

const fastify = Fastify({
	logger: true,
});

fastify.listen(
	{
		port: env.PORT,
	},
	(err, address) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		mongoConnectionDatabase().finally(() => {
			console.log(`Server listening at ${address}`);
		});
	},
);
