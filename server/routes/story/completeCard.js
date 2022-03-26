module.exports = (router, db) => {
  //EDIT Story text
  router.put('/users/:id/campaigns/:c_id/story/:sc_id', (req, res) => {
    // console.log("REQ PARAMS", req.params);
    const sc_id = req.params.sc_id
    // console.log("CARD ID", sc_id)
    const {map_id, npc_id, text} = req.body;

    const storyCardCompleteQuery = `
    UPDATE story_cards SET completed = $1
    WHERE id = $2
    RETURNING *;
    `
    const variables = [ true, sc_id ]

    db.query(storyCardCompleteQuery, variables)
    .then((result) => {
      console.log("Complete RESULT.ROWS[0]", result.rows[0])
      if (result.rows[0]) return res.status(200).send('Card Completed');
      res.status(404).send("Nothing to Complete")
    })
    .catch((err) => {
      console.log("ERROR IN COMPLETE-STORY ROUTE", err)
      res.status(500).send(err.message)
    })

  })
};