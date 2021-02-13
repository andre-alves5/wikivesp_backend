import User from "../models/User";
import fs from "fs";
import aws from "aws-sdk";

const s3 = new aws.S3();

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

    await User.findOne({ _id: req.userId }, "_id key url")
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

          fs.access(oldImage, (err) => {
            if (!err) {
              fs.unlink(oldImage, (err) => {});
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

    await User.updateOne({ _id: req.userId }, imageData, (err) => {
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

export default new PerfilImagemController();
