import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { FavoritesControllers } from 'src/controller/favorites';
import { z } from 'zod/v4';
import { ClientError } from '@/error/client-error';
import { AuthMiddleWares } from '@/middleware/auth';
import { UserPayloadTokenSchema } from '@/util/token';

const FavoriteBodySchema = z.object({
	name: z
		.string('this invalid field')
		.min(3, 'name have more 3 characters')
		.max(400, 'name have less 400 characters'),
	image: z.string('this invalid field').url('this invalid url'),
	price: z.coerce.number('this invalid field'),
	productId: z.string('this invalid field').min(10).max(200),
});

const FavoriteParamSchema = FavoriteBodySchema.pick({
	productId: true,
});

export class FavoritesRoutes {
	create(app: FastifyInstance) {
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
				const { userId } = UserPayloadTokenSchema.parse(request.user);
				const { image, name, price, productId } = request.body;
				if (!userId) {
					throw new ClientError('user not have authorization');
				}

				const favorite = await new FavoritesControllers().create({
					productId,
					userId,
					price,
					image,
					name,
				});

				return reply.send({
					productId: favorite.productId,
				});
			},
		);
	}

	get(app: FastifyInstance) {
		app.withTypeProvider<ZodTypeProvider>().get(
			'/api/products/favorite',
			{
				preHandler: [
					new AuthMiddleWares().userAuth,
				],
				schema: {
					querystring: z.object({
						productId: z
							.string('this invalid field')
							.min(10)
							.max(200)
							.optional(),
					}),
				},
			},
			async (request, reply) => {
				const { userId } = UserPayloadTokenSchema.parse(request.user);
				const querystring = request.query;
				if (!userId) {
					throw new ClientError('user not have authorization');
				}

				if (querystring.productId) {
					const { favorite } = await new FavoritesControllers().getOne({
						productId: querystring.productId,
						userId,
					});
					return reply.send(favorite);
				}

				const { favorites } = await new FavoritesControllers().getAll({
					userId,
				});

				return reply.send(favorites);
			},
		);
	}

	delete(app: FastifyInstance) {
		app.withTypeProvider<ZodTypeProvider>().delete(
			'/api/products/favorite/:productId',
			{
				preHandler: [
					new AuthMiddleWares().userAuth,
				],
				schema: {
					params: FavoriteParamSchema,
				},
			},
			async (request, reply) => {
				const { userId } = UserPayloadTokenSchema.parse(request.user);
				const { productId } = request.params;
				if (!userId) {
					throw new ClientError('user not have authorization');
				}

				await new FavoritesControllers().delete({
					productId,
					userId,
				});

				return reply.send('ok');
			},
		);
	}
}
