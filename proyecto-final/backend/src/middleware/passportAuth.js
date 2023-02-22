import passport from 'passport';

const passportSignin = (req, res, next) => {
	req.user = { email: req.body.email, password: req.body.password };
	console.log(req.user);
	passport.authenticate('signin');
	return next();
};

const checkAuthentication = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/user/signin');
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
