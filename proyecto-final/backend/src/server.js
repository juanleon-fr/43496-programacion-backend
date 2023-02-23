//env and express
import nodeEnv from './utils/dotenv.js';
import express from 'express';

//MongoDB connection
import mongooseConnect from './utils/mongooseConnect.js';
const uri = process.env.MONGO_URI;
mongooseConnect(uri);

//passport & session
import passport from 'passport';
import UserClass from './classes/UserClass.js';
import passportConfig from './utils/passportConfig.js';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
const { urlencoded, json } = bodyParser;

const app = express();
const port = process.env.PORT || 8080;
const getByEmail = new UserClass().getByEmail;
const getById = new UserClass().getById;
const day = 86400 * 1000;
const minute = 60 * 1000;

app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(
	cookieSession({
		name: 'session',
		keys: ['/* secret keys */', 'lalalala'],

		// Cookie Options
		maxAge: 24 * 60 * 60 * 1000, // 24 hours
	})
);
app.use(
	session({
		store: MongoStore.create({ mongoUrl: uri, dbName: process.env.MONGO_DB }),
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false,
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport, getByEmail, getById);

// //cors
// nodeEnv !== 'production' ? app.use(nodeEnv.cors()) : 'production';

//logger
import { logger, expressWinston } from './utils/winstonLogger.js';
// app.use(expressWinston);

//compression
import compression from 'compression';
app.use(compression());

//routes
import routeProductos from './routes/productos.routes.js';
import routeCarrito from './routes/carrito.routes.js';
import routeUsers from './routes/users.routes.js';

app.use('/api/productos', routeProductos);
app.use('/api/carrito', routeCarrito);
app.use('/user', routeUsers);

app.use('/', (req, res) => {
	res.send(req.session);
});

//404 routes
app.use('/*', (req, res) => {
	res.status(404).send(`<h1>HTTP Error 404</h1>
	<h3>404 Not Found</h3>
	<p style="font-size: 18px">The server cannot find the file or script you asked for. Please check the url to ensure the path is correct.</p>`);
});

app.listen(port, () => {
	nodeEnv !== 'production' ? logger.info(`Running on dev mode. Listening on port http://localhost:${port}. Using ${process.env.DB} as Database.`) : logger.info(`Running on production mode. Listening on port http://localhost:${port}`);
});
