const Contenedor = require('./classes/Contenedor');
const Messages = require('./classes/Messages');

let current = new Date();
const time = current.getDay() + '/' + current.getMonth() + '/' + current.getFullYear() + ' ' + current.getHours() + ':' + current.getMinutes();
console.log(time)

const express = require('express');
const app = express();
const { Router } = express;
const routerProductos = Router();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { engine } = require('express-handlebars');

app.use('/api/productos', routerProductos);

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

const file = new Contenedor('./api/productos.json');
const messages = new Messages('./api/productos.json');

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
httpServer.listen(port, () => {
	console.log(`Listening on port http://localhost:${port}`);
});

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
	'hbs',
	engine({
		extname: '.hbs',
		defaultLayout: 'index.hbs',
		layoutsDir: __dirname + '/views/layouts',
		partialsDir: __dirname + '/views/partials',
	})
);

app.get('/', (req, res) => {
	res.render('./layouts/index');
});

// app.post('/form', async (req, res) => {
// 	const { body } = req;
// 	await file.save(body);
// 	res.render('gracias')
// });

// routerProductos.post('', async (req, res) => {
// 	const { body } = req;
// 	res.send(await file.save(body));
// });

// routerProductos.get('', async (req, res) => {
// 	const productos = await file.getAll();
// 	const productsExist = productos.length != 0
// 	res.render('products', {products: productos, productsExist })
// });

// routerProductos.get('/:id', async (req, res) => {
// 	const { id } = req.params;
// 	const producto = await file.getById(id);
// 	res.json(producto);
// });

// routerProductos.put('/:id', async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const { title, price, thumbnail } = req.body;
// 		await file.updateById(id, title, price, thumbnail);
// 		res.json({ succes: true });
// 	} catch (error) {
// 		res.json({ error: true, msj: 'error' });
// 	}
// });

// routerProductos.delete('/:id', async (req, res) => {
// 	const { id } = req.params;
// 	const result = await file.deleteById(id);
// 	if (result === 'deleted') {
// 		res.json({
// 			success: true,
// 			msg: 'Producto eliminado.',
// 		});
// 	} else {
// 		res.json(result);
// 	}
// });

io.on('connection', async (socket) => {
	console.log(`Client ${socket.id} connected`);

	socket.emit('product-list', await file.getAll());

	socket.on('product', async (data) => {
		await file.save(data);
	});

});
