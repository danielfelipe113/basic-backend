/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

const commonService = require('../../common.service');
const Joi         = require('joi');
const passport    = require('passport');
const generateJWT = require('../../../utils/generateJWT');
const User        = require('../../../models').user;
const Company        = require('../../../models').company;


// TODO: Remove Joi, it's deprecated
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
async function getUsersList (req, res, next) {
	//Temp, set 2 companies to the first user
	const users = await User.findAll();
	const companies = await Company.findAll();
	await users[0].setCompanies(...companies);
	
	users[0].getCompanies()
		.then(commonService.respondWithResult(res, 201))
		.catch(commonService.handleError(res));
}

async function getUserById(req, res, next) {
	User.findOne({
		where: {
			id: req.params.id
		},
		attributes: [
			'id',
			'firstName',
			'lastname'
		]
	})
	.then(commonService.respondWithResult(res, 201))
	.catch(commonService.handleError(res));
}

async function getUserCompanies(req, res, next) {
	User.findOne({
		where: {
			id: req.params.id
		},
		attributes: [
			'id',
			'firstName',
			'lastname'
		]
	})
	.then(user => user.getCompanies())
	.then(commonService.respondWithResult(res, 201))
	.catch(commonService.handleError(res));
}


module.exports = {
	login,
	signUp,
	getUsersList,
	getUserById,
	getUserCompanies
};