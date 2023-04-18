import Users from '../classes/UserClass.js';
import { userCollection, userSchema } from '../models/userModel.js';
const users = new Users(userCollection, userSchema);
import { roleList } from '../utils/roleList.js';

const adminPrivileges = async (req, res, next) => {
	const id = req.session.passport.user;
	const user = await users.getById(id);
	const isAdmin = user.role.admin === roleList.admin ? true : false;
	if (isAdmin) {
		next();
	} else {
		return res.sendStatus(401);
	}
};

export default adminPrivileges;
