"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class PerfilController {
  async show(req, res) {
    _User2.default.findOne(
      { _id: req.userId },
      "_id name email curso turma polo createdAt updatedAt key url"
    )
      .then((user) => {
        const {
          _id,
          name,
          email,
          curso,
          turma,
          polo,
          createdAt,
          updatedAt,
          key,
          url,
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
            key,
            url,
          },
          url,
          token: _jsonwebtoken2.default.sign({ id: req.userId }, process.env.AUTH_SECRET, {
            expiresIn: process.env.AUTH_EXPIRES_IN,
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

    const usuarioExiste = await _User2.default.findOne({ _id: req.userId });

    if (!usuarioExiste) {
      return res.status(400).json({
        error: true,
        code: 109,
        message: "Erro: Usuário não encontrado!",
      });
    }

    if (email != usuarioExiste.email) {
      const emailExiste = await _User2.default.findOne({ email });
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
      dados.password = await _bcryptjs2.default.hash(dados.password, 8);
    }

    await _User2.default.updateOne({ _id: req.userId }, dados, (err) => {
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

exports. default = new PerfilController();
