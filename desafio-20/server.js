import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import crypto from 'crypto';
import { productMap, Product } from './productos.js';

const schema = buildSchema(`
  type Product {
    id: ID!
    title: String,
    price: Int,
    thumbnail: String

  }
  input ProductoInput {
    title: String,
    price: Int
    thumbnail: String
  }
  type Query {
    getProducto(id: ID!): Product,
    getProductos(campo: String, valor: String): [Product],
  }
  type Mutation {
    createProducto(data: ProductoInput): Product
    updateProducto(id: ID!, data: ProductoInput): Product,
    deleteProducto(id: ID!): Product,
  }
`);

const app = express();

app.use(express.static('public'));

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		rootValue: {
			getProductos,
			getProducto,
			createProducto,
			updateProducto,
			deleteProducto,
		},
		graphiql: true,
	})
);

const PORT = 8080;
app.listen(PORT, () => {
	const msg = `Server running on: http://localhost:${PORT}`;
	console.log(msg);
});

function getProductos({ campo, valor }) {
	const productos = Object.values(productMap);
	if (campo && valor) {
		return productos.filter((p) => p[campo] == valor);
	} else {
		return productos;
	}
}

function getProducto({ id }) {
	if (!productMap[id]) {
		throw new Error('Product not found.');
	}
	return productMap[id];
}

function createProducto({ data }) {
	const id = crypto.randomBytes(10).toString('hex');
	const nuevaProducto = new Product(id, data);
	productMap[id] = nuevaProducto;
	return nuevaProducto;
}

function updateProducto({ id, data }) {
	if (!productMap[id]) {
		throw new Error('Product not found');
	}
	const productoActualizado = new Product(id, data);
	productMap[id] = productoActualizado;
	return productoActualizado;
}

function deleteProducto({ id }) {
	if (!productMap[id]) {
		throw new Error('Producto not found');
	}
	const productoBorrado = productMap[id];
	delete productMap[id];
	return productoBorrado;
}
