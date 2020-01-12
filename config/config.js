//CAREFUL! IF SEEDING DB IT WILL DROP EVERYTHING!

module.exports = {
	development: {
		username: process.env.DB_USERNAME || 'homestead',
		password: process.env.DB_PASSWORD || 'secret',
		database: process.env.DB_NAME || 'tests',
		host: '127.0.0.1',
		port: process.env.DB_PORT || 33060,
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
