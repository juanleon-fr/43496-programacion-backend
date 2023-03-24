import { model } from 'mongoose';
import orderModel from '../models/orderModel.js';

class MongoContainer {
	constructor(modelDat) {
		this.model = model(modelDat.name, modelDat.schema);
		this.schema = modelDat.schema;
	}

	assignId = async () => {
		let id;

		const thisList = await this.getAll();
		if (thisList.length === 0) {
			id = 1;
		} else {
			const lastElement = thisList.slice(-1)[0];
			id = lastElement.id + 1;
		}
		return id;
	};

	getAll = async () => {
		const objs = await this.model.find().sort({ id: 1 });
		return objs;
	};

	getById = async (id) => {
		const res = await this.model.find({ id: id });
		if (res.length > 0) {
			return res[0];
		}
		return null;
	};

	saveNew = async (obj) => {
		obj.id = await this.assignId();
		obj.timestamp = Date.now();
		const res = await this.model.create(obj);
		return res;
	};

	updateById = async (id, body) => {
		const result = await this.model.updateOne({ id: id }, body, { new: true });
		return result;
	};

	deleteById = async (id) => {
		const res = await this.model.deleteOne({ id: id });
		return res;
	};

	deleteAll = async () => {
		const res = await this.model.deleteMany({});
		return res;
	};

	newCart = async (id, prods) => {
		let cart = {};

		cart.id = id;
		cart.timestamp = Date.now();
		cart.products = prods;
		const res = await this.model.create(cart);
		return res;
	};

	addToCart = async (id, cart) => {
		return await this.updateById(id, cart);
	};

	removeCart = async (id) => {
		const res = await this.model.deleteMany({ id: id });
		return { success: true, res: res };
	};

	removeFromCart = async (id, id_prod) => {
		let cart = await this.getById(id);
		cart.products = cart.products.filter((element) => element.id != id_prod);
		return this.updateById(id, { products: cart.products });
	};

	placeOrder = async (cart) => {
		const res = await orderModel.create(cart);
		return res;
	};
}

export default MongoContainer;
