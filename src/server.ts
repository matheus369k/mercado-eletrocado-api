import { fastify } from 'fastify';
import cors from '@fastify/cors';
import { env } from './env';
import { mongoConnectionDatabase } from './config/database';
import {
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod';
import * as productsRoutes from './route/product';

const app = fastify({
	logger: true,
});

app.register(cors, {
	origin: env.FRONT_END_URL,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(productsRoutes.routeAddProduct);
app.register(productsRoutes.routeGetProducts);
app.register(productsRoutes.routeDeleteProduct);

app.listen(
	{
		port: env.PORT,
		host: env.HOST,
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
