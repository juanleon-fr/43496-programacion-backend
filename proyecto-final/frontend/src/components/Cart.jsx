import CartListMap from './CartListMap';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { serverTimestamp } from 'firebase/firestore';
import { fsSetDocOrder, fsUpdateDoc } from '../utils/firebaseConfig';
import SpecialBtn from './SpecialBtn';

const Cart = () => {
	const global = useContext(CartContext);
	const createOrder = () => {
		let itemOrder = global.cartList.map((item) => ({
			id: item.id,
			title: item.title,
			price: item.price,
			quantity: item.quantity,
		}));
		let order = {
			buyer: {
				name: 'Ricardo Darín',
				email: 'darin_ricky57@wikileaks.com',
				phone: '5457575859',
			},
			date: serverTimestamp(),
			items: itemOrder,
			total: global.totalPrice,
		};
		fsSetDocOrder(order)
			.then((result) => {
				alert(`Orden creada. \n Id: ${result.id}`);
				global.cartList.forEach(async (item) => await fsUpdateDoc(item.id, item.quantity));
				global.clear();
			})
			.catch((err) => console.log(err));
	};
	return (
		<section className='cartContainer'>
			{global.totalCount === 0 ? (
				<div className='emptycart'>
					<p>
						El carrito está vacío. haga click{' '}
						<span>
							<Link to='/'>aquí</Link>
						</span>{' '}
						para ir a la lista de artículos.
					</p>
				</div>
			) : (
				<>
					<div className='separator--blank'></div>
					<CartListMap />
					<div className='separator--blank'></div>
					<span className='totalPrice'>Total: ${global.totalPrice}</span>
					<div className='separator--blank'></div>
					<div>
						<SpecialBtn className={'btn-color-10'} onClick={() => createOrder()} color={'color-10'}>Finalizar compra</SpecialBtn>
						<SpecialBtn onClick={() => global.clear()} color={'color-30'}>Vaciar carrito</SpecialBtn>
					</div>
					<div className='separator--blank'></div>
				</>
			)}
		</section>
	);
};

export default Cart;
