const fs = require('fs');

const errMessage = (err, func) => {
	console.log(`Se ha producido un error al ejecutar ${func}\n ${err}`);
};

class ProductosContainer {
	constructor() {
		this.fileName = 'src/api/productos.json';
	}

	getAll = async () => {
		try {
			const file = await fs.promises.readFile(`./${this.fileName}`, 'utf-8');
			const list = JSON.parse(file);
			return list;
		} catch (err) {
			errMessage(err, 'getAll');
		}
	};

	save = async (item) => {
		try {
			if (isNaN(item.price)) return { error: 'El precio debe ser un número válido' };
			let list = await this.getAll();
			if (list.length === 0) {
				item.id = 1;
			} else {
				const lastElement = list.slice(-1)[0];
				item.id = lastElement.id + 1;
			}
			item.timestamp = Date.now();
			list = [...list, item];
			await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(list));
			return item;
		} catch (err) {
			errMessage(err, 'save');
		}
	};

	getById = async (id) => {
		try {
			let list = await this.getAll();
			const itemFound = list.find((element) => element.id === Number(id));
			if (itemFound) return itemFound;
			return { error: 'producto no encontrado' };
		} catch (err) {
			errMessage(err, 'getById');
		}
	};

	updateById = async (id, body) => {
		try {
			let result = await this.getById(id);
			if (result.error === 'producto no encontrado') {
				return result;
			}
			let list = await this.getAll();
			const itemIndex = list.findIndex((element) => element.id === Number(id));
			const setItem = { ...body };
			delete setItem.id;
			if (body.price !== undefined) {
				if (isNaN(body.price)) return { error: 'El precio debe ser un número válido' };
				setItem.price = Number(body.price);
			}
			if (body.stock !== undefined) {
				if (isNaN(body.stock)) return { error: 'El stock debe ser un número válido' };
				setItem.stock = Number(body.stock);
			}
			list[itemIndex] = {
				...list[itemIndex],
				...setItem,
			};
			list[itemIndex].timestamp = Date.now();
			await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(list));
			return 'updated';
		} catch (err) {
			errMessage(err, 'save');
		}
	};

	deleteById = async (id) => {
		try {
			let result = await this.getById(id);
			if (result.error === 'producto no encontrado') {
				return result;
			}
			let list = await this.getAll();
			const newProducts = list.filter((element) => element.id !== Number(id));
			await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(newProducts));
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

module.exports = { CarritoContainer, ProductosContainer };
