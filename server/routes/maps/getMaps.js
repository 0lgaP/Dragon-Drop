module.exports = (router, db) => {
  const helper = require("../helpers")(db);

  // GET Maps For Campaign
  router.get("/users/:id/campaigns/:c_id/maps", (req, res) => {
    // Get user id from url
    const { u_id, c_id, m_id } = req.params;
    console.log("it me");

    const queryMapsForCampaign = `SELECT * FROM maps WHERE campaign_id = $1;`;

    helper // Get all Maps for Campaign
      .tryReturnJson(res, queryMapsForCampaign, [c_id]);
  });
};
