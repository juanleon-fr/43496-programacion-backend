import express, { Router } from 'express';
const routeCarrito = Router();
import controllers from '../controllers/carrito.js';
import { checkAuthentication } from '../middleware/passportAuth.js';
import checkAuthorization from '../middleware/adminPrivileges.js';
const { newCart, deleteCartById, getCartItemsById, getCarts, newCartItemById, deleteCartItemById, createOrder } = controllers;

const app = express();

app.use('/api/carrito', routeCarrito);

routeCarrito.post('/', checkAuthentication, newCart);

routeCarrito.delete('/', checkAuthentication, deleteCartById);

routeCarrito.get('/productos', checkAuthentication, getCartItemsById);

routeCarrito.get('/', checkAuthentication, checkAuthorization, getCarts);

routeCarrito.post('/productos/:id_prod', checkAuthentication, newCartItemById);

routeCarrito.delete('/productos/:id_prod', checkAuthentication, deleteCartItemById);

routeCarrito.post('/placeorder', checkAuthentication, createOrder);

export default routeCarrito;
