const writeResult = (
  data = [],
  failed = false,
  message = "unknown message",
  total = 0,
  status = "unknown status",
) => JSON.stringify({ data, failed, message, total, status });

module.exports.writeResult = writeResult;
