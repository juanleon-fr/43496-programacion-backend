const { Router } = require('express');
const express = require('express');
const routeProductos = Router();
const productosController = require('../controllers/productos');

const app = express();

app.use('/api/productos', routeProductos);

routeProductos.get('/', productosController.getProds);

routeProductos.get('/:id', productosController.getProdById);

routeProductos.post('/', productosController.newProd);

routeProductos.put('/:id', productosController.updateProdById);

routeProductos.delete('/:id', productosController.deleteProdById);

module.exports = routeProductos;