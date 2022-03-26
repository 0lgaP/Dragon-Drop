module.exports = (router, db) => {
  const helpers = require("../helpers")(db);
  // Delete Map
  router.delete("/users/:id/campaigns/:c_id/maps/:m_id", (req, res) => {
    const { m_id } = req.params;
    const params = [m_id];
    const deleteQuery = `
    DELETE FROM maps WHERE id = $1
    RETURNING *;
    `;

    helpers.tryDeleteEntity(res, deleteQuery, params);
  });
};
