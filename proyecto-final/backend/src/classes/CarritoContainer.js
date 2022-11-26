const fs = require('fs');
const productList = require('../api/productos.json');

const errMessage = (err, func) => {
	console.log(`Se ha producido un error al ejecutar ${func}\n ${err}`);
};

class CarritoContainer {
	constructor() {
		this.fileName = 'src/api/carritos.json';
	}

	assignId = async () => {
		let id;
		const cartList = await this.getAll();
		if (cartList.length === 0) {
			id = 1;
		} else {
			const lastElement = cartList.slice(-1)[0];
			id = lastElement.id + 1;
		}
		return id;
	};

	newCart = async (body) => {
		let cart = {};
		cart.id = await this.assignId();
		cart.timestamp = Date.now();
		cart.productos = body.productos;
		return this.save(cart);
	};

	getAll = async () => {
		try {
			const file = await fs.promises.readFile(`./${this.fileName}`, 'utf-8');
			const cartList = JSON.parse(file);
			return cartList;
		} catch (err) {
			errMessage(err, 'getAll');
		}
	};

	save = async (cart) => {
		let cartList = await this.getAll();
		const cartfind = await this.getById(cart.id);
		if (cartfind.hasOwnProperty('error')) {
			cartList = [...cartList, cart];
		} else {
			const index = cartList.findIndex((element) => element.id == cart.id);
			cartList[index] = cart;
		}
		await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(cartList));
		return { success: true, cartList: cartList };
	};

	getById = async (id) => {
		try {
			let cartList = await this.getAll();
			const cartFound = cartList.find((element) => element.id === Number(id));
			if (cartFound) return cartFound;
			return { success: false, error: 'carrito no encontrado' };
		} catch (err) {
			errMessage(err, 'getById');
		}
	};

	cartInit = async (id) => {
		try {
			const cartfind = await this.getById(id);
			if (cartfind.hasOwnProperty('error')) {
				cart.id = await this.assignId();
				cart.timestamp = Date.now();
				cart.productos = [];
				return cart;
			}
			return cartfind;
		} catch (err) {
			errMessage(err, 'cartInit');
		}
	};

	addToCart = async (id, id_prod) => {
		const producto = productList.find((element) => element.id == id_prod);
		let cart = await this.getById(id);
		if (cart.hasOwnProperty('error')) return cart;
		let productInCart = cart.productos.find((element) => element.id == producto.id);
		if (typeof productInCart === 'object') return [{ success: false, issue: 'product already in cart' }];
		cart.productos = [...cart.productos, producto];
		return this.save(cart);
	};

	removeFromCart = async (id, id_prod) => {
		let cart = await this.getById(id);
		let productInCart = cart.productos.find((element) => element.id == id_prod);
		if (typeof productInCart !== 'object') return [{ success: false, issue: 'product not present in cart' }];
		cart.productos = cart.productos.filter((element) => element.id != id_prod);
		return this.save(cart);
	};

	deleteById = async (id) => {
		try {
			let result = await this.getById(id);
			if (result.hasOwnProperty('error')) {
				return result;
			}
			let cartList = await this.getAll();
			const newCartList = cartList.filter((element) => element.id !== Number(id));
			await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(newCartList));
			return { success: true, cartList: newCartList };
		} catch (err) {
			errMessage(err, 'deleteById');
		}
	};

	deleteAll = async () => {
		try {
			fs.promises.writeFile(`./${this.fileName}`, JSON.stringify([]));
		} catch (err) {
			errMessage(err, 'deleteAll');
		}
	};
}

module.exports = CarritoContainer;
