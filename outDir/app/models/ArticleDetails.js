"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _mongoosepaginatev2 = require('mongoose-paginate-v2'); var _mongoosepaginatev22 = _interopRequireDefault(_mongoosepaginatev2);

const ArticleDetails = new _mongoose2.default.Schema(
  {
    idArtigo: {
      type: String,
      required: true,
    },
    subTitulo: {
      type: String,
      required: true,
    },
    corpoSubTitulo: {
      type: String,
      required: true,
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
ArticleDetails.plugin(_mongoosepaginatev22.default);

exports. default = _mongoose2.default.model("articledetails", ArticleDetails);
