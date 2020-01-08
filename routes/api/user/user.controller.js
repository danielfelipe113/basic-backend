/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

const commonService = require('../../../utils/common.service');
const passport    = require('passport');
const generateJWT = require('../../../utils/generateJWT');
const User        = require('../../../models').user;
const Company        = require('../../../models').company;

// POST
function login(req, res, next) {
	const { body: { user } } = req;
	
    
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