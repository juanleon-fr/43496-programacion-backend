import instancia from '../daos/index.js';
const products = new instancia.productos();

import { logger } from '../utils/winstonLogger.js';

// try {

// } catch (err) {
//     logger.error(err);
// }

const getProdListService = async () => {
	try {
		const result = await products.getAll();
		return result;
	} catch (err) {
		logger.error(err);
		return 'error';
	}
};

const getProdService = async (id) => {
	try {
		const result = await products.getById(id);
		return result;
	} catch (err) {
		logger.error(err);
		return 'error';
	}
};

const newProdService = async (product) => {
	try {
		const check = isProdOk(product);
		if (check[0] == null) {
			return check;
		}
		const result = await products.saveNew(product);
		return result;
	} catch (err) {
		logger.error(err);
		return 'error';
	}
};

const updateProdService = async (id, product) => {
	try {
		const result = await products.updateById(id, product);
		return result;
	} catch (err) {
		logger.error(err);
		return 'error';
	}
};

const deleteProdService = async (id) => {
	try {
		const result = await products.deleteById(id);
		return result;
	} catch (err) {
		logger.error(err);
		return 'error';
	}
};

const isProdOk = (product) => {
	let errMsg = '';
	if (product.title == undefined) {
		errMsg = errMsg.concat('*title/');
	}
	if (product.code == undefined) {
		errMsg = errMsg.concat('*code/');
	}
	if (product.thumbnail == undefined) {
		errMsg = errMsg.concat('*thumbnail/');
	}
	if (product.price == undefined) {
		errMsg = errMsg.concat('*price/');
	}
	if (product.stock == undefined) {
		errMsg = errMsg.concat('*stock/');
	}
	if (product.color == undefined) {
		errMsg = errMsg.concat('*color/');
	}
	errMsg = errMsg.replaceAll('/*', ', ').replaceAll('/', '.').replaceAll('*', '');
	if (product.title == undefined || product.code == undefined || product.thumbnail == undefined || product.price == undefined || product.stock == undefined || product.color == undefined) {
		return [null, `Missing fields: ${errMsg}`];
	}
	return [true];
};

export { getProdListService, getProdService, newProdService, updateProdService, deleteProdService };
