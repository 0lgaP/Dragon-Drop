module.exports = (router, db) => {
  // CREATE NPC
  router.post("/users/:id/campaigns/:c_id/npcs", (req, res) => {
    const campaign_id = req.params.c_id
    const name = req.body.name
    const imageURL = req.body.imageURL
    const bio = req.body.bio
    const details = req.body.details
    db.query(`INSERT INTO npcs (campaign_id, name, img, alive, bio, details)
    VALUES ($1, $2, $3, true, $4, $5);`, [campaign_id, name, imageURL, bio, details])
      .then((res) => {

      })
  });
  
};
