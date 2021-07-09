const { basicDbOperation } = require("./DBUtil");

class TestDao {
  static queryTest = () => {
    const sql = "select * from worker order by id;";
    const params = [];
    return basicDbOperation(sql, params);
  };

  static queryAllStudents = () => {
    const sql = "select * from students order by id desc;";
    const params = [];
    return basicDbOperation(sql, params);
  };
}

module.exports = TestDao;
