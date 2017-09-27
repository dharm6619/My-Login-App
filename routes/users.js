var express = require('express');
var router = express.Router();
var User = require('../models/users');

//Register

router.get('/register', function(req, res) {
res.render('register');
});

//login

router.get('/login', function(req, res) {
res.render('login');
});

//Register User
router.post('/register',function(req,res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

//validations
	req.checkBody('name', 'Name is Compulsory').notEmpty();
	req.checkBody('email', 'Email is Compulsory').notEmpty();
	req.checkBody('email', 'Email is Invalid').isEmail();
	req.checkBody('username', 'Username is Compulsory').notEmpty();
	req.checkBody('password', 'password is Compulsory').notEmpty();
req.checkBody('password2', 'password2 must match password1').req.body.password();

var errors = req.validationErrors();
	
	if (errors) {
		res.render('register',{
			errors:errors});
			}
	else {
		var newUser = new User({
		name: name,
		email: email,
		username: username,
		password:password});
	User.createUser(newUser, function(err,user){
	if(err) throw err;
	console.log(user);
	});
	req.flash('success_msg','You are successfully registered and can now login');
	res.redirect('/users/login');
			}
	
	});

module.exports = router;

