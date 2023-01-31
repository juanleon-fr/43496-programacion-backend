function randInt(max) {
	return Math.floor(Math.random() * max) + 1;
}

const max = 1000;

process.on('message', (msg) => {
	let cant;
	if (msg.cant) {
		cant = msg.cant;
	} else {
		cant = 1e8;
	}
	const resObj = {};
	for (let i = 0; i < cant; i++) {
		const n = randInt(max);
		resObj[n] == undefined ? (resObj[n] = 1) : resObj[n]++;
	}
	process.send({ data: resObj });
});
