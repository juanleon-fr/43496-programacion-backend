import { Schema } from 'mongoose';

const cartCollection = 'carritos';

const cartSchema = new Schema(
	{
		id: { type: Number, required: true },
		timestamp: { type: Date },
		products: { type: Array, required: true },
	},
	{ versionKey: false }
);

export default { cartCollection, cartSchema };
