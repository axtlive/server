<<<<<<< Updated upstream
function writeResult(failed, message, total, data) {
    // console.log(JSON.stringify({status, msg, data}));
    return JSON.stringify({failed, message, total, data})
}
=======
const writeResult = (
  failed = false,
  message = "查询成功",
  total = 0,
  data = [],
  status = "unknown",
) => JSON.stringify({ failed, message, total, data, status });
>>>>>>> Stashed changes

module.exports.writeResult = writeResult;
