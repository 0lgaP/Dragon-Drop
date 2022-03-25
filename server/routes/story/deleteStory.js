module.exports = (router, db) => {
  // Delete Story
  router.delete("/users/:id/campaigns/:c_id/story/:sc_id", (req, res) => {
    console.log(req.params)
    const {id} = req.params.id
    const {c_id} = req.params.c_id
    const {sc_id} = req.params.sc_id

    const deleteCardQuery = `
    DELETE FROM story_card WHERE story_card_id = $1;
    `
    const value = sc_id

    db.query(deleteCardQuery, [value])
    .then(data => {
      console.log("DELETED STORY CARD")
      res.json(data.rows).status(200)
    })
    .catch(err => {
      res
        .status(500)
        .json({error: err.message})
    })
  });
};
