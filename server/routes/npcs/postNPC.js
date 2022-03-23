module.exports = (router, db) => {
  // CREATE NPC
  router.post("/users/:id/campaigns/:c_id/npcs", (req, res) => {
    db.query(`INSERT INTO npcs (id, img, campaign_id, name, alive, bio, details)
    VALUES ();`)
  
  });
  
};
