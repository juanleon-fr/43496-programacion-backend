import passportLocal from 'passport-local';
import { comparePassword } from './bcrypt.js';

const LocalStrategy = passportLocal.Strategy;

const initializePassport = (passport, getUserByEmail, getUserById) => {
	passport.use(
		'signin',
		new LocalStrategy((email, password, done) => {
			getUserByEmail(email).then((user) => {
				if (user === null) {
					console.log('user Not Found with email ' + email);
					return done(null, false);
				}

				if (!comparePassword(password, user.password)) {
					console.log('invalid pass');
					return done(null, false);
				}
				return done(null, user);
			});
		})
	);

	passport.serializeUser((user, done) => {
		console.log(user);
		done(null, user._id);
	});

	passport.deserializeUser((id, done) => {
		getUserById(id, done);
	});
};

export default initializePassport;
