// const RegAndLoginDao = require("../dao/RegAndLoginDao");
const {
  queryIsExist,
  queryPasswordByUser,
  registerAccount,
} = require("../dao/RegAndLoginDao");

const timeUtil = require("../util/TimeUtil");
const respUtil = require("../util/RespUtil");
const url = require("url");
const moment = require("moment");
const log = require("../util/LogUtil");

const BasicController = require("./BasicController");

// 关键字 调用接口打一次日志
function logWhenUseInterface(interface) {
  const time = moment().format("YYYY-MM-DD, h:mm:ss");
  log(`调用了${interface}接口,调用时间是${time}`);
}

class AccountController extends BasicController {
  // // 检查账号是否存在
  // static async checkIsExist(data) {
  //   const res = await queryIsExist(data);
  //   return res;
  // }
  // 登录
  async login(req, res) {
    console.log("----------------");
    const parseData = JSON.parse(req.body);
    console.log(parseData);
    // 查询数据库中的账号是否存在
    const result = await queryIsExist(data);
    console.log("35------", result);
    if (result !== null && result.length !== 0) {
      // 存在 则去查询账号密码是否正确
      queryPasswordByUser(parseData.user, (result2) => {
        if (result2[0].password === parseData.password) {
          res.send(respUtil.writeResult(false, "登录成功"));
        } else {
          res.send(respUtil.writeResult(true, "登录失败，密码错误，请重试"));
        }
      });
    } else {
      // 不存在，则提示注册
      res.send(respUtil.writeResult(true, "登录失败，账户不存在，请前往注册"));
    }
  }
}

// function login(request, response) {
//   logWhenUseInterface("queryPasswordByUser");
//   request.on("data", (data) => {
//     const parseData = JSON.parse(data);
//     // 查询数据库中的账号是否存在
//     queryIsExist(parseData.user, (result) => {
//       response.writeHead(200, {
//         "content-type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "content-type",
//         "Access-Control-Allow-Methods": "POST,OPTIONS",
//       });
//       if (!(result === null || result.length === 0)) {
//         // 存在 则去查询账号密码是否正确
//         queryPasswordByUser(parseData.user, (result2) => {
//           if (result2[0].password === parseData.password) {
//             response.write(respUtil.writeResult(false, "登录成功"));
//           } else {
//             response.write(
//               respUtil.writeResult(true, "登录失败，密码错误，请重试"),
//             );
//           }
//           response.end();
//         });
//       } else {
//         // 不存在，则提示注册
//         response.write(
//           respUtil.writeResult(true, "登录失败，账户不存在，请前往注册"),
//         );
//         response.end();
//       }
//     });
//   });
// }

/**
 * @description: 注册账号，
 * @param {type}: request, response
 * @return: none
 */
// function register(request, response) {
//   logWhenUseInterface("registerAccount");
//   request.on("data", (data) => {
//     const parseData = JSON.parse(data);
//     console.log("user", JSON.parse(data));
//     // 查询数据库中的账号是否存在
//     queryIsExist(parseData.user, (result) => {
//       response.writeHead(200, {
//         "content-type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "DELETE,PUT,POST,GET,OPTIONS",
//       });
//       if (result === null || result.length === 0) {
//         registerAccount(
//           parseData.user,
//           parseData.password,
//           moment().format("YYYY/MM/DD, h:mm:ss"),
//           moment().format("YYYY/MM/DD, h:mm:ss"),
//           (result) => {
//             response.write(respUtil.writeResult(false, "注册成功"));
//             response.end();
//           },
//         );
//       } else {
//         console.log("else");
//         response.write(respUtil.writeResult(true, "注册失败，账号已经存在"));
//         response.end();
//       }
//     });
//   });
// }

module.exports = AccountController;
