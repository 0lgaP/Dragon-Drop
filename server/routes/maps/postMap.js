module.exports = (router, db) => {
  const helpers = require("../helpers")(db);
  // Create Map
  router.post("/users/:id/campaigns/:c_id/maps", (req, res) => {
    const { id, c_id } = req.params;
    const { name, imgUrl, bio } = req.body;

    const params = [name, c_id, imgUrl, bio];

    const insertQuery = `
    INSERT INTO maps (name, campaign_id, background, bio)
      VALUES ($1, $2, $3, $4)
    RETURNING *;`;

    helpers.tryReturnJson(res, insertQuery, params, true);
  });
};
