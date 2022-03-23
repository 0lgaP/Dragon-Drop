module.exports = (router, db) => {
  // GET Maps
  // id, name, campaign_id
  router.get("/users/:id/campaigns/:c_id/maps/", (req, res) => {
    const campaignID = req.params.c_id
      db.query(`SELECT * FROM maps WHERE campaign_id = $1;`, [campaignID])
    .then(data => {
      res.send(data.rows).status(200)
    })
    .catch(err => {
      res
        .status(500)
        .json({error: err.message});
    })
  });
};
