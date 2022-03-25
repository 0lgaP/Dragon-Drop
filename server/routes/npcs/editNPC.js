module.exports = (router, db) => {
  // EDIT NPC
  router.put("/users/:id/campaigns/:c_id/npcs/:n_id/edit", (req, res) => {
    // console.log(`body sent to server`, req.body.name, req.body.bio, req.body.details)
    const { name, imageURL, bio, details } = req.body
    // console.log(`name `, name, `bio`, bio, `details `, details)
    const npcID = req.params.n_id
    db.query(`UPDATE npcs SET name = $1, img = $2, bio = $3, details = $4 WHERE id = $5 RETURNING *;`, [name, imageURL, bio, details, npcID])
    .then((result) => {
      res.json(result.rows[0])
    });
  });
  
};
