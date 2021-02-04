const express = require("express");
const moment = require("moment");
const path = require("path");

const globalConfig = require("./config/config");
const loader = require("./loader");
const log = require("./util/LogUtil");

const regAndLoginRouter = require("./routes/regAndLogin");
const studentRouter = require("./routes/student");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "view")));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  if (req.method === "OPTIONS") {
    res.send(200);
  } else {
    next();
  }
});

app.use("/account", regAndLoginRouter);
app.use("/students", studentRouter);

// 404 错误处理
app.use(function (req, res, next) {
  res.sendFile(path.join(__dirname, "view/404.html"));
});

// 500 错误处理
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error");
});

app.listen(globalConfig.port, () => {
  console.log(`服务已启动,并监听端口${globalConfig.port}`);
  const time = moment().format("YYYY-MM-DD, h:mm:ss");
  log("服务已启动,启动时间是 " + time);
});
