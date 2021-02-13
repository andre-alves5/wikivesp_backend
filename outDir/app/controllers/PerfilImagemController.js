"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _awssdk = require('aws-sdk'); var _awssdk2 = _interopRequireDefault(_awssdk);

const s3 = new _awssdk2.default.S3();

class PerfilImagemController {
  async update(req, res) {
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({
        error: true,
        code: 129,
        message: "Error: Selecione uma imagem válida JPEG ou PNG!",
      });
    }
    if (process.env.STORAGE_TYPE === "s3") {
      var imageData = {
        originalName: req.file.originalname,
        key: req.file.key,
        size: req.file.size,
        url: req.file.location,
      };
    } else {
      var url = req.file.destination + "/" + req.file.filename;
      var imageData = {
        originalName: req.file.originalname,
        key: req.file.filename,
        size: req.file.size,
        url,
      };
    }

    await _User2.default.findOne({ _id: req.userId }, "_id key url")
      .then((user) => {
        req.userImageData = user.key;
        if (process.env.STORAGE_TYPE === "s3") {
          return s3
            .deleteObject({
              Bucket: process.env.USERS_BUCKET_NAME,
              Key: user.key,
            })
            .promise()
            .then((response) => {
              console.log(response.status);
            })
            .catch((response) => {
              console.log(response.status);
            });
        } else {
          const oldImage = req.file.destination + "/" + req.userImageData;

          _fs2.default.access(oldImage, (err) => {
            if (!err) {
              _fs2.default.unlink(oldImage, (err) => {});
            }
          });
        }
      })
      .catch((err) => {
        return res.status(400).json({
          error: true,
          code: 128,
          message: "Erro: Não foi possível executar a solicitação!",
        });
      });

    await _User2.default.updateOne({ _id: req.userId }, imageData, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 129,
          message: "Erro: Imagem do perfil não editado com sucesso!",
        });
    });

    return res.json({
      error: false,
      message: "Imagem do perfil editado com sucesso!",
    });
  }
}

exports. default = new PerfilImagemController();
