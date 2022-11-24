import ItemListMap from './ItemListMap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fsFetchDocs } from '../utils/firebaseConfig';
import { BarLoader } from 'react-spinners';

const ItemListContainer = () => {
	const [products, setProducts] = useState(null);
	const { category } = useParams();
	useEffect(() => {
		if (category) {
			fsFetchDocs()
				.then((result) => result.filter((item) => item.category === category))
				.then((result) => setProducts(result))
				.catch((err) => console.log(err));
		} else {
			fsFetchDocs()
				.then((result) => setProducts(result))
				.catch((err) => console.log(err));
		}
	}, [category]);
	return (
		<div className='itemlistcontainer'>
			<div className='separator--blank'></div>
			{products ? <ItemListMap data={products} /> : <BarLoader color='#e29f29' speedMultiplier={2} />}
			<div className='separator--blank'></div>
		</div>
	);
};

export default ItemListContainer;
