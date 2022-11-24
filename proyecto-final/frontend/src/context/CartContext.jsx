import { useEffect, useState, createContext } from 'react';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
	const [cartList, setCartList] = useState([]);
	const [totalCount, setTotalCount] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	//cartupdate
	useEffect(() => {
		let effectPrice = 0;
		let effectCount = 0;
		cartList.forEach((element) => {
			effectCount = effectCount + element.quantity;
			effectPrice = effectPrice + element.price * element.quantity;
		});
		setTotalCount(effectCount);
		setTotalPrice(effectPrice);
	}, [cartList]);

	const addItem = (item, quantity) => {
		let cartItem = { ...item, quantity };
		if (!isInCart(item.id)) {
			setCartList([...cartList, cartItem]);
		} else {
			let newCartList = cartList.filter((element) => element.id !== item.id);
			let changed = cartList.find((element) => element.id === item.id);
			changed.quantity = changed.quantity + quantity;
			newCartList.push(changed);
			setCartList(newCartList);
		}
		alert(`${cartItem.quantity} x ${item.title} agregado al carrito. id: ${item.id}`);
	};

	const removeItem = (id) => {
		let newCartList = cartList.filter((item) => item.id !== id);
		setCartList(newCartList);
	};

	const clear = () => {
		setCartList([]);
	};

	const isInCart = (id) => {
		if (cartList.find((item) => item.id === id)) return true;
	};

	return <CartContext.Provider value={{ cartList, addItem, removeItem, clear, totalCount, totalPrice }}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
