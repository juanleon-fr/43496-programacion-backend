const createProd = require('../db/fakeProds');

class ContenedorFake {
	getAll(n) {
		let fakeProducts = [];
		for (let index = 0; index < n; index++) {
			const newProduct = createProd();

			fakeProducts.push(newProduct);
		}
		return fakeProducts;
	}
}
module.exports = ContenedorFake;
