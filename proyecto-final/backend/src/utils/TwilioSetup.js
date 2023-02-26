import twilio from 'twilio';
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const client = twilio(accountSid, authToken);
const twilioWpp = process.env.TWILIO_WPP;
const adminNumber = process.env.AUX_NUMBER;

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
