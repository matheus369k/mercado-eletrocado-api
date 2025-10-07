import cors from '@fastify/cors';
import { fastify } from 'fastify';
import {
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod';
import { ProductsRoutes } from './route/product';
import { UsersRoutes } from './route/user';
import { env } from './util/env';

const app = fastify();

app.register(cors, {
	origin: env.FRONT_END_URL,
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

app.register(new UsersRoutes().create);
app.register(new UsersRoutes().login);
app.register(new UsersRoutes().profile);

app.listen(
	{
		port: env.PORT,
		host: env.HOST,
	},
	(_, address) => {
		console.log(`Server listening at ${address}`);
	},
);
