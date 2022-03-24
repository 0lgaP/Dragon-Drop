module.exports = (router, db) => {
  // EDIT NPC
  router.put("/users/:id/campaigns/:c_id/npcs/:n_id/edit", (req, res) => {
    // console.log(`body sent to server`, req.body.name, req.body.bio, req.body.details)
    const { name, bio, details } = req.body
    console.log(`name `, name, `bio`, bio, `details `, details)
    const npcID = req.params.n_id
    db.query(`UPDATE npcs SET name = $1, bio = $2, details = $3 WHERE id = $4 RETURNING *;`, [name, bio, details, npcID])
    .then((result) => {
      res.json(result.rows[0])
    });
  });
  
};
