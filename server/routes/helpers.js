module.exports = function (db) {
  /**
   * Queries database and returns the rows of the result to the client
   * @param {Object} res Response object to the client that requested data
   * @param {String} queryString SQL query to send to db
   * @param {Array<string, number>} params List of params for queryString
   * @param {Boolean} onlyFirst Only return item in [0] of rows
   */
  function tryReturnJson(
    res,
    queryString,
    params,
    onlyFirst,
    returnJsonToMePlease
  ) {
    // Send query to DB
    return (
      db
        .query(queryString, params)
        // If successful, try to return rows to client
        .then((response) => {
          // Rows can be a length of one, but will still get sent to client
          // "Absence of evidence can be evidence itself"
          const result = onlyFirst ? response.rows[0] : response.rows;
          if (returnJsonToMePlease) return result;
          if (result) return res.status(200).json(result);

          // Let user know server oopsied
          res.status(500).send("Something went wrong on our end.");
        })
        // General Error Catch
        .catch((err) => {
          console.log(err);
          res.status(500).send("Something went wrong on our end");
        })
    );
  }

  /**
   * Queries database and returns the data if there was data to delet
   * @param {Object} res Response object to the client that requested data
   * @param {String} queryString SQL delete query to send to db [MUST CONTAIN RETURNING *;]
   * @param {Array<string, number>} params List of params for queryString
   */
  function tryDeleteEntity(res, deleteString, params) {
    db.query(deleteString, params)
      .then((response) => {
        const result = response.rows[0];
        if (result) return res.status(200).send("Deleted");
        res.status(404).send("Nothing there kiddo");
      })
      // General Error Catch
      .catch((err) => {
        console.log(err);
        res.status(500).send("Something went wrong on our end");
      });
  }

  /**
   * Queries database to see if user has right
   * @param {Object} res Response object to the client that requested data
   * @param {String} queryString SQL check query to send to db
   * @param {Array<string, number>} params List of params for queryString
   * @returns {Promise} a Promise
   */
  function checkRights(res, checkRightsQuery, params, callback) {
    db.query(checkRightsQuery, params)
      .then((response) => {
        const result = response.rows;
        console.log(params, checkRightsQuery);
        if (!result.length) throw new Error("Dont have Permsission");
        callback();
      })
      // General Error Catch
      .catch((err) => {
        res.status(403).send(err);
      });
  }

  /**
   * Queries database to see if user is owner of map
   * @param {Object} res Response object to the client that requested data
   * @param {Number} user_id the users id
   * @param {Number} map_id the map you want to check for ownership
   * @returns {Promise} a Promise
   */
  function checkIfOwner(res, user_id, map_id) {
    const params = [user_id, map_id];
    const checkRightsQuery = `
      SELECT c.dm_id
      FROM campaigns c
      WHERE c.dm_id = $1 AND c.id = $2;
      `;

    return db
      .query(checkRightsQuery, params)
      .then((response) => {
        const result = response.rows;
        if (!result.length) throw new Error("You dont have rights");
        return result;
      })
      .catch((err) => {
        console.log(err);
        res.status(403).send(err.message);
      });
  }

  /**
   * Queries database to see if user is in our records
   * @param {Object} res Response object to the client that requested data
   * @param {Number} user_id the users id
   * @returns {Promise} a Promise
   */
  function checkIfUserExists(res, user_id) {
    const params = [user_id];
    const checkUserIsRegistered = `
      SELECT id
      FROM users
      WHERE id = $1;
      `;

    return db
      .query(checkUserIsRegistered, params)
      .then((response) => {
        const result = response.rows;
        if (!result.length) throw new Error("Your account doesnt exist");
        return result;
      })
      .catch((err) => {
        console.log(err);
        res.status(403).send(err.message);
      });
  }

  return {
    tryReturnJson,
    tryDeleteEntity,
    checkRights,
    checkIfOwner,
    checkIfUserExists,
  };
};
