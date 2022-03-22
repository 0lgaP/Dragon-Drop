module.exports = (router, db) => {
  // GET CAMPAIGNS
  router.get("/users/:id/campaigns", (req, res) => {
    const user = req.session.user
    console.log(user)


  });
};
