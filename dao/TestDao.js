const DbConnection = require("./DbConnection");

const queryTest = (_, success) => {
  const querySQL = "select * from worker order by id;";
  const params = [];
  const connection = DbConnection();
  connection.connect();
  connection.query(querySQL, params, (error, result) => {
    if (!error) {
      success(result);
    } else {
      console.log(error);
    }
  });
  connection.end();
};

module.exports = {
  queryTest,
};
