module.exports = (router, db) => {
  const helpers = require("../helpers")(db);
  // Create Map
  router.post("/users/:id/campaigns/:c_id/maps", (req, res) => {
    const { id, c_id } = req.params;
    const { name, imgUrl } = req.body;

    const params = [name, c_id, imgUrl];

    const insertQuery = `
    INSERT INTO maps (name, campaign_id, background)
      VALUES ($1, $2, $3)
    RETURNING *;`;

    helpers.tryReturnJson(res, insertQuery, params, true);
  });
};
