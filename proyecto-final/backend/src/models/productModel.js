const { Schema } = require('mongoose');

const productCollection = 'productos';

const productSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String },
		code: { type: String },
		thumbnail: { type: String, required: true },
		price: { type: Number, required: true },
		stock: { type: Number, required: true },
		category: { type: String },
		color: { type: String },
		id: { type: Number, required: true },
		timestamp: { type: Date },
	},
	{ versionKey: false }
);

module.exports = { productCollection, productSchema };
