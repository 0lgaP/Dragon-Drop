module.exports = (router, db) => {
  const helper = require("../helpers")(db);
  // POST asset to add to map for the dragging
  router.post("/users/:u_id/campaigns/:c_id/maps/:m_id/assets", (req, res) => {
    const { asset_id, type } = req.body;
    const { m_id } = req.params;

    const typeId = helper.getTypeId(type);

    const addAssetToMap = `
      INSERT INTO map_assets (map_id, asset_id, type_id) VALUES
      ($1, $2, $3)
      RETURNING *;
      `;

    helper // Add Asset to Map and send data to back to client
      .tryReturnJson(res, addAssetToMap, [m_id, asset_id, typeId], true);
  });
};
