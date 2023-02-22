import { Schema } from 'mongoose';

const userCollection = 'sessions';

const userSchema = new Schema(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
		fullname: { type: String, required: true },
		age: { type: Number, required: true },
		address: { type: String, required: true },
		avatarurl: { type: String, required: true },
		phone: { type: String, required: true },
	},
	{ versionKey: false }
);

export { userCollection, userSchema };
