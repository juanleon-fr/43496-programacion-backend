const fs = require('fs');

const errMessage = (err, func) => {
	console.log(`Se ha producido un error al ejecutar ${func}\n ${err}`);
};

class Contenedor {
	constructor(fileName) {
		this.fileName = fileName;
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
			let list = await this.getAll();
			if (list.length === 0) {
				item.id = 1;
			} else {
				const lastElement = list.slice(-1)[0];
				item.id = lastElement.id + 1;
			}
			list = [...list, item];
			await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(list));
		} catch (err) {
			errMessage(err, 'save');
		}
	};

	getById = async (id) => {
		try {
			let list = await this.getAll();
			const itemFound = list.find((element) => element.id === id);
			if (itemFound) {
				return itemFound;
			} else {
				console.log(`No hay producto de id: ${id}`);
			}
		} catch (err) {
			errMessage(err, 'getById');
		}
	};

	deleteById = async (id) => {
		try {
			this.getById(id);
			let list = await this.getAll();
			const newProducts = list.filter((element) => element.id !== id);
			await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(newProducts));
		} catch (err) {
			errMessage(err, 'deleteById');
		}
	};

	deleteAll = (async) => {
		try {
			fs.promises.writeFile(`./${this.fileName}`, JSON.stringify([]));
		} catch (err) {
			errMessage(err, 'deleteAll');
		}
	};
}

module.exports = Contenedor;