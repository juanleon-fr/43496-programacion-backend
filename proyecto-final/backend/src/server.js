//env and express
import nodeEnv from './utils/dotenv.js';
import express from 'express';
import session from 'express-session';
import flash from 'express-flash';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 8080;

//routes
import routeProductos from './routes/productos.routes.js';
import routeCarrito from './routes/carrito.routes.js';
import routeUsers from './routes/users.routes.js';

//bodyparser
import bodyParser from 'body-parser';

const { urlencoded, json } = bodyParser;

app.use(urlencoded({ extended: false }));
app.use(json());

//MongoDB connection
import mongoose from 'mongoose';
import mongooseConnect from './utils/mongooseConnect.js';
const uri = process.env.MONGO_URI;
mongooseConnect(uri);
const mongoClient = mongoose.connection.getClient();

//passport
import passport from 'passport';
import UserClass from './classes/UserClass.js';
import passportConfig from './utils/passportConfig.js';

const getByEmail = new UserClass().getByEmail;
const getById = new UserClass().getById;

passportConfig(passport, getByEmail, getById);

app.use(flash());

//session
import MongoStore from 'connect-mongo';
const day = 86400 * 1000;
const minute = 60 * 1000;
app.use(cookieParser('buenas tardes'));
app.use(
	session({
		store: MongoStore.create({ mongoUrl: uri }),
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: false,
			secure: false,
			maxAge: 1 * day,
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());

//cors
nodeEnv !== 'production' ? app.use(nodeEnv.cors()) : 'production';

//logger
import { logger, expressWinston } from './utils/winstonLogger.js';
// app.use(expressWinston);

//compression
import compression from 'compression';
app.use(compression());

//routes
app.use('/api/productos', routeProductos);
app.use('/api/carrito', routeCarrito);
app.use('/user', routeUsers);

app.use('/', (req, res) => {
	res.status(200).send(req.session);
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
