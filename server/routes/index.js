var express = require('express');
var router = express.Router();


// HOME PAGE
router.get('/', function(req, res, next) {
  res.render('index');
});

// GET LOGIN PAGE
router.get('/login', (req, res) => {

});

// SUBMIT LOGIN
router.put('/login', (req, res) => {

});

// GET REGISTRATION PAGE
router.get('/register', (req, res) => {

});

// SUBMIT REGISTRATION
router.put('/register', (req, res) => {

});

module.exports = router;
