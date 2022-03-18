const router = require('express').Router();

// -> /users/:id/campaigns/:c_id/maps

module.exports = (db) => {

// GET MAPS
router.get('/', (req, res) => {


});

// CREATE MAP
router.get('/new', (req, res) => {

  
});

// SUBMIT NEW MAP
router.put('/', (req, res) => {

});

// SPECIFIC MAP PAGE
router.get('/:m_id', (req, res) => {

  
});

// EDIT SPECIFIC MAP
router.get('/:m_id/edit', (req, res) => {

  
});

// SUBMIT EDITS
router.put('/:m_id', (req, res) => {

});

// DELETE MAP
router.put('/:m_id', (req, res) => {

});

return router
};