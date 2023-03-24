import { createOrderService, deleteCartService, deleteItemService, getAllCartsService, getCartService, newCartItemService, newCartService } from '../service/carrito.js';
import { getUserBySessionService } from '../service/users.js';
import { sendOrderMail } from '../utils/nodeMailerService.js';
import { sendSMSBuyer, sendWPPAdmin } from '../utils/TwilioSetup.js';
import { logger } from '../utils/winstonLogger.js';

const newCart = async (req, res, next) => {
	const prodArray = req.body;
	const userId = req.session.passport.user;
	const result = await newCartService(userId, prodArray);
	if (result == null) {
		return res.sendStatus(400);
	}
	if (typeof result === 'string') {
		return res.sendStatus(500);
	}
	return res.status(200).json(result);
};

const deleteCartById = async (req, res, next) => {
	const id = req.session.passport.user;
	const result = await deleteCartService(id);
	if (result.deletedCound === 0) {
		return res.status(404).send('nothing deleted');
	}
	if (result == 'error') {
		return res.sendStatus(500);
	}
	return res.status(200).json(result);
};

const getCartItemsById = async (req, res, next) => {
	const id = req.session.passport.user;
	const result = await getCartService(id);
	if (result == null) {
		return res.sendStatus(404);
	}
	if (result == 'error') {
		return res.sendStatus(500);
	}
	return res.status(200).json(result.products);
};

const getCarts = async (req, res, next) => {
	const result = await getAllCartsService();
	if (result == 'error') {
		return res.sendStatus(500);
	}
	return res.status(200).json(result);
};

const newCartItemById = async (req, res, next) => {
	const id = req.session.passport.user;
	const { id_prod } = req.params;
	const result = await newCartItemService(id, id_prod);
	if (result == null) {
		return res.sendStatus(400);
	}
	if (result == 'error') {
		return res.sendStatus(500);
	}
	return res.status(200).json(result);
};

const deleteCartItemById = async (req, res, next) => {
	const { id_prod } = req.params;
	const id = req.session.passport.user;
	const result = await deleteItemService(id, id_prod);

	return res.json(result);
};

const createOrder = async (req, res, next) => {
	const id = req.session.passport.user;
	const result = await createOrderService(id);
	if (result == 'no such cart') {
		return res.sendStatus(404);
	}
	if (result == 'no items in that cart') {
		return res.sendStatus(400);
	}
	if (result == 'error') {
		return res.sendStatus(500);
	}
	const user = await getUserBySessionService(id);
	try {
		sendOrderMail(result, user);
		sendWPPAdmin(result, user, `${result._id}`);
		sendSMSBuyer(`${result._id}`, user.phone);
	} catch (err) {
		logger.error(`${err}`);
	}
	return res.status(200).json(result);
};

export default {
	newCart,
	deleteCartById,
	getCartItemsById,
	getCarts,
	newCartItemById,
	deleteCartItemById,
	createOrder,
};
