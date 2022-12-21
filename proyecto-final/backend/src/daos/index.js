const CarritosDaoMem = require('./carritos/CarritosDaoMem');
const ProductosDaoMem = require('./productos/ProductosDaoMem');
const CarritosDaoFs = require('./carritos/CarritosDaoFs');
const ProductosDaoFs = require('./productos/ProductosDaoFs');
const CarritosDaoMongo = require('./carritos/CarritosDaoMongo');
const ProductosDaoMongo = require('./productos/ProductosDaoMongo');
const CarritosDaoFb = require('./carritos/CarritosDaoFb');
const ProductosDaoFb = require('./productos/ProductosDaoFb');
require('dotenv').config();

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

const instancia = instancias.filter((element) => element.id == process.env.INSTANCIA);

const resultado = {
	[instancia[0].descripcion]: instancia[0].nombre,
	[instancia[1].descripcion]: instancia[1].nombre,
};

module.exports = resultado;
