const moment = require("moment");

function getNow() {
  return parseInt(Date.now() / 1000);
}

function getDate() {
  return moment().format("YYYY-MM-DD-hh");
}

module.exports = { getNow, getDate };
