import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import * as productControllers from 'src/controller/products';
import type { FastifyInstance } from 'fastify';
import { z } from 'zod/v4';

export const routeAddProduct = (app: FastifyInstance) => {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/api/products',
		{
			schema: {
				body: z.object({
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
				}),
			},
		},
		async (request, reply) => {
			const body = request.body;
			const { productId } = await productControllers.addProduct({
				...body,
			});
			reply.send({
				productId,
			});
		},
	);
};

export const routeGetProducts = (app: FastifyInstance) => {
	app
		.withTypeProvider<ZodTypeProvider>()
		.get('/api/products', async (_, reply) => {
			const products = await productControllers.getAllProducts();
			reply.send(products);
		})
		.get(
			'/api/products/:category',
			{
				schema: {
					params: z.object({
						category: z.string().min(3),
					}),
				},
			},
			async (request, reply) => {
				const { category } = request.params;
				const { products } =
					await productControllers.getCategoryOfProducts(category);
				reply.send(products);
			},
		);
};

export const routeDeleteProduct = (app: FastifyInstance) => {
	app.withTypeProvider<ZodTypeProvider>().delete(
		'/api/products/:id',
		{
			schema: {
				params: z.object({
					id: z.string(),
				}),
			},
		},
		async (request, reply) => {
			const { id } = request.params;
			const { productId } = await productControllers.deleteProduct(id);
			reply.send({
				productId,
			});
		},
	);
};
