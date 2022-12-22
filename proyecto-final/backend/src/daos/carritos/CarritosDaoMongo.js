const MongoContainer = require('../../classes/MongoContainer');
const cartModel = require('../../models/cartModel.js');
const name = cartModel.cartCollection;
const schema = cartModel.cartSchema;

class CarritosDaoMongo extends MongoContainer {
	constructor() {
		super({
			name: name,
			schema: schema,
		});
	}
}

module.exports = CarritosDaoMongo;