/**Student Name: Abhi Patel, Student num: 301167516, File name : contact_list.js, Date: 02/28/2021**/
let mongoose = require('mongoose');

//Create a model class - which is model for 'contacts' collection in Db

let contactModel = mongoose.Schema({
	name: String,
	number: String,
	email: String
},
{
	collections : "contact_info"
}
);

module.exports = mongoose.model('Contact', contactModel);