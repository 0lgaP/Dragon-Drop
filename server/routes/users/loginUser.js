module.exports = (router, db) => {
  //Login User

  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // console.log("BOD", req)
    db.query(`SELECT * FROM users WHERE email = $1;`, [email])
    .then(
      (result) => {
        if (password === result.rows[0].password) {
          console.log(`result of db query: `, result.rows[0])
          res.send(result.rows[0])
          // req.session["user_id"] = result.rows[0].id
        } else {
          res.send({ error: "error" });
          return;
        }
      }
    );
  });
};
