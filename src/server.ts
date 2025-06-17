import fastify from 'fastify';
import { env } from './env';

const server = fastify();

server.get('/', async (request, reply) => {
	reply.send('hello');
});

server.listen(
	{
		port: env.PORT,
	},
	(err, address) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		console.log(`Server listening at ${address}`);
	},
);
