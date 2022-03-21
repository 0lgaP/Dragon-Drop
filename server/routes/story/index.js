const getStories = require("./getStories");
const postStory = require("./postStory");
const fetchStory = require("./fetchStory");

module.exports = (router, db) => {

  getStories(router, db);

  postStory(router, db);

  fetchStory(router, db);

}