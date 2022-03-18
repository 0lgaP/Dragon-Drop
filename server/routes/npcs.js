const router = require('express').Router();

// -> /users/:id/campaigns/:c_id/npcs

module.exports = (db) => {

// GET NPCS
router.get('/', (req, res) => {


});

// CREATE NPC
router.get('/new', (req, res) => {

  
});

// SUBMIT NEW NPC
router.put('/', (req, res) => {

});

// SPECIFIC NPC PAGE
router.get('/:n_id', (req, res) => {

  
});

// EDIT SPECIFIC NPC
router.get('/:n_id/edit', (req, res) => {

  
});

// SUBMIT EDITS
router.put('/:n_id', (req, res) => {

});

// DELETE NPC
router.put('/:n_id', (req, res) => {

});

return router
};