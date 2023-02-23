import instancia from '../daos/index.js';
const carts = new instancia.carritos();
const products = new instancia.productos();

const newCart = async (req, res, next) => {
	const { body } = req;
	body.id = req.session.passport.user;
	const cartExists = await carts.getById(body.id);
	cartExists.id != undefined ? res.send('cart already created') : res.json(await carts.newCart(body));
	// res.send(await carts.newCart(body));
	// (await carts.getById(body.id)) == { error: 'producto no encontrado' } ? res.send('cart already created') : res.json(await carts.newCart(body));
};

// const deleteCartByIdOld = async (req, res, next) => {
// 	const { id } = req.params;
// 	const result = await carts.deleteById(id);
// 	res.json(result);
// };

const deleteCartById = async (req, res, next) => {
	const id = req.session.passport.user;
	const result = await carts.deleteById(id);
	res.json(result);
};

// const getCartItemsByIdOld = async (req, res, next) => {
// 	const { id } = req.params;
// 	const cart = await carts.getById(id);
// 	res.json(cart.products);
// };

const getCartItemsById = async (req, res, next) => {
	const id = req.session.passport.user;
	const cart = await carts.getById(id);
	res.json(cart.products);
};

const getCarts = async (req, res, next) => {
	const cartList = await carts.getAll();
	res.json(cartList);
};

const newCartItemById = async (req, res, next) => {
	const id = req.session.passport.user;
	const { id_prod } = req.params;
	const producto = await products.getById(id_prod);
	const cart = await carts.addToCart(id, producto);
	res.json(cart);
};

// const newCartItemByIdOld = async (req, res, next) => {
// 	const { id } = req.params;
// 	const body = req.body;
// 	const producto = await products.getById(body.id_prod);
// 	const cart = await carts.addToCart(id, producto);
// 	res.json(cart);
// };

const deleteCartItemById = async (req, res, next) => {
	const { /*idOld,*/ id_prod } = req.params;
	const id = req.session.passport.user;
	const result = await carts.removeFromCart(id, id_prod);
	res.json(result);
};

const createOrder = async (req, res, next) => {
	const id = req.session.passport.user;
	const doc = await carts.getById(id);
	const cart = { ...doc._doc };
	delete cart._id;
	if (cart.id != undefined) {
		if (cart.products !== []) {
			const order = await carts.placeOrder(cart);
			await carts.removeCart(id);
			return res.json(order);
		}
		return res.send('no items in that cart');
	}
	return res.send('no such cart');
};

const emptyCart = async (req, res, next) => {
	const id = req.session.passport.user;
	await carts.placeOrder(id);
	res.json(result);
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
