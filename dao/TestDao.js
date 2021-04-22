const dbutil = require('./DBUtil');
const respUtil = require('../util/RespUtil');

function queryAllStudents(success) {
    const querySQL = 'select * from students order by id desc;';
    const params = [];
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

function queryStudentsByPage(page, pageSize, success) {
    const querySQL = 'select * from students order by id desc limit ?,?;';
    const params = [(page - 1) * pageSize, pageSize];
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



/**
 * @description:关键字 性别 查询并分页
 * @param {type} request response
 * @return: data
 */
function queryStudents(page = 1, pageSize = 10, key = '', sex = -1, success) {
    let querySQL;
    let params;
    let total;
    if (sex = -1) {
        querySQL = "select * from students where address like '%' ? '%' order by id desc limit ?,?;";
        params = [key, (page - 1) * pageSize, pageSize];
    } else {
        querySQL = "select * from students where address like '%' ? '%' and sex = ?  order by id desc limit ?,?;";
        params = [key, sex, (page - 1) * pageSize, pageSize];
    }
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

/**
 * @description:关键字 查询根据关键词分类的总数
 * @param {type} request response
 * @return: data
 */
function queryTotalByParam(key = '', sex = -1, success) {
    let querySQL;
    let params;
    if (sex = -1) {
        querySQL = "select count(1) as count from students where address like '%' ? '%';";
        params = [key];
    } else {
        querySQL = "select count(1) as count from students where address like '%' ? '%' and sex = ?;";
        params = [key, sex,];
    }
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

<<<<<<< Updated upstream
module.exports.queryAllStudents = queryAllStudents;
module.exports.queryStudentsByPage = queryStudentsByPage;
module.exports.queryStudents = queryStudents;
module.exports.queryTotalByParam = queryTotalByParam;
=======
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

function queryAllStudents(_, success) {
  const querySQL = "select * from students order by id desc;";
  const params = [];
  const connection = DBUtil.DbConnection();
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

module.exports = {
  queryTest,
  queryAllStudents,
};
>>>>>>> Stashed changes
