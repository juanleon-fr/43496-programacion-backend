import Users from '../classes/UserClass.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';
import { userCollection, userSchema } from '../models/userModel.js';
const users = new Users(userCollection, userSchema);
import passport from 'passport';

const getUserInfo = async (req, res, next) => {
	const email = req.body.email;
	try {
		const userInfo = await Users.getUserInfo(email);
		if (userInfo === null) {
			return res.sendStatus(404);
		}
		return res.status(200).json(userInfo);
	} catch (err) {
		throw res.status(500).send(err);
	}
};

const getSignout = async (req, res, next) => {
	// try {
	// 	const userInfo = await Users.getUserInfo(email);
	// 	if (userInfo === null) {
	// 		return res.sendStatus(404);
	// 	}
	// 	return res.sendStatus(200);
	// } catch (err) {
	// 	throw res.status(500).send(err);
	// }
};

const deleteUser = async (req, res, next) => {
	const { id } = req.params;
	try {
		console.log('llegue a delete');
		const deleted = await userModel.deleteOne({ username: id });
		console.log('pude borrarlo');
		const response = deleted.deletedCount !== 0 ? 'res.status(200).json({ success: true, res: deleted })' : 'res.status(404).json({ success: false, res: deleted })';
		return eval(response);
	} catch (err) {
		throw err;
		// throw res.status(500).send(err);
	}
};

const postSignup = async (req, res, next) => {
	req.body.password = hashPassword(req.body.password);
	const userObj = req.body;
	try {
		if ((await users.getByEmail(req.body.email)) === null) {
			const result = await users.saveNew(userObj);
			if (result._id !== undefined) return res.sendStatus(200);
			return res.status(500).send(result);
		}
		return res.status(400).send('user already created');
	} catch (err) {
		throw res.status(500).send(err);
	}
};

const postSignin = async (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/lala',
		failureRedirect: '/user/signin',
		failureFlash: true,
	});
	console.log(req.session.passport);
	return res.send('sesion iniciada');
};

export { getUserInfo, deleteUser, postSignup, postSignin, getSignout };
