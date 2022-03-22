module.exports = (router, db) => {
  const helper = require("../helpers")(db);

  // GET SINGLE MAP
  router.get("/users/:id/campaigns/:c_id/maps/:m_id", (req, res) => {
    res.json({ hi: "helllo" });
  });
};
