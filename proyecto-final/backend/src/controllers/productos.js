const routerProductos = require('../routes/productos');
const Contenedor = require('../classes/Contenedor');

const products = new Contenedor();

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
	res.json(await products.save(body));
};

const updateProdById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { title, description, code, thumbnail, price, stock } = req.body;
		await products.updateById(id, timestamp, title, description, code, thumbnail, price, stock);
		res.json({ success: true });
	} catch (error) {
		res.json({ error: true, msj: 'error' });
	}
};

const deleteProdById = async (req, res, next) => {
	const { id } = req.params;
	const result = await products.deleteById(id);
	if (result === 'deleted') {
		res.json({
			success: true,
			msg: 'Producto eliminado.',
		});
	} else {
		res.json(result);
	}
};

module.exports = {
	getProds,
	getProdById,
	newProd,
	updateProdById,
	deleteProdById,
};
