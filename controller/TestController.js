const TestDao = require("../dao/TestDao");
const respUtil = require("../util/RespUtil");

class TestController {
  actionTest(req, res) {
    cd.lo(dsd)
    TestDao.queryTest([], (result) => {
      // res.writeHead(200, {
      //   "content-type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "content-type",
      //   "Access-Control-Allow-Methods": "*",
      // });
      // res.write(respUtil.writeResult(false, "查询成功", result.length, result));
      // res.end();
      res.status(200).send(respUtil.writeResult(false, "查询成功", result.length, result));
    });
  }
}

module.exports = TestController;
