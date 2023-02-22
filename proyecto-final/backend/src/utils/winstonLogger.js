import { createLogger, format, transports } from 'winston';
import exprWin from 'express-winston';
const logger = createLogger({
	transports: [
		new transports.Console({ level: 'info' }),
		new transports.File({
			filename: './src/logs/warn.log',
			level: 'warn',
		}),
		new transports.File({
			filename: './src/logs/error.log',
			level: 'error',
		}),
	],
	format: format.combine(format.json(), format.timestamp(), format.prettyPrint()),
});

const expressWinston = exprWin.logger({
	transports: [
		new transports.Console({ level: 'info' }),
		new transports.File({
			filename: './src/logs/warn.log',
			level: 'warn',
		}),
		new transports.File({
			filename: './src/logs/error.log',
			level: 'error',
		}),
	],
	format: format.combine(format.json(), format.timestamp(), format.prettyPrint()),
	statusLevels: true,
});

export { logger, expressWinston };
