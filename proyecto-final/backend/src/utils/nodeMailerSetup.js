import { createTransport } from 'nodemailer';
import { logger } from './winstonLogger.js';

const sendToMe = process.env.EMAIL_ADDRESS;
const password = process.env.EMAIL_PASSWORD;
const name = process.env.EMAIL_NAME;

const transporter = createTransport({
	service: 'gmail',
	port: 587,
	auth: {
		user: sendToMe,
		pass: password,
	},
});

const sendNodeMail = async (mailOptions) => {
	try {
		await transporter.sendMail(mailOptions);
	} catch (err) {
		logger.error(`Date: ${Date.now()}\n Error while trying to send an email\n ${err}`);
		return 'error';
	}
};

export { sendNodeMail, name, sendToMe };
