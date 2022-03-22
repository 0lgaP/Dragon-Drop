module.exports = (router, db) => {
  // GET NPCs
  router.get("/users/:id/campaigns/:c_id/npcs", (req, res) => {
    db.query(`SELECT * FROM npcs;`)
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
