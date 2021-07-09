const express = require("express");
const router = express.Router();

const loader = require("../loader");

const AccountController = require("../controller/AccountController");
const accountController = new AccountController();

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
// router.post("/login", loader.get("/login"));
router.post("/login", accountController.login);

// 注册
router.post("/register", accountController.register);

router.get("/currentUser", accountController.currentUser);


module.exports = router;
