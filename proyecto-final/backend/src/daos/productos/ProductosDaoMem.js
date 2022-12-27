import MemContainer from '../../classes/MemContainer.js';

class ProductosDaoMem extends MemContainer {
	constructor() {
		super('../db/productos.json');
		console.log('Usando memoria');
	}
}

export default ProductosDaoMem;
