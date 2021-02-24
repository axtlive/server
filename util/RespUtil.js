const writeResult = (
    failed,
    message,
    total = 0,
    data = [],
    status = "unknown"
  ) => JSON.stringify({ failed, message, total, data, status });
  
  module.exports.writeResult = writeResult;
  