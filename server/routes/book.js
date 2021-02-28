let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Book Model
let Book = require('../models/book');

//reference to Book controller
let bookController = require('../controllers/book');
const book = require('../models/book');

/* GET Route for the Book List page - READ OPeration */
router.get('/', bookController.displayBookList);


/* GET Route for the displaying Add page - CREATE Operation */
router.get('/add', bookController.displayAddPage);

/* POST Route for the processing Add page - CREATE Operation */
router.post('/add', bookController.processAddPage);

/* GET Route for the displaying Edit page - UPDATE Operation */
router.get('/edit/:id', bookController.displayEditPage);

/* POST Route for the processing Edit page - UPDATE Operation */
router.post('/edit/:id', bookController.processEditPage);

/* GET to perform deletion - DELETE Operation */
router.get('/delete/:id',bookController.performDelete);



module.exports = router;