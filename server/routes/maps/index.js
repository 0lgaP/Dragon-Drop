const getMaps = require("./getMaps");
const postMap = require("./postMap");
const fetchMap = require("./fetchMap");
const editMap = require("./editMap");
const deleteMap = require("./deleteMap");

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
};
