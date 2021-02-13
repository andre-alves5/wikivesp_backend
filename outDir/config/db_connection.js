"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

class DataBase {
  constructor() {
    this.mongoDataBase();
  }
  mongoDataBase() {
    _mongoose2.default
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Conexão com MongoDB realizada com sucesso!");
      })
      .catch((erro) => {
        console.log(
          "Erro: Conexão com MongoDB não foi realizada com sucesso: " + erro
        );
      });
  }
}

exports. default = new DataBase();
