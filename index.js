const express = require("express");
const moment = require("moment");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const cookieParser = require("cookie-parser");

const globalConfig = require("./config/config");
const log = require("./util/LogUtil");
const { getDate } = require("./util/TimeUtil");
const optionsReq = require("./middlewares/optionsRequest");

const regAndLoginRouter = require("./routes/regAndLogin");
const studentRouter = require("./routes/student");
const testRouter = require("./routes/testRoutes");
const fileRouter = require("./routes/fileRoutes");

const app = express();

app.use(optionsReq);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "view")));

app.use("/account", regAndLoginRouter);
app.use("/api", regAndLoginRouter);

// app.use("/students", studentRouter);

// 测试
app.use("/test", testRouter);

// 文件上传
app.use("/upload", fileRouter);

// app.get("/download", (req, res) => {
//   const url = req.params.url;
// });

// app.get("*", (request, response) => {
//   response.sendFile(path.resolve(__dirname, "view", "index.html"));
// });

// 404 错误处理
app.use((req, res, next) => {
  // res.sendFile(path.join(__dirname, "view/404.html"));
  res.status(404).send(JSON.stringify({failed: true, msg: "接口或资源不存在" }))
});

// 500 错误处理
app.use((err, req, res, next) => {
  res.status(err.status || 500).send("Server error");
});

app.listen(globalConfig.port, () => {
  console.log(`后端服务已启动,并监听端口${globalConfig.port}`);
  // const time = moment().format("YYYY-MM-DD, h:mm:ss");
  // log("服务已启动,启动时间是 " + time);
});
