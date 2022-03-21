const getCampaigns = require("./getCampaigns");
const postCampaign = require("./postCampaigns");
const fetchCampaign = require("./fetchCampaign");

module.exports = (router, db) => {
  // -> /users/:id/campaigns
  getCampaigns(router, db);

  // // CREATE CAMPAIGN
  // router.get("/new", (req, res) => {});

  // // SUBMIT NEW CAMPAIGN
  // -> /users/:id/campaigns
  // router.put("/users/:id/campaigns", (req, res) => {});
  postCampaign(router, db);

  // // SPECIFIC CAMPAIGN PAGE
  // router.get("/:c_id", (req, res) => {});
  fetchCampaign(router, db);
  // return router;
};
