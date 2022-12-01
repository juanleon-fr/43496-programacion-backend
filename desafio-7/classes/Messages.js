const { optionsSQLite } = require("../options/sqlite.js");

const errMessage = (err, func) => {
	console.log(`Se ha producido un error al ejecutar ${func}\n ${err}`);
};

class Messages {
	constructor(table) {
		this.table = table;
	}

	getAll = async () => {
		try {
			const productList = await knex(this.table).select('*');
			if (productList.length > 0) {
				return productList;
			} else {
				return [];
			}
		} catch (err) {
			errMessage(err, 'getAll');
		}
	};

	save = async (product) => {
		await knex(this.table)
			.insert(product)
			.then(() => console.log('Insert succsessful. Insert detail:', product))
			.catch((err) => {
				console.log(err);
				throw err;
			});
	};

	deleteById = async (id) => {
		try {
			await knex(this.table)
				.where('id', id)
				.del()
				.then(() => console.log('Producto eliminado'));
		} catch (e) {
			console.log(e);
		}
	};

	deleteAll = async () => {
		knex
			.from(this.table)
			.del()
			.then(() => console.log('Productos eliminados'))
			.catch((err) => {
				console.log(err);
				throw err;
			})
			.finally(() => {
				knex.destroy();
			});
	};
}

module.exports = Messages;
