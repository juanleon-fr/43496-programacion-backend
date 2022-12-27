import FsContainer from '../../classes/FsContainer.js';

class ProductosDaoFs extends FsContainer {
	constructor() {
		super('src/db/productos.json');
		console.log('Usando archivos');
	}
}

export default ProductosDaoFs;
