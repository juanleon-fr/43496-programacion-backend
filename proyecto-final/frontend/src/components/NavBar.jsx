import NavIcon from '../assets/icons/entropy-icon.svg';
import NavLogotype from '../assets/icons/entropy-logotype.svg';
import CartWidget from './CartWidget';
import SpecialBtn from './SpecialBtn';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

function NavBar() {
	const global = useContext(CartContext);
	return (
		<>
			<header>
				<nav className='navbar'>
					<Link to='/'>
						<div className='nav-logo'>
							<button className='nav-icon'>
								<img src={NavIcon} alt='Icon' />
								<div className='circle' />
							</button>
							<button className='nav-logotype'>
								<img src={NavLogotype} alt='Entropy' />
								<div className='line' />
							</button>
						</div>
					</Link>
					<ul className='nav-menu'>
						{global.totalCount !== 0 ? <Link to='/cart'><li className='nav-item'><SpecialBtn><CartWidget /></SpecialBtn></li></Link> : <></>}
          				<Link to='/products/tshirts'><li className='nav-item'><SpecialBtn>Remeras</SpecialBtn></li></Link>
          				<Link to='/products/hoodies'><li className='nav-item'><SpecialBtn>Buzos</SpecialBtn></li></Link>
						<Link to='/products/pants'><li className='nav-item'><SpecialBtn>Pantalones</SpecialBtn></li></Link>
						<li className='nav-item' id='login-li'><SpecialBtn className={'btn-color-10'} onClick={() => global.toggleAdmin()}>Toggle Admin! {global.isAdmin}</SpecialBtn></li>
					</ul>
				</nav>
			</header>
		</>
	);
}

export default NavBar;
