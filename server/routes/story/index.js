const postStory = require("./postStory");
const getStories = require("./getStories");
const editStory = require("./editStory");
const deleteStory = require("./deleteStory");
const fetchStory = require("./fetchStory");
const editOrder = require("./editOrder")

module.exports = (router, db) => {

  postStory(router, db);

  getStories(router, db);

  editStory(router, db);

  deleteStory(router, db);

  fetchStory(router, db);

  editOrder(router, db);

};