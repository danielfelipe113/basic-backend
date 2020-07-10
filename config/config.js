//CAREFUL! IF SEEDING DB IT WILL DROP EVERYTHING!

module.exports = {
	development: {
		username: 'vet',
		password: 'secret',
		database: 'veterinary',
		host: '142.93.53.238',
		port: 3306,
		dialect: 'mysql',
		seedDB: true,
	},
	test: {
		dialect: 'mysql',
		storage: ':memory:'
	},
	production: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOSTNAME,
		dialect: 'mysql',
		use_env_variable: 'DATABASE_URL',
		seedDB: false,
	}
};
