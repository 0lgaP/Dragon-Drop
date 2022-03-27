module.exports = (router, db) => {
  //EDIT Story Order
  router.put('/users/:u_id/campaigns/:c_id/story/:sc_id/order', (req, res) => {
    console.log("++++++++++HI+++++++++++")
    const sc_id = req.params.sc_id
    const order = parseInt(req.body.order) + 1

    const updateQuery = `
    UPDATE story_cards SET order_num = $1
    WHERE id = $2
    RETURNING *;
    `
    db.query(updateQuery, [order, sc_id])
    .then((result) => {
      console.log("EDIT ORDER", result.rows[0])
      if (result.rows[0]) return res.status(200).send(result.rows[0]);
      res.status(404).send("Nothing to edit")
    })
    .catch((err) => {
      console.log("ERROR IN EDITSTORY ROUTE", err)
      res.status(500).send(err.message)
    })

  })
};