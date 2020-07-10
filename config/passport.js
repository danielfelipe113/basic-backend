

const passport         = require('passport');
const LocalStrategy    = require('passport-local');
const authService = require('../utils/auth.service');
const User            = require('../models').user;

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
}, async (email, password, done) => {
	// Recover the user
	let user = await User.findOne({where: {email}});

	if(!user){
		return done(null, false, {errors: {'account': 'Invalid account'}});
	}

	// Validate password
	if ( !authService.validatePassword(password, user.password, user.salt) ) {
		return done(null, false, { errors: { 'password': 'Password is invalid'}});
	}

	return done(null, user);
}));
