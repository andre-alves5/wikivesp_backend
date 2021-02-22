import mongoose from "mongoose";

const server = "cluster0.chc5y.gcp.mongodb.net";
const database = "wikivespdb";
const user = "dbappuser";
const password = "Univesp01";

class DataBase {
  constructor() {
    this.mongoDataBase();
  }
  mongoDataBase() {
    mongoose
      .connect(
        `mongodb+srv://${user}:${password}@${server}/${database}?retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
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
