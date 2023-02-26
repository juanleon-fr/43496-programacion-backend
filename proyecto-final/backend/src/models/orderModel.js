import { Schema, model } from 'mongoose';

const orderCollection = 'orders';

const orderSchema = new Schema(
	{
		userid: { type: Number, required: true },
		timestamp: { type: Date },
		products: { type: Array, required: true },
	},
	{ versionKey: false }
);

export default model(orderCollection, orderSchema);
