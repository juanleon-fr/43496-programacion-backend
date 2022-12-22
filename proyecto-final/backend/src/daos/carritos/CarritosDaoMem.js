const MemContainer = require('../../classes/MemContainer');

class CarritosDaoMem extends MemContainer {
	constructor() {
		super('../db/carritos.json');
	}
}

module.exports = CarritosDaoMem;
