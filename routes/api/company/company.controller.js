/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

const commonService = require('../../../utils/common.service');
const Joi         = require('joi');
const passport    = require('passport');
const generateJWT = require('../../../utils/generateJWT');
const User        = require('../../../models').User;



const userSchema = Joi.object().keys({
	username: Joi.string().alphanum().min(3).max(30).optional(),
	password: Joi.string().required(),
	email: Joi.string().email({ minDomainAtoms: 2 }).required(),
	name: Joi.string().alphanum().min(2).max(100).optional(),
	surname: Joi.string().alphanum().min(2).max(100).optional()
});

// POST
function login(req, res, next) {
	const { body: { user } } = req;
	const result = Joi.validate(user, userSchema);
    
	if(result.error) {
		return res.status(422).json({
			errors: result.error
		});
	}

	return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
		if(err) {
			return next(err);
		}

		if(passportUser) {
			const user = {
				_id: passportUser.id,
				email: passportUser.email,
				name: passportUser.name,
				surname: passportUser.surname,
				token: generateJWT(passportUser)
			};

			return res.json({ user });
		}
        
		return res.status(400).send(info);
	})(req, res, next);
}

async function signUp(req, res /*, next*/) {
	const { body: { user } } = req;
	const result = Joi.validate(user, userSchema);
	if(result.error){
		return res.status(422).json({
			errors: result.error
		});
    }
    try{
        const user = await User.create(req.body);
        return res.json({ user });
    }catch(e){
        return res.status(500).json({
			errors: e
		});
    }
}

// GET
function getUsersList (req, res, next) {
	User.findAll()
		.then(commonService.respondWithResult(res, 201))
		.catch(commonService.handleError(res));
}

module.exports = {
	login,
	signUp,
	getUsersList
};