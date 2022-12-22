const MongoContainer = require('../../classes/MongoContainer');
const productModel = require('../../models/productModel.js');
const name = productModel.productCollection;
const schema = productModel.productSchema;

class ProductosDaoMongo extends MongoContainer {
	constructor() {
		super({
			name: name,
			schema: schema,
		});
		console.log('usando MongoDB');
	}
}

module.exports = ProductosDaoMongo;
