const DBUtil = require("./DbConnection");
const respUtil = require("../util/RespUtil");

// 连接数据库 进行操作 并返回promise
const basicDbOperation = (sql, params) => {
  const connection = DBUtil.DbConnection();
  connection.connect();
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
      connection.end();
    });
  });
};

// 根据账号 查询账号明细
const queryDetailByAccount = (user) => {
  const querySQL = "select * from account where user = ?;";
  const params = [user];
  return basicDbOperation(querySQL, params);
};

// 注册
const registerAccount = (params) => {
  const insertSQL =
    "insert into account (`user`,`password`,`register_time`) values (?,?,?);";
  return basicDbOperation(insertSQL, params);
};

module.exports = {
  queryDetailByAccount,
  registerAccount,
};
