const { optionsMySQL } = require('./options/mysql.js');
const knex = require('knex')(optionsMySQL);

knex.schema
	.createTable('products', (table) => {
		table.increments('id');
		table.string('title');
		table.integer('price');
		table.string('thumbnail');
	})
	.then(() => {
		console.log('todo bien');
	})
	.catch((err) => {
		console.log(err);
		throw new Error(err);
	})
	.finally(() => {
		knex.destroy();
	});
knex('products')
	.insert([
		{
			title: 'Remera Kelvin',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667911/Entropy/productos/remeras/remera-1_o5xtoe.jpg',
			price: 3200,
		},
		{
			title: 'Remera Chaos',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667910/Entropy/productos/remeras/remera-2_yb4xgh.jpg',
			price: 3500,
		},
		{
			title: 'Remera Matter',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667907/Entropy/productos/remeras/remera-3_rlosee.jpg',
			price: 3300,
		},
		{
			title: 'Remera Disorder',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667911/Entropy/productos/remeras/remera-4_ypciuj.jpg',
			price: 3100,
		},
		{
			title: 'Remera Energy',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667918/Entropy/productos/remeras/remera-5_folvq6.jpg',
			price: 3300,
		},
		{
			title: 'Remera Force',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667914/Entropy/productos/remeras/remera-6_yk6yk1.jpg',
			price: 3000,
		},
		{
			title: 'Remera Disrupt',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667910/Entropy/productos/remeras/remera-7_gqdimd.jpg',
			price: 4300,
		},
		{
			title: 'Remera Impulse',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667911/Entropy/productos/remeras/remera-8_z06esd.jpg',
			price: 4700,
		},
		{
			title: 'Remera Momentum',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667913/Entropy/productos/remeras/remera-9_e2llsu.jpg',
			price: 3600,
		},
		{
			title: 'Buzo Albert',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667907/Entropy/productos/buzos/buzo-albert_iqocyb.jpg',
			price: 5000,
		},
		{
			title: 'Buzo Nikola',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667917/Entropy/productos/buzos/buzo-nikola_spz5n3.jpg',
			price: 4800,
		},
		{
			title: 'Buzo Isaac',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667907/Entropy/productos/buzos/buzo-isaac_qnii31.jpg',
			price: 4900,
		},
		{
			title: 'Buzo Ludwig',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667904/Entropy/productos/buzos/buzo-ludwig_cf8zsd.jpg',
			price: 4300,
		},
		{
			title: 'Buzo Rankine',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667917/Entropy/productos/buzos/buzo-rankine_nct2ds.jpg',
			price: 4700,
		},
		{
			title: 'Buzo Rudolf',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667917/Entropy/productos/buzos/buzo-rudolf_fup89t.jpg',
			price: 3600,
		},
		{
			title: 'Jogger Kelvin',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667935/Entropy/productos/pantalones/jogger-kelvin_xtacga.png',
			price: 5000,
		},
		{
			title: 'Jogger Chaos',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667929/Entropy/productos/pantalones/jogger-chaos_lopx9v.png',
			price: 4800,
		},
		{
			title: 'Jogger Matter',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667926/Entropy/productos/pantalones/jogger-matter_qsuwyv.png',
			price: 4900,
		},
		{
			title: 'Jogger Disorder',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667934/Entropy/productos/pantalones/jogger-disorder_dylmj0.png',
			price: 4300,
		},
		{
			title: 'Jogger Energy',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667935/Entropy/productos/pantalones/jogger-energy_ie3ewn.png',
			price: 4700,
		},
		{
			title: 'Jogging Force',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667938/Entropy/productos/pantalones/jogging-force_mb1t4d.png',
			price: 3600,
		},
		{
			title: 'Jogger Kelvin Clain test long text',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667909/Entropy/productos/pantalones/jogger-kelvin-clain_hxfsqa.jpg',
			price: 6900,
		},
		{
			title: 'Jogger Chau Chau',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667914/Entropy/productos/pantalones/jogger-chau-chau_ij9szq.jpg',
			price: 6700,
		},
		{
			title: 'Jogger Dark Matter',
			thumbnail: 'https://res.cloudinary.com/dxsntbs0t/image/upload/v1662667921/Entropy/productos/pantalones/jogger-dark-matter_uqmliu.jpg',
			price: 6600,
		},
	])
	.then(() => {
		console.log('insert successful');
	})
	.catch((err) => {
		console.log(err);
	})
	.finally(() => {
		knex.destroy();
	});
