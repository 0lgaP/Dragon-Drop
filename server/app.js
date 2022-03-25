const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./configs/db.config");

const { v4: uuidv4 } = require("uuid");
// const cookieSession = require('cookie-session');

const cors = require('cors');

const mainRoutes = require("./routes/index");

const mainRouter = express.Router();

mainRoutes(mainRouter, db);

const app = express();
app.use(cors({origin: process.env.REACT_APP_CORS}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, "public")));



app.use("/", mainRouter);

module.exports = app;
