const FsContainer = require('../../classes/FsContainer');

class ProductosDaoFs extends FsContainer {
	constructor() {
		super('src/db/productos.json');
		console.log('Usando Firebase Firestore');
	}
}

module.exports = ProductosDaoFs;
