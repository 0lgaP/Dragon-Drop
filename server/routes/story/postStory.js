module.exports = (router, db) => {
  const helpers = require("../helpers")(db);

  //CREATE Story
  router.post("/users/:u_id/campaigns/:c_id/story", (req, res) => {
    const { c_id } = req.params;
    const { map_id, text, npc_id } = req.body;

    const insertStoryToMap = `
      INSERT INTO story_cards(story_cord_text, campaign_id, map_id, npcs_id) VALUES
      ('$1 ', '$2', '$3', '$4')
      RETURNING *;
    `;

    const insertStoryToMapAsset = `
      INSERT INTO map_assets (map_id, asset_id, type_id) VALUES
      ('$!','$2','$3');
    `;

    helpers
      .tryReturnJson(
        res,
        insertStoryToMap,
        [text, c_id, map_id, npc_id],
        true,
        true
      )
      .then((result) => {
        helpers
          .tryReturnJson(
            res,
            insertStoryToMapAsset,
            [map_id, result.id, "fa8dbb44-f356-45ae-9b57-4c07c95c56f0"],
            true,
            true
          )
          .then(() => {
            res.json(result).status(200);
          });
      });
  });
};
