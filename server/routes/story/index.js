const postStory = require("./postStory");
const getStory = require("./getStory");
const editStory = require("./editStory");
const deleteStory = require("./deleteStory");

module.exports = (router, db) => {

  postStory(router, db);

  getStory(router, db);

  editStory(router, db);

  deleteStory(router, db);

};