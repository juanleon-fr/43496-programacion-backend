const { Router } = require('express');
const express = require('express');
const routeCarrito = Router();
const carritoController = require('../controllers/carrito');

const app = express();

app.use('/api/carrito', routeCarrito);

routeCarrito.post('/', carritoController.newCart); // añade un carrito con su id, su timestamp, y sus productos a la lista de carritos

routeCarrito.delete('/:id', carritoController.deleteCartById); // borra un carrito por su id de la lista de carritos

routeCarrito.get('/:id/productos', carritoController.getCartItemsById) // obtiene los productos de un carrito por id de la lista de carritos

routeCarrito.get('/', carritoController.getCarts) // obtiene los carritos en la lista de carritos

routeCarrito.post('/:id/productos', carritoController.newCartItemById); // agrega un producto a un carrito por su id a la lista de carritos

routeCarrito.delete('/:id/productos/:id_prod', carritoController.deleteCartItemById); // borra un producto por id de un carrito por id de la lista de carritos


module.exports = routeCarrito;