module.exports = (router, db) => {
  const helper = require("../helpers")(db);
  // POST asset to add to map for the dragging
  router.post("/users/:u_id/campaigns/:c_id/maps/:m_id/assets", (req, res) => {
    const { asset_id, type } = req.body;
    const { m_id } = req.params;

    let typeId = "";
    let queryString = ``;
    let char = type[0].toLowerCase();

    const addAssetToMap = `
    INSERT INTO map_assets (map_id, asset_id, type_id) VALUES
    ($1, $2, $3)
    RETURNING *;
    `;

    const forAll =
      "ma.scale, ma.top_pos, ma.left_pos, ma.layer_order, ma.layer_name, ma.id,";

    const queryNPCsForMap = `
      SELECT ${forAll} n.name, n.alive, n.bio, n.details, n.img, at.name as type
      FROM map_assets ma
        JOIN asset_types at ON ma.type_id = at.id
        JOIN npcs n on ma.asset_id = n.id
      WHERE ma.id = $1
      LIMIT 1;
      `;
    const queryImagesForMap = `
      SELECT ${forAll} img.name, img.src as img, at.name as type
      FROM map_assets ma
        JOIN asset_types at ON ma.type_id = at.id
        JOIN images img on ma.asset_id = img.id
      WHERE ma.id = $1
      LIMIT 1;
      `;
    const queryStoryCardsForMap = `
      SELECT ${forAll} sc.completed, sc.created_on, sc.story_card_text as content, sc.campaigns_id, sc.order_num as order, at.name as type
      FROM map_assets ma
        JOIN asset_types at ON ma.type_id = at.id
        JOIN story_cards sc on ma.asset_id = sc.id
      WHERE ma.id = $1
      LIMIT 1;
      `;

    switch (char) {
      case "n":
        typeId = "2eb2339a-0adf-4cc4-bc09-6e27d43f15b4"; //NPC
        queryString = queryNPCsForMap;
        break;
      case "i":
        typeId = "ced32085-6daf-464f-b341-daf3624999cf"; //IMAGE
        queryString = queryImagesForMap;
        break;
      case "s":
        typeId = "fa8dbb44-f356-45ae-9b57-4c07c95c56f0"; //Story_card
        queryString = queryStoryCardsForMap;
        break;
    }

    helper // Add Asset to Map and send data to back to client
      .tryReturnJson(res, addAssetToMap, [m_id, asset_id, typeId], true, true)
      .then((result) => {
        helper.tryReturnJson(res, queryString, [result.id], true);
      });
  });
};
