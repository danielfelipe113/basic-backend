/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

const commonService = require('../../../utils/common.service');
const Joi         = require('joi');
const passport    = require('passport');
const generateJWT = require('../../../utils/generateJWT');
const User        = require('../../../models').User;





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