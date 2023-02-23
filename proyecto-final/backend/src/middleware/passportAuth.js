import passport from 'passport';

// const passportSignin = (req, res, next) => {
// 	// console.log('buenas estoy en el middleware');
// 	// req.body.username = req.body.email;
// 	// Reflect.deleteProperty(req.body, 'email');
// 	// console.log('body parsing', req.body);
// 	passport.authenticate('local', function (err, user, info) {
// 		// handle succes or failure
// 	})(req, res, next);
// };
const passportSignin = (req, res, next) => {
	passport.authenticate('local', function (err, user, info) {
		if (err) return next(err);
		if (!user) return res.redirect('/login');

		req.logIn(user, function (err) {
			if (err) return next(err);
			return res.redirect('/account/profile');
		});
	})(req, res, next);
};

const checkAuthentication = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.send('not logged in');
	}
};

const checkNoSession = async (req, res, next) => {
	if (!req.isAuthenticated()) {
		next();
	} else {
		return res.status(400);
	}
};

export { passportSignin, checkAuthentication, checkNoSession };
