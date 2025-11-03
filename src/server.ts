import path from 'node:path';
import fastifyCors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import { fastify } from 'fastify';
import {
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod';
import { DeliveriesRoutes } from './route/delivery';
import { FavoritesRoutes } from './route/favorite';
import { ProductsRoutes } from './route/product';
import { UsersRoutes } from './route/user';
import { env } from './util/env';
import { TokenRoutes } from './route/token';

const app = fastify();

app.register(fastifyCors, {
	origin: env.FRONT_END_URL,
	credentials: true,
	methods: [
		'GET',
		'POST',
		'PATCH',
		'DELETE',
	],
});
app.register(fastifyCookie);
app.register(fastifyJwt, {
	secret: env.JWT_ACCESS_SECRET_KEY,
	cookie: {
		cookieName: 'accessToken',
		signed: false,
	},
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

app.register(new TokenRoutes().refreshAccessToken);
app.register(new TokenRoutes().deleteRefreshToken);

app.register(new ProductsRoutes().create);
app.register(new ProductsRoutes().delete);
app.register(new ProductsRoutes().getOneOrAll);
app.register(new ProductsRoutes().getForCategory);

app.register(new DeliveriesRoutes().create);
app.register(new DeliveriesRoutes().getAll);

app.register(new FavoritesRoutes().get);
app.register(new FavoritesRoutes().create);
app.register(new FavoritesRoutes().delete);

app.register(new UsersRoutes().create);
app.register(new UsersRoutes().login);
app.register(new UsersRoutes().logout);
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
