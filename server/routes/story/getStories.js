module.exports = (router, db) => {
  //GET Story Cards
  //id, campaigns_id, order_num, story_card_text
  router.get('/users/:u_id/campaigns/:c_id/story', (req, res) => {
    const campaign_id = req.params.c_id
    // console.log("CAMP DB", campaign_id)
    db.query(`SELECT * FROM story_cards WHERE campaigns_id = $1 AND completed = false ORDER BY order_num;`, [campaign_id])
    // db.query(`SELECT * FROM story_cards`)
    .then(data => {
      // console.log("DB",data)
      res.json(data.rows).status(200)
    })
    .catch(err => {
      res
        .status(500)
        .json({error: err.message});
    })
  })
};