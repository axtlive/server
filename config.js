const fs = require("fs");

const globalConfig = {};

const conf = fs.readFileSync("./config/server.conf");

const configArr = conf.toString().split("\n");

for (let i of configArr) {
  globalConfig[i.split("=")[0].trim()] = i.split("=")[1];
}
module.exports = globalConfig;
