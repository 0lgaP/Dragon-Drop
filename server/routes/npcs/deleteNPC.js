module.exports = (router, db) => {
  // DELETE NPC
  router.delete("/users/:id/campaigns/:c_id/npcs/:n_id", (req, res) => {
db.query(`DELETE FROM npcs WHERE id = $1;`, [req.params.n_id])
.then(result => {
// res.send(result)
})
});
};