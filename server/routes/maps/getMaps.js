module.exports = (router, db) => {
  const helper = require("../helpers")(db);

  // GET Maps For Campaign
  router.get("/users/:id/campaigns/:c_id/maps", (req, res) => {
    // Get user id from url
    const { u_id, c_id, m_id } = req.params;
    console.log("it me");

    const queryMapsForCampaign = `
      SELECT m.*
      FROM maps m
        JOIN campaigns c ON m.campaign_id = c.id
      WHERE c.id = $1
      `;

    helper // Get all NPCs
      .tryReturnJson(res, queryMapsForCampaign, [c_id]);
  });
};
