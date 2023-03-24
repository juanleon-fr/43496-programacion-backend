import MongoContainer from '../../classes/MongoContainer.js';
import productModel from '../../models/productModel.js';
const { productCollection, productSchema } = productModel;

class ProductosDaoMongo extends MongoContainer {
	constructor() {
		super({
			name: productCollection,
			schema: productSchema,
		});
	}
}

export default ProductosDaoMongo;
