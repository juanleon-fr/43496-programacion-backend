const { Router } = require('express');
const express = require('express');
const routeCarrito = Router();
const carritoController = require('../controllers/carrito');

const app = express();

app.use('/api/carrito', routeCarrito);

routeCarrito.post('/', carritoController.newCart);

routeCarrito.delete('/:id', carritoController.deleteCartById);

routeCarrito.get('/:id/productos', carritoController.getCartItemsById);

routeCarrito.get('/', carritoController.getCarts);

routeCarrito.post('/:id/productos', carritoController.newCartItemById);

routeCarrito.delete('/:id/productos/:id_prod', carritoController.deleteCartItemById);

module.exports = routeCarrito;
