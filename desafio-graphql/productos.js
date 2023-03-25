export class Product {
	constructor(id, { title, price, thumbnail }) {
		this.id = id;
		this.title = title;
		this.price = price;
		this.thumbnail = thumbnail;
	}
}

export const productMap = {
	'01': new Product('01', {
		title: 'Remera Kelvin',
		price: 3200,
		thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667911/Entropy/productos/remeras/remera-1_o5xtoe.jpg',
	}),
	'02': new Product('02', {
		title: 'Remera Chaos',
		price: 3500,
		thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667910/Entropy/productos/remeras/remera-2_yb4xgh.jpg',
	}),
	'03': new Product('03', {
		title: 'Remera Matter',
		price: 3300,
		thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667907/Entropy/productos/remeras/remera-3_rlosee.jpg',
	}),
	'04': new Product('04', {
		title: 'Remera Disorder',
		price: 3100,
		thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667911/Entropy/productos/remeras/remera-4_ypciuj.jpg',
	}),
	'05': new Product('05', {
		title: 'Remera Energy',
		price: 3300,
		thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667918/Entropy/productos/remeras/remera-5_folvq6.jpg',
	}),
	'06': new Product('06', {
		title: 'Remera Force',
		price: 3000,
		thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667914/Entropy/productos/remeras/remera-6_yk6yk1.jpg',
	}),
	'07': new Product('07', {
		title: 'Remera Disrupt',
		price: 4300,
		thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667910/Entropy/productos/remeras/remera-7_gqdimd.jpg',
	}),
};
