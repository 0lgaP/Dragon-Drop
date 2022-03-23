module.exports = (router, db) => {
  // GET NPCs
  router.get("/users/:id/campaigns/:c_id/npcs", (req, res) => {
    const campaignID = req.params.c_id
    db.query(`SELECT * FROM npcs WHERE campaign_id = $1;`, [campaignID])
    .then((result) => {res.json(result.rows)});
});
}