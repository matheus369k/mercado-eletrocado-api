import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { DeliveriesControllers } from 'src/controller/deliveries';
import { z } from 'zod/v4';
import { ClientError } from '@/error/client-error';
import { AuthMiddleWares } from '@/middleware/auth';

const DeliveryBodySchema = z.array(
	z.object({
		name: z
			.string('this invalid field')
			.min(3, 'name have more 3 characters')
			.max(400, 'name have less 400 characters'),
		image: z.string('this invalid field').url('this invalid url'),
		price: z.coerce.number('this invalid field'),
	}),
);

export class DeliveriesRoutes {
	create(app: FastifyInstance) {
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

				const { productsCount } = await new DeliveriesControllers().create({
					products: request.body,
					userId,
				});

				return reply.send({
					productsCount,
				});
			},
		);
	}

	getAll(app: FastifyInstance) {
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

				const { products } = await new DeliveriesControllers().getAll({
					userId,
				});

				return reply.send(products);
			},
		);
	}
}
