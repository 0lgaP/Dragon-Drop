const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./configs/db.config");
const { v4: uuidv4 } = require('uuid');

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const campaignsRouter = require('./routes/campaigns')
const mapsRouter = require('./routes/maps')
const npcsRouter = require('./routes/npcs')
const partyRouter = require('./routes/party')
const storyRouter = require('./routes/story')

const app = express();


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// listeners

app.use("/", indexRouter(db));
app.use("/users", usersRouter(db));
app.use("/users/:id/campaigns", campaignsRouter(db));
app.use("/users/:id/campaigns/:c_id/maps", mapsRouter(db));
app.use("/users/:id/campaigns/:c_id/npcs", npcsRouter(db));
app.use("/users/:id/campaigns/:c_id/party", partyRouter(db));
app.use("/users/:id/campaigns/:c_id/story", storyRouter(db));

module.exports = app;
