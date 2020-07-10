/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

const commonService = require('../../../utils/common.service');
const passport    = require('passport');
const Joi         = require('joi');
const generateJWT = require('../../../utils/generateJWT');
const User        = require('../../../models').user;
const Company        = require('../../../models').company;


const userSchema = Joi.object().keys({
	email: Joi.string().email({ minDomainAtoms: 2 }).required(),
	password: Joi.string().required(),
});
// POST
function login(req, res, next) {
	const result = Joi.validate(req.body, userSchema);
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
				id: passportUser.id,
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

function signUp(req, res /*, next*/) {
	return User.create(req.body)
        .then(res => {
            Reflect.deleteProperty(res.dataValues, 'salt');
            Reflect.deleteProperty(res.dataValues, 'password');
            return res;
        })
        .then(commonService.respondWithResult(res, 201))
        .catch(commonService.handleError(res));
}




module.exports = {
	login,
	signUp,
};