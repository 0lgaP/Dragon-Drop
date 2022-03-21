const fetchStoryCard = require('./fetchStoryCard');
const deleteStoryCard = require('./deleteStoryCard');
const editStoryCard = require('./editStoryCard');

module.exports = (router, db) => {

  fetchStoryCard(router, db);

  deleteStoryCard(router, db);

  editStoryCard(router, db);

};