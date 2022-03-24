module.exports = (router, db) => {
  // CREATE NPC
  router.post("/users/:id/campaigns/:c_id/npcs", (req, res) => {
    const campaign_id = req.params.c_id
    const name = req.body.name
    const bio = req.body.bio
    const details = req.body.details
    db.query(`INSERT INTO npcs (campaign_id, name, alive, bio, details)
    VALUES ($1, $2, true, $3, $4);`, [campaign_id, name, bio, details])
      .then((res) => {

      })
  });
  
};
