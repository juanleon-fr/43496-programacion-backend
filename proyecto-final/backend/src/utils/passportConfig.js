import passportLocal from 'passport-local';
import { comparePassword } from './bcrypt.js';

const LocalStrategy = passportLocal.Strategy;

const passportConfig = (passport, getUserByEmail, getUserById) => {
	passport.use(
		'signin',
		new LocalStrategy({ passReqToCallback: true }, (email, password, done) => {
			getUserByEmail(email).then((user) => {
				console.log(email, password);
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
		done(null, user._id);
	});

	passport.deserializeUser((id, done) => {
		getUserById(id, done);
	});
};

export default passportConfig;
