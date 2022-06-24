//Imports
import connection from "../../database/connection";

//Constantes
const ERROR_DATABASE = { error: "Falha na comunicação com o Banco de Dados" };

//Funções externas
const error = (res) => res.status(400).send(ERROR_DATABASE);

class Estoque {
  //Inicialização da Classe
  init() {
    this.criarTableEstoque();
  }

  //Criação da tabela, caso não tenha
  criarTableEstoque() {
    let sql =
      "CREATE TABLE IF NOT EXISTS estoque" +
      "(id_pk INT NOT NULL AUTO_INCREMENT," +
      "descricao VARCHAR(255) NOT NULL," +
      "quantidade INT NOT NULL," +
      "valor DOUBLE NOT NULL," +
      "PRIMARY KEY(id_pk))";
    connection.query(sql);
  }

  /* Metodos da Classe */

  //Adiciona um novo produto ao estoque
  adicionaNovoProdutoAoEstoque(res, estoque) {
    let values = Object.values(estoque);
    let sql = `INSERT INTO estoque (descricao, quantidade, valor) VALUES (${values.join(
      ","
    )})`;

    connection.query(sql, (err) => {
      if (err) {
        error(res);
      }

      res.status(200).send();
    });
  }

  //Select geral
  selectProdutosEstoqueGeral(res) {
    let sql = "SELECT * FROM estoque";

    connection.query(sql, (err, result) => {
      if (err) {
        error(res);
      }

      res.status(200).send(result);
    });
  }

  //Select por ID
  selectProdutoEstoquePorId(res, id) {
    let sql = `SELECT * FROM estoque WHERE id = ${id}`;

    connection.query(sql, (err, result) => {
      if (err) {
        error(res);
      }

      res.status(200).send(result);
    });
  }

}

export default new Estoque();
