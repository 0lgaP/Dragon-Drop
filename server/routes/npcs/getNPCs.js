module.exports = (router, db) => {
  // GET NPCs
  // id, img, campaign_id, name, alive, bio, details
  router.get("/users/:id/campaigns/:c_id/npcs", (req, res) => {
    const campaignID = req.params.c_id
    console.log(`campaign id from req params: `, campaignID)
    db.query(`SELECT * FROM npcs WHERE campaign_id = $1;`, [campaignID])

    .then((result) => {
      console.log(`db result: `, result.rows)
      res.json(result.rows)
    });
});
}
