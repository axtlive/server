const express = require("express");
const router = express.Router();

const loader = require("../loader");

/* GET  listing. */

// // 登录
// router.get("/login", function (req, res, next) {
//   res.send("login get");
// });
// // 注册
// router.get("/register", function (req, res, next) {
//   res.send("register get");
// });


/* POST  listing. */

// 登录
router.post("/login", loader.get("/login"));
// 注册
router.post("/register", loader.get("/register"));



module.exports = router;