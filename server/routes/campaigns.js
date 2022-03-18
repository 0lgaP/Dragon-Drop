const router = require('express').Router();

// -> /users/:id/campaigns

module.exports = (db) => {
  
// GET CAMPAIGNS
router.get('/', (req, res) => {


});

// CREATE CAMPAIGN
router.get('/new', (req, res) => {

  
});

// SUBMIT NEW CAMPAIGN
router.put('/', (req, res) => {

});

// SPECIFIC CAMPAIGN PAGE
router.get('/:c_id', (req, res) => {

  
});
return router
};