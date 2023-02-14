const { fork } = require('child_process');

const random = (req, res) => {
	let cant = req.query.cant;
	let child = fork('./childProcess.js');
	child.send({ cant });
	child.on('message', (msg) => {
		const { data } = msg;
		res.json(data);
	});
	return `logger.log('info', *backtick*${Date.now()} ${req.method} '${req.originalUrl}'*backtick*)`;
};

module.exports = { random };
