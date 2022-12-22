const MemContainer = require('../../classes/MemContainer');

class ProductosDaoMem extends MemContainer {
	constructor() {
		super('../db/productos.json');
		console.log('Usando memoria');
	}
}

module.exports = ProductosDaoMem;
