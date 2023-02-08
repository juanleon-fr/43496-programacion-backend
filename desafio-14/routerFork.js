const { fork } = require('child_process');

const random = (req, res) => {
	let cant = req.query.cant;
	let child = fork('./childProcess.js');
	child.send({ cant });
	child.on('message', (msg) => {
		const { data } = msg;
		res.json(data);
	});
	let cantlog = '?cant=';
	if (cant) {
		cantlog = cantlog.concat(cant);
	}
	return `logger.log('info', '${Date.now()} GET /api/randoms${cantlog}')`;
};

module.exports = { random };
