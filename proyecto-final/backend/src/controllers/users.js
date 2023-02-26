import { getUserBySessionService, getUserService, deleteUserService, signupService } from '../service/users.js';
import { sendSignupMail } from '../utils/nodeMailerService.js';

const getUserInfo = async (req, res, next) => {
	const email = req.body.email;
	const user = await getUserService(email);
	if (user == null) {
		return res.status(404);
	}
	if (user == 'error') {
		return res.sendStatus(500);
	}
	return res.status(200).json(user);
};

const getUserBySession = async (req, res, next) => {
	const id = req.session.passport.user;
	const user = await getUserBySessionService(id);
	if (user == null) {
		return res.status(404);
	}
	if (user == 'error') {
		return res.sendStatus(500);
	}
	return res.status(200).json(user);
};

const signout = async (req, res, next) => {
	await req.logout();
	return res.sendStatus(200);
};

const deleteUser = async (req, res, next) => {
	const id = req.session.passport.user;
	const result = await deleteUserService(id);
	if (result.deletedCound === 0) {
		return res.status(404).send('nothing deleted');
	}
	if (result == 'error') {
		return res.sendStatus(500);
	}
	return res.status(200).json(result);
};

const postSignup = async (req, res, next) => {
	const user = req.body;
	const password = user.password;
	const result = await signupService(user);
	if (result == null) {
		return res.status(400).send('email already in use');
	}
	if (result == 'error') {
		return res.sendStatus(500);
	}
	req.body.password = password;
	sendSignupMail(user);
	return next();
};

const postSignin = (req, res, next) => {
	return res.sendStatus(200);
};

export { getUserInfo, getUserBySession, deleteUser, postSignup, postSignin, signout };
