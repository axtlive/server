const fs = require("fs");
const globalConfig = require("../config/config.js");

const fileName = globalConfig.log_path + globalConfig.log_name;

// 异步去写
// fs.writeFile(fileName, 'fdsafdsafdsa',function(){});

// 同步
// fs.writeFileSync(fileName,'asd');

function log(data) {
  // fs.writeFile(fileName, data+'\n', {flag:'a'},function(){});
  fs.appendFile(fileName, data + "\n", { flag: "a" }, () => {});
}

module.exports = log;
