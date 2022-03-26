module.exports = (router, db) => {
  const helpers = require("../helpers")(db);
  // Get Note
  router.post("/users/:id/campaigns/:c_id/notes", (req, res) => {
    const { user_id } = req.body;
    console.log(req.body);
    const campaign_id = req.params.c_id;

    const params = [campaign_id, user_id];

    const query = `
    SELECT * FROM notes
    WHERE user_id = $2 AND campaign_id = $1;`;

    helpers
      .tryReturnJson(res, query, params, true, true)
      .then((result) => {
        if (result) return res.json(result).status(200);
        res.json({
          campaign_id,
          user_id,
          content: "",
        });
      })
      .catch((err) => console.log("err", err));
  });
};
