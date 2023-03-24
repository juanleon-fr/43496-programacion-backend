import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { readFile } from 'fs/promises';
const serviceAccount = JSON.parse(await readFile(new URL('../../credentials.json', import.meta.url)));

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

class FbContainer {
	constructor(collection) {
		this.collection = db.collection(collection);
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
		let list = [];

		const querySnapshot = await this.collection.orderBy('id', 'asc').get();
		querySnapshot.forEach((doc) => {
			list.push(doc.data());
		});
		return list;
	};

	saveNew = async (obj) => {
		obj.id = await this.assignId();
		obj.timestamp = Date.now();
		const res = await this.collection.doc(`${obj.id}`).set(obj);
		return res;
	};

	getById = async (id) => {
		let docFetch;
		const snapshot = await this.collection.where('id', '==', Number(id)).get();
		snapshot.forEach((doc) => {
			docFetch = doc.data();
		});
		return docFetch;
	};

	updateById = async (id, obj) => {
		const doc = this.collection.doc(`${id}`);
		let res = await doc.update(obj);
		return res;
	};

	deleteById = async (id) => {
		const res = await this.collection.doc(`${id}`).delete();
		return res;
	};

	deleteAll = async () => {
		const col = this.collection.doc();
		const res = await col.delete();
		return res;
	};

	newCart = async (body) => {
		let cart = {};
		cart.id = await this.assignId();
		cart.timestamp = Date.now();
		cart.products = body.products;

		const res = await this.collection.doc(`${cart.id}`).set(cart);
		return res;
	};

	addToCart = async (id, product) => {
		let cart = await this.getById(id);
		if (typeof cart === 'undefined') {
			return { success: false, issue: 'cart not found' };
		}
		const found = cart.products.find((element) => element.id === product.id);
		if (typeof found !== 'undefined') {
			return { success: false, issue: 'product already in cart' };
		}
		cart.products.push(product);
		return this.updateById(id, cart);
	};

	removeFromCart = async (id, id_prod) => {
		let cart = await this.getById(id);
		if (isNaN(id_prod)) return { success: false, issue: 'invalid id' };
		if (typeof cart === 'undefined') {
			return { success: false, issue: 'cart not found' };
		}
		let productInCart = cart.products.find((element) => element.id === Number(id_prod));
		if (typeof productInCart === 'undefined') return { success: false, issue: 'product not present in cart' };
		cart.products = cart.products.filter((element) => element.id != id_prod);
		return this.updateById(id, cart);
	};

	placeOrder = async (cart) => {
		const res = await orderModel.create(cart);
		return res;
	};
}

export default FbContainer;
