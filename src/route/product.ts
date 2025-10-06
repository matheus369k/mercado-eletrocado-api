import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { ProductsControllers } from 'src/controller/products';
import { z } from 'zod/v4';

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
	category: z.string().min(3),
});

const DeleteCategoryParamSchema = z.object({
	id: z.string(),
});

export class ProductsRoutes {
	async create(app: FastifyInstance) {
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

	async getAll(app: FastifyInstance) {
		app
			.withTypeProvider<ZodTypeProvider>()
			.get('/api/products', async (_, reply) => {
				const products = await new ProductsControllers().getAll();
				return reply.send(products);
			});
	}

	async getForCategory(app: FastifyInstance) {
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

	async delete(app: FastifyInstance) {
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
}
