/**Student Name: Abhi Patel, Student num: 301167516, File name : app.js, Date: 02/28/2021**/

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');


//modules for authentication
let session = require('express-session');
let passport = require('passport');

//more authentication- JWT
let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;	//made Alias
let ExtractJWT = passportJWT.ExtractJwt;

let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy; 	//made Alias

//flash- used to prompt(popup) message
let flash = require('connect-flash');

//Database setup
//mongoose is a module that used to configure mongoDb in Node
let mongoose = require("mongoose");
let DB = require("./db");

//point mongoose to the db URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));

mongoDB.once('open', ()=>{
	console.log("Connected to MongoDB");
});

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let contactsRouter = require('../routes/contact_list'); //refernce route of business contact_list here to configure it in app.js

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

//setup express session - for user login  session
app.use(session({
	secret: "SomeSecret",
	saveUninitialized: false,
	resave: false
}));

//initialize flash
app.use(flash());

//initialize passport - it is a module which is used mainly for authentication/authorization.
app.use(passport.initialize());
app.use(passport.session());

//passport user configuration
	//Create a User Model instance
	let userModel = require('../models/user');
	let User = userModel.User;


//Implement a User Authentication strategy
passport.use(User.createStrategy());


//Serialize and deserialize User info- that means encrypt and decrypt
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));

//JWT code
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey= DB.Secret;

let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done)=>{
	User.findById(jwt_payload.id)
		.then(user =>{
			return done(null, user);
		})
		.catch(err =>{
			return done(err, false);
		});
});

passport.use(strategy); //activated above created strategy


//routing
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/contact-list',contactsRouter); //add business contact-list route


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: "Error"});
});

module.exports = app;
