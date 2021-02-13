import { Router } from "express";
import multer from "multer";
import multerUpImgUsers from "./app/middlewares/uploadImgUser";
import multerUpArticleImage from "./app/middlewares/uploadArticleImage";

import LoginController from "./app/controllers/LoginController";
import RecuperarSenhaController from "./app/controllers/RecuperarSenhaController";
import UserController from "./app/controllers/UserController";
import PerfilController from "./app/controllers/PerfilController";
import PerfilImagemController from "./app/controllers/PerfilImagemController";

import ArticlesController from "./app/controllers/ArticlesController";
import ArticleDetailsController from "./app/controllers/ArticleDetailsController";
import ArticleDetailsImageController from "./app/controllers/ArticleDetailsImageController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();
const uploadImgUser = multer(multerUpImgUsers);
const uploadArticleImage = multer(multerUpArticleImage);

routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.post("/users", UserController.store); //
routes.put("/users", authMiddleware, UserController.update);
routes.delete("/users/:id", authMiddleware, UserController.delete);

routes.get("/profile", authMiddleware, PerfilController.show);
routes.put("/profile", authMiddleware, PerfilController.update);
routes.put(
  "/profileimage",
  authMiddleware,
  uploadImgUser.single("file"),
  PerfilImagemController.update
);

routes.post("/login", LoginController.store);//

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
  "/articledetails/:id",
  authMiddleware,
  ArticleDetailsController.store
);
routes.put("/articledetails", authMiddleware, ArticleDetailsController.update);
routes.delete(
  "/articledetails/:id",
  authMiddleware,
  ArticleDetailsController.delete
);

routes.post(
  "/articleimage/:id",
  authMiddleware,
  uploadArticleImage.single("file"),
  ArticleDetailsImageController.update
);

export default routes;
