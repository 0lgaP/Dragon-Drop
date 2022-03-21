const getParty = require("./getParty");
const postPlayer = require("./postPlayer");
const fetchPlayer = require("./fetchPlayer");
const deletePlayer = require("./deletePlayer");
const editPlayer = require("./editPlayer");

module.exports = (router, db) => {
  // -> /users/:id/campaigns/:c_id/party
  getParty(router, db);

  // // SUBMIT NEW PLAYER

  postPlayer(router, db);

  // // SPECIFIC PLAYER

  fetchPlayer(router, db);

  deletePlayer(router, db);

  editPlayer(router, db);
};
