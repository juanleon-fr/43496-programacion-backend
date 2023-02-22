import MemContainer from '../../classes/MemContainer.js';

class ProductosDaoMem extends MemContainer {
	constructor() {
		super('../db/productos.json');
	}
}

export default ProductosDaoMem;
