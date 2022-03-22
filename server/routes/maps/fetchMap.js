module.exports = (router, db) => {
  const helper = require("../helpers")(db);

  // GET SINGLE MAP
  router.get("/users/:u_id/campaigns/:c_id/maps/:m_id", (req, res) => {
    // Get user id from url
    const { u_id, c_id, m_id } = req.params;

    const queryString = `
      SELECT *
      FROM maps m
      WHERE m.campaign_id = $1 AND m.id = $2
      LIMIT 1;
      `;

    // Returns list of maps made by user
    helper.tryReturnJson(res, queryString, [c_id, m_id]);
    // res.json({ hi: "helllo" });
  });
};
