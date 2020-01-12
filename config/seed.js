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
     

    const employeePromise = db.employee.destroy({ where: {} })
        .then(() => db.employee.bulkCreate([{
            id        : 1,
			firstName: 'John',
            lastName: 'Hancock',
        }, {
			id        : 2,
            firstName: "Bob",
            lastName: "Doe",
        }])
        .then(() => db.employee.create({
            id        : 3,
			firstName: 'Jane',
            lastName: 'Hitchcock',
        }))
        .then(() => console.log('finished populating employees'))
        .catch(err => console.log('error populating employees', err)));
     
        
    const companyPromise = db.company.destroy({ where: {} })
        .then(() => db.company.bulkCreate([{
            id: 1,
            name: 'Revista Hip',
            size: 23,
        }, {
            id: 2,
			name: 'Aquru Radio',
            size: 32,
        }])
        .then(() => console.log('finished populating company'))
        .then(async () => {
            const employees = await db.employee.findAll();
            const companies = await db.company.findAll();
            employees.forEach(async employee => await       employee.setCompanies([companies[0]]))
        })
		.catch(err => console.log('error populating company', err)));
    
    promises.push(userPromise);
    promises.push(employeePromise);
    promises.push(companyPromise);

    return Promise.all(promises);
}
