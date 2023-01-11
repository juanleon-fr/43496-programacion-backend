const Contenedor = require('./classes/Contenedor');
const Messages = require('./classes/Messages');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
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

const { normalize, schema, arrayOf } = require('normalizr');

const current = new Date();
const timestamp = current.getDay() + '/' + current.getMonth() + '/' + current.getFullYear() + ' ' + current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds();

app.use('/api/productos', routerProductos);
app.use('/api/productos-test', routerProdTest);

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

const products = new Contenedor('products');
const messages = new Messages();

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
		defaultLayout: null,
		layoutsDir: __dirname + '/views/layouts',
		partialsDir: __dirname + '/views/partials',
	})
);

routerProdTest.get('', async (req, res) => {
	res.render('./layouts/productsfake');
});

routerProductos.post('', async (req, res) => {
	const { body } = req;
	res.send(await products.save(body));
});

const getAllNorm = async () => {
	const arr = await messages.getAll();
	const msgList = [];
	arr.forEach((object) => {
		const copy = { author: object.author, text: object.text };
		msgList.push(copy);
	});
	const authorSchema = new schema.Entity('authors');
	const msgSchema = {
		author: authorSchema,
	};
	const msgListSchema = [msgSchema];
	const normalized = normalize(msgList, msgListSchema);
	return normalized;
};

io.on('connection', async (socket) => {
	console.log(`Client ${socket.id} connected`);

	socket.emit('product-list', prodFaker.getAll(15));

	// socket.emit('product-list', products.getAll());

	socket.emit('msg-list', getAllNorm());

	socket.on('new-product', async (data) => {
		await products.save(data);
		io.emit('product-list', await products.getAll());
	});

	socket.on('del-product', async (data) => {
		await products.deleteById(data);
		io.emit('product-list', await products.getAll());
	});

	socket.on('new-msg', async (data) => {
		await messages.save({ socketid: socket.id, timestamp: timestamp, ...data });
		io.emit('msg-list', getAllNorm());
	});
});

//desafio 10

const auth = (req, res, next) => {
	if (req.session.username) {
		return next();
	} else {
		return res.redirect('/login');
	}
};

app.use(
	session({
		store: MongoStore.create({
			mongoUrl: 'mongodb+srv://jleonh:xhGr4Un65dLApsiH@backend-coder.bazq5t4.mongodb.net/?retryWrites=true&w=majority',
			mongoOptions: {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
			ttl: 60,
		}),
		secret: 'secreto',
		resave: false,
		saveUninitialized: false,
		ttl: 600000,
	})
);

app.get('/', (req, res) => {
	console.log(req.session.username);
	res.render('./layouts/index', { username: req.session.username });
});

app.get('/showsession', (req, res) => {
	res.json(req.session);
});

app.get('/logout', auth, (req, res) => {
	const username = req.session.username;
	req.session.destroy((err) => {
		if (err) {
			res.send('could not logout');
		} else {
			res.render('./layouts/logout', { username: username });
		}
	});
});

app.get('/login', (req, res) => {
	if (req.session.username) {
		res.render('./layouts/index');
	} else {
		res.render('./layouts/login');
	}
});

app.post('/login', async (req, res) => {
	const { username, password } = await req.body;
	req.session.username = username;
	req.session.password = password;
	req.session.admin = true;
	res.redirect('/');
});
