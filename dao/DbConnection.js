const mysql = require("mysql");

const DbConnection = () =>
  mysql.createConnection({
    host: "cdb-h1s30b34.cd.tencentcdb.com",
    port: "10000",
    user: "root",
    password: "",
    database: "axtlive_pxj",
  });

module.exports = DbConnection;
