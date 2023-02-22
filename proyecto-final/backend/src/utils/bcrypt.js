import bcrypt from 'bcrypt';

const hashPassword = (password) => {
	const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	return hashedPassword;
};

const comparePassword = (reqPassword, storedPassword) => {
	return bcrypt.compareSync(reqPassword, storedPassword);
};

export { hashPassword, comparePassword };
