import ShopIcon from '../assets/icons/cart-icon.svg';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
const CartWidget = () => {
	const global = useContext(CartContext)
	return (
		<div className='shop-icon'>
			<img src={ShopIcon} alt='Carrito' />
			<p className='shop-number'>{global.totalCount}</p>
		</div>
	);
};

export default CartWidget;
