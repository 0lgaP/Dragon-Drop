module.exports = (router, db) => {
  // GET CAMPAIGNS
  router.get("/users/:id/campaigns", (req, res) => {
    const user = req.params.id
    console.log(user)

    db.query(`SELECT * FROM campaigns WHERE dm_id = $1;`, [user])
      .then(data => {
        // console.log(data)
        const campaigns = data.rows;
        res.json(data.rows)
        // console.log(campaigns)

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      })

  })
};