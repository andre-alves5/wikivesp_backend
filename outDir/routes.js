"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _uploadImgUser = require('./app/middlewares/uploadImgUser'); var _uploadImgUser2 = _interopRequireDefault(_uploadImgUser);
var _uploadArticleImage = require('./app/middlewares/uploadArticleImage'); var _uploadArticleImage2 = _interopRequireDefault(_uploadArticleImage);

var _LoginController = require('./app/controllers/LoginController'); var _LoginController2 = _interopRequireDefault(_LoginController);
var _RecuperarSenhaController = require('./app/controllers/RecuperarSenhaController'); var _RecuperarSenhaController2 = _interopRequireDefault(_RecuperarSenhaController);
var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _PerfilController = require('./app/controllers/PerfilController'); var _PerfilController2 = _interopRequireDefault(_PerfilController);
var _PerfilImagemController = require('./app/controllers/PerfilImagemController'); var _PerfilImagemController2 = _interopRequireDefault(_PerfilImagemController);

var _ArticlesController = require('./app/controllers/ArticlesController'); var _ArticlesController2 = _interopRequireDefault(_ArticlesController);
var _ArticleDetailsController = require('./app/controllers/ArticleDetailsController'); var _ArticleDetailsController2 = _interopRequireDefault(_ArticleDetailsController);
var _ArticleDetailsImageController = require('./app/controllers/ArticleDetailsImageController'); var _ArticleDetailsImageController2 = _interopRequireDefault(_ArticleDetailsImageController);

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = new (0, _express.Router)();
const uploadImgUser = _multer2.default.call(void 0, _uploadImgUser2.default);
const uploadArticleImage = _multer2.default.call(void 0, _uploadArticleImage2.default);

routes.get("/users", _UserController2.default.index);
routes.get("/users/:id", _UserController2.default.show);
routes.post("/users", _UserController2.default.store);
routes.put("/users", _auth2.default, _UserController2.default.update);
routes.delete("/users/:id", _auth2.default, _UserController2.default.delete);

routes.get("/profile", _auth2.default, _PerfilController2.default.show);
routes.put("/profile", _auth2.default, _PerfilController2.default.update);
routes.put(
  "/profileimage",
  _auth2.default,
  uploadImgUser.single("file"),
  _PerfilImagemController2.default.update
);

routes.post("/login", _LoginController2.default.store);

routes.post("/passwordrecovery", _RecuperarSenhaController2.default.store);
routes.get("/passwordrecovery/:validatekey", _RecuperarSenhaController2.default.show);
routes.put("/passwordrecovery", _RecuperarSenhaController2.default.update);

routes.get("/allarticles", _auth2.default, _ArticlesController2.default.index);
routes.get("/myarticles/:idAutor", _auth2.default, _ArticlesController2.default.list);
routes.get("/articles/:id", _auth2.default, _ArticlesController2.default.show);
routes.post("/articles", _auth2.default, _ArticlesController2.default.store);
routes.put("/articles", _auth2.default, _ArticlesController2.default.update);
routes.delete("/articles/:id", _auth2.default, _ArticlesController2.default.delete);

routes.get(
  "/articledetails/:idArtigo",
  _auth2.default,
  _ArticleDetailsController2.default.index
);
routes.get("/articledetail/:id", _auth2.default, _ArticleDetailsController2.default.show);
routes.post(
  "/articledetails/:idArtigo",
  _auth2.default,
  _ArticleDetailsController2.default.store
);
routes.put("/articledetails", _auth2.default, _ArticleDetailsController2.default.update);
routes.delete(
  "/articledetails/:id",
  _auth2.default,
  _ArticleDetailsController2.default.delete
);

routes.put(
  "/articleimage/:id",
  _auth2.default,
  uploadArticleImage.single("file"),
  _ArticleDetailsImageController2.default.update
);

exports. default = routes;
