const TestDao = require("../dao/TestDao");
const timeUtil = require("../util/TimeUtil");
const respUtil = require("../util/RespUtil");
const url = require("url");
const moment = require("moment");
const log = require("../util/LogUtil");

const path = new Map();

// 处理返回数据小写
// function dataTolower(result){
//   return result.map(obj => {
//     const temp = {}
//     Object.keys(obj).forEach(key => {
//       temp[key.toLowerCase()] = obj[key]
//     })
//     return temp;
//   })
// }

/**
 * @description:关键字 调用接口打一次日志
 * @param {type} interface
 */
function logWhenUseInterface(interface) {
  const time = moment().format("YYYY-MM-DD, h:mm:ss");
  log(`调用了${interface}接口,调用时间是${time}`);
}

// 查询所有
function queryAllStudents(request, response) {
  logWhenUseInterface("queryAllStudents");
  TestDao.queryAllStudents(result => {
    response.writeHead(200, {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Methods": "DELETE,PUT,POST,GET,OPTIONS",
    });
    response.write(
      respUtil.writeResult(false, "查询成功", result.length, result),
    );
    response.end();
  });
}
path.set("/queryAllStudents", queryAllStudents);

/**
 * @description:关键字 分页查询
 * @param {type} request response
 * @return: data
 */
function queryStudentsByPage(request, response) {
  logWhenUseInterface("queryStudentsByPage");
  const params = url.parse(request.url, true).query;
  TestDao.queryStudentsByPage(
    parseInt(params.page),
    parseInt(params.pageSize),
    result => {
      response.writeHead(200, {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "content-type",
        "Access-Control-Allow-Methods": "DELETE,PUT,POST,GET,OPTIONS",
      });
      // response.writeHead(200,{'content-type': 'application/json',});
      response.write(
        respUtil.writeResult(false, "查询成功", result.length, result),
      );
      response.end();
    },
  );
}
path.set("/queryStudentsByPage", queryStudentsByPage);

/**
 * @description:关键字 性别 查询并分页
 * @param {type} request response
 * @return: data
 */
function queryStudents(request, response) {
  logWhenUseInterface("queryStudents");
  const params = url.parse(request.url, true).query;
  TestDao.queryStudents(
    parseInt(params.page),
    parseInt(params.pageSize),
    params.key,
    parseInt(params.sex),
    result => {
      response.writeHead(200, {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "content-type",
        "Access-Control-Allow-Methods": "DELETE,PUT,POST,GET,OPTIONS",
      });
      response.write(
        respUtil.writeResult(false, "查询成功", result.length, result),
      );
      response.end();
    },
  );
}
path.set("/queryStudents", queryStudents);

/**
 * @description:关键字 查询根据关键词分类的 总数
 * @param {type} request response
 * @return: data
 */
function queryStudentsCount(request, response) {
  logWhenUseInterface("queryStudentsCount");
  const params = url.parse(request.url, true).query;
  TestDao.queryTotalByParam(params.key, parseInt(params.sex), result => {
    response.writeHead(200, {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Methods": "DELETE,PUT,POST,GET,OPTIONS",
    });
    response.write(respUtil.writeResult(false, "查询成功", result[0].count));
    response.end();
  });
}
path.set("/queryStudentsCount", queryStudentsCount);

module.exports.path = path;
