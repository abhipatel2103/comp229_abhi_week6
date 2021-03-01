/**Student Name: Abhi Patel, Student num: 301167516, File name : contact_list.js, Date: 02/28/2021**/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let jwt= require('jsonwebtoken');


//reference to Contact_list controller
let contactController = require('../controllers/contact_list');

//helper function for guad purpose
function requireAuth(req, res, next)
{
	//Check if user is logged in
	if(!req.isAuthenticated())	//if user is not logged in
	{
		return res.redirect('/login');
	}
	next();
}

//decoupled logic from this file to controller/contact_list.js file

/* GET Route for the Contact List page - READ OPeration */
router.get('/', contactController.displayContactList);


/* GET Route for the displaying Add page - CREATE Operation */
router.get('/add', requireAuth, contactController.displayAddPage);

/* POST Route for the processing Add page - CREATE Operation */
router.post('/add', requireAuth, contactController.processAddPage);

/* GET Route for the displaying Edit page - UPDATE Operation */
router.get('/edit/:id', requireAuth, contactController.displayEditPage);

/* POST Route for the processing Edit page - UPDATE Operation */
router.post('/edit/:id', requireAuth, contactController.processEditPage);

/* GET to perform deletion - DELETE Operation */
router.get('/delete/:id', requireAuth, contactController.performDelete);


module.exports = router;