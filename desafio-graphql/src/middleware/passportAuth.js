import passport from 'passport';

const passportSignin = (req, res, next) => {
	const obj = { username: req.body.email, password: req.body.password };
	req.body = obj;
	passport.authenticate('local', function (error, user, info) {
		if (error) {
			return res.status(401).send(error);
		}
		if (!user) {
			return res.status(401).send(info);
		}
		req.logIn(user, function (err) {
			if (err) {
				return next(err);
			}
			return next();
		});
	})(req, res, next);
};

const checkAuthentication = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		return res.status(401).send('not logged in');
	}
};

const checkNoSession = (req, res, next) => {
	if (req.isAuthenticated()) {
		return res.sendStatus(400);
	} else {
		return next();
	}
};

export { passportSignin, checkAuthentication, checkNoSession };
