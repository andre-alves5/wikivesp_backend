import app from "./app.js";
import env from "./config/env.js";

app.listen(env.port, () => {
  console.log(
    `Servidor iniciado na porta ${env.port}: http://localhost:${env.port}`
  );
});
