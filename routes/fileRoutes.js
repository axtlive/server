const express = require("express");
const router = express.Router();
const multer = require("multer");

const FileController = require("../controller/FileController");

router.post(
  "/md",
  multer({ dest: "upload/md" }).single("file"),
  FileController.multipleUpload,
);

router.post(
  "/image",
  multer({ dest: "upload/image" }).array("file", 10),
  FileController.multipleUpload,
);

router.post(
  "/other",
  multer({ dest: "upload/other" }).array("file", 10),
  FileController.multipleUpload,
);

module.exports = router;
