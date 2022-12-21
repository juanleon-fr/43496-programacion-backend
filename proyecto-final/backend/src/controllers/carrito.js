const instancia = require('../daos/index');
const carts = new instancia.carritos;
// const FsContainer = require('../containers/FsContainer');
// const carts = new FsContainer('./src/db/carritos.json');

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
	res.json(cart.productos);
};

const getCarts = async (req, res, next) => {
	const cartList = await carts.getAll();
	res.json(cartList);
};

const newCartItemById = async (req, res, next) => {
	const { id } = req.params;
	const { body } = req;
	const cart = await carts.addToCart(id, body.id_prod);
	res.json(cart);
};

const deleteCartItemById = async (req, res, next) => {
	const { id, id_prod } = req.params;
	const result = await carts.removeFromCart(id, id_prod);
	res.json(result);
};

module.exports = {
	newCart,
	deleteCartById,
	getCartItemsById,
	getCarts,
	newCartItemById,
	deleteCartItemById,
};
