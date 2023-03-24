const isAdmin = true;

const adminPrivileges = (req, res, next) => {
	if (isAdmin) {
		next();
	} else {
		return res.sendStatus(401);
	}
};

export default adminPrivileges;
