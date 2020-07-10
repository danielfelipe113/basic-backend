/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

const commonService = require('../../../utils/common.service');
const passport    = require('passport');
const Joi         = require('joi');
const generateJWT = require('../../../utils/generateJWT');
const User        = require('../../../models').user;
const Company        = require('../../../models').company;





// GET
async function getUsersList (req, res, next) {
	//Temp, set 2 companies to the first user
	const users = await User.findAll();
	const companies = await Company.findAll();
	
	User.findAll({
		attributes: [
			'id',
			'firstName',
			'lastname'
		]
	})
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




module.exports = {
	getUsersList,
	getUserById,
};