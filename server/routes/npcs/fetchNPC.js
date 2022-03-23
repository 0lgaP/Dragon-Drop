module.exports = (router, db) => {
  // GET SINGLE NPC
  router.get("/users/:id/campaigns/:c_id/npcs/:n_id", (req, res) => {
    const npcID = req.params.n_id
    db.query(`SELECT * FROM npcs WHERE id = $1;`, [npcID])
    .then((result) => {res.json(result.rows[0])});
});
};
