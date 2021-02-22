const mysql = require("mysql");

const DbConnection = () =>
  mysql.createConnection({
    host: "cdb-h1s30b34.cd.tencentcdb.com",
    port: "10000",
    user: "root",
    password: "25257758520ztT",
    database: "axtlive_test",
  });

module.exports.DbConnection = DbConnection;
