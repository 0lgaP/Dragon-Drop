const router = require('express').Router();

// -> /users/:id/campaigns/:c_id/party

module.exports = (db) => {

// GET PARTY INFO
router.get('/', (req, res) => {


});

// CREATE PLAYER
router.get('/new', (req, res) => {

  
});

// SUBMIT NEW PLAYER
router.put('/', (req, res) => {

});

// SPECIFIC PLAYER PAGE
router.get('/:p_id', (req, res) => {

  
});

// EDIT SPECIFIC PLAYER
router.get('/:p_id/edit', (req, res) => {

  
});

// SUBMIT EDITS
router.put('/:p_id', (req, res) => {

});

// DELETE PLAYER
router.put('/:p_id', (req, res) => {

});

return router
};