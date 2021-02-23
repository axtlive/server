// const RegAndLoginDao = require("../dao/RegAndLoginDao");
const {
  queryDetailByAccount,
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
  // 登录
  async login(req, res) {
    const { user, password } = req.body;
    // 先查询数据库中的账号是否存在
    const result = await queryDetailByAccount(user);
    if (result && result.length) {
      // 存在 则去查询账号密码是否正确
      if (result[0].password === password) {
        res.send(respUtil.writeResult(false, "登录成功"));
      } else {
        res.send(respUtil.writeResult(true, "登录失败，密码错误，请重试"));
      }
    } else {
      // 不存在，则提示注册
      res.send(respUtil.writeResult(true, "登录失败，账户不存在，请前往注册"));
    }
  }
  // 注册
  async register(req, res) {
    const { user, password } = req.body;
    console.log(req.headers.origin)
    // console.log(user, password)
    // 先查询数据库中的账号是否存在
    const result = await queryDetailByAccount(user);
    if (result && result.length) {
      res.send(respUtil.writeResult(true, "注册失败，账户已存在，请前往登录"));
    } else {
      await registerAccount([
        user,
        password,
        moment().format("YYYY-MM-DD hh:mm:ss"),
      ]);
      res.send(respUtil.writeResult(false, "注册成功"));
    }
  }
}

module.exports = AccountController;
