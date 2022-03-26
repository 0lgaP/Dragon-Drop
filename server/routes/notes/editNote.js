module.exports = (router, db) => {
  const helpers = require("../helpers")(db);
  // Edit Map
  router.put("/users/:id/campaigns/:c_id/notes", (req, res) => {
    const { content, user_id } = req.body;
    const campaign_id = req.params.c_id;
    const id = `${campaign_id}-${user_id}`;

    const params = [campaign_id, user_id, content];

    const query = `
    INSERT INTO notes (campaign_id, user_id, content)
      VALUES($1, $2, $3) 
      ON CONFLICT (campaign_id, user_id)
      DO UPDATE SET content = $3
      RETURNING *;`;

    helpers.tryReturnJson(res, query, params, true);
  });
};
