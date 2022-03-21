var express = require("express");
var router = express.Router();
const campaignRoutes = require("./campaigns/index");
const mapRoutes = require("./maps");
const npcRoutes = require("./npcs/index");
const partyRoutes = require("./party/index");

module.exports = function (router, db) {
  // app.use("/users/:id/campaigns", campaignsRouter(db));
  campaignRoutes(router, db);

  // app.use("/users/:id/campaigns/:c_id/maps", mapsRouter(db));
  mapRoutes(router, db);

  // app.use("/users/:id/campaigns/:c_id/npcs")
  npcRoutes(router, db);

  // app.use("/users/:id/campaigns/:c_id/party")
  partyRoutes(router, db);

  // // HOME PAGE
  // router.get("/", function (req, res, next) {
  //   res.render("index");
  // });

  // // GET LOGIN PAGE
  // router.get("/login", (req, res) => {});

  // router.post('/login', (req, res) => {
  //   const email = req.body.email;
  //   const password = req.body.password;
  //   db.query(`SELECT * FROM users WHERE email = $1;`, [email])
  //   .then(result => {

  //     if (password === result.rows[0].password) {
  //       req.session["user_id"] = result.rows[0].id;
  //       res.redirect(`/users/${result.rows[0].id}`);
  //     } else {
  //       res.send({error: "error"});
  //       return;
  //     }

  //   });
  // });

  // // SUBMIT LOGIN
  // router.put("/login", (req, res) => {});

  // // GET REGISTRATION PAGE
  // router.get("/register", (req, res) => {});

  // // SUBMIT REGISTRATION
  // router.put("/register", (req, res) => {});
};
