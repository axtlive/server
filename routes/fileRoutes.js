const express = require("express");
const router = express.Router();
const multer = require("multer");

const FileController = require("../controller/FileController");

router.post(
  "/md",
  multer({ dest: "upload/md" }).single("file"),
  FileController.actionUpload,
);

router.post(
  "/image",
  multer({ dest: "upload/image" }).array("file", 10),
  FileController.actionUpload,
);

router.post(
  "/other",
  multer({ dest: "upload/other" }).array("file", 10),
  FileController.actionUpload,
);

module.exports = router;
