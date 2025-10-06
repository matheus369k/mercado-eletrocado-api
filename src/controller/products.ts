import { mongoDb } from '@/db/mongo/mongo';
import { ClientError } from 'src/error/client-error';

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
}
