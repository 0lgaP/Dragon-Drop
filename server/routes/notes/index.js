const editNote = require("./editNote");
const fetchNote = require("./fetchNote");

module.exports = (router, db) => {
  editNote(router, db);
  fetchNote(router, db);
};
