import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { ProductsControllers } from 'src/controller/products';
import { z } from 'zod/v4';
import { ClientError } from '@/error/client-error';
import { AuthMiddleWares } from '@/middleware/auth';

const CreateProductBodySchema = z.object({
	model: z.string().min(3),
	img: z.string().url(),
	slide: z.object({
		slide1: z.string().url(),
		slide2: z.string().url(),
		slide3: z.string().url(),
	}),
	screen: z.string().min(3),
	processor: z.string(),
	memory: z.string().min(3),
	placeVideo: z.string().optional().default('null'),
	battery: z.string().optional().default('null'),
	price: z.coerce.number(),
	category: z.string().min(3),
});

const GetForCategoryParamSchema = z.object({
	category: z
		.string()
		.min(3, 'category have more 3 characters')
		.max(16, 'name have less 16 characters'),
});

const DeleteCategoryParamSchema = z.object({
	id: z.string(),
});

const FavoriteBodySchema = z.object({
	name: z
		.string('this invalid field')
		.min(3, 'name have more 3 characters')
		.max(400, 'name have less 400 characters'),
	image: z.string('this invalid field').url('this invalid url'),
	price: z.coerce.number('this invalid field'),
});

const FavoriteParamSchema = z.object({
	favoriteId: z
		.string('this value is invalid')
		.min(8, 'favoriteId have more 8 characters')
		.max(100, 'favoriteId have less 100 characters'),
});

const DeliveryBodySchema = z.array(FavoriteBodySchema);

export class ProductsRoutes {
	create(app: FastifyInstance) {
		app.withTypeProvider<ZodTypeProvider>().post(
			'/api/products',
			{
				schema: {
					body: CreateProductBodySchema,
				},
			},
			async (request, reply) => {
				const body = request.body;
				const { productId } = await new ProductsControllers().create({
					...body,
				});
				return reply.send({
					productId,
				});
			},
		);
	}

	getAll(app: FastifyInstance) {
		app
			.withTypeProvider<ZodTypeProvider>()
			.get('/api/products', async (_, reply) => {
				const products = await new ProductsControllers().getAll();
				return reply.send(products);
			});
	}

	getForCategory(app: FastifyInstance) {
		app.withTypeProvider<ZodTypeProvider>().get(
			'/api/products/:category',
			{
				schema: {
					params: GetForCategoryParamSchema,
				},
			},
			async (request, reply) => {
				const { category } = request.params;
				const { products } = await new ProductsControllers().getForCategory({
					category,
				});
				return reply.send(products);
			},
		);
	}

	delete(app: FastifyInstance) {
		app.withTypeProvider<ZodTypeProvider>().delete(
			'/api/products/:id',
			{
				schema: {
					params: DeleteCategoryParamSchema,
				},
			},
			async (request, reply) => {
				const { id } = request.params;
				const { productId } = await new ProductsControllers().delete(id);
				return reply.send({
					productId,
				});
			},
		);
	}

	createDeliveries(app: FastifyInstance) {
		app.withTypeProvider<ZodTypeProvider>().post(
			'/api/products/delivery',
			{
				preHandler: [
					new AuthMiddleWares().userAuth,
				],
				schema: {
					body: DeliveryBodySchema,
				},
			},
			async (request, reply) => {
				const userId = request.user.id;
				if (!userId) {
					throw new ClientError('user not have authorization');
				}

				const { productsCount } =
					await new ProductsControllers().createDeliveries({
						products: request.body,
						userId,
					});

				return reply.send({
					productsCount,
				});
			},
		);
	}

	getAllDeliveries(app: FastifyInstance) {
		app.withTypeProvider<ZodTypeProvider>().get(
			'/api/products/delivery',
			{
				preHandler: [
					new AuthMiddleWares().userAuth,
				],
			},
			async (request, reply) => {
				const userId = request.user.id;
				if (!userId) {
					throw new ClientError('user not have authorization');
				}

				const { products } = await new ProductsControllers().getAllDeliveries({
					userId,
				});

				return reply.send(products);
			},
		);
	}

	createFavorite(app: FastifyInstance) {
		app.withTypeProvider<ZodTypeProvider>().post(
			'/api/products/favorite',
			{
				preHandler: [
					new AuthMiddleWares().userAuth,
				],
				schema: {
					body: FavoriteBodySchema,
				},
			},
			async (request, reply) => {
				const { image, name, price } = request.body;
				const userId = request.user.id;
				if (!userId) {
					throw new ClientError('user not have authorization');
				}

				const { favoriteId } = await new ProductsControllers().createFavorite({
					userId,
					price,
					image,
					name,
				});

				return reply.send({
					favoriteId,
				});
			},
		);
	}

	getAllFavorite(app: FastifyInstance) {
		app.withTypeProvider<ZodTypeProvider>().get(
			'/api/products/favorite',
			{
				preHandler: [
					new AuthMiddleWares().userAuth,
				],
			},
			async (request, reply) => {
				const userId = request.user.id;
				if (!userId) {
					throw new ClientError('user not have authorization');
				}

				const { favorites } = await new ProductsControllers().getAllFavorites({
					userId,
				});

				return reply.send(favorites);
			},
		);
	}

	deleteFavorite(app: FastifyInstance) {
		app.withTypeProvider<ZodTypeProvider>().delete(
			'/api/products/favorite/:favoriteId',
			{
				preHandler: [
					new AuthMiddleWares().userAuth,
				],
				schema: {
					params: FavoriteParamSchema,
				},
			},
			async (request, reply) => {
				const { favoriteId } = request.params;
				const userId = request.user.id;
				if (!userId) {
					throw new ClientError('user not have authorization');
				}

				await new ProductsControllers().deleteFavorite({
					favoriteId,
					userId,
				});

				return reply.send('ok');
			},
		);
	}
}
