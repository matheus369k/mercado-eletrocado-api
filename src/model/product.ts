import mongoose from 'mongoose';

const Product = new mongoose.Schema(
	{
		model: {
			type: String,
			required: true,
		},
		img: {
			type: String,
			required: true,
		},
		slide: {
			slide1: {
				type: String,
				required: true,
			},
			slide2: {
				type: String,
				required: true,
			},
			slide3: {
				type: String,
				required: true,
			},
		},
		screen: {
			type: String,
			required: true,
		},
		processor: {
			type: String,
			required: true,
		},
		memory: {
			type: String,
			required: true,
		},
		placeVideo: {
			type: String,
			required: false,
		},
		battery: {
			type: String,
			required: false,
		},
		price: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

export const MongoDatabase = {
	Products: mongoose.model('product', Product),
};
