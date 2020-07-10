function writeResult(failed, message, total, data) {
    // console.log(JSON.stringify({status, msg, data}));
    return JSON.stringify({failed, message, total, data})
}

module.exports.writeResult = writeResult;
