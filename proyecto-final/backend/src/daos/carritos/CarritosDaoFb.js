const FbContainer = require('../../classes/FbContainer');

class CarritosDaoFb extends FbContainer {
	constructor() {
		super('carts');
	}
}

module.exports = CarritosDaoFb;
