import customExpress from "./config/customExpress";
import connection from "./database/connection";
import Pedidos from "./tables/pedidos";
import Estoque from "./tables/estoque";

const app = customExpress();

//Porta principal
const port = 3000;

//Conexão com o banco de dados
connection.connect((err) => {
  if (err) {
    return console.log("Erro no banco de dados, ERRO: " + err);
  }

  //Iniciação da classe
  Pedidos.init();
  Estoque.init();

  //Event de abertura
  return app.listen(port, () => {
    console.log("API Iniciada");
  });
});
