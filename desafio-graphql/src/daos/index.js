import CarritosDaoMem from './carritos/CarritosDaoMem.js';
import ProductosDaoMem from './productos/ProductosDaoMem.js';
import CarritosDaoFs from './carritos/CarritosDaoFs.js';
import ProductosDaoFs from './productos/ProductosDaoFs.js';
import CarritosDaoMongo from './carritos/CarritosDaoMongo.js';
import ProductosDaoMongo from './productos/ProductosDaoMongo.js';
import CarritosDaoFb from './carritos/CarritosDaoFb.js';
import ProductosDaoFb from './productos/ProductosDaoFb.js';
import { instance } from '../utils/dotenvExports.js';

const instancias = [
	{ nombre: ProductosDaoMem, id: 'memoria', descripcion: 'productos' },
	{ nombre: CarritosDaoMem, id: 'memoria', descripcion: 'carritos' },

	{ nombre: ProductosDaoFs, id: 'archivo', descripcion: 'productos' },
	{ nombre: CarritosDaoFs, id: 'archivo', descripcion: 'carritos' },

	{ nombre: ProductosDaoMongo, id: 'mongo', descripcion: 'productos' },
	{ nombre: CarritosDaoMongo, id: 'mongo', descripcion: 'carritos' },

	{ nombre: ProductosDaoFb, id: 'firebase', descripcion: 'productos' },
	{ nombre: CarritosDaoFb, id: 'firebase', descripcion: 'carritos' },
];

const instancia = instancias.filter((element) => element.id == instance);

const result = {
	[instancia[0].descripcion]: instancia[0].nombre,
	[instancia[1].descripcion]: instancia[1].nombre,
};

export default result;
