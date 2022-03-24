module.exports = (router, db) => {

  const helpers = require("../helpers")(db);

  //CREATE Story
  router.post("/users/:u_id/campaigns/c_id/story", (req, res) => {
    const {c_id} = req.params;
    const {map_id, npc_id, text} = req.body;

    const insertNewStoryCard = `
    INSERT INTO story_cards(campaigns_id, npcs_id, maps_id, story_card_text,)
    VALUES('$1', '$2', '$3', '$4')
    RETURNING *;`
    const values = [c_id, npc_id, map_id, text]

    const insertStoryToMapAsset = `
    INSERT INTO map_assets (map_id, asset_id, type_id)
    VALUES('$1', '$2', '$3');`

    helpers
      .tryReturnJson(
        res,
        insertNewStoryCard,
        values,
        true,
        true
      )
      .then((result) => {
        helpers
          .tryReturnJson(
            res,
            insertStoryToMapAsset,
            [map_id, result.id, `fa8dbb44-f356-45ae-9b57-4c07c95c56f0`],
            true,
            true
          )
          .then(() => {
            res.json(result).status(200);
          });
      });
  });
};