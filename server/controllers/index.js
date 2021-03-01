/**Student Name: Abhi Patel, Student num: 301167516, File name : index.js, Date: 02/28/2021**/

let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let passport = require('passport');

//Enable JWT
let jwt= require('jsonwebtoken');
let DB = require('../config/db');

//Create User Model instance from Model folder/user.js file
let userModel = require('../models/user');
let User = userModel.User //Alias - So that we dont have to write everytime userModel.User

//decoupled logic of routes from routes/index.js file and added here

module.exports.displayHomePage = (req, res, next) =>{
	res.render('index', { title: 'Welcome to my portfolio website',key: "home", displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayAboutPage = (req, res, next) =>{
	res.render('index', { title: 'About Me',name: "",key: "about",displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayProjectsPage = (req, res, next) =>{
	res.render('index', { title: 'Recent Projects',name: "",key: "projects",displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayServicesPage = (req, res, next) =>{
	res.render('index', { title: 'Main Services',name: "",key:"services",displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayContactPage = (req, res, next) =>{
	res.render('index', { title: 'Contact Info',name: "",key:"contact",displayName: req.user ? req.user.displayName : ''});
}


//Controller for Login/register page
module.exports.displayLoginPage = (req, res, next) =>{
	//First, we will check whether user is already logged in
	if(!req.user)
	{
		res.render('auth/login',	// views folder is already added as path in config/app.js file.//Now, auth folder is inside of views folder, that's why we can directly write auth/login for login.ejs page
			{
					title: "Login",
					messages: req.flash('loginMessage'),
					displayName: req.user ? req.user.displayName : ''

			})
	}
	else
	{
		return res.redirect('/');
	}
}

module.exports.processLoginPage = (req, res, next) =>{
	passport.authenticate('local',
	(err, user, info) =>{
		//Server error
		if(err)
		{
			return next(err);
		}
		//if it is a user login error
		if(!user)
		{
			req.flash('loginMessage','Authentication Error');
			return res.render('/login');
		}
		req.login(user, (err) =>{
			//if Server error
			if(err)
			{
				return next(err);
			}
			/* Code for JWT- security*/
			const payload = 
			{
				id: user._id,
				displayName: user.displayName,
				username: user.username,
				email: user.email,

			}

			const authToken = jwt.sign(payload, DB.Secret,{
				expiresIn: 604800  //604800 sec = 1 week 
			});
			
			/* TODO- Getting ready to convert to API
			res.json({success: true, msg: 'User logged in successfully', user:{
				id: user._id,
				displayName: user.displayName,
				username: user.username,
				email: user.email,

			}, token: authToken});
			*/
			/*END*/

			return res.redirect('/contact-list');
		});
	})(req, res, next);

}

module.exports.displayRegisterPage = (req, res, next) =>{
	//First, we will check whether user is exist of not
	if(!req.user)
	{
		res.render('auth/register',
		{
			title: 'Register',
			messages: req.flash('registerMessage'),
			displayName: req.user ? req.user.displayName : ''
		});
	}
	//If user already exist
	else
	{
		res.redirect('/');
	}
}

module.exports.processRegisterPage = (req, res, next) =>{
	//Instantiate a User Object
	let newUser = new User({
		username: req.body.username,
		//password: req.body.password - but we will not do this as password should be secured
		email: req.body.email,
		displayName: req.body.displayName
	});
	//below User.register will encrypt password before storing it to Db
	User.register(newUser, req.body.password, (err) =>{
		//Server error
		if(err)
		{
			console.log("Error: Inserting New User");
			if(err.name == "UserExistsError")
			{
				req.flash('registerMessage', 
				'Registration Error: User Already Exits!'
				);
				console.log('Error: User Already Exists!');
			}

			return res.render('auth/register',
			{
				title: 'Register',
				messages: req.flash('registerMessage'),
				displayName: req.user ? req.user.displayName : ''
			});
		}
		else
		{
			//if no error exists, then register is successful, then
			//let register the user and authenticate the user

			/*JWT code- for Security */
			/* TODO- Getting ready to convert to API
			res.json({success: true, msg:'Use Registered Successfully!'})
			*/
			/* END*/
			passport.authenticate('local')(req, res,() =>{
				res.redirect('/contact-list');
			});
		}
	});

}

module.exports.performLogout = (req, res, next) =>{
	req.logout();
	res.redirect('/');
}
