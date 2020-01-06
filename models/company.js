
'use strict';
const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
module.exports = (sequelize, DataTypes) => {
	class Company extends Sequelize.Model {
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

    Company.init({
        id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: () => uuid()
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		size: {
			type: Sequelize.INTEGER
			// allowNull defaults to true
		}
           
	}, {
		sequelize,
		modelName: 'company',
	});
	
	return Company
}
