module.exports = (router, db) => {
  const helpers = require("../helpers")(db);
  // CREATE PLAYER
  router.post("/users/:id/campaigns/:c_id/party", (req, res) => {
    const { c_id } = req.params;
    const { email, name, sheet_url, profile_pic } = req.body;

    const findParams = [email];

    const findPlayer = `
    SELECT id FROM users
    WHERE email = $1;
    `;

    const addPlayerToCampaign = `
    INSERT INTO players
    (user_id, campaign_id, name, profile_pic, sheet_url)
    VALUES
    ($1, $2, $3, $4, $5)
    RETURNING *;
    `;

    helpers
      .tryReturnJson(res, findPlayer, findParams, true, true)
      .then((user) => {
        console.log(user);
        if (!user) return res.json({ error: "No User Found" }).status(404);
        const addParams = [user.id, c_id, name, profile_pic, sheet_url];
        helpers.tryReturnJson(res, addPlayerToCampaign, addParams, true);
      });
  });
};
