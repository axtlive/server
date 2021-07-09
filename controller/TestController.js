const { queryAllStudents } = require("../dao/TestDao");
const respUtil = require("../util/RespUtil");

function getRandom(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}
const getColor = () =>
  `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(
    0,
    255,
  )}, ${Math.random()})`;
class TestController {
  async actionTest(req, res) {
    const result = await queryAllStudents();
    if (result && result.length) {
      const time = Math.random() * 255 * 10;
      setTimeout(() => {
        res.status(200).send(
          respUtil.writeResult(
            result.map((item) => ({
              ...item,
              color: getColor(),
            })),
            false,
            "查询成功",
            result.length,
            time,
          ),
        );
      }, time);
    } else {
      res.send(respUtil.writeResult([], true));
    }
  }
}

module.exports = TestController;
