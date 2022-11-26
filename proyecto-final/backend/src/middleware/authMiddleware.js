const isAdmin = true;

const authMiddleware = (req, res, next) => {
	if (isAdmin) {
		next();
	} else {
		return res.status(401).json({ error: 401, descripcion: `ruta ${req.url} método ${req.method} no autorizado` });
	}
};

// const permissions = { carrito: { get: true, post: true, put: true, delete: true }, productos: { get: true, post: true, put: true, delete: true } };
module.exports = authMiddleware;
