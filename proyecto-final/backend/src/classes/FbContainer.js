const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../../credentials.json');

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
		try {
			const thisList = await this.getAll();
			if (thisList.length === 0) {
				id = 1;
			} else {
				const lastElement = thisList.slice(-1)[0];
				id = lastElement.id + 1;
			}
			return id;
		} catch (err) {
			errMessage(err, 'assignId');
		}
	};

	getAll = async () => {
		let list = [];
		try {
			const querySnapshot = await this.collection.orderBy('id', 'asc').get();
			querySnapshot.forEach((doc) => {
				list.push(doc.data());
			});
			return list;
		} catch (err) {
			errMessage(err, 'getAll');
		}
	};

	saveNew = async (obj) => {
		try {
			obj.id = await this.assignId();
			obj.timestamp = Date.now();
			const res = await this.collection.doc(`${obj.id}`).set(obj);
			return res;
		} catch (err) {
			errMessage(err, 'saveNew');
		}
	};

	getById = async (id) => {
		try {
			let docFetch;
			const snapshot = await this.collection.where('id', '==', Number(id)).get();
			snapshot.forEach((doc) => {
				docFetch = doc.data();
			});
			return docFetch;
		} catch (err) {
			errMessage(err, 'getById');
		}
	};

	updateById = async (id, obj) => {
		try {
			const doc = this.collection.doc(`${id}`);
			let res = await doc.update(obj);
			return res;
		} catch (err) {
			errMessage(err, 'updateById');
		}
	};

	deleteById = async (id) => {
		try {
			console.log(obj);
			const res = await this.collection.doc(`${id}`).delete();
			return res;
		} catch (err) {
			errMessage(err, 'deleteById');
		}
	};

	deleteAll = async () => {
		try {
			const col = this.collection.doc();
			const res = await col.delete();
			return res;
		} catch (err) {
			errMessage(err, 'deleteAll');
		}
	};

	newCart = async (body) => {
		let cart = {};
		cart.id = await this.assignId();
		cart.timestamp = Date.now();
		cart.products = body.products;
		try {
			const res = await this.collection.doc(`${cart.id}`).set(cart);
			return res;
		} catch (err) {
			errMessage(err, 'newCart');
		}
	};

	addToCart = async (id, product) => {
		try {
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
		} catch (err) {
			errMessage(err, 'addToCart');
		}
	};

	removeFromCart = async (id, id_prod) => {
		try {
			let cart = await this.getById(id);
			if (isNaN(id_prod)) return { success: false, issue: 'invalid id' };
			if (typeof cart === 'undefined') {
				return { success: false, issue: 'cart not found' };
			}
			let productInCart = cart.products.find((element) => element.id === Number(id_prod));
			if (typeof productInCart === 'undefined') return { success: false, issue: 'product not present in cart' };
			cart.products = cart.products.filter((element) => element.id != id_prod);
			return this.updateById(id, cart);
		} catch (err) {
			errMessage(err, 'removeFromCart');
		}
	};

	// guardartodo = async () => {
	// 	const arr = require('../db/productos.json');
	// 	arr.forEach((obj) => {
	// 		setTimeout(() => {
	// 			this.saveNew(obj);
	// 		}, 1000);
	// 	});
	// };
}

module.exports = FbContainer;
