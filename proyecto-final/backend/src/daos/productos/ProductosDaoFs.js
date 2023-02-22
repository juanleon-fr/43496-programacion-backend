import FsContainer from '../../classes/FsContainer.js';

class ProductosDaoFs extends FsContainer {
	constructor() {
		super('src/db/productos.json');
	}
}

export default ProductosDaoFs;
