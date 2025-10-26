import { and, desc, eq } from 'drizzle-orm';
import { ClientError } from 'src/error/client-error';
import { mongoDb } from '@/db/mongo/mongo';
import { postgresDb } from '@/db/postgres/postgresql';
import { pgSchema } from '@/db/postgres/schema';

type SlideCreateProductType = {
	slide1: string;
	slide2: string;
	slide3: string;
};

type CreateProductProps = {
	model: string;
	img: string;
	slide: SlideCreateProductType;
	screen: string;
	processor: string;
	memory: string;
	placeVideo: string;
	battery: string;
	price: number;
	category: string;
};

type CreateDeliveryProps = {
	userId: string;
	products: {
		name: string;
		image: string;
		price: number;
	}[];
};

export class ProductsControllers {
	async create(props: CreateProductProps) {
		const { Products } = await mongoDb();
		const { _id: productId } = await Products.insertOne({
			category: props.category,
			img: props.img,
			memory: props.memory,
			model: props.model,
			price: props.price,
			processor: props.processor,
			screen: props.screen,
			slide: props.slide,
			battery: props.battery,
			placeVideo: props.placeVideo,
		});
		if (!productId) {
			throw new ClientError('Error to must add one new product...');
		}
		return {
			productId,
		};
	}

	async getAll() {
		const db = await mongoDb();
		const products = await db.Products.find().limit(24);
		if (!products || products.length === 0) {
			throw new ClientError('Not found product...');
		}
		const separationProductsForCategory = products.reduce((acc, curr) => {
			if (acc[curr.category]) {
				acc[curr.category].push(curr);
			} else {
				return {
					[curr.category]: [
						curr,
					],
					...(acc || []),
				};
			}
			return acc;
		}, {});
		if (!separationProductsForCategory) {
			return null;
		}
		return {
			...separationProductsForCategory,
		};
	}

	async getForCategory({ category }: Pick<CreateProductProps, 'category'>) {
		const { Products } = await mongoDb();
		const products = await Products.where({
			category,
		}).limit(24);
		if (!products || products.length === 0) {
			throw new ClientError('Not found product...');
		}
		return {
			products,
		};
	}

	async delete(_id: string) {
		const { Products } = await mongoDb();
		const product = await Products.findByIdAndDelete({
			_id,
		});
		if (!product) {
			throw new ClientError('Error to must deleted product...');
		}
		return {
			productId: product._id,
		};
	}

	async createDeliveries(props: CreateDeliveryProps) {
		const products = props.products.map((product) => {
			const fourteenDays = 1000 * 60 * 60 * 24 * 14;
			const deliveryDate = new Date(Date.now() + fourteenDays).toISOString();
			const { image, name, price } = product;

			return {
				userId: props.userId,
				deliveryDate,
				price,
				image,
				name,
			};
		});

		const productsCount = await postgresDb
			.insert(pgSchema.deliveries)
			.values(products)
			.returning({
				id: pgSchema.deliveries.id,
			});

		if (!productsCount[0]) {
			throw new ClientError('error try create delivery products');
		}

		return {
			productsCount: productsCount.length,
		};
	}

	async getAllDeliveries({ userId }: Pick<CreateDeliveryProps, 'userId'>) {
		const products = await postgresDb
			.select({
				deliveryDate: pgSchema.deliveries.deliveryDate,
				price: pgSchema.deliveries.price,
				image: pgSchema.deliveries.image,
				name: pgSchema.deliveries.name,
				id: pgSchema.deliveries.id,
			})
			.from(pgSchema.deliveries)
			.where(eq(pgSchema.deliveries.userId, userId))
			.orderBy(desc(pgSchema.deliveries.createAt));

		if (!products[0]) {
			throw new ClientError('not found delivery products');
		}

		return {
			products,
		};
	}
}
