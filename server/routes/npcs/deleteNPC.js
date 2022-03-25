module.exports = (router, db) => {
  // DELETE NPC
  router.delete("/users/:id/campaigns/:c_id/npcs/delete", (req, res) => {
    const npcID = req.body.npcID
    console.log(`npc id sent to server`, req.body.npcID)
db.query(`DELETE FROM npcs WHERE id = $1;`, [npcID])
.then(result => {
console.log(`deleted on server`)
})
});
};