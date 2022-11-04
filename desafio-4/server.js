const Contenedor = require('./Contenedor');
const express = require('express');
const app = express();
const { Router } = express;
const routerProductos = Router();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/productos', routerProductos);

const file = new Contenedor('productos.json');

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`Listening on port http://localhost:${port}`);
});

app.get('/', (req, res) => {
	res.send('Inicio.');
});

app.get('/form', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.post('/form', async (req, res) => {
	const { body } = req;
	res.send(await file.save(body));
});

routerProductos.post('', async (req, res) => {
	const { body } = req;
	res.send(await file.save(body));
});

routerProductos.get('', async (req, res) => {
	const productos = await file.getAll();
	res.json(productos);
});

routerProductos.get('/:id', async (req, res) => {
	const { id } = req.params;
	const producto = await file.getById(id);
	res.json(producto);
});

routerProductos.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { title, price, thumbnail } = req.body;
		await file.updateById(id, title, price, thumbnail);
		res.json({ succes: true });
	} catch (error) {
		res.json({ error: true, msj: 'error' });
	}
});

routerProductos.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const result = await file.deleteById(id);
	if (result === 'deleted') {
		res.json({
			success: true,
			msg: 'Producto eliminado.',
		});
	} else {
		res.json(result);
	}
});
