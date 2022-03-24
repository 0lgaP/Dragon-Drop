const getAssets = require("./getAssets");

module.exports = (router, db) => {
  // GET ALL ASSETS FOR USER (Images, NPCs)
  // GET -> /users/:u_id/campaigns/:c_id/assets
  getAssets(router, db);
};
