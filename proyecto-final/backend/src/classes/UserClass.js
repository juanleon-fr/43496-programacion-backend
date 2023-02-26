import { model } from 'mongoose';
import { userCollection, userSchema } from '../models/userModel.js';

class UserClass {
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
			throw new Error({ msg: err, func: 'getByEmail' });
		}
	};

	getById = async (id) => {
		try {
			const res = await this.model.find({ id: id });
			if (res.length > 0) {
				return res[0];
			}
			return null;
		} catch (err) {
			throw new Error({ msg: err, func: 'getById' });
		}
	};

	saveNew = async (user) => {
		user.id = Date.now();
		try {
			const res = await this.model.create(user);
			return res;
		} catch (err) {
			throw new Error({ msg: err, func: 'saveNew' });
		}
	};

	deleteById = async (id) => {
		try {
			const res = this.model.deleteOne({ id: id });
			return res;
		} catch (err) {
			throw new Error({ msg: err, func: 'deleteById' });
		}
	};
}

export default UserClass;
