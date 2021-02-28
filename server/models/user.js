//Require modules for user model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');


let User = mongoose.Schema(
	{
		username :
		{
			type: String,
			default: "",
			trim: true,
			required: 'username is required'
		},
		//below password is commented because password part will be done by passport-local-mongoose in secure way, where password will not be stored in text formart anywhere.
		/*
		password:
		{
			type: String,
			default: "",
			trim: true,
			required: 'password is required'
		},
		*/
		email :
		{
			type: String,
			default: "",
			trim: true,
			required: 'email is required'	
		},
		displayName :
		{
			type: String,
			default: "",
			trim: true,
			required: 'Display name is required'	
		},
		created :
		{
			type: Date,
			default: Date.now

		},
		update :
		{
			type: Date,
			default: Date.now

		}

	},
	{
		collection : "users"
	}
);

//configure options for User Model

let options = ({ missingPasswordError: 'Wrong/ Missing Password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);