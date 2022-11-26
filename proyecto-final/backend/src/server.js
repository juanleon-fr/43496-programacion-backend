const express = require('express');
const app = express();
const routeProductos = require('./routes/productos');
const routeCarrito = require('./routes/carrito');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

app.use(cors());

app.use('/api/productos', routeProductos);
app.use('/api/carrito', routeCarrito);
app.use('/*', async (req, res) => {res.json({ error : -2, descripcion: `ruta '${req.url}' método '${req.method}' no implementada`})})
// resto de rutas sin implementacion! tirar error

const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
	console.log(`Listening on port http://localhost:${port}`);
});
