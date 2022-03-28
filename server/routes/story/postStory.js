module.exports = (router, db) => {

  const helpers = require("../helpers")(db);

  //CREATE Story
  router.post("/users/:u_id/campaigns/:c_id/story", (req, res) => {
    const {c_id} = req.params;
    const {map_id, npc_id, text, completed} = req.body;
    let newCard = {};
    console.log("REQ BOCY POST", req.body)
      const storyCardQuery = `
      INSERT INTO story_cards(campaigns_id, npcs_id, maps_id, order_num, story_card_text, completed)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *;`;

      const mapAssetQuery = `
      INSERT INTO map_assets (map_id, asset_id, type_id)
      VALUES($1, $2, $3);
      `;

      const createStoryCard = (result) => {
        const order_number = parseInt(result.rows[0].count) +1
        return db.query(storyCardQuery, [c_id, npc_id, map_id, order_number, text, completed])
        .then(insertResult => {
          newCard = insertResult.rows[0];
          return insertResult;
        })
      }

      const createMapAssests = (result) => {
        const asset_id = result.rows[0].id
        return db.query(mapAssetQuery, [map_id, asset_id, 'fa8dbb44-f356-45ae-9b57-4c07c95c56f0'])
      }

      db.query(`SELECT count(*) FROM story_cards WHERE campaigns_id = $1;`, [c_id])
      .then(createStoryCard)
      .then(createMapAssests)
      .then(() => {
        res.status(200).json(newCard)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send(err.message)
      })

    })
  };
