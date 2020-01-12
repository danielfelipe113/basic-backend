
'use strict';
const crypto = require('crypto');
const uuid = require('uuid/v4');
const Sequelize = require('sequelize');
const authService = require('../utils/auth.service');
// const Model = db.Sequelize.Model

module.exports = (sequelize, DataTypes) => {
	class Employee extends Sequelize.Model {
		//Setters and getters
		// get fullName() {
		// 	return this.firstname + ' ' + this.lastname;
		// }

		// set fullName(value) {
		// 	const names = value.split(' ');
		// 	this.setDataValue('firstname', names.slice(0, -1).join(' '));
		// 	this.setDataValue('lastname', names.slice(-1).join(' '));
		// }
	}

	Employee.init({
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: () => uuid()
		},
		firstName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		lastName: {
			type: Sequelize.STRING
			// allowNull defaults to true
		},
		email: {
			type: DataTypes.STRING,
			unique: {
				msg: 'The specified email address is already in use.'
			},
			validate: {
				isEmail: true
			}
		},
		provider: DataTypes.STRING,
	}, {
		sequelize,
		modelName: 'employee',

		hooks: {
			beforeBulkCreate(employees, fields) {
				let promises = [];
				employees.forEach(employee => promises.push(authService.updatePassword(employee)));
				return Promise.all(promises);
			},
			beforeCreate(employee, fields) {
				return authService.updatePassword(employee);
			},
			beforeUpdate(employee, fields) {
				if (employee.changed('password')) {
					return authService.updatePassword(employee);
				}
				return Promise.resolve(employee);
			},
		}
	});




	return Employee;
}