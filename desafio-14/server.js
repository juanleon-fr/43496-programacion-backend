const config = require('./config');
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
const userModel = require('./models/userModel');
const { productCollection, productSchema } = require('./models/productModel');
const mongoose = require('mongoose');

//compression
const compression = require('compression');
app.use(compression());

//logger
const path = require('path');
const winston = require('winston');
const logDir = './performance/logs';
const logger = winston.createLogger({
	level: 'warn',
	transports: [new winston.transports.Console({ level: 'info' }), new winston.transports.File({ filename: path.join(logDir, 'warn.log'), level: 'warn' }), new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' })],
});

const cluster = require('cluster');
const { cpus } = require('os');

const ContenedorFaker = require('./classes/ContenedorFaker');
const prodFaker = new ContenedorFaker();

const { normalize, schema, arrayOf } = require('normalizr');

const current = new Date();
const timestamp = current.getDay() + '/' + current.getMonth() + '/' + current.getFullYear() + ' ' + current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds();

app.use('/api/productos', routerProductos);
app.use('/api/productos-test', routerProdTest);

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

const products = new Contenedor({ name: productCollection, schema: productSchema });
const messages = new Messages();

const port = parseInt(process.argv[2]) || process.env.PORT || 8080;
let arg3 = process.argv[3];
if (arg3 != undefined) {
	arg3 = arg3.toUpperCase();
}
const clusterMode = arg3 == 'CLUSTER';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
httpServer.listen(port, () => {
	console.log(`Listening on http://${config.HOST}:${config.PORT}`);
});

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

routerProductos.post('', async (req, res) => {
	const { body } = req;
	res.send(await products.save(body, req));
});

routerProductos.get('', async (req, res) => {
	const productos = await products.getAll(req);
	res.send(productos);
});

routerProductos.get('/:id', async (req, res) => {
	const { id } = req.params;
	const producto = await products.getById(id, req);
	res.json(producto);
});

routerProductos.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { title, price, thumbnail } = req.body;
		await products.updateById(id, title, price, thumbnail, req);
		res.json({ succes: true });
	} catch (error) {
		res.json({ error: true, msj: 'error' });
	}
});

routerProductos.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const result = await products.deleteById(id, req);
	if (result === 'deleted') {
		res.json({
			success: true,
			msg: 'Producto eliminado.',
		});
	} else {
		res.json(result);
	}
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

//desafio 11//

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const isValidPassword = (user, password) => {
	return bcrypt.compareSync(password, user.password);
};

const createHash = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

mongoose
	.connect(config.DATABASEURL)
	.then(() => console.log('Connected to Mongo'))
	.catch((err) => {
		console.error(err);
		throw (`couldn't connect to Mongo Atlas`, err);
	});

passport.use(
	'login',
	new LocalStrategy((username, password, done) => {
		Usuarios.findOne({ username }, (err, user) => {
			if (err) return done(err);

			if (!user) {
				console.log(`Username '${username}' not found`);
				return done(null, false);
			}

			if (!isValidPassword(user, password)) {
				console.log(`Password does not match`);
				return done(null, false);
			}

			return done(null, user);
		});
	})
);

passport.use(
	'signup',
	new LocalStrategy(
		{
			passReqToCallback: true,
		},
		(req, username, password, done) => {
			Usuarios.findOne({ username: username }, (err, user) => {
				if (err) {
					console.log('Error while trying to log in' + err);
					return done(err);
				}

				if (user) {
					console.log('Username taken');
					return done(null, false);
				}

				const newUser = {
					username: username,
					password: createHash(password),
				};
				Usuarios.create(newUser, (err, userWithId) => {
					if (err) {
						console.log('Error while trying to sign up' + err);
						return done(err);
					}
					console.log(user);
					console.log('Sign up Successful');
					return done(null, userWithId);
				});
			});
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	Usuarios.findById(id, done);
});

app.use(
	session({
		store: MongoStore.create({
			mongoUrl: config.DATABASEURL,
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

const auth = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		return res.redirect('/login');
	}
};

app.get('/', auth, (req, res) => {
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

app.get('/login', auth, (req, res) => {
	const { username, password } = req.user;
	res.render('./layouts/index', { username: username });
});

app.post('/login', async (req, res) => {
	const { username, password } = await req.body;
	req.session.username = username;
	req.session.password = password;
	req.session.admin = true;
	res.redirect('/');
});

app.get('/signup', (req, res) => {
	if (req.isAuthenticated()) {
		const { username, password } = req.user;
		res.render('./layouts/index', { username: username });
	} else {
		res.render('./layouts/signup');
	}
});

app.post('/signup', async (req, res) => {
	const { username, password } = await req.body;
	req.session.username = username;
	req.session.password = password;
	req.session.admin = true;
	res.redirect('/');
});

//desafio 12

const parseArgs = require('minimist');
// const routerFork = require('./routerFork');

const info = (req, res) => {
	const data = {
		args: JSON.stringify(parseArgs(process.argv.slice(2))._),
		os: process.platform,
		nodeVersion: process.version,
		memoryUsage: process.memoryUsage().rss,
		path: JSON.stringify(process.env.PATH),
		processId: process.pid,
		dirPath: process.env.PWD,
	};
	// res.render('./layouts/info', { data: data });
	// console.log(data);
	res.json(data);
	logger.log('info', `${Date.now()} ${req.method} '${req.originalUrl}'`);
};

app.get('/info', info);

// const randomParent = (req, res) => {
// 	eval(routerFork.random(req, res).replaceAll('*backtick*', '`'));
// 	logger.log('info', `${Date.now()} ${req.method} '${req.originalUrl}'`);
// };

// app.get('/api/randoms', randomParent);

//rutas no implementadas
app.use('/*', async (req, res) => {
	res.json({ error: -2, descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada` });
	logger.log('warn', `${Date.now()} ${req.method} '${req.originalUrl}'`);
});
