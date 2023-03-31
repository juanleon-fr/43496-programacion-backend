import passportLocal from 'passport-local';
import { comparePassword } from './bcrypt.js';
import mongooseConnect from '../utils/mongooseConnect.js';

const LocalStrategy = passportLocal.Strategy;

function passportConfig(passport, getUserByEmail, getUserById) {
	const authenticateUser = async (email, password, done) => {
		const user = await getUserByEmail(email);
		if (user == null) {
			return done(null, false, { message: 'invalid user or password' });
		}
		if (!comparePassword(password, user.password)) {
			return done(null, false, { message: 'invalid user or password' });
		}
		return done(null, user);
	};

	passport.use(new LocalStrategy('local', authenticateUser));

	passport.serializeUser((user, done) => {
		return done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		return done(null, await getUserById(id));
	});
}

const passportDBConnect = (uri) => {
	mongooseConnect(uri);
};

export { passportConfig, passportDBConnect };
