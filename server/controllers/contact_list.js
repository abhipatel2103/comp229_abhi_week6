let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//Enable JWT
let jwt = require('jsonwebtoken');

//connect to our Contact model
let Contact = require('../models/contact_list');


/* GET Route for the Contact List page - READ OPeration */
module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(ContactList);

            res.render('contact_list/list', {title: 'Contacts', ContactList: contactList, displayName: req.user ? req.user.displayName : ''})            
        }
    });
}

/* GET Route for the displaying Add page - CREATE Operation */
module.exports.displayAddPage = (req, res, next) =>{
            res.render('contact_list/add', {title: 'Add Contact', displayName: req.user ? req.user.displayName : ''})            

}

/* POST Route for the processing Add page - CREATE Operation */
module.exports.processAddPage = (req, res, next) =>{
	let newContact = Contact({
		"name": req.body.name,
		"number": req.body.number,
		"email": req.body.email
	});

	Contact.create(newContact,(err, contact )=>{
		if(err)
		{
			console.log(err);
		}
		else
		{
			//Refesh Contact list
			res.redirect('/contact-list');
		}
	});
	
}

/* GET Route for the displaying Edit page - UPDATE Operation */
module.exports.displayEditPage = (req, res, next) =>{
	let id = req.params.id;

	Contact.findById(id, (err,contactToEdit)=>{
		if(err)
		{
			console.log(err);
			res.end(err);
		}
		else
		{
			//Show the edit view
			res.render('contact_list/edit', {title :'Edit Contact', contact: contactToEdit, displayName: req.user ? req.user.displayName : ''})
		}
	});
	
}

/* POST Route for the processing Edit page - UPDATE Operation */
module.exports.processEditPage = (req, res, next) =>{
	let id = req.params.id

	let updatedContact = Contact({
		"_id": id,
		"name": req.body.name,
		"number": req.body.number,
		"email": req.body.email

	});

	Contact.updateOne({_id: id}, updatedContact, (err)=>{
		if(err)
		{
			console.log(err);
			res.end(err);
		}
		else{
			//Refesh Contact list
			res.redirect('/contact-list'); 
		}
	});
	
}

/* GET to perform deletion - DELETE Operation */
module.exports.performDelete =  (req, res, next) =>{

	let id = req.params.id;

	Contact.remove({_id:id}, (err)=>{
		if(err)
		{
			console.log(err);
			res.end(err);
		}
		else{
			//Refesh Contact list
			res.redirect('/contact-list'); 
		}
	});
	
}

