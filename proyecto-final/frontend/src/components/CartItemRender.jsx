import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

const CartItemRender = (item) => {
	const global = useContext(CartContext);
	let totalPrice = item.item.price * item.item.quantity;
	return (
		<li>
			<div className='card cartItem' id={`cart-item-${item.item.id}`}>
				<div className='cartItemImg'>
					<img src={item.item.thumbnail} alt={item.item.title} />
				</div>
				<div className='itemTitle'>
					<span>
						{item.item.title}
					</span>
				</div>
				<div className='cartItemDetails'>
					<div className='unit-price'>
						<span className='uppertext'>Precio Unit.</span>
						<span>${item.item.price}</span>
					</div>
					<div className='quantity'>
						<span className='uppertext'>Cant.</span>
						<span>{item.item.quantity}</span>
					</div>
					<div className='price'>
						<span className='uppertext'>Precio</span>
						<span>${totalPrice}</span>
					</div>
				</div>
			</div>
			<button onClick={() => global.removeItem(item.item.id)}>Eliminar Item</button>
		</li>
	);
};

export default CartItemRender;
