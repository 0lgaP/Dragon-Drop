const getNPCs = require("./getNPCs");
const postNPC = require("./postNPC");
const fetchNPC = require("./fetchNPC");

module.exports = (router, db) => {
  // -> /users/:id/campaigns/:c_id/npcs
  getNPCs(router, db);

  // // SUBMIT NEW NPC

  postNPC(router, db);

  // // SPECIFIC NPC

  fetchNPC(router, db);
  // return router;
};
