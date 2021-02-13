"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _mongoosepaginatev2 = require('mongoose-paginate-v2'); var _mongoosepaginatev22 = _interopRequireDefault(_mongoosepaginatev2);

const User = new _mongoose2.default.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    polo: {
      type: String,
    },
    turma: {
      type: String,
    },
    curso: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    recuperarSenha: {
      type: String,
    },
    originalName: {
      type: String,
    },
    key: {
      type: String,
    },
    size: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
User.plugin(_mongoosepaginatev22.default);

exports. default = _mongoose2.default.model("user", User);
