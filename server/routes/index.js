/**Student Name: Abhi Patel, Student num: 301167516, File name : index.js, Date: 02/28/2021**/
let express = require('express');
let router = express.Router();


let indexcontroller = require('../controllers/index');

/* GET home page. */
router.get('/', indexcontroller.displayHomePage);

/* GET home page. */
router.get('/home', indexcontroller.displayHomePage);

/* GET About Us page. */
router.get('/about', indexcontroller.displayAboutPage);

/* GET Projects page. */
router.get('/Projects', indexcontroller.displayProjectsPage);

/* GET Services page. */
router.get('/services', indexcontroller.displayServicesPage);

/* GET Contact_us page. */
router.get('/contact', indexcontroller.displayContactPage);


/* GET Route for the displaying the Login page  */
router.get('/login', indexcontroller.displayLoginPage);

/* POST Route for the processing the Login page  */
router.post('/login', indexcontroller.processLoginPage);


/* GET Route for the displaying the Register page  */
router.get('/register', indexcontroller.displayRegisterPage);

/* POST Route for the processing the Register page  */
router.post('/register', indexcontroller.processRegisterPage);


/* GET to perform UserLogout */
router.get('/logout',indexcontroller.performLogout);

module.exports = router;
