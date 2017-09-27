var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('flash');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local'),Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;


var routes = require('./routes/index');
var users = require('./routes/users');
//Init App

var app=express();
//View Engine
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout: 'layout'}));
app.set('view engine','handlebars');

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Express Session
app.use(session ({
	secret: 'secret',
	saveUninitialized: true,
	resave: true	
}));
//Passport Initialize
app.use(passport.initialize());
app.use(passport.session());


//Express Validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
	var namespace = param.split('.')
	, root = namespace.shift()
	, formParam = root;

	while(namespace.length) {
	formParam += '[' + namespace.shift() + ']';
	}
	return {
	param: formParam,
	msg: msg,
	value: value};}
}));

//Connect flash
app.use(flash());
//Global Variables
app.use(function (req,res,next) {
res.locals.success_msg = req.flash('success_msg');
res.locals.error_msg = req.flash('error_msg');
res.locals.error = req.flash('error');
next();
});
app.use('/',routes);
app.use('/users',users);

//Set port
app.set('port', (process.env.Port ||3000));

app.listen(app.get('port'),function(){
	console.log('Server Started on port' +app.get('port'));
});


