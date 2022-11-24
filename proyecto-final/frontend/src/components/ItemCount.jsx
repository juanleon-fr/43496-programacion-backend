import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { fsFetchDocById } from '../utils/firebaseConfig';
import SpecialBtn from './SpecialBtn';

function ItemCount(product) {
	const { title, stock, initial, id, setPassedCount } = product;
	let initialNum = Number(initial);
	const [count, setCount] = useState(initialNum);
	const global = useContext(CartContext);
	let maxNumb;
	const inCartItem = global.cartList.find((element) => element.id === id);
	inCartItem !== undefined ? (maxNumb = Number(stock) - inCartItem.quantity) : (maxNumb = Number(stock));

	function onAdd(id, count) {
		fsFetchDocById(id).then((result) => {
			if (maxNumb >= 1) {
				setPassedCount(count);
				global.addItem(result, count);
				return;
			}
			alert('¡Ups! Nos quedamos sin stock.');
		});
	}

	function itemAdder(op) {
		if (op === 'substract') {
			if (count > 1) {
				setCount(count - 1);
			}
		}
		if (op === 'add') {
			if (count < maxNumb) {
				setCount(count + 1);
			}
		}
	}

	return (
		<div className='card itemcount'>
			<div className='itemName'>
				<p>{title}</p>
			</div>
			<div className='counter card'>
				<button onClick={() => itemAdder('substract')}>-</button>
				<div>
					<p>{count}</p>
				</div>
				<button onClick={() => itemAdder('add')}>+</button>
			</div>
			<SpecialBtn className={'btn-color-30 width100'} onClick={() => onAdd(id, count)}>
				Sumar al carrito
			</SpecialBtn>
		</div>
	);
}

export default ItemCount;
