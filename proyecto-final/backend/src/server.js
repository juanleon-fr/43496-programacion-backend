const express = require('express');
const app = express();
const routeProductos = require('./routes/productos');
const routeCarrito = require('./routes/carrito');
const bodyParser = require('body-parser');
const cors = require('cors');

let current = new Date();
const timestampAlt = current.getDay() + '/' + current.getMonth() + '/' + current.getFullYear() + ' ' + current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds();
const timestamp = Date.now();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

app.use(cors());

app.use('/api/productos', routeProductos);
app.use('/api/carrito', routeCarrito);
// resto de rutas sin implementacion! tirar error

const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
	console.log(`Listening on port http://localhost:${port}`);
});
