import passportLocal from 'passport-local';
import { comparePassword } from './bcrypt.js';

const LocalStrategy = passportLocal.Strategy;

function passportConfig(passport, getUserByEmail, getUserById) {
	passport.serializeUser((user, done) => {
		console.log('serial');
		return done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		console.log('deserial');
		return done(null, await getUserById(id));
	});

	const authenticateUser = async (email, password, done) => {
		console.log('hola estoy autenticando');
		const user = await getUserByEmail(email);
		if (user == null) {
			console.log('user Not Found');
			return done(null, false, { message: 'invalid user or password' });
		}
		if (!comparePassword(password, user.password)) {
			console.log('invalid pass');
			return done(null, false, { message: 'invalid user or password' });
		}
		return done(null, user);
	};

	passport.use(new LocalStrategy('local', { usernameField: 'email', passwordField: 'password' }, authenticateUser));
}

export default passportConfig;
