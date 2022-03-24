module.exports = (router, db) => {

  const helpers = require("../helpers")(db);

  //CREATE Story
  router.post("/users/:u_id/campaigns/:c_id/story", (req, res) => {
    const {c_id} = req.params;
    const {map_id, npc_id, text} = req.body;
    let order_num;

    db.query(`SELECT count(*) FROM story_cards WHERE campaigns_id = $1;`, [c_id])
    .then(result => {
      // console.log("++++++++++", result.rows)
      order_num = parseInt(result.rows[0].count) +1
      // console.log("+++++ORDERNUM+++++", order_num)
      db.query(`
      INSERT INTO story_cards(campaigns_id, npcs_id, maps_id, order_num, story_card_text)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *;`, [c_id, npc_id, map_id, order_num, text])
        .then((data) => {
          // console.log("RES", data.rows)
          db.query(`
          INSERT INTO map_assets (map_id, asset_id, type_id)
          VALUES($1, $2, $3);
          `, [map_id, data.rows[0].id, 'fa8dbb44-f356-45ae-9b57-4c07c95c56f0' ])
            .then(() => {
              console.log("POST SUCCESSFUL")
            })
      })
      .catch((err) => {
        console.log(err.message)
        res.status(500).json({error: err.message});
      })
    });
    })
    // return
    

  };
