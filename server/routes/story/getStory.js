module.exports = (router, db) => {
  //GET Story Cards
  router.get('/users/:u_id/campaigns/:c_id/story', (req, res) => {
    const camp = req.params.c_id
    db.query(`SELECT id FROM story WHERE campaign_id = $1`, [camp])
  })
};