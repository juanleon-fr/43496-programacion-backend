import { model } from 'mongoose';
import { logger } from '../utils/winstonLogger.js';
import { userCollection, userSchema } from '../models/userModel.js';
const errMessage = (err, func) => {
	logger.error(`Date: ${Date.now()} \n Error while running ${func}\n ${err}`);
};

class sessionClass {
	constructor() {
		this.model = model(userCollection, userSchema);
	}

	getByEmail = async (email) => {
		try {
			const res = await this.model.find({ email: email });
			if (res.length > 0) {
				return res[0];
			}
			return null;
		} catch (err) {
			throw errMessage(err, 'getByEmail');
		}
	};

	getById = async (id) => {
		try {
			const res = await this.model.find({ _id: id });
			if (res.length > 0) {
				return res[0];
			}
			return null;
		} catch (err) {
			throw errMessage(err, 'getById');
		}
	};

	saveNew = async (user) => {
		try {
			const res = await this.model.create(user);
			return res;
		} catch (err) {
			throw errMessage(err, 'saveNew');
		}
	};

	deleteByEmail = async (email) => {
		try {
			const res = this.model.deleteOne({ email: email });
			return { success: true, res: res };
		} catch (err) {
			throw errMessage(err, 'deleteByEmail');
		}
	};
}

export default sessionClass;
