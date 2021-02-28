var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Welcome to my portfolio website',key: "home"});
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  	res.render('index', { title: 'Welcome to my portfolio website', key: "home"} );
});

/* GET About Us page. */
router.get('/about', function(req, res, next) {
  	res.render('index', { title: 'About Me',name: "",key: "about"});
});

/* GET Projects page. */
router.get('/Projects', function(req, res, next) {
  	res.render('index', { title: 'Recent Projects',name: "",key: "projects"});
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
  	res.render('index', { title: 'Main Services',name: "",key:"services"});
});

/* GET Contact_us page. */
router.get('/contact', function(req, res, next) {
  	res.render('index', { title: 'Contact Info',name: "",key:"contact"});
});

module.exports = router;
