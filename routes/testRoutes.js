const express = require("express");
const router = express.Router();

const loader = require("../loader");
const TestController = require('../controller/TestController')
const testController = new TestController()

router.get("/worker", testController.actionTest);

module.exports = router;