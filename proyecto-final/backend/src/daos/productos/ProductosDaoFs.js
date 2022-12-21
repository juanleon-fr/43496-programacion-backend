const FsContainer = require('../../classes/FsContainer');

class ProductosDaoFs extends FsContainer {
	constructor() {
		super('src/db/productos.json');
		console.log('Usando arvhivos');
	}
}

module.exports = ProductosDaoFs;
