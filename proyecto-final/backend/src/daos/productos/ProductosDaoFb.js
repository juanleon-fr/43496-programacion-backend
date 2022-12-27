import FbContainer from '../../classes/FbContainer.js';

class ProductosDaoFb extends FbContainer {
	constructor() {
		super('products');
		console.log('Usando Firebase Firestore');
	}
}

export default ProductosDaoFb;
