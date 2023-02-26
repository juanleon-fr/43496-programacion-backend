import instancia from '../daos/index.js';
const carts = new instancia.carritos();
const products = new instancia.productos();
import { logger } from '../utils/winstonLogger.js';

const newCartService = async (id, prodArray) => {
	try {
		const cartExists = await carts.getById(id);
		if (cartExists != null) {
			return null;
		}
		const result = await carts.newCart(id, prodArray);
		const cart = {
			id: result.id,
			timestamp: result.timestamp,
			products: result.products,
		};
		return cart;
	} catch (err) {
		logger.error(`${err}`);
		return 'error';
	}
};

const deleteCartService = async (id) => {
	try {
		return await carts.deleteById(id);
	} catch (err) {
		logger.error(`${err}`);
		return 'error';
	}
};

const getCartService = async (id) => {
	try {
		const cart = await carts.getById(id);
		if (cart == null) {
			return null;
		}
		return cart;
	} catch (err) {
		logger.error(`${err}`);
		return 'error';
	}
};

const getAllCartsService = async () => {
	try {
		return await carts.getAll();
	} catch (err) {
		logger.error(`${err}`);
		return 'error';
	}
};

const newCartItemService = async (id, id_prod) => {
	try {
		const item = await products.getById(id_prod);
		if (item == null) {
			return null;
		}
		try {
			let cart = await carts.getById(id);
			if (cart == null) {
				return await newCartService(id, [item]);
			}

			if (cart.products.find((element) => element.id == item.id) != undefined) {
				return null;
			}
			cart.products.push(item);
			return await carts.addToCart(id, { products: cart.products });
		} catch (err) {
			logger.error(`${err}`);
			return 'error';
		}
	} catch (err) {
		logger.error(`${err}`);
		return 'error';
	}
};

const deleteItemService = async (id, id_prod) => {
	try {
		const itemExists = (await carts.getById(id)).find((element) => element.id == id_prod);
		if (itemExists == undefined) {
			return null;
		}
		const result = await carts.removeFromCart(id, id_prod);
		return result;
	} catch (err) {
		logger.error(`${err}`);
		return 'error';
	}
};

const createOrderService = async (id) => {
	try {
		let doc = await carts.getById(id);
		if (doc == null) {
			return 'no such cart';
		}
		if (doc.products.length === 0) {
			return 'no items in that cart';
		}
		let { _id, ...cart } = doc._doc;
		cart.userid = cart.id;
		delete cart.id;
		const order = await carts.placeOrder(cart);
		await carts.removeCart(id);
		return order;
	} catch (err) {
		logger.error(`${err}`);
	}
};

export { newCartService, deleteCartService, getCartService, getAllCartsService, newCartItemService, deleteItemService, createOrderService };
