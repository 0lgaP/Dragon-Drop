module.exports = (router, db) => {
  const helper = require("../helpers")(db);

  // GET SINGLE MAP
  router.get("/users/:u_id/campaigns/:c_id/maps/:m_id/assets", (req, res) => {
    // Get user id from url
    const { u_id, c_id, m_id } = req.params;

    const forAll =
      "ma.scale, ma.top_pos, ma.left_pos, ma.layer_order, ma.layer_name, ma.id, at.name as type,";

    const queryNPCsForMap = `
      SELECT ${forAll} n.name, n.alive, n.bio, n.details, n.img
      FROM map_assets ma
        JOIN asset_types at ON ma.type_id = at.id
        JOIN npcs n on ma.asset_id = n.id
      WHERE ma.map_id = $1 AND at.name = $2;
      `;
    const queryImagesForMap = `
      SELECT ${forAll} img.name, img.src as img
      FROM map_assets ma
        JOIN asset_types at ON ma.type_id = at.id
        JOIN images img on ma.asset_id = img.id
      WHERE ma.map_id = $1 AND at.name = $2;
      `;
    const queryStoryCardsForMap = `
      SELECT ${forAll} sc.completed, sc.created_on, sc.story_card_text as content, sc.campaigns_id, sc.order_num as order
      FROM map_assets ma
        JOIN asset_types at ON ma.type_id = at.id
        JOIN story_cards sc on ma.asset_id = sc.id
      WHERE ma.map_id = $1 AND at.name = $2;
      `;
    const queryPlayersForCampaign = `
      SELECT *
      FROM players p
      WHERE p.campaign_id = $1;
      `;
    const queryPlayerFromMap = `
      SELECT ${forAll} p.profile_pic as img, p.name
      FROM map_assets ma
        JOIN asset_types at ON ma.type_id = at.id
        JOIN players p on ma.asset_id = p.id
      WHERE ma.map_id = $1 AND at.name = $2;
      `;

    // Returns map for campaign by user
    Promise.all([
      helper // Get all NPCs
        .tryReturnJson(res, queryNPCsForMap, [m_id, "NPC"], false, true),
      helper // Get all Images
        .tryReturnJson(res, queryImagesForMap, [m_id, "IMAGE"], false, true),
      helper // Get all Storycards
        .tryReturnJson(
          res,
          queryStoryCardsForMap,
          [m_id, "STORY_CARD"],
          false,
          true
        ),
      helper // Get all Players
        .tryReturnJson(res, queryPlayersForCampaign, [c_id], false, true),
      helper // Get all PlayersAssets
        .tryReturnJson(res, queryPlayerFromMap, [m_id, "PLAYER"], false, true),
    ]).then((all) => {
      res
        .json({
          NPCs: all[0],
          Images: all[1],
          StoryCards: all[2],
          Players: all[3],
          PlayerAssets: all[4],
        })
        .status(200);
    });
  });
};
