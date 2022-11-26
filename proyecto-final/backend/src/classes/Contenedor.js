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
			item.timestamp = Date.now();
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

	updateById = async (id, body) => {
		try {
			let result = await this.getById(id);
			if (result.error === 'producto no encontrado') {
				return result;
			}
			let list = await this.getAll();
			const itemIndex = list.findIndex((element) => element.id === Number(id));
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
			list[itemIndex] = {
				...list[itemIndex],
				...setItem,
			};
			list[itemIndex].timestamp = Date.now();
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
