module.exports = (router, db) => {
//Login User

router.post('/login', (req, res) => {
  
  const email = req.body.email;
  const password = req.body.password;
  db.query(`SELECT * FROM users WHERE email = $1;`, [email])
  .then(result => {

    if (password === result.rows[0].password) {
      req.session["user_id"] = result.rows[0].id;
      res.redirect(`/users/${result.rows[0].id}`);
    } else {
      res.send({error: "error"});
      return;
    }

  });
});

}