"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

var port = process.env.PORT || 8080;

_app2.default.listen(port, () => {
  console.log("Servidor iniciado na porta " + port);
});
