module.exports = (router, db) => {
  // CREATE CAMPAIGN
  router.post("/users/:id/campaigns", (req, res) => {
    const name = req.body.name
    const u_id = req.params.id
    db.query(`INSERT INTO campaigns (name, dm_id)
    VALUES ($1, $2);`, [name, u_id])
      .then((res) => {

      })
  });
};
