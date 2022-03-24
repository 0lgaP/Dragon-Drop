module.exports = (router, db) => {
  const helper = require("../helpers")(db);
  // GET All Available Assets for User
  router.delete("/users/:u_id/campaigns/:c_id/assets/:a_id", (req, res) => {
    // const { user_id } = req.body;
    const { a_id } = req.params;

    const deleteAssetFromMap = `
      DELETE FROM map_assets
      WHERE id = $1;
      `;

    helper // delete asset from db
      .tryDeleteEntity(res, deleteAssetFromMap, [a_id]);
  });
};
