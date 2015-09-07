// BASE SETUP
// =============================================================================

var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var env = app.get('env') == 'development' ? 'dev' : app.get('env');
var port = process.env.PORT || 4000;

// IMPORT MODELS
// =============================================================================
var Sequelize = require('sequelize');

// db config
//var env = "dev";
//var config = require('./config/database.json')[env];
//var password = config.password ? config.password : null;

//// initialize database connection
//var db = new Sequelize(
//	config.database,
//	config.user,
//	config.password,
//	{
//    dialect: config.driver,
//    logging: console.log,
//		define: {
//			timestamps: false
//		}
//	}
//);


// IMPORT ROUTES
// =============================================================================
var routes = require('./routes/index')
var posts = require('./routes/posts');


// REGISTER OUR ROUTES
// =============================================================================
app.use('/', routes);
app.use('/post', posts);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
