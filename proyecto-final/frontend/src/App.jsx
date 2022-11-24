import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';
import CartContextProvider from './context/CartContext';
import './css/App.css';

function App() {
	return (
		<CartContextProvider>
			<Router>
				<div className='App'>
					<div className='Wrapper'>
						<NavBar />
						<Routes>
							<Route path='/' element={<ItemListContainer />} />
							<Route path='/products/:category' element={<ItemListContainer />} />
							<Route path='/item/:id' element={<ItemDetailContainer />} />
							<Route path='/cart' element={<Cart />} />
						</Routes>
					</div>
				</div>
			</Router>
		</CartContextProvider>
	);
}

export default App;
