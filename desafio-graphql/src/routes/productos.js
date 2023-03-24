import express, { Router } from 'express';
const routeProductos = Router();
import controllers from '../controllers/productos.js';
const { getProds, getProdById, newProd, updateProdById, deleteProdById } = controllers;
import adminPrivileges from '../middleware/adminPrivileges.js';

const app = express();

app.use('/api/productos', routeProductos);

routeProductos.get('/', getProds);

routeProductos.get('/:id', getProdById);

routeProductos.post('/', adminPrivileges, newProd);

routeProductos.put('/:id', adminPrivileges, updateProdById);

routeProductos.delete('/:id', adminPrivileges, deleteProdById);

export default routeProductos;
