const express = require("express");
const moment = require("moment");
const path = require("path");
const cookieParser = require("cookie-parser");

const globalConfig = require("./config/config");
const log = require("./util/LogUtil");

const regAndLoginRouter = require("./routes/regAndLogin");
const studentRouter = require("./routes/student");
const testRouter = require("./routes/testRoutes");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "view")));

// app.use("/account", regAndLoginRouter);
// app.use("/students", studentRouter);
app.use("/test", testRouter);

// app.get("*", (request, response) => {
//   response.sendFile(path.resolve(__dirname, "view", "index.html"));
// });

// 404 错误处理
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "view/404.html"));
});

// 500 错误处理
app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).send("Server error");
});

app.listen(globalConfig.port, () => {
  console.log(`服务已启动,并监听端口${globalConfig.port}`);
  const time = moment().format("YYYY-MM-DD, h:mm:ss");
  log("服务已启动,启动时间是 " + time);
});
