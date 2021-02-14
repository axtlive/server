const fs = require("fs");
const moment = require("moment");
const respUtil = require("../util/RespUtil");

class FileController {
  static actionUpload(req, res) {
    const files = req.files;
    console.log(req);
    const fileList = [];
    try {
      for (let i in files) {
        const f = files[i];
        console.log(f);
        const oldPath = f.path;
        const pathArr = f.path.split("/");
        pathArr.pop();
        const newPath = `${pathArr.join("/")}/${moment().format(
          "YYYY-MM-DD hh:mm:ss",
        )}-${f.originalname}`;
        fs.renameSync(oldPath, newPath);
        f.path = newPath;
        fileList.push(f);
      }
      res.send(
        respUtil.writeResult(false, "上传成功", fileList.length, fileList),
      );
    } catch (err) {
      res.send(
        respUtil.writeResult(
          true,
          `上传失败,${err}`,
          fileList.length,
          fileList,
        ),
      );
    }
  }
  static actionSingleUpload(req, res) {}
}

module.exports = FileController;
