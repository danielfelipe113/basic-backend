
'use strict';
const crypto = require('crypto');
const uuid = require('uuid/v4');
const Sequelize = require('sequelize');
const authService = require('../utils/auth.service');
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
		password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
		},
		provider: DataTypes.STRING,
        salt: DataTypes.STRING
	}, {
		sequelize,
  		modelName: 'user',
		
		hooks: {
			beforeBulkCreate(users, fields) {				
				let promises = [];
                users.forEach(user => {
					console.log(typeof user.dataValues.email)
					user.email = user.dataValues.email.toLowerCase();
					promises.push(authService.updatePassword(user))
				});
				return Promise.all(promises);
			},
			beforeCreate(user, fields) {
				user.email = user.email.toLowerCase();
				return authService.updatePassword(user);
			},
			beforeUpdate(user, fields) {
				if(user.changed('password')) {
                    return authService.updatePassword(user);
                }
                return Promise.resolve(user);
			},
		}
	});

 
 

	return User;
}