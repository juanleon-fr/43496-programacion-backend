export class Product {
	constructor(id, { title, price, thumbnail }) {
		this.id = id;
		this.title = title;
		this.price = price;
		this.thumbnail = thumbnail;
	}
}

export const productMap = {
	'8e6be401860262b51e7c': new Product('8e6be401860262b51e7c', {
		title: 'Remera Kelvin',
		price: 3200,
		thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667911/Entropy/productos/remeras/remera-1_o5xtoe.jpg',
	}),
	'1b7d161e83296c947e0a': new Product('1b7d161e83296c947e0a', {
		title: 'Remera Chaos',
		price: 3500,
		thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667910/Entropy/productos/remeras/remera-2_yb4xgh.jpg',
	}),
	'9d2132ced96ba6080856': new Product('9d2132ced96ba6080856', {
		title: 'Remera Matter',
		price: 3300,
		thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667907/Entropy/productos/remeras/remera-3_rlosee.jpg',
	}),
	a2d3867720c94c17e096: new Product('a2d3867720c94c17e096', {
		title: 'Remera Disorder',
		price: 3100,
		thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667911/Entropy/productos/remeras/remera-4_ypciuj.jpg',
	}),
	db7c80dbd8d7e462584e: new Product('db7c80dbd8d7e462584e', {
		title: 'Remera Energy',
		price: 3300,
		thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667918/Entropy/productos/remeras/remera-5_folvq6.jpg',
	}),
	e25ccd3f57a76f3806c8: new Product('e25ccd3f57a76f3806c8', {
		title: 'Remera Force',
		price: 3000,
		thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667914/Entropy/productos/remeras/remera-6_yk6yk1.jpg',
	}),
	a5fc3e966a8fe585f106: new Product('a5fc3e966a8fe585f106', {
		title: 'Remera Disrupt',
		price: 4300,
		thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667910/Entropy/productos/remeras/remera-7_gqdimd.jpg',
	}),
};
