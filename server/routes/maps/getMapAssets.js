module.exports = (router, db) => {
  const helper = require("../helpers")(db);

  // GET SINGLE MAP
  router.get("/users/:u_id/campaigns/:c_id/maps/:m_id/assets", (req, res) => {
    // Get user id from url
    const { u_id, c_id, m_id } = req.params;

    const queryNPCsForMap = `
      SELECT *, at.name as type
      FROM map_assets ma
        JOIN asset_types at ON ma.type_id = at.id
      WHERE ma.map_id = $1 AND at.name = $2;
      `;
    const queryImagesForMap = `
      SELECT *, at.name as type
      FROM map_assets ma
        JOIN asset_types at ON ma.type_id = at.id
      WHERE ma.map_id = $1 AND at.name = $2;
      `;
    const queryStoryCardsForMap = `
      SELECT *, at.name as type
      FROM map_assets ma
        JOIN asset_types at ON ma.type_id = at.id
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
    ]).then((all) => {
      console.log({
        NPCs: all[0],
        Images: all[1],
        StoryCards: all[2],
      });
    });
  });
};
