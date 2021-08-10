import * as Yup from "yup";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "../../config/config.js";
import configAuth from "../../config/auth.js";

class PerfilController {
  async show(req, res) {
    User.findOne(
      { _id: req.userId },
      "_id name email curso turma polo createdAt updatedAt fileName"
    )
      .then((user) => {
        if (user.fileName) {
          var url = config.url + "/files/users/" + user.fileName;
        } else {
          var url = config.url + "/files/users/icone_usuario.png";
        }

        const {
          _id,
          name,
          email,
          curso,
          turma,
          polo,
          createdAt,
          updatedAt,
          fileName,
        } = user;

        return res.json({
          error: false,
          user: {
            _id,
            name,
            email,
            curso,
            turma,
            polo,
            createdAt,
            updatedAt,
            fileName,
            url: url,
          },
          url: url,
          token: jwt.sign({ id: req.userId }, configAuth.secret, {
            expiresIn: configAuth.expiresIn,
          }),
        });
      })
      .catch((erro) => {
        return res.status(200).json({
          error: true,
          code: 115,
          message: "Erro: Perfil não encontrado!",
        });
      });
  }

  async update(req, res) {
    /*await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }*/

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      curso: Yup.string(),
      turma: Yup.string(),
      polo: Yup.string(),
      password: Yup.string().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        code: 108,
        message: "Erro: Dados do formulário inválido!",
      });
    }

    const { email } = req.body;

    const usuarioExiste = await User.findOne({ _id: req.userId });

    if (!usuarioExiste) {
      return res.status(400).json({
        error: true,
        code: 109,
        message: "Erro: Usuário não encontrado!",
      });
    }

    if (email != usuarioExiste.email) {
      const emailExiste = await User.findOne({ email });
      if (emailExiste) {
        return res.status(400).json({
          error: true,
          code: 110,
          message: "Erro: Este e-mail já está cadastrado!",
        });
      }
    }

    var dados = req.body;
    if (dados.password) {
      dados.password = await bcrypt.hash(dados.password, 8);
    }

    await User.updateOne({ _id: req.userId }, dados, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 116,
          message: "Erro: Usuário não foi editado com sucesso!",
        });

      return res.json({
        error: false,
        message: "Perfil editado com sucesso!",
      });
    });
  }
}

export default new PerfilController();
