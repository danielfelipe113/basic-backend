const db = require('../models');
const env = process.env.NODE_ENV || 'development';
const config = require('./config.js')[env];

module.exports = function seedDatabaseIfNeeded() {
    if(!config.seedDB) {
        return Promise.resolve();
    }

    let promises = [];
    const userPromise = db.user.destroy({ where: {} })
        .then(() => db.user.bulkCreate([{
            id        : 1,
			firstName: 'John',
            lastName: 'Hancock',
			password  : 'demo'
        }, {
			id        : 2,
            firstName: "Jane",
            lastName: "Doe",
			password  : 'demo'
        }])
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err)));
        
        
    const companyPromise = db.company.destroy({ where: {} })
        .then(() => db.company.bulkCreate([{
            id: 1,
            name: 'revistetesta',
            size: 23,
        }, {
            id: 2,
			name: 'rsdsdsdsdsdsdsevistetesta',
            size: 32,
        }])
        .then(() => console.log('finished populating company'))
		.catch(err => console.log('error populating company', err)));
    
    promises.push(userPromise);
    promises.push(companyPromise);

    return Promise.all(promises);
}
