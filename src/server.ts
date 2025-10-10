import path from 'node:path';
import fastifyCors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { fastify } from 'fastify';
import {
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod';
import { ProductsRoutes } from './route/product';
import { UsersRoutes } from './route/user';
import { env } from './util/env';

const app = fastify();

app.register(fastifyCors, {
	origin: env.FRONT_END_URL,
});
app.register(fastifyMultipart);
app.register(fastifyStatic, {
	root: path.resolve(__dirname, '..', 'public'),
	prefix: '/public/',
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get('/hearth', (_, res) => {
	res.send('ok');
});

app.register(new ProductsRoutes().create);
app.register(new ProductsRoutes().delete);
app.register(new ProductsRoutes().getAll);
app.register(new ProductsRoutes().getForCategory);
app.register(new ProductsRoutes().createDeliveries);
app.register(new ProductsRoutes().getAllDeliveries);
app.register(new ProductsRoutes().createFavorite);
app.register(new ProductsRoutes().getAllFavorite);
app.register(new ProductsRoutes().deleteFavorite);

app.register(new UsersRoutes().create);
app.register(new UsersRoutes().login);
app.register(new UsersRoutes().profile);
app.register(new UsersRoutes().update);
app.register(new UsersRoutes().delete);

app.listen(
	{
		port: env.PORT,
		host: env.HOST,
	},
	(_, address) => {
		console.log(`Server listening at ${address}`);
	},
);
