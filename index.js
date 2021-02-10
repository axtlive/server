const express = require("express");
const moment = require("moment");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
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
    "Content-Type, Authorization, Content-Length, X-Requested-With",
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

app.post(
  "/upload",
  multer({ dest: "./upload" }).array("file", 10),
  (req, res) => {
    const files = req.files;
    console.log(req);
    const fileList = [];
    for (let i in files) {
      const f = files[i];
      fs.renameSync(f.path, `upload/${f.originalname}`, { encoding: "utf8" });
      f.path = `upload/${f.originalname}`;
      fileList.push(f);
    }
    res.send(fileList);
  },
);

app.get("/download", (req, res) => {
  const url = req.params.url;
});

// app.get("*", (request, response) => {
//   response.sendFile(path.resolve(__dirname, "view", "index.html"));
// });

// 404 错误处理
app.use((req, res, next) => {
  // res.sendFile(path.join(__dirname, "view/404.html"));
  res.status(404).sendFile(path.join(__dirname, "view/404.html"));
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
