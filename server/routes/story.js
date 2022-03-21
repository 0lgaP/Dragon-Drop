const router = require('express').Router();

// -> /users/:id/campaigns/:c_id/story

module.exports = (db) => {

// GET STORY OVERVIEW
router.get('/', (req, res) => {


});

// CREATE STORY CARD
router.get('/new', (req, res) => {

  
});

// SUBMIT NEW STORY CARD
router.put('/', (req, res) => {

});

// SPECIFIC STORY CARD PAGE
router.get('/d:s_i', (req, res) => {

  
});

// EDIT SPECIFIC STORY CARD
router.get('/:s_id/edit', (req, res) => {

  
});

// SUBMIT EDITS
router.put('/:s_id', (req, res) => {

});

// DELETE STORY CARD
router.put('/:s_id', (req, res) => {

});

return router
};