import { ClientError } from 'src/error/client-error';
import { MongoDatabase } from 'src/model/product';

type SlideAddProductType = {
	slide1: string;
	slide2: string;
	slide3: string;
};

type AddProductProps = {
	model: string;
	img: string;
	slide: SlideAddProductType;
	screen: string;
	processor: string;
	memory: string;
	placeVideo: string;
	battery: string;
	price: number;
	category: string;
};

export const addProduct = async (props: AddProductProps) => {
	const { _id: productId } = await MongoDatabase.Products.insertOne({
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
};

export const getAllProducts = async () => {
	const products = await MongoDatabase.Products.find().limit(24);
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
};

export const getCategoryOfProducts = async (category: string) => {
	const products = await MongoDatabase.Products.where({
		category: category,
	}).limit(24);
	if (!products || products.length === 0) {
		throw new ClientError('Not found product...');
	}
	return {
		products,
	};
};

export const deleteProduct = async (id: string) => {
	const product = await MongoDatabase.Products.findByIdAndDelete({
		_id: id,
	});
	if (!product) {
		throw new ClientError('Error to must deleted product...');
	}
	return {
		productId: product._id,
	};
};
