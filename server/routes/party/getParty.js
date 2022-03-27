module.exports = (router, db) => {
  const helpers = require("../helpers")(db);
  // GET PARTY FOR CAMPAIGN
  router.get("/users/:id/campaigns/:c_id/party", (req, res) => {
    const { c_id } = req.params;

    const params = [c_id];

    const getPlayersQuery = `
    SELECT * FROM players
    WHERE campaign_id = $1;
    `;

    helpers.tryReturnJson(res, getPlayersQuery, params);
  });
};
