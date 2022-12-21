const FsContainer = require('../../classes/FsContainer');

class CarritosDaoFs extends FsContainer {
	constructor() {
		super('src/db/carritos.json');
	}
}

module.exports = CarritosDaoFs;
