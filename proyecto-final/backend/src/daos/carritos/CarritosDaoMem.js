const FsContainer = require('../../classes/FsContainer');

class CarritosDaoFs extends FsContainer {
	constructor() {
		super('src/db/productos.json');
	}
}

module.exports = CarritosDaoFs;
