const getUsers = require("./getUsers");
const postUsers = require("./postUsers");
const fetchUser = require("./fetchUser");
const loginUser = require("./loginUser");
const deleteUser = require("./deleteUser");


module.exports = (router, db) => {

  getUsers(router, db);

  postUsers(router, db);

  fetchUser(router, db);

  loginUser(router, db);

  deleteUser(router, db);



}