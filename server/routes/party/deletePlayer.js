module.exports = (router, db) => {
  const helpers = require("../helpers")(db);
  // DELETE PLAYER
  router.delete("/users/:id/campaigns/:c_id/party/:p_id", (req, res) => {
    const player = req.params.p_id;

    const deletePlayerFromCampaign = `
    DELETE FROM players
    WHERE id = $1
    RETURNING *;
    `;

    helpers.tryDeleteEntity(res, deletePlayerFromCampaign, [player]);
  });
};
