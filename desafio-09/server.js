const Contenedor = require('./classes/Contenedor');
const Messages = require('./classes/Messages');
const express = require('express');
const app = express();
const { Router } = express;
const routerProductos = Router();
const routerProdTest = Router();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { engine } = require('express-handlebars');

const ContenedorFaker = require('./classes/ContenedorFaker');
const prodFaker = new ContenedorFaker();

const current = new Date();
const timestamp = current.getDay() + '/' + current.getMonth() + '/' + current.getFullYear() + ' ' + current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds();

app.use('/api/productos', routerProductos);
app.use('/api/productos-test', routerProdTest);

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

const products = new Contenedor('products');
const messages = new Messages('messages');

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

routerProdTest.get('', async (req, res) => {
	res.render('./layouts/productsfake');
});

routerProductos.post('', async (req, res) => {
	const { body } = req;
	res.send(await products.save(body));
});

io.on('connection', async (socket) => {
	console.log(`Client ${socket.id} connected`);

	socket.emit('product-list', prodFaker.getAll(5));

	socket.emit('msg-list', await messages.getAll());

	socket.on('new-product', async (data) => {
		await products.save(data);
		io.emit('product-list', await products.getAll());
	});

	socket.on('del-product', async (data) => {
		console.log(data);

		await products.deleteById(data);
		io.emit('product-list', await products.getAll());
	});

	socket.on('new-msg', async (data) => {
		await messages.save({ socketid: socket.id, timestamp: timestamp, ...data });
		io.emit('msg-list', await messages.getAll());
	});
});
