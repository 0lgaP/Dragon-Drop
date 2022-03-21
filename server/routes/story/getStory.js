module.exports = (router, db) => {
  //GET Story Cards
  router.get('/users/:u_id/campaigns/:c_id/story', (req, res) => {
    db.query(`SELECT * FROM story_cards;`)
    .then(data => {
      res.send(data.rows).status(200)
    })
    .catch(err => {
      res
        .status(500)
        .json({error: err.message});
    })
  })
};