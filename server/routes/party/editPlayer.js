module.exports = (router, db) => {
  const helpers = require("../helpers")(db);
  // EDIT PLAYER
  router.put("/users/:id/campaigns/:c_id/party/:p_id", (req, res) => {
    const { p_id } = req.params;
    const { name, profile_pic, sheet_url } = req.body;
    console.log(req.body);
    const dbParams = [p_id, name, profile_pic, sheet_url];

    const updateQuery = `
    UPDATE players
    SET name = $2,
      profile_pic = $3,
      sheet_url = $4
    WHERE id = $1
    RETURNING *;
    `;

    helpers.tryReturnJson(res, updateQuery, dbParams, true);
  });
};
