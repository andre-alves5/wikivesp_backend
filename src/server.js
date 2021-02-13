import app from "./app";

var port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Servidor iniciado na porta " + port);
});
