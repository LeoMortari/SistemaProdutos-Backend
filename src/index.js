import customExpress from "./config/customExpress";
import connection from "./database/connection";

const app = customExpress();

//Porta principal
const port = 3000;

//Conexão com o banco de dados
connection.connect((err) => {
  if (err) {
    return console.error("Erro no banco de dados, ERRO: " + err);
  }

  //Event de abertura
  return app.listen(port, () => {
    console.log("Servidor iniciado");
  });
});
