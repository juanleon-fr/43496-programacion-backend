const http = require('http');
const PORT = 8080;

const server = http.createServer((req, res) => {
	res.end('Hola mundo');
});

server.listen(PORT, () => {
	console.log(`Servidor Http escuchando en el puerto ${PORT}`);
});
