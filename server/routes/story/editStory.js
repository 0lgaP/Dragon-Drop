module.exports = (router, db) => {
  //EDIT Story text
  router.put('/users/:id/campaigns/:c_id/story/:sc_id', (req, res) => {
    // console.log("REQ PARAMS", req.params);
    const sc_id = req.params.sc_id
    // console.log("CARD ID", sc_id)
    const {map_id, npc_id, text, completed} = req.body;

    const storyCardUpdateQuery = `
    UPDATE story_cards SET npcs_id = $1, maps_id = $2, story_card_text = $3, completed = $4
    WHERE id = $5
    RETURNING *;
    `
    const variables = [ npc_id, map_id, text, completed, sc_id ]

    db.query(storyCardUpdateQuery, variables)
    .then((result) => {
      console.log("EDIT RESULT.ROWS[0]", result.rows[0])
      if (result.rows[0]) return res.status(200).send(result.rows[0]);
      res.status(404).send("Nothing to edit")
    })
    .catch((err) => {
      console.log("ERROR IN EDITSTORY ROUTE", err)
      res.status(500).send(err.message)
    })

  })
};