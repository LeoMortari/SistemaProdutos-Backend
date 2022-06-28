import customExpress from "./config/customExpress";
import connection from "./database/connection";
import Pedidos from "./tables/pedidos";
import Usuarios from "./tables/usuarios";
import Estoque from "./tables/estoque";
import financeiro from "./tables/financeiro";

const app = customExpress();

//Porta principal
const port = 3000;

//Conexão com o banco de dados
connection.connect((err) => {
  if (err) {
    return console.log("Erro no banco de dados, ERRO: " + err);
  }

  //Iniciação da classe
  Usuarios.init();
  Pedidos.init();
  Estoque.init();
  financeiro.init();
  //Event de abertura
  return app.listen(port, () => {
    console.log("API Iniciada");
  });
});
