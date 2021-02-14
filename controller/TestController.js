const TestDao = require("../dao/TestDao");
const respUtil = require("../util/RespUtil");

class TestController {
  actionTest(req, res) {
    TestDao.queryTest([], (result) => {
      res
        .status(200)
        .send(respUtil.writeResult(false, "查询成功", result.length, result));
    });
  }
}

module.exports = TestController;
