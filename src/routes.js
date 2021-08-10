import { Router } from "express";
import multer from "multer";
import multerUpImgUsers from "./app/middlewares/uploadImgUser.js";
import multerUpArticleImage from "./app/middlewares/uploadArticleImage.js";

import LoginController from "./app/controllers/LoginController.js";
import RecuperarSenhaController from "./app/controllers/RecuperarSenhaController.js";
import UserController from "./app/controllers/UserController.js";
import PerfilController from "./app/controllers/PerfilController.js";
import PerfilImagemController from "./app/controllers/PerfilImagemController.js";

import ArticlesController from "./app/controllers/ArticlesController.js";
import ArticleDetailsController from "./app/controllers/ArticleDetailsController.js";
import ArticleDetailsImageController from "./app/controllers/ArticleDetailsImageController.js";

import authMiddleware from "./app/middlewares/auth.js";

const routes = new Router();
const uploadImgUser = multer(multerUpImgUsers);
const uploadArticleImage = multer(multerUpArticleImage);

routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.post("/users", UserController.store);
routes.put("/users", authMiddleware, UserController.update);
routes.delete("/users/:id", authMiddleware, UserController.delete);

routes.get("/perfil", authMiddleware, PerfilController.show);
routes.put("/perfil", authMiddleware, PerfilController.update);
routes.put(
  "/perfil-img",
  authMiddleware,
  uploadImgUser.single("file"),
  PerfilImagemController.update
);

routes.post("/login", LoginController.store);

routes.post("/passwordrecovery", RecuperarSenhaController.store);
routes.get("/passwordrecovery/:validatekey", RecuperarSenhaController.show);
routes.put("/passwordrecovery", RecuperarSenhaController.update);

routes.get("/allarticles", authMiddleware, ArticlesController.index);
routes.get("/myarticles/:idAutor", authMiddleware, ArticlesController.list);
routes.get("/articles/:id", authMiddleware, ArticlesController.show);
routes.post("/articles", authMiddleware, ArticlesController.store);
routes.put("/articles", authMiddleware, ArticlesController.update);
routes.delete("/articles/:id", authMiddleware, ArticlesController.delete);

routes.get(
  "/articledetails/:idArtigo",
  authMiddleware,
  ArticleDetailsController.index
);
routes.get("/articledetail/:id", authMiddleware, ArticleDetailsController.show);
routes.post(
  "/articledetails/:idArtigo",
  authMiddleware,
  ArticleDetailsController.store
);
routes.put("/articledetails", authMiddleware, ArticleDetailsController.update);
routes.delete(
  "/articledetails/:id",
  authMiddleware,
  ArticleDetailsController.delete
);

routes.put(
  "/articleimage/:id",
  authMiddleware,
  uploadArticleImage.single("file"),
  ArticleDetailsImageController.update
);

export default routes;
