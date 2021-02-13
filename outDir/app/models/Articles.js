"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _mongoosepaginatev2 = require('mongoose-paginate-v2'); var _mongoosepaginatev22 = _interopRequireDefault(_mongoosepaginatev2);

const Articles = new _mongoose2.default.Schema(
  {
    idAutor: {
      type: String,
      required: true,
    },
    autor: {
      type: String,
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
    introducao: {
      type: String,
      required: true,
    },
    indice: {
      type: String,
    },
    bibliografia: {
      type: String,
    },
    categoria: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
Articles.plugin(_mongoosepaginatev22.default);

exports. default = _mongoose2.default.model("articles", Articles);
