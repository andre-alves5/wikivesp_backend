import multer from "multer";
import crypto from "crypto";
import { extname } from "path";
import aws from "aws-sdk";
import multerS3 from "multer-s3";

const storageTypes = {
  local: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "tmp/uploads/article");
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);
        cb(null, res.toString("hex") + extname(file.originalname));
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3(

    ),
    bucket: 'wikivesp',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) cb(err);

        const fileName = res.toString("hex") + extname(file.originalname);

        cb(null, fileName);
      });
    },
  }),
};

export default {
  storage: storageTypes['local'],
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
