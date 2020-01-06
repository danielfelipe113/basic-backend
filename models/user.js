
'use strict';
const uuid = require('uuid/v4');
const Sequelize = require('sequelize');
// const Model = db.Sequelize.Model

module.exports = (sequelize, DataTypes) => {
	class User extends Sequelize.Model {
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

	User.init({
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
		}
	}, {
		sequelize,
  		modelName: 'user',
		
		hooks: {
			beforeBulkCreate(companies, fields) {
				
			},
			beforeCreate(company, fields) {
			
			},
			beforeUpdate(company, fields) {
				
			}
		}
	});

	return User;
}