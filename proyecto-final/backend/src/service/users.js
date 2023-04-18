import Users from '../classes/UserClass.js';
import { userCollection, userSchema } from '../models/userModel.js';
import { hashPassword } from '../utils/bcrypt.js';
const users = new Users(userCollection, userSchema);

import instancia from '../daos/index.js';
const carts = new instancia.carritos();

import { logger } from '../utils/winstonLogger.js';
const errMessage = (err, func) => {
	logger.error(`Date: ${Date.now()} \n Error while running ${func}\n ${err}`);
};

const getUserService = async (email) => {
	try {
		return await users.getByEmail(email);
	} catch (err) {
		errMessage(err.msg, err.func);
		return 'error';
	}
};

const getUserBySessionService = async (id) => {
	try {
		const response = await users.getById(id);
		const { email, fullname, age, address, avatarurl, phone } = response;
		const user = { email, fullname, age, address, avatarurl, phone };
		return user;
	} catch (err) {
		errMessage(err.msg, err.func);
		return 'error';
	}
};

const deleteUserService = async (id) => {
	try {
		const result = await users.deleteById(id);
		await carts.removeCart(id);
		return result;
	} catch (err) {
		errMessage(err.msg, err.func);
		return 'error';
	}
};

const signupService = async (user) => {
	try {
		const hashedPass = hashPassword(user.password);
		if ((await getUserService(user.email)) == null) {
			user.password = hashedPass;
			user.role = { user: 2001 };
			return await users.saveNew(user);
		}
		return null;
	} catch (err) {
		errMessage(err.msg, err.func);
		return 'error';
	}
};

export { getUserService, getUserBySessionService, deleteUserService, signupService };
