const express = require('express');
const app = express();
const routeProductos = require('./routes/productos');
const routeCarrito = require('./routes/carrito');
const bodyParser = require('body-parser');

let current = new Date();
const timestamp = current.getDay() + '/' + current.getMonth() + '/' + current.getFullYear() + ' ' + current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

app.use('/api/productos', routeProductos);
app.use('/api/carrito', routeCarrito);

const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
	console.log(`Listening on port http://localhost:${port}`);
});