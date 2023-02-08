const { faker } = require('@faker-js/faker');
faker.locale = 'es';

function createProd() {
	return {
		id: faker.datatype.uuid(),
		title: faker.commerce.product(),
		price: faker.commerce.price(3500, 6000),
		thumbnail: faker.image.fashion(100, 100),
	};
}

module.exports = createProd;
