const getCampaigns = require("./getCampaigns");
const postCampaign = require("./postCampaigns");
const fetchCampaign = require("./fetchCampaign");

module.exports = (router, db) => {
  // GET ALL CAMPAIGNS FOR USER
  // GET -> /users/:id/campaigns
  getCampaigns(router, db);

  // SUBMIT NEW CAMPAIGN
  // POST -> /users/:id/campaigns
  postCampaign(router, db);

  // SPECIFIC CAMPAIGN PAGE
  // GET -> /users/:id/campaigns /:c_id
  fetchCampaign(router, db);
};
