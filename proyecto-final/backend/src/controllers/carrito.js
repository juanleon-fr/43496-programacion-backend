const routerProductos = require('../routes/productos');
const CarritoContainer = require('../classes/CarritoContainer');
const Contenedor = require('../classes/Contenedor');
const carritoContainer = new CarritoContainer();
const products = new Contenedor();

const newCartList = (prop) => {
	if (prop === []) {
		return []
	}
}


const newCart = async (req, res, next) => {
	const { body } = req;
	res.json(await carritoContainer.save(body));
};

const deleteCartById = async (req, res, next) => {
	const { id } = req.params;
	const result = await carritoContainer.deleteById(id);
	if (result === 'deleted') {
		res.json({
			success: true,
			msg: 'Carrito eliminado.',
		});
	} else {
		res.json(result);
	}
};

const getCartItemsById = async (req, res, next) => {
	const { id } = req.params;
	const cart = await carritoContainer.getById(id);
	res.json(cart);
};

const getCarts = async (req, res, next) => {
	const cartList = await carritoContainer.getAll();
	res.json(cartList);
};

const newCartItemById = async (req, res, next) => {
	const { id } = req.params;
	const { body } = req;
	console.log(body);
	const cartItem = body;
	
	res.json(await carritoContainer.save(cartItem));
};

const deleteCartItemById = async (req, res, next) => {
	const { id } = req.params;
	const result = await carritoContainer.deleteById(id);
	if (result === 'deleted') {
		res.json({
			success: true,
			msg: 'Producto eliminado.',
		});
	} else {
		res.json(result);
	}
};

module.exports = {
	newCart,
	deleteCartById,
	getCartItemsById,
	getCarts,
	newCartItemById,
	deleteCartItemById,
};
