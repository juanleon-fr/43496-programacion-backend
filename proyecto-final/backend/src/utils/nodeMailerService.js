import { sendNodeMail, name, sendToMe } from './nodeMailerSetup.js';

const sendSignupMail = (user) => {
	const { email, fullname, phone, address } = user;

	const signupNotify = {
		from: name,
		to: sendToMe,
		subject: 'Nuevo registro',
		html: ` <h1>Nuevo registro</h1>
	            <p>Correo Eletrónico: ${email}</p>
	            <p>Nombre Completo: ${fullname}</p>
	            <p>Teléfono: ${phone}</p>
	            <p>Dirección: ${address}</p>`,
	};
	sendNodeMail(signupNotify);
};

const sendOrderMail = (result, user) => {
	const { email, fullname } = user;
	const cart = result.products;
	let listaCompras = '';
	cart.forEach((element) => {
		listaCompras = listaCompras.concat(`<p>${element.title} ${element.code}</p>`);
	});
	const orderNotify = {
		from: name,
		to: sendToMe,
		subject: `Nueva orden de compra de ${fullname} (email: ${email})`,
		html: ` <h1>Nueva orden de compra</h1>
	            <p>Orden de compra:</p>
				${listaCompras}`,
	};
	sendNodeMail(orderNotify);
};
export { sendSignupMail, sendOrderMail };
