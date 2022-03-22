const getMaps = require("./getMaps");
const postMap = require("./postMap");
const fetchMap = require("./fetchMap");
const editMap = require("./editMap");
const deleteMap = require("./deleteMap");
const getMapAssets = require("./getMapAssets");
const updateAsset = require("./updateAsset");

module.exports = (router, db) => {
  // GET MAPS
  getMaps(router, db);

  // SUBMIT NEW MAP
  // POST "/users/:id/campaigns/:c_id/maps/"
  postMap(router, db);

  // SPECIFIC MAP
  // GET "/users/:id/campaigns/:c_id/maps/:m_id"
  fetchMap(router, db);

  // SUBMIT EDITS
  // PUT "/users/:id/campaigns/:c_id/maps/:m_id"
  editMap(router, db);

  // DELETE MAP
  // DELETE "/users/:id/campaigns/:c_id/maps/:m_id"
  deleteMap(router, db);

  // SPECIFIC ASSETS FOR MAP
  // GET "/users/:id/campaigns/:c_id/maps/:m_id/assets"
  getMapAssets(router, db);

  // Update Map_asset table at specific index
  // POST /users/:u_id/campaigns/:c_id/maps/:m_id/assets/:asset_id
  updateAsset(router, db);
};
