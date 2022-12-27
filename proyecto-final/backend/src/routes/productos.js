import express, { Router } from 'express';
const routeProductos = Router();
import controllers from '../controllers/productos.js';
const { getProds, getProdById, newProd, updateProdById, deleteProdById } = controllers;
import authMiddleware from '../middleware/authMiddleware.js';

const app = express();

app.use('/api/productos', routeProductos);

routeProductos.get('/', getProds);

routeProductos.get('/:id', getProdById);

routeProductos.post('/', authMiddleware, newProd);

routeProductos.put('/:id', authMiddleware, updateProdById);

routeProductos.delete('/:id', authMiddleware, deleteProdById);

export default routeProductos;
