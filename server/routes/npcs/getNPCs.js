module.exports = (router, db) => {
  // GET NPCs
  // id, img, campaign_id, name, alive, bio, details
  router.get("/users/:id/campaigns/:c_id/npcs", (req, res) => {
    const campaignID = req.params.c_id
    db.query(`SELECT * FROM npcs WHERE campaign_id = $1;`, [campaignID])
    .then(data => {
      res.send(data.rows).status(200)
    })
    .catch(err => {
      res
        .status(500)
        .json({error: err.message});
    })
});
}
