const { Router } = require('express');
const express = require('express');
const routeProductos = Router();
const productosController = require('../controllers/productos');
const authMiddleware = require('../middleware/authMiddleware')

const app = express();

app.use('/api/productos', routeProductos);

routeProductos.get('/', productosController.getProds);

routeProductos.get('/:id', productosController.getProdById);

routeProductos.post('/', authMiddleware, productosController.newProd);

routeProductos.put('/:id', authMiddleware, productosController.updateProdById);

routeProductos.delete('/:id', authMiddleware, productosController.deleteProdById);

module.exports = routeProductos;
