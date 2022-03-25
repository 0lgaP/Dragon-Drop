module.exports = (router, db) => {
  // Delete Story
  router.delete("/users/:id/campaigns/:c_id/story/:sc_id", (req, res) => {
    console.log(req.params)
    // const {id} = req.params.id
    // const {c_id} = req.params.c_id
    const sc_id = req.params.sc_id

    const deleteCardQuery = `
    DELETE FROM story_cards WHERE id = $1
    RETURNING *;
    `
    const value = sc_id

    db.query(deleteCardQuery, [value])
    .then(data => {
      console.log("DELETED STORY CARD")
      if (data.rows[0]) return res.status(200).send('deleted');
      res.status(404).send("Nothing to delete")
    })
    .catch(err => {
      console.log("DELETE ERR",err)
      res
        .status(500)
        .json({error: err.message})
    })
  });
};
