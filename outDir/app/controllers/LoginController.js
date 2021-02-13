"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class LoginController {
  async store(req, res) {
    const { email, password } = req.body;

    const userExiste = await _User2.default.findOne({ email: email });

    if (!userExiste) {
      return res.status(401).json({
        error: true,
        code: 110,
        message: "Erro: Usuário não encontrado!",
      });
    }

    if (!(await _bcryptjs2.default.compare(password, userExiste.password))) {
      return res.status(401).json({
        error: true,
        code: 111,
        message: "Erro: Senha inválida!",
      });
    }

    return res.json({
      user: {
        id: userExiste._id,
        name: userExiste.name,
        email,
      },
      token: _jsonwebtoken2.default.sign({ id: userExiste._id }, process.env.AUTH_SECRET, {
        expiresIn: process.env.AUTH_EXPIRES_IN,
      }),
    });
  }
}

exports. default = new LoginController();
