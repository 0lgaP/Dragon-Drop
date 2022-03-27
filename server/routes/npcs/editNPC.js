module.exports = (router, db) => {
  // EDIT NPC
  router.put("/users/:id/campaigns/:c_id/npcs/:n_id/edit", (req, res) => {
    // console.log(`body sent to server`, req.body.name, req.body.bio, req.body.details)
    const { name, imageURL, alive, bio, details } = req.body
    // console.log(`name `, name, `bio`, bio, `details `, details)
    const npcID = req.params.n_id
    db.query(`UPDATE npcs SET name = $1, img = $2, bio = $3, details = $4, alive = $5 WHERE id = $6 RETURNING *;`, [name, imageURL, bio, details, alive, npcID])
    .then((result) => {
      console.log("NPC RESULT.ROWS[0]", result.rows[0])
      if (result.rows[0]) return res.status(200).send(result.rows[0]);
      res.status(404).send("Nothing to edit")
    })
    .catch((err) => {
      console.log("ERROR IN EDIT NPC ROUTE", err)
      res.status(500).send(err.message)
    })
  });
  
};
