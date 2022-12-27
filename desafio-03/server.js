const Contenedor = require('./Contenedor');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const file = new Contenedor('productos.json');

app.get('/', (req, res) => {
	res.send(`Inicio, Link al proyecto en Glitch: https://long-tortoiseshell-bay.glitch.me`);
});

app.get('/productos', async (req, res) => {
	const productos = await file.getAll();
	res.send(productos);
});

app.get('/productoRandom', async (req, res) => {
	const productos = await file.getAll();
	const random = Math.floor(Math.random() * productos.length);
	res.send(productos[random]);
});

app.listen(port, () => {
	console.log(`Listening on port http://localhost:${port}`);
});
