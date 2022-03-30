module.exports = (router, db) => {
  const helper = require("../helpers")(db);
  // GET All Available Assets for User
  router.get("/users/:u_id/campaigns/:c_id/assets", (req, res) => {
    // const { user_id } = req.body;
    const { u_id, c_id } = req.params;

    const queryAllImageAssets = `
      SELECT *
      FROM images;
      `;

    const queryAllNPCAssets = `
      SELECT *
      FROM npcs n
      WHERE n.campaign_id = $1;
      `;
    const queryAllPlayerAssets = `
      SELECT *
      FROM players p
      WHERE p.campaign_id = $1;
      `;

    Promise.all([
      helper // Get all IMAGES
        .tryReturnJson(res, queryAllImageAssets, [], false, true),
      helper // Get all NPCs
        .tryReturnJson(res, queryAllNPCAssets, [c_id], false, true),
      helper // Get all Players
        .tryReturnJson(res, queryAllPlayerAssets, [c_id], false, true),
    ]).then((all) => {
      res
        .json({
          Images: all[0],
          NPCs: all[1],
          Players: all[2],
        })
        .status(200);
    });
  });
};
