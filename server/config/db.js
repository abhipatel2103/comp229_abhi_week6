/**Student Name: Abhi Patel, Student num: 301167516, File name : db.js, Date: 02/28/2021**/

module.exports = {
	//"URI" : "mongodb://localhost/contact_info",

	//Below added URI of mongo Atlas, so our Db can be run online through Azure server
	"URI" : "mongodb+srv://Abhi:whyafraid456.@mongodbserver.ujdxn.mongodb.net/contact_info?retryWrites=true&w=majority",
	
	"Secret": "SomeSecret"	//this is secret key for JWT which we will use for API of Angular for Security
}