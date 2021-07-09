const express = require("express");
const router = express.Router();

const loader = require("../loader");

router.get("/queryAllStudents/ok", loader.get("/queryAllStudents"));
router.get("/queryStudentsByPage", loader.get("/queryStudentsByPage"));
router.get("/queryStudents", loader.get("/queryStudents"));
router.get("/queryStudentsCount", loader.get("/queryStudentsCount"));

module.exports = router;
