import SpecialBtn from './SpecialBtn';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

const borrarItem = (id) => {
	alert(`${id} Borrado!`)
	window.location.reload(true);
}

const Item = ({ id, title, price, color, thumbnail }) => {
	const global = useContext(CartContext);

	let component;
	if (global.isAdmin === 'OFF') {
		component = (
			<Link to={`/item/${id}`}>
				<SpecialBtn className={'btn-color-30'}>Detalles</SpecialBtn>
			</Link>
		);
	} else {
		component = (
			<div>
				<Link to={`/edit/item/${id}`}>
					<SpecialBtn className={'btn-color-30'}>Actualizar</SpecialBtn>
				</Link>
				<SpecialBtn className={'btn-color-10'} onClick={() => borrarItem(id)}>Eliminar</SpecialBtn>
			</div>
		);
	}

	return (
		<div className='card bg-color-60 product--card box-shadow translate-on-hover' id={id}>
			<div className='product--card__img'>
				<img src={thumbnail} alt={title} />
				<p className='color-60 bg-color-30 precio'>${price}</p>
			</div>
			<div className='product--card__data'>
				<div className='product--card__data__details'>
					<h3 className='color-30'>{title}</h3>
					<h4 className='color-30'>{color}</h4>
				</div>
				{component}
			</div>
		</div>
	);
};

export default Item;
