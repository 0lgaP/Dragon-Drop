module.exports = (router, db) => {
  // EDIT NPC
  router.put("/users/:id/campaigns/:c_id/npcs/:n_id/edit", (req, res) => {
    // console.log(`body sent to server`, req.body.name, req.body.bio, req.body.details)
    const {name, bio, details} = req.body
    const npcID = req.params.n_id
    db.query(`UPDATE npcs SET name = ${name}, bio = ${bio}, details = ${details} WHERE id = $1 RETURNING *;`, [npcID])
    .then((result) => {
      res.json(result.rows[0])
    });
  });
  
};
