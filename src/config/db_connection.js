import mongoose from "mongoose";
import env from "./env.js";

class DataBase {
  constructor() {
    this.mongoDataBase();
  }
  mongoDataBase() {
    mongoose
      .connect(env.mongoUrl, {
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

export default new DataBase();
