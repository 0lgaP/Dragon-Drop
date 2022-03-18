const router = require('express').Router();

const users = ['Bob', 'Alex', 'Will', 'Tristan'];

// -> /users

module.exports = (db) => {

  // PROFILE PAGE
  router.get('/:id', (req, res) => {
      
  });

  return router;
}
