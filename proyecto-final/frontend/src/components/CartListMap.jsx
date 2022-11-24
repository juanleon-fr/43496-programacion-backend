import CartItemRender from './CartItemRender';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

const CartListMap = (setTotal) => {
	const global = useContext(CartContext);
	return (
		<section className='cartListContainer'>
			<ul>
				{global.cartList.map((item) => (
					<CartItemRender key={item.id} item={item}></CartItemRender>
				))}
			</ul>
		</section>
	);
};

export default CartListMap;
