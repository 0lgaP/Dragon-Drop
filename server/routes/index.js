const campaignRoutes = require("./campaigns/index");
const mapRoutes = require("./maps/");
const npcRoutes = require("./npcs/index");
const partyRoutes = require("./party/index");
const usersRoutes = require("./users/index");
const storyRoutes = require("./story/index");
const storyCardRoutes = require("./story/storyCards/index");

module.exports = (router, db) => {
  campaignRoutes(router, db);
  // app.use("/users/:id/campaigns/:c_id/maps", mapsRouter(db));
  mapRoutes(router, db);

  // app.use("/users/:id/campaigns/:c_id/npcs")
  npcRoutes(router, db);

  // app.use("/users/:id/campaigns/:c_id/party")
  partyRoutes(router, db);

  // app.use("/users", usersRouter(db));
  usersRoutes(router, db);

  // app.use("/users/:id/campaigns/:c_id/story", storyRouter(db));
  storyRoutes(router, db);

  // app.use("/users/:u_id/campaigns/:c_id/story/story_card/:sc_id", storyCardRouter(db));
  storyCardRoutes(router, db);

  // // HOME PAGE
  // router.get("/", function (req, res, next) {
  //   res.render("index");
  // });

  // // GET LOGIN PAGE
  // app.use("/login", (req, res) => {});
};
