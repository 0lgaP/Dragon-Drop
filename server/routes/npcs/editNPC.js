module.exports = (router, db) => {
  // EDIT NPC
  router.put("/users/:id/campaigns/:c_id/npcs/:n_id", (req, res) => {
    const npcID = req.params.n_id
    db.query(`UPDATE npcs SET "column" = "value" WHERE id = $1;`, [npcID])
    .then((result) => {res.json(result.rows[0])});
  });
  
};
