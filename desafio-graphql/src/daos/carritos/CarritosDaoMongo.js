import MongoContainer from '../../classes/MongoContainer.js';
import cartModel from '../../models/cartModel.js';
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

export default CarritosDaoMongo;
