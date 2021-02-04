const express = require("express");
const moment = require("moment");

const globalConfig = require("./config/config");
const loader = require("./loader");
const log = require("./util/LogUtil");

const app = new express();

app.use(express.static("./view/"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With",
  );
  if ("OPTIONS" === req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.get("/queryAllStudents/ok", loader.get("/queryAllStudents"));
app.get("/queryStudentsByPage", loader.get("/queryStudentsByPage"));
app.get("/queryStudents", loader.get("/queryStudents"));
app.get("/queryStudentsCount", loader.get("/queryStudentsCount"));

app.post("/login", loader.get("/login"));
app.post("/register", loader.get("/register"));

app.listen(globalConfig.port, () => {
  // console.log(`服务已启动,并监听端口${globalConfig.port}`);
  const time = moment().format("YYYY-MM-DD, h:mm:ss");
  log("服务已启动,启动时间是 " + time);
});
