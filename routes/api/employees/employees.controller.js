/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

const commonService = require('../../../utils/common.service');
const passport    = require('passport');
const generateJWT = require('../../../utils/generateJWT');
const Employee        = require('../../../models').employee;
const Company        = require('../../../models').company;

// GET
async function getEmployeesList (req, res, next) {
	//Temp, set 2 companies to the first user
	const employees = await Employee.findAll();
	const companies = await Company.findAll();
	await employees[0].setCompanies(...companies);
	
	employees[0].getCompanies()
		.then(commonService.respondWithResult(res, 201))
		.catch(commonService.handleError(res));
}

async function getEmployeeById(req, res, next) {
	Employee.findOne({
		where: {
			id: req.params.id
		},
		attributes: [
			'id',
			'firstName',
			'lastname',
		]
	})
	.then(commonService.respondWithResult(res, 201))
	.catch(commonService.handleError(res));
}

async function getEmployeeCompanies(req, res, next) {
	Employee.findOne({
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
	getEmployeesList,
	getEmployeeById,
	getEmployeeCompanies
};