const fs = require('fs');

const errMessage = (err, func) => {
	console.log(`Se ha producido un error al ejecutar ${func}\n ${err}`);
};

class Contenedor {
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

	updateById = async (id, title, price, thumbnail) => {
		try {
			let result = await this.getById(id);
			if (result.error === 'producto no encontrado') {
				return result;
			}
			let list = await this.getAll();
			console.log({ list });
			if (isNaN(price)) return { error: 'El precio debe ser un número válido' };
			const itemIndex = list.findIndex((element) => element.id === Number(id));
			list[itemIndex] = {
				title: title,
				price: Number(price),
				thumbnail: thumbnail,
				id: Number(id),
			};
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

module.exports = Contenedor;
