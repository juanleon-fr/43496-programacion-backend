const isAdmin = true;

const adminPrivileges = (req, res, next) => {
	if (isAdmin) {
		next();
	} else {
		return res.status(401).json({ error: 401, descripcion: `ruta ${req.url} método ${req.method} no autorizado` });
	}
};

export default adminPrivileges;
