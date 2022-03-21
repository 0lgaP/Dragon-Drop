module.exports = (router, db) => {
  // GET Maps
  router.get("/users/:id/campaigns/:c_id/maps/", (req, res) => {
      db.query(`SELECT * FROM maps;`)
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
