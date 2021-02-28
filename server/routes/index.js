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

module.exports = router;
