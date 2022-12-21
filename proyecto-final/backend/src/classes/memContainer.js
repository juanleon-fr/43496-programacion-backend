let productList = require('../api/productos.json');
let cartList = require('../api/carritos.json');

class ProductosContainer {
	getAll = () => {
		return productList;
	};

	save = (item) => {
		if (isNaN(item.price)) return { error: 'El precio debe ser un número válido' };
		if (productList.length === 0) {
			item.id = 1;
		} else {
			const lastElement = productList.slice(-1)[0];
			item.id = lastElement.id + 1;
		}
		item.timestamp = Date.now();
		productList = [...productList, item];
		return item;
	};

	getById = (id) => {
		const itemFound = productList.find((element) => element.id === Number(id));
		if (itemFound) return itemFound;
		return { error: 'producto no encontrado' };
	};

	updateById = (id, body) => {
		let result = this.getById(id);
		if (result.error === 'producto no encontrado') {
			return result;
		}
		const itemIndex = productList.findIndex((element) => element.id === Number(id));
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
		productList[itemIndex] = {
			...productList[itemIndex],
			...setItem,
		};
		productList[itemIndex].timestamp = Date.now();
		return 'updated';
	};

	deleteById = (id) => {
		let result = this.getById(id);
		if (result.error === 'producto no encontrado') {
			return result;
		}
		productList = productList.filter((element) => element.id !== Number(id));
		fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(newProducts));
		return 'deleted';
	};

	deleteAll = () => {
		productList = [];
	};
}

class CarritoContainer {
	assignId = () => {
		let id;
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

	getAll = () => {
		return cartList;
	};

	save = (cart) => {
		const cartfind = this.getById(cart.id);
		if (cartfind.hasOwnProperty('error')) {
			cartList = [...cartList, cart];
		} else {
			const index = cartList.findIndex((element) => element.id == cart.id);
			cartList[index] = cart;
		}
		return { success: true, cartList: cartList };
	};

	getById = (id) => {
		const cartFound = cartList.find((element) => element.id === Number(id));
		if (cartFound) return cartFound;
		return { success: false, error: 'carrito no encontrado' };
	};

	cartInit = (id) => {
		const cartfind = this.getById(id);
		if (cartfind.hasOwnProperty('error')) {
			cart.id = this.assignId();
			cart.timestamp = Date.now();
			cart.productos = [];
			return cart;
		}
		return cartfind;
	};

	addToCart = (id, id_prod) => {
		const producto = productList.find((element) => element.id == id_prod);
		let cart = this.getById(id);
		if (cart.hasOwnProperty('error')) return cart;
		let productInCart = cart.productos.find((element) => element.id == producto.id);
		if (typeof productInCart === 'object') return [{ success: false, issue: 'product already in cart' }];
		cart.productos = [...cart.productos, producto];
		return this.save(cart);
	};

	removeFromCart = (id, id_prod) => {
		let cart = this.getById(id);
		let productInCart = cart.productos.find((element) => element.id == id_prod);
		if (typeof productInCart !== 'object') return [{ success: false, issue: 'product not present in cart' }];
		cart.productos = cart.productos.filter((element) => element.id != id_prod);
		return this.save(cart);
	};

	deleteById = (id) => {
		let result = this.getById(id);
		if (result.hasOwnProperty('error')) {
			return result;
		}
		let cartList = this.getAll();
		const newCartList = cartList.filter((element) => element.id !== Number(id));
		fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(newCartList));
		return { success: true, cartList: newCartList };
	};

	deleteAll = () => {
		cartList = [];
	};
}

module.exports = { CarritoContainer, ProductosContainer };
