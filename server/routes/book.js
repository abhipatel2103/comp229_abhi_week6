let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let jwt= require('jsonwebtoken');




//reference to Book controller
let bookController = require('../controllers/book');

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

/* GET Route for the Book List page - READ OPeration */
router.get('/', bookController.displayBookList);


/* GET Route for the displaying Add page - CREATE Operation */
router.get('/add', requireAuth, bookController.displayAddPage);

/* POST Route for the processing Add page - CREATE Operation */
router.post('/add', requireAuth, bookController.processAddPage);

/* GET Route for the displaying Edit page - UPDATE Operation */
router.get('/edit/:id', requireAuth, bookController.displayEditPage);

/* POST Route for the processing Edit page - UPDATE Operation */
router.post('/edit/:id', requireAuth, bookController.processEditPage);

/* GET to perform deletion - DELETE Operation */
router.get('/delete/:id', requireAuth, bookController.performDelete);



module.exports = router;