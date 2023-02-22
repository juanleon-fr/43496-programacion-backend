import Users from '../classes/UserClass.js';
import { hashPassword } from '../utils/bcrypt.js';
import { userCollection, userSchema } from '../models/userModel.js';
const users = new Users(userCollection, userSchema);

const getUserInfo = async (req, res, next) => {
	const email = req.body.email;
	try {
		const userInfo = await users.getByEmail(email);
		if (userInfo === null) {
			return res.sendStatus(404);
		}
		return res.status(200).json(userInfo);
	} catch (err) {
		throw res.status(500).send(err);
	}
};

const getSignout = async (req, res, next) => {
	// verifico que haya sesion abierta
	//cierro
};

const deleteUser = async (req, res, next) => {
	const { id } = req.params;
	try {
		const deleted = await userModel.deleteOne({ username: id });
		const response = deleted.deletedCount !== 0 ? 'res.status(200).json({ success: true, res: deleted })' : 'res.status(404).json({ success: false, res: deleted })';
		return eval(response);
	} catch (err) {
		throw res.status(500).send(err);
		// throw res.status(500).send(err);
	}
};

const postSignup = async (req, res, next) => {
	const auxPass = req.body.password;
	req.body.password = hashPassword(req.body.password);
	const userObj = req.body;
	try {
		if ((await users.getByEmail(req.body.email)) === null) {
			const result = await users.saveNew(userObj);
			if (result._id !== undefined) {
				req.body.email = result.email;
				req.body.password = auxPass;
				return next();
			}
			return res.status(500).send(result);
		}
		return res.status(400).send('user already created');
	} catch (err) {
		throw res.status(500).send(err);
	}
};

const postSignin = async (req, res, next) => {
	//verifico que no haya sesion abierta
	console.log(req.user);
	return res.sendStatus(200);
};

export { getUserInfo, deleteUser, postSignup, postSignin, getSignout };
