const { model } = require('mongoose');
const connectMongo = require('../connectMongo.js');
const url = 'mongodb+srv://jleonh:xhGr4Un65dLApsiH@backend-coder.bazq5t4.mongodb.net/?retryWrites=true&w=majority';

//logger
const path = require('path');
const winston = require('winston');
const logDir = './performance/logs';
const logger = winston.createLogger({
	level: 'warn',
	transports: [new winston.transports.Console({ level: 'info' }), new winston.transports.File({ filename: path.join(logDir, 'warn.log'), level: 'warn' }), new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' })],
});

// const errMessage = (err, func) => {
// 	console.log(`Se ha producido un error al ejecutar ${func}\n ${err}`);
// };

class Contenedor {
	constructor(modelDat) {
		this.model = model(modelDat.name, modelDat.schema);
		connectMongo(url);
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
			// return errMessage(err, 'assignId');
		}
	};

	getAll = async (req) => {
		try {
			const objs = this.model.find();
			logger.log('info', `${Date.now()} ${req.method} '${req.originalUrl}'`);
			return objs;
		} catch (err) {
			logger.log('error', `${Date.now()} ${req.method} '${req.originalUrl}'`);
		}
	};

	getById = async (id, req) => {
		try {
			const res = await this.model.find({ id: id });
			if (res.length > 0) {
				return res[0];
			}
			logger.log('info', `${Date.now()} ${req.method} '${req.originalUrl}'`);
			return { error: 'producto no encontrado' };
		} catch (err) {
			logger.log('error', `${Date.now()} ${req.method} '${req.originalUrl}'`);
		}
	};

	save = async (obj, req) => {
		try {
			obj.id = await this.assignId();
			obj.timestamp = Date.now();
			const res = await this.model.create(obj);
			logger.log('info', `${Date.now()} ${req.method} '${req.originalUrl}'`);
			return res;
		} catch (err) {
			// errMessage(err, 'saveNew');
			logger.log('error', `${Date.now()} ${req.method} '${req.originalUrl}'`);
		}
	};

	updateById = async (id, body, req) => {
		try {
			const docUpdate = await this.model.updateOne({ id: id }, body, { new: true });
			const res = { ...docUpdate, updated: this.getById(id) };
			logger.log('info', `${Date.now()} ${req.method} '${req.originalUrl}'`);
			return res;
		} catch (err) {
			logger.log('error', `${Date.now()} ${req.method} '${req.originalUrl}'`);
		}
	};

	deleteById = async (id, req) => {
		try {
			const deleted = await this.model.find({ id: id });
			const res = await this.model.find({ id: id }).remove();
			logger.log('info', `${Date.now()} ${req.method} '${req.originalUrl}'`);
			return { success: true, res: res, deleted: deleted[0] };
		} catch (err) {
			logger.log('error', `${Date.now()} ${req.method} '${req.originalUrl}'`);
		}
	};

	deleteAll = async (req) => {
		try {
			const res = await this.model.deleteMany({});
			logger.log('info', `${Date.now()} ${req.method} '${req.originalUrl}'`);
			return { success: true, res: res };
		} catch (err) {
			logger.log('error', `${Date.now()} ${req.method} '${req.originalUrl}'`);
		}
	};

	newCart = async (body, req) => {
		let cart = {};
		try {
			cart.id = await this.assignId();
			cart.timestamp = Date.now();
			cart.products = body.products;
			const res = await this.model.create(cart);
			return res;
		} catch (err) {
			// errMessage(err, 'newCart');
		}
	};

	addToCart = async (id, product, req) => {
		try {
			let cart = await this.getById(id);
			const found = cart.products.find((element) => element.id === product.id);
			if (typeof found !== 'undefined') {
				return [{ success: false, issue: 'product already in cart' }];
			}
			cart.products.push(product);
			return this.updateById(id, cart);
		} catch (err) {
			// errMessage(err, 'addToCart');
		}
	};

	removeFromCart = async (id, id_prod, req) => {
		try {
			let cart = await this.getById(id);
			if (isNaN(id_prod)) return [{ success: false, issue: 'invalid id' }];
			let productInCart = cart.products.find((element) => element.id === Number(id_prod));
			if (typeof productInCart === 'undefined') return [{ success: false, issue: 'product not present in cart' }];
			cart.products = cart.products.filter((element) => element.id != id_prod);
			return this.updateById(id, cart);
		} catch (err) {
			// errMessage(err, 'removeFromCart');
		}
	};
}

module.exports = Contenedor;
