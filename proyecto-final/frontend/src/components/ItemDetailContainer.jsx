import ItemDetail from './ItemDetail';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fsFetchDocById } from '../utils/firebaseConfig';
import { BarLoader } from 'react-spinners';

const ItemDetailContainer = () => {
	const { id } = useParams();
	let [product, setProduct] = useState(null);
	useEffect(() => {
		fsFetchDocById(id)
			.then((result) => setProduct(result))
			.catch((err) => console.log(err));
	}, [id]);
	return (
		<div className='itemDetailContainer'>
			{product ? (
				<ItemDetail product={product} initial={1} />
			) : (
				<>
					<div className='separator--blank' />
					<BarLoader color='#e29f29' speedMultiplier={2} />
				</>
			)}
		</div>
	);
};

export default ItemDetailContainer;
