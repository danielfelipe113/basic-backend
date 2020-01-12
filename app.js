const express									= require('express');
const bodyParser							= require('body-parser');
const session									= require('express-session');
const exphbs									= require('express-handlebars');
const cors										= require('cors');
const db											= require('./models');
const seedDatabaseIfNeeded		= require('./config/seed');
const debug										= require('debug')(':server');
const env											= process.env.NODE_ENV || 'development';
const config									= require('./config/config.js')[env];

/* Make all variables from our .env file available in our process */
require('dotenv').config();

/* Init express */
const app = express();

/* Set rendering engine */
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs');

/* Here we setup the middlewares & configs */

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: process.env.SESSION_SECRET, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
require('./config/passport');

/* Here we define the api routes */
app.use(require('./routes'));

const port = process.env.PORT || 3000;
const address = process.env.SERVER_ADDRESS || '127.0.0.1';



function startServer() {
	app.listen( port, address, () => console.log(`Server running on http://${address}:${port}`));
	app.on('error', onError);
	app.on('listening', onListening);  
}


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== 'listen') {
	  throw error;
	}
  
	let bind = typeof port === 'string'
	  ? 'Pipe ' + port
	  : 'Port ' + port;
  
	// handle specific listen errors with friendly messages
	switch (error.code) {
	  case 'EACCES':
		console.error(bind + ' requires elevated privileges');
		process.exit(1);
		break;
	  case 'EADDRINUSE':
		console.error(bind + ' is already in use');
		process.exit(1);
		break;
	  default:
		throw error;
	}
  }
  
  /**
   * Event listener for HTTP server "listening" event.
   */
  
  function onListening() {
	let addr = server.address();
	let bind = typeof addr === 'string'
	  ? 'pipe ' + addr
	  : 'port ' + addr.port;
	debug('Listening on ' + bind);
  }

  

/* Create everything automatically with sequelize ORM */
//If you want to delete only the data instead of the tables, leave just line 88
if(config.seedDB) {
	db.sequelize.drop()
		.then(() => startDB());
} else {
	startDB();
}

function startDB() {
	db.sequelize.sync()
		.then(seedDatabaseIfNeeded)
		.then(startServer)
		.catch(err => {
			debug('Server failed to start due to error: %s', err);
		});
}

module.exports = app;