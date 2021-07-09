const writeResult = (
    failed,
    message,
    total = 0,
    data = [],
    status = "unknown"
  ) => JSON.stringify({ failed, message, total, data, status });
  

  const writeJson = (
    failed = false,
    data,
    status = "unknown"
  ) => JSON.stringify({failed, data, status });
  

  module.exports.writeResult = writeResult;
  module.exports.writeJson = writeJson;

  