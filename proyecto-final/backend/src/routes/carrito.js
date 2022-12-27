import express, { Router } from 'express';
const routeCarrito = Router();
import controllers from '../controllers/carrito.js';
const { newCart, deleteCartById, getCartItemsById, getCarts, newCartItemById, deleteCartItemById } = controllers;

const app = express();

app.use('/api/carrito', routeCarrito);

routeCarrito.post('/', newCart);

routeCarrito.delete('/:id', deleteCartById);

routeCarrito.get('/:id/productos', getCartItemsById);

routeCarrito.get('/', getCarts);

routeCarrito.post('/:id/productos', newCartItemById);

routeCarrito.delete('/:id/productos/:id_prod', deleteCartItemById);

export default routeCarrito;
