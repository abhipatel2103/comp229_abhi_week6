/**Student Name: Abhi Patel, Student num: 301167516, File name : user.js, Date: 02/28/2021**/
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placholder.');
});

module.exports = router;
