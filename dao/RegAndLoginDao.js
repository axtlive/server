const dbutil = require("./DbConnection");
const respUtil = require("../util/RespUtil");

// 查询账户是否存在
function queryIsExist(user, success) {
  const querySQL = "select * from account where user = ?;";
  const params = [user];
  const connection = dbutil.createConnection();
  connection.connect();
  new Promise((resolve, reject) => {
    connection.query(querySQL, params, (error, result) => {
      if (!error) {
        connection.end();
        resolve(result);
        // success(result);
      } else {
        console.log(error);
        reject(error);
      }
    });
  });
}

// 验证登录
function queryPasswordByUser(user, success) {
  const querySQL = "select * from account where user = ?;";
  const params = [user];
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySQL, params, (error, result) => {
    if (!error) {
      success(result);
    } else {
      console.log(error);
    }
  });
  connection.end();
}

// 注册
function registerAccount(user, password, ctime, utime, success) {
  const insertSQL =
    "insert into account (`user`,`password`,`ctime`,`utime`) values (?,?,?,?);";
  const params = [user, password, ctime, utime];
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(insertSQL, params, (error, result) => {
    if (!error) {
      success(result);
    } else {
      console.log(error);
    }
  });
  connection.end();
}

module.exports = {
  queryIsExist,
  queryPasswordByUser,
  registerAccount,
};
// module.exports.queryIsExist = queryIsExist;
// module.exports.queryPasswordByUser = queryPasswordByUser;
// module.exports.registerAccount = registerAccount;
