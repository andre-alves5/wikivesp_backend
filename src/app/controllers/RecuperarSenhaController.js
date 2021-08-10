import * as Yup from "yup";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import env from "../../config/env.js";

class RecuperarSenhaController {
  async show(req, res) {
    User.findOne({ recuperarSenha: req.params.recuperarSenha }, "_id")
      .then((user) => {
        if (user._id) {
          return res.json({
            error: false,
            user: user,
          });
        }
      })
      .catch((err) => {
        return res.status(400).json({
          error: true,
          code: 103,
          messsage: "Erro: URL inválida!",
        });
      });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        code: 101,
        messsage: "Erro: Dados inválidos!",
      });
    }

    var dados = req.body;
    const userExiste = await User.findOne(
      { email: dados.email },
      "_id name email"
    );
    if (!userExiste) {
      return res.status(400).json({
        error: true,
        code: 102,
        message: "Error: Nenhum usuário encontrado com esse e-mail!",
      });
    }

    dados.recuperarSenha = Math.random().toString(36).substr(3, 10);

    await User.updateOne({ email: dados.email }, dados, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 111,
          message: "Erro: Não foi possível executar a solicitação!",
        });

      var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      var emailHtml =
        "Prezado(a) " +
        userExiste.name +
        "<br><br> Você solicitou uma alteração de senha.<br>Seguindo o link abaixo você poderá alterar sua senha.<br>Para continuar o processo de recuperação de sua senha, clique no link abaixo ou cole o endereço abaixo no seu navegador.<br><br>" +
        env.urlSite +
        "/atualizar-senha-login/" +
        dados.recuperarSenha +
        "<br><br>Usuário: " +
        userExiste.email +
        "<br><br>Se você não solicitou essa alteração, nenhuma ação é necessária. Sua senha permanecerá a mesma até que você ative este código";

      var emailTexto =
        "Prezado(a) " +
        userExiste.name +
        "\n\nVocê solicitou uma alteração de senha.\nSeguindo o link abaixo você poderá alterar sua senha.\nPara continuar o processo de recuperação de sua senha, clique no link abaixo ou cole o endereço abaixo no seu navegador.\n\n" +
        env.urlSite +
        "/atualizar-senha-login/" +
        dados.recuperarSenha +
        "\n\nUsuário: " +
        userExiste.email +
        "\n\nSe você não solicitou essa alteração, nenhuma ação é necessária. Sua senha permanecerá a mesma até que você ative este código";

      var emailSerEnviado = {
        from: process.env.EMAIL_FROM,
        to: userExiste.email,
        subject: "Instruções para recuperar a senha",
        html: emailHtml,
        text: emailTexto,
      };

      transport.sendMail(emailSerEnviado, function (error) {
        if (error)
          return res.status(400).json({
            error: true,
            code: 111,
            message: "Erro: Não foi possível executar a solicitação!",
          });

        return res.json({
          error: false,
          message:
            "Enviado no e-mail as intruções para recuperar a senha, verifique sua caixa de entrada!",
        });
      });
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      _id: Yup.string().required(),
      recuperarSenha: Yup.string().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        code: 101,
        messsage: "Erro: Dados inválidos!",
      });
    }

    const { _id, recuperarSenha } = req.body;

    const usuarioExiste = await User.findOne({ _id: _id }, "_id");
    if (!usuarioExiste) {
      return res.status(400).json({
        error: true,
        code: 102,
        messsage: "Erro: Usuário não encontrado!",
      });
    }

    const validarChave = await User.findOne(
      { recuperarSenha: recuperarSenha },
      "_id"
    );
    if (!validarChave) {
      return res.status(401).json({
        error: true,
        code: 110,
        message: "Erro: URL inválida!",
      });
    }

    var dados = req.body;
    if (dados.password) {
      dados.password = await bcrypt.hash(dados.password, 8);
      dados.recuperarSenha = null;
    }

    await User.updateOne({ _id: dados._id }, dados, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 111,
          message: "Erro: Senha não foi editada com sucesso!",
        });

      return res.json({
        error: false,
        message: "Senha editada com sucesso!",
      });
    });
  }
}

export default new RecuperarSenhaController();
