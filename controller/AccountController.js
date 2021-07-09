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
    console.log(user)
    // 先查询数据库中的账号是否存在
    const result = await queryDetailByAccount(user);
    if (result && result.length) {
      // 存在 则去查询账号密码是否正确
      if (result[0].password === password) {
        res.send(respUtil.writeResult(false, "登录成功",1,result[0],'ok'));
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
  async currentUser (req, res) {
    const data ={
      name: '测试用户',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      email: 'antdesign@alipay.com',
      signature: '海纳百川，有容乃大',
      title: '交互专家',
      group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
      tags: [
        {
          key: '0',
          label: '很有想法的',
        },
        {
          key: '1',
          label: '专注设计',
        },
        {
          key: '2',
          label: '辣~',
        },
        {
          key: '3',
          label: '大长腿',
        },
        {
          key: '4',
          label: '川妹子',
        },
        {
          key: '5',
          label: '海纳百川',
        },
      ],
      notifyCount: 12,
      unreadCount: 11,
      country: 'China',
      access: 'admin',
      geographic: {
        province: {
          label: '浙江省',
          key: '330000',
        },
        city: {
          label: '杭州市',
          key: '330100',
        },
      },
      address: '西湖区工专路 77 号',
      phone: '0752-268888888',
    }
    const d = {
      data: {
        isLogin: false,
      },
      errorCode: '401',
      errorMessage: '请先登录！',
      success: true,
    }
    res.send(respUtil.writeJson(false,d, "1111"));
  }
}

module.exports = AccountController;
