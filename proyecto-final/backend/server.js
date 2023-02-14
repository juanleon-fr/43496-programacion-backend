import express from 'express';
const app = express();
import routeProductos from './src/routes/productos.js';
import routeCarrito from './src/routes/carrito.js';
import bodyParser from 'body-parser';
const { urlencoded, json } = bodyParser;
import cors from 'cors';

app.use(urlencoded({ extended: false }));
app.use(json());

app.use(json());

app.use(cors());

app.use('/api/productos', routeProductos);
app.use('/api/carrito', routeCarrito);
app.use('/*', async (req, res) => {
	res.json({ error: -2, descripcion: `ruta '${req.url}' método '${req.method}' no implementada` });
});

const port = process.env.PORT || 8081;

app.use(urlencoded({ extended: true }));
app.listen(port, () => {
	console.log(`Listening on port http://localhost:${port}`);
});
