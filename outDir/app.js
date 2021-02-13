"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
require("dotenv").config();

require('./config/db_connection');

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(_express2.default.json());
    this.app.use(
      "/files",
      _express2.default.static(_path2.default.resolve(__dirname, "..", "tmp", "uploads"))
    );

    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "X-PINGOTHER, Content-Type, Authorization"
      );
      this.app.use(_cors2.default.call(void 0, ));
      next();
    });
  }
  routes() {
    this.app.use(_routes2.default);
  }
}

exports. default = new App().app;
