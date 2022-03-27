const getNPCs = require("./getNPCs");
const postNPC = require("./postNPC");
const fetchNPC = require("./fetchNPC");
const deleteNPC = require("./deleteNPC");
const editNPC = require("./editNPC");


module.exports = (router, db) => {
  // -> /users/:id/campaigns/:c_id/npcs
  getNPCs(router, db);

  // // SUBMIT NEW NPC

  postNPC(router, db);

  // // SPECIFIC NPC

  fetchNPC(router, db);

  deleteNPC(router, db);

  editNPC(router, db);


};
