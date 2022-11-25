const fs = require('fs');

const errMessage = (err, func) => {
	console.log(`Se ha producido un error al ejecutar ${func}\n ${err}`);
};

class carritoContainer {
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
		cart.timestamp = body.timestamp;
		cart.productos = body.productos;
		save(cart);
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
		if (cartfind === { error: 'carrito no encontrado' }) {
			cartList = [...cartList, cart];
		} else {
			const index = cartList.findIndex((element) => element.id == cart.id);
			cartList[index] = cart;
		}
		await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(cartList));
		return [{ success: true, cartList: cartList }];
	};

	getById = async (id) => {
		try {
			let cartList = await this.getAll();
			console.log(cartList)
			const cartFound = cartList.find((element) => element.id === Number(id));
			if (cartFound) return cartFound;
			return { error: 'carrito no encontrado' };
		} catch (err) {
			errMessage(err, 'getById');
		}
	};

	cartInit = async (id) => {
		try {
			const cartfind = await this.getById(id);
			if (cartfind === { error: 'carrito no encontrado' }) {
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

	addToCart = async (id, producto) => {
		let cart = await this.cartInit(id);
		let productInCart = cart.productos.find((element) => element.id == producto.id);
		if (typeof productInCart === 'object') return [{ success: false, issue: 'product already in cart' }];
		cart.productos = [...cart.productos, producto];
		this.save(cart);
	};

	removeFromCart = async (id, producto) => {
		let cart = await this.cartInit(id);
		cart.productos = cart.productos.filter();
	};

	updateById = async (id, title, price, thumbnail) => {
		try {
			let result = await this.getById(id);
			if (result.error === 'carrito no encontrado') {
				return result;
			}
			let cartList = await this.getAll();
			console.log({ cartList });
			if (isNaN(price)) return { error: 'El precio debe ser un número válido' };
			const itemIndex = cartList.findIndex((element) => element.id === Number(id));
			cartList[itemIndex] = {
				title: title,
				price: Number(price),
				thumbnail: thumbnail,
				id: Number(id),
			};
			await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(cartList));
			return 'updated';
		} catch (err) {
			errMessage(err, 'save');
		}
	};

	deleteById = async (id) => {
		try {
			let result = await this.getById(id);
			if (result.error === 'carrito no encontrado') {
				return result;
			}
			let cartList = await this.getAll();
			const newCartList = cartList.filter((element) => element.id !== Number(id));
			await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(newCartList));
			return 'deleted';
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

module.exports = carritoContainer;
