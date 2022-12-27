class MemContainer {
	constructor(route) {
		this.list = require(route);
	}
	assignId = () => {
		let id;
		const thisList = this.getAll();
		if (thisList.length === 0) {
			id = 1;
		} else {
			const lastElement = thisList.slice(-1)[0];
			id = lastElement.id + 1;
		}
		return id;
	};

	getAll = () => {
		return this.list;
	};

	getById = (id) => {
		return this.list.find((element) => element.id === Number(id));
	};

	saveNew = (obj) => {
		obj.id = this.assignId();
		obj.timestamp = Date.now();
		this.list.push(obj);
		return this.list;
	};

	save = (obj) => {
		this.list.push(obj);
		return this.list;
	};

	updateById = (id, body) => {
		let listItem = this.getById(id);
		if (listItem.error === 'producto no encontrado') {
			return listItem;
		}
		const itemIndex = this.getAll().findIndex((element) => element.id === Number(id));
		const setItem = { ...body };
		this.list[itemIndex] = {
			...this.list[itemIndex],
			...setItem,
		};
		this.list[itemIndex].timestamp = Date.now();
		return 'updated';
	};

	deleteById = (id) => {
		let listItem = this.getById(id);
		console.log(listItem);
		if (typeof listItem === 'undefined') {
			return { error: 'item not found' };
		}
		this.list = this.getAll().filter((element) => element.id !== Number(id));
		return { success: true };
	};

	deleteAll = () => {
		this.list = [];
	};

	newCart = (body) => {
		let cart = {};
		cart.id = this.assignId();
		cart.timestamp = Date.now();
		console.log(body);
		cart.products = body.products;
		return this.save(cart);
	};

	addToCart = (id, product) => {
		let cart = this.getById(id);
		if (typeof cart === 'undefined') return { success: false, error: 'Invalid cart id' };
		const productInCart = cart.products.find((element) => element.id === Number(product.id));
		if (typeof productInCart !== 'undefined') return { success: false, issue: 'product already in cart' };
		const cartIndex = this.list.findIndex((element) => element.id === Number(id));
		cart.products.push(product);
		this.list[cartIndex] = cart;
		return { success: true, cart: this.list[cartIndex] };
	};

	removeFromCart = (id, id_prod) => {
		let cart = this.getById(id);
		if (typeof cart === 'undefined') return { success: false, error: 'Could not find cart id' };
		const cartIndex = this.list.findIndex((element) => element.id === Number(id));
		const setCart = cart.products.filter((element) => element.id === id_prod);
		this.list[cartIndex] = setCart;
		return { success: true, cart: this.list[cartIndex].products };
	};
}

export default MemContainer;
