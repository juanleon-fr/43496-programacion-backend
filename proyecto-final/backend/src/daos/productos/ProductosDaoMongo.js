const FsContainer = require('../../classes/FsContainer');

class ProductosDaoFs extends FsContainer {
	constructor() {
		super('src/db/productos.json');
		console.log('Usando MongoDB');
	}
}

module.exports = ProductosDaoFs;
