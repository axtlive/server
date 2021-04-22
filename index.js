const express = require("express");
const moment = require("moment");

<<<<<<< Updated upstream
const globalConfig = require("./config");
const loader = require("./loader");
const log = require("./log");

const app = new express();

app.use(express.static("./page/"));

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
=======
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

app.use("/students", studentRouter);

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
  res.status(404).sendFile(path.join(__dirname, "view/404.html"));
>>>>>>> Stashed changes
});

app.get("/queryAllStudents/ok", loader.get("/queryAllStudents"));
app.get("/queryStudentsByPage", loader.get("/queryStudentsByPage"));
app.get("/queryStudents", loader.get("/queryStudents"));
app.get("/queryStudentsCount", loader.get("/queryStudentsCount"));

app.post("/login", loader.get("/login"));
app.post("/register", loader.get("/register"));

app.listen(globalConfig.port, () => {
  console.log(`服务已启动,并监听端口${globalConfig.port}`);
  const time = moment().format("YYYY-MM-DD, h:mm:ss");
  log("服务已启动,启动时间是 " + time);
});
