const routerProductos = require('../routes/productos');
const CarritoContainer = require('../classes/CarritoContainer');
const Contenedor = require('../classes/Contenedor');
const carritoContainer = new CarritoContainer();
const products = new Contenedor();

const newCart = async (req, res, next) => {
	const { body } = req;
	res.json(await carritoContainer.newCart(body));
};

const deleteCartById = async (req, res, next) => {
	const { id } = req.params;
	const result = await carritoContainer.deleteById(id);
	res.json(result);
};

const getCartItemsById = async (req, res, next) => {
	const { id } = req.params;
	const cart = await carritoContainer.getById(id);
	res.json(cart.productos);
};

const getCarts = async (req, res, next) => {
	const cartList = await carritoContainer.getAll();
	res.json(cartList);
};

const newCartItemById = async (req, res, next) => {
	const { id } = req.params;
	const { body } = req;
	const cart = await carritoContainer.addToCart(id, body.id_prod);
	res.json(cart);
};

const deleteCartItemById = async (req, res, next) => {
	const { id, id_prod } = req.params;
	const result = await carritoContainer.removeFromCart(id, id_prod);
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
