import request from 'supertest';
import { expect } from 'chai';
const server = 'http://localhost:8080';

let auxId;

const generatePost = () => {
	const post = {
		title: 'nombre loco',
		stock: Math.random() * 10,
		price: Math.random() * 1000,
		thumbnail: 'urlurl',
	};
	return post;
};

describe('Prueba de los endpoints de Productos', () => {
	describe('getAll', () => {
		it('Status 200. Muestra un array', async () => {
			console.log(`GET: /api/productos/`);
			const res = await request(server).get('/api/productos');
			expect(res.status).to.eql(200);
			expect(res.body).to.be.a('array');
		});
	});
	describe('newProd', () => {
		it('Status 200. Incorpora un producto nuevo', async () => {
			console.log(`POST: /api/productos/`);
			const post = generatePost();
			const res = await request(server).post(`/api/productos`).send(post);
			auxId = res.body.id;
			expect(res.status).to.eql(200);
			expect(res.body).to.be.a('object');
			expect(res.body).to.include.keys('title', 'price', 'id', 'thumbnail', 'stock', 'timestamp');
			expect(post.title).to.eql(res.body.title);
			expect(post.price).to.eql(res.body.price);
			expect(post.thumbnail).to.eql(res.body.thumbnail);
			expect(post.stock).to.eql(res.body.stock);
		});
	});
	describe('deleteProdById', () => {
		it(`Status 200. Elimina el producto generado`, async () => {
			console.log(`DELETE: /api/productos/${auxId}`);
			const res = await request(server).delete(`/api/productos/${auxId}`);
			expect(res.status).to.eql(200);
		});
	});
});
