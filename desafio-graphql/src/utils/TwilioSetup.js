import twilio from 'twilio';
import { accountSid, authToken, twilioNumber, twilioWpp, adminNumber } from '../utils/dotenvExports.js';
const client = twilio(accountSid, authToken);

const sendSMSBuyer = async (idstring, phone) => {
	let id = idstring;
	id = id.replace('")', '').replace('new ObjectId("', '');
	await client.messages.create({
		body: `Hola! Tu pedido con ID ${id} fue recibido y ahora se encuentra en proceso. Muchas gracias.`,
		from: twilioNumber,
		to: phone,
	});
};

const sendWPPAdmin = async (result, user, idstring) => {
	const { email, fullname } = user;
	const cart = result.products;
	let listaCompras = '';
	cart.forEach((element) => {
		listaCompras = listaCompras.concat(`${element.title} (código:${element.code})\n`);
	});
	let id = idstring;
	id.replace('")', '').replace('new ObjectId("', '');

	const body = `Nueva orden de compra de ${fullname} (email: ${email})\nID de pedido: ${id}\nLista:\n${listaCompras}`;

	client.messages.create({
		body: body,
		from: `whatsapp:${twilioWpp}`,
		to: `whatsapp:${adminNumber}`,
	});
};

export { sendSMSBuyer, sendWPPAdmin };
