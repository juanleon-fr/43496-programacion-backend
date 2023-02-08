const mongoose = require('mongoose');
const model = require('../models/messageModel');

const connectMongo = require('../connectMongo.js');
const url = 'mongodb+srv://jleonh:xhGr4Un65dLApsiH@backend-coder.bazq5t4.mongodb.net/?retryWrites=true&w=majority';

const errMessage = (err, func) => {
	console.log(`Se ha producido un error al ejecutar ${func}\n (mensajes) ${err}`);
};

class Messages {
	constructor() {
		this.model = mongoose.model(model.messageCollection, model.messageSchema);
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
			errMessage(err, 'assignId');
		}
	};

	getAll = async () => {
		try {
			const objs = await this.model.find();
			return objs;
		} catch (err) {
			errMessage(err, 'getAll');
		}
	};

	save = async (obj) => {
		try {
			obj.id = await this.assignId();
			const res = await this.model.create(obj);
			return res;
		} catch (err) {
			errMessage(err, 'saveNew');
		}
	};

	deleteById = async (id) => {
		try {
			const deleted = this.model.find({ id: id });
			const res = this.model.find({ id: id }).remove();
			return { success: true, res: res, deleted: deleted[0] };
		} catch (err) {
			errMessage(err, 'deleteById');
		}
	};

	deleteAll = async () => {
		try {
			const res = this.model.deleteMany({});
			return { success: true, res: res };
		} catch (err) {
			errMessage(err, 'deleteAll');
		}
	};
}

module.exports = Messages;
