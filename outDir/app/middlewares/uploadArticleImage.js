"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);
var _path = require('path');
var _awssdk = require('aws-sdk'); var _awssdk2 = _interopRequireDefault(_awssdk);
var _multers3 = require('multer-s3'); var _multers32 = _interopRequireDefault(_multers3);

const storageTypes = {
  local: _multer2.default.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "tmp/uploads/article");
    },
    filename: (req, file, cb) => {
      _crypto2.default.randomBytes(16, (err, res) => {
        if (err) return cb(err);
        cb(null, res.toString("hex") + _path.extname.call(void 0, file.originalname));
      });
    },
  }),
  s3: _multers32.default.call(void 0, {
    s3: new _awssdk2.default.S3(),
    bucket: "wikivesp-files",
    contentType: _multers32.default.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      _crypto2.default.randomBytes(16, (err, res) => {
        if (err) cb(err);

        const fileName = res.toString("hex") + _path.extname.call(void 0, file.originalname);

        cb(null, fileName);
      });
    },
  }),
};

exports. default = {
  storage: storageTypes["s3"],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/jpg", "image/png"];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Imagem Inválida"));
    }
  },
};
