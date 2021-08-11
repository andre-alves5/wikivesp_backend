import express from "express";
import routes from "./routes.js";
import cors from "cors";
import { resolve } from "path";

import "./config/db_connection.js";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use("/files", express.static(resolve("../tmp/uploads")));

    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "*");
      res.header("Access-Control-Allow-Headers","*");
      this.app.use(cors());
      next();
    });
  }
  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
