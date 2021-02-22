/*
import ArticleDetails from "../models/ArticleDetails";
import fs from "fs";
import * as aws from "aws-sdk";

const s3 = new aws.S3();
class ArticleDetailsImageController {
  async update(req, res) {
    let imageData = {}
    if (!req.file) {
      return res.status(400).json({
        error: true,
        code: 129,
        message: "Error: Selecione uma imagem válida JPEG ou PNG!",
      });
    }
    if (process.env.STORAGE_TYPE === "s3") {
      imageData = {
        originalName: req.file.originalname,
        key: req.file.key,
        url: req.file.location
      };
    } else {
      var url = req.file.destination + "/" + req.file.filename;
      imageData = {
        originalName: req.file.originalname,
        key: req.file.filename,
        url
      };
    }

    await ArticleDetails.findOne({ _id: req.params.id }, "_id key url")
      .then((articledetails) => {
        req.articleImageData = articledetails.key;
        if (process.env.STORAGE_TYPE === "s3") {
          return s3
            .deleteObject({
              Bucket: process.env.BUCKET_NAME,
              Key: articledetails.key,
            })
            .promise()
            .then((response) => {
              console.log(response);
            })
            .catch((response) => {
              console.log(response.status);
            });
        } else {
          const oldImage = req.file.destination + "/" + req.articleImageData;

          fs.access(oldImage, (err) => {
            if (!err) {
              fs.unlink(oldImage, (err) => {
                //Msg de imagem excluida sucesso
              });
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

    await ArticleDetails.updateOne({ _id: req.params.id }, imageData, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 129,
          message: "Erro: Imagem do Sub Titulo não editado com sucesso!",
        });
    });

    return res.json({
      error: false,
      message: "Imagem do Sub Titulo editada com sucesso!",
    });
  }
}

export default new ArticleDetailsImageController();
*/
