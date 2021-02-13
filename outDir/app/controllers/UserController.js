"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { limit = 40 } = req.query;
    await _User2.default.paginate(
      {},
      { select: "_id name email", page, limit, sort: "-createdAt" }
    )
      .then((users) => {
        return res.json({
          error: false,
          users: users,
        });
      })
      .catch((erro) => {
        return res.status(400).json({
          error: true,
          code: 106,
          message: "Erro: Não foi possível executar a solicitação!",
        });
      });
  }

  async show(req, res) {
    _User2.default.findOne(
      { _id: req.params.id },
      "_id name email createdAt updatedAt originalName key url"
    )
      .then((user) => {
        return res.json({
          error: false,
          user: user,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          error: true,
          code: 107,
          message: "Erro: Não foi possível executar a solicitação!",
        });
      });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        code: 103,
        message: "Error: Dados inválidos!",
      });
    }

    const emailExiste = await _User2.default.findOne({ email: req.body.email });
    if (emailExiste) {
      return res.status(400).json({
        error: true,
        code: 102,
        message: "Error: Este e-mail já está cadastrado!",
      });
    }

    var dados = req.body;
    dados.password = await _bcryptjs2.default.hash(dados.password, 8);

    const user = await _User2.default.create(dados, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 101,
          message: "Error: Usuário não foi cadastrado com sucesso!",
        });

      return res.status(200).json({
        error: false,
        message: "Usuário cadastrado com sucesso!",
        dados: user,
      });
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      _id: Yup.string().required(),
      name: Yup.string(),
      email: Yup.string().email(),
      password: Yup.string().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        code: 108,
        message: "Erro: Dados do formulário inválido!",
      });
    }

    const { _id, email } = req.body;

    const usuarioExiste = await _User2.default.findOne({ _id: _id });

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

    await _User2.default.updateOne({ _id: dados._id }, dados, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 111,
          message: "Erro: Usuário não foi editado com sucesso!",
        });

      return res.json({
        error: false,
        message: "Usuário editado com sucesso!",
      });
    });
  }

  async delete(req, res) {
    const usuarioExiste = await _User2.default.findOne({ _id: req.params.id });

    if (!usuarioExiste) {
      return res.status(400).json({
        error: true,
        code: 104,
        message: "Erro: Usuário não encontrado",
      });
    }

    const user = await _User2.default.deleteOne({ _id: req.params.id }, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 105,
          message: "Error: Usuário não foi apagado com sucesso!",
        });
    });

    return res.json({
      error: false,
      message: "Usuário apagado com sucesso!",
    });
  }
}

exports. default = new UserController();
