import User from "../models/User";
import fs from "fs";

class PerfilImagemController {
  async update(req, res) {
    if (!req.file) {
      return res.status(400).json({
        error: true,
        code: 129,
        message: "Error: Selecione uma imagem válida JPEG ou PNG!",
      });
    }

    const dadosImagem = {
      originalName: req.file.originalname,
      fileName: req.file.filename,
    };

    await User.findOne({ _id: req.userId }, "_id fileName")
      .then((user) => {
        req.dadosImgUser = user.fileName;
      })
      .catch((err) => {
        return res.status(400).json({
          error: true,
          code: 128,
          message: "Erro: Não foi possível executar a solicitação!",
        });
      });

    await User.updateOne({ _id: req.userId }, dadosImagem, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 129,
          message: "Erro: Imagem do perfil não editado com sucesso!",
        });
    });

    const imgAntiga = req.file.destination + "/" + req.dadosImgUser;

    fs.access(imgAntiga, (err) => {
      if (!err) {
        fs.unlink(imgAntiga, (err) => {
          //Msg de imagem excluida sucesso
        });
      }
    });

    return res.json({
      error: false,
      message: "Imagem do perfil editado com sucesso!",
    });
  }
}

export default new PerfilImagemController();
