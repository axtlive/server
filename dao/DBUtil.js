const mysql = require("mysql");
const dbConfig = require("../config/dbConfig");

const { host, port, user, password, database } = dbConfig;

class DBUtil {
  static dbConnection = () =>
    mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
    });

  static basicDbOperation = (sql, params) => {
    const connection = DBUtil.dbConnection();
    connection.connect();
    return new Promise((resolve, reject) => {
      connection.query(sql, params, (error, result) => {
        !error ? resolve(result) : reject(error);
        connection.end();
      });
    });
  };
}

module.exports = DBUtil;
