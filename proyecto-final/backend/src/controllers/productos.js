import instancia from '../daos/index.js';
const products = new instancia.productos();
import { deleteProdService, getProdListService, getProdService, newProdService, updateProdService } from '../service/productos.js';

const getProds = async (req, res, next) => {
	const result = await getProdListService();
	if (result == 'error') {
		return res.sendStatus(500);
	}
	return res.status(200).json(result);
};

const getProdById = async (req, res, next) => {
	const { id } = req.params;
	const result = await getProdService(id);
	if (result == null) {
		return res.sendStatus(404);
	}
	if (result == 'error') {
		return res.sendStatus(500);
	}
	return res.status(200).json(result);
};

const newProd = async (req, res, next) => {
	const product = req.body;
	const result = await newProdService(product);
	if (typeof result[1] == 'string') {
		return res.status(400).send(result[1]);
	}
	if (result == 'error') {
		return res.sendStatus(500);
	}
	return res.status(201).json(result);
};

const updateProdById = async (req, res, next) => {
	const { id } = req.params;
	const product = req.body;
	const result = await updateProdService(id, product);
	if (result.modifiedCount === 0) {
		return res.status(400).send(`No modifications made`);
	}
	if (result == 'error') {
		return res.sendStatus(500);
	}
	return res.status(200).json(result);
};

const deleteProdById = async (req, res, next) => {
	const { id } = req.params;
	const result = await deleteProdService(id);
	if (result.deletedCount === 0) {
		return res.status(400).send(`No deletions made`);
	}
	if (result == 'error') {
		return res.sendStatus(500);
	}
	return res.status(200).json(result);
};

export default {
	getProds,
	getProdById,
	newProd,
	updateProdById,
	deleteProdById,
};
