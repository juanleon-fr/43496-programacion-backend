import instancia from '../daos/index.js';
const carts = new instancia.carritos();
const products = new instancia.productos();

const newCart = async (req, res, next) => {
	const { body } = req;
	res.json(await carts.newCart(body));
};

const deleteCartById = async (req, res, next) => {
	const { id } = req.params;
	const result = await carts.deleteById(id);
	res.json(result);
};

const getCartItemsById = async (req, res, next) => {
	const { id } = req.params;
	const cart = await carts.getById(id);
	res.json(cart.products);
};

const getCarts = async (req, res, next) => {
	const cartList = await carts.getAll();
	res.json(cartList);
};

const newCartItemById = async (req, res, next) => {
	const { id } = req.params;
	const body = req.body;
	const producto = await products.getById(body.id_prod);
	const cart = await carts.addToCart(id, producto);
	res.json(cart);
};

const deleteCartItemById = async (req, res, next) => {
	const { id, id_prod } = req.params;
	const result = await carts.removeFromCart(id, id_prod);
	res.json(result);
};

export default {
	newCart,
	deleteCartById,
	getCartItemsById,
	getCarts,
	newCartItemById,
	deleteCartItemById,
};
