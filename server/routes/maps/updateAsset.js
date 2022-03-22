module.exports = (router, db) => {
  const helper = require("../helpers")(db);

  // update asset
  router.post(
    "/users/:u_id/campaigns/:c_id/maps/:m_id/assets/:asset_id",
    (req, res) => {
      const { u_id, c_id, m_id, asset_id } = req.params;
      console.log(req.body);

      // // Get logged in user
      // const user_id = req.session.user_id;
      // // Get map id from url
      // const map_id = req.params.id;

      const checkRightsQuery = `
      SELECT c.dm_id, c.id
      FROM campaigns c
      WHERE c.id = $2 AND c.dm_id = $1;
      `;

      // Check if user has rights for place
      // helper will let user know if they dont have perms
      helper
        .checkRights(res, checkRightsQuery, [u_id, c_id])
        // If they do, create it it
        .then(() => updatePlace())
        // General Error Catcher
        .catch((err) => {
          // Log error to server console
          console.log(err);
          // Let user know the server oopsied
          res.status(500).send("Something went wrong on our end");
        });

      function updatePlace() {
        const params = [req.body.left_pos, req.body.top_pos, asset_id];
        console.log(params);

        const updateString = `
        UPDATE map_assets
        SET left_pos = $1,
        top_pos = $2
        WHERE id = $3
        RETURNING *;`;

        // Send update to database and return updated values
        helper.tryReturnJson(res, updateString, params);
      }
    }
  );
};
