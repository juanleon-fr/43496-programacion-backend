import type { Product } from '../types/product';

let products: Product[] = [
	{
		id: '01',
		title: 'Remera Kelvin',
		price: 3200,
		description: 'Lorem ipsum',
	},
	{
		id: '02',
		title: 'Remera Chaos',
		price: 3500,
		description: 'Lorem ipsum',
	},
	{
		id: '03',
		title: 'Remera Matter',
		price: 3300,
		description: 'Lorem ipsum',
	},
	{
		id: '04',
		title: 'Remera Disorder',
		price: 3100,
		description: 'Lorem ipsum',
	},
	{
		id: '05',
		title: 'Remera Energy',
		price: 3000,
		description: 'Lorem ipsum',
	},
];

export const getAllProducts = (): Product[] => {
	return products;
};

export const getProductById = (id: string): Product | undefined => {
	return products.find((p) => p.id === id);
};

export const addProduct = (product: Product): Product => {
	product.id = Math.random().toString(36).substr(2, 9); // generate a random id
	products.push(product);
	return product;
};

export const updateProduct = (id: string, update: Partial<Product>): Product | undefined => {
	const product = products.find((p) => p.id === id);
	if (product) {
		Object.assign(product, update);
		return product;
	} else {
		return undefined;
	}
};

export const deleteProduct = (id: string): boolean => {
	const productId = id;
	const initialLength = products.length;
	products = products.filter((p) => p.id !== productId);
	console.log(products.length < initialLength);
	return products.length < initialLength;
};
