const FbContainer = require('../../classes/FbContainer');

class ProductosDaoFb extends FbContainer {
	constructor() {
		super('products');
		console.log('Usando Firebase Firestore');
	}
}

module.exports = ProductosDaoFb;
