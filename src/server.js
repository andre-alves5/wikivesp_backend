import app from "./app";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}: http://localhost:${PORT}`);
});
