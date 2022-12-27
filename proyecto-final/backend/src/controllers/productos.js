import instancia from '../daos/index.js';
const products = new instancia.productos();

const getProds = async (req, res, next) => {
	const productos = await products.getAll();
	res.json(productos);
};

const getProdById = async (req, res, next) => {
	const { id } = req.params;
	const producto = await products.getById(id);
	res.json(producto);
};

const newProd = async (req, res, next) => {
	const { body } = req;
	const result = await products.saveNew(body);
	res.json(result);
};

const updateProdById = async (req, res, next) => {
	const { id } = req.params;
	const result = await products.updateById(id, req.body);
	res.json(result);
};

const deleteProdById = async (req, res, next) => {
	const { id } = req.params;
	const result = await products.deleteById(id);
	res.json(result);
};

export default {
	getProds,
	getProdById,
	newProd,
	updateProdById,
	deleteProdById,
};
