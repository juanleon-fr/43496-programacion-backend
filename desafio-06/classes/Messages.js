const fs = require('fs');

const errMessage = (err, func) => {
	console.log(`Se ha producido un error al ejecutar ${func}\n ${err}`);
};

class Messages {
	constructor() {
		this.filePath = 'api/mensajes.json';
	}

	getAll = async () => {
		try {
			const readfile = await fs.promises.readFile(this.filePath);
			const productos = JSON.parse(readfile);
			return productos;
		} catch (err) {
			console.log(err);
		}
	};

	// syncGetAll = () => {
	// 	try {
	// 		const readfile = fs.readFileSync(this.filePath);
	// 		const productos = JSON.parse(readfile);
	// 		return productos;
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	save = async (msg) => {
		try {
			let msgList = await this.getAll();
			if (msgList.length === 0) {
				msg.id = 1;
			} else {
				const lastElement = msgList.slice(-1)[0];
				msg.id = lastElement.id + 1;
			}
			msgList = [...msgList, msg];
			console.log(msgList)
			await fs.promises.writeFile(`./${this.filePath}`, JSON.stringify(msgList));
			return;
		} catch (err) {
			errMessage(err, 'save');
		}
	};

	// getById = async (id) => {
	// 	try {
	// 		let msgList = await this.getAll();
	// 		const msgFound = msgList.find((element) => element.id === Number(id));
	// 		if (msgFound) return msgFound;
	// 		return { error: 'producto no encontrado' };
	// 	} catch (err) {
	// 		errMessage(err, 'getById');
	// 	}
	// };

	// updateById = async (id, title, price, thumbnail) => {
	// 	try {
	// 		let result = await this.getById(id);
	// 		if (result.error === 'producto no encontrado') {
	// 			return result;
	// 		}
	// 		let list = await this.getAll();
	// 		console.log({ list });
	// 		if (isNaN(price)) return { error: 'El precio debe ser un número válido' };
	// 		const itemIndex = list.findIndex((element) => element.id === Number(id));
	// 		list[itemIndex] = {
	// 			title: title,
	// 			price: Number(price),
	// 			thumbnail: thumbnail,
	// 			id: Number(id),
	// 		};
	// 		await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(list));
	// 		return 'updated';
	// 	} catch (err) {
	// 		errMessage(err, 'save');
	// 	}
	// };

	// deleteById = async (id) => {
	// 	try {
	// 		let result = await this.getById(id);
	// 		if (result.error === 'producto no encontrado') {
	// 			return result;
	// 		}
	// 		let list = await this.getAll();
	// 		const newProducts = list.filter((element) => element.id !== Number(id));
	// 		await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(newProducts));
	// 		return 'deleted';
	// 	} catch (err) {
	// 		errMessage(err, 'deleteById');
	// 	}
	// };

	// deleteAll = async () => {
	// 	try {
	// 		fs.promises.writeFile(`./${this.fileName}`, JSON.stringify([]));
	// 	} catch (err) {
	// 		errMessage(err, 'deleteAll');
	// 	}
	// };
}

module.exports = Messages;
