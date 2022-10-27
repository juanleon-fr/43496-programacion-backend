const fs = require('fs')

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

const archivo = new Contenedor('productos.json');

async function prueba() {
	await archivo.save({
		title: 'Calculadora',
		price: 234.56,
		thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
	});

	await archivo.save({
		title: 'Escuadra',
		price: 123.45,
		thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
	});

	await archivo.save({
		title: 'Globo Terráqueo',
		price: 345.67,
		thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
	});

	console.log(await archivo.getAll());

	console.log(await archivo.getById(1));

	await archivo.deleteById(2);

	await archivo.save({
		title: 'Mortadela',
		price: 3333,
		thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
	});

	console.log(await archivo.getAll());

	await archivo.deleteAll();

	console.log(await archivo.getAll());
}

prueba();
