//Imports
import connection from "../../database/connection";

//Constantes
const ERROR_DATABASE = { error: "Falha na comunicação com o Banco de Dados" };

//Funções externas
const error = (res) => res.status(400).send(ERROR_DATABASE);

class Cardapio {
  //Inicialização da Classe
  init() {
    this.criarTableCardapio();
  }

  //Criação da tabela, caso não tenha
  criarTableCardapio() {
    let sql =
      "CREATE TABLE IF NOT EXISTS cardapio" +
      "(id_pk INT NOT NULL AUTO_INCREMENT," +
      "descricao VARCHAR(255) NOT NULL," +
      "nome VARCHAR(255) NOT NULL," +
      "preco DOUBLE NOT NULL," +
      "PRIMARY KEY(id_pk))";
      connection.query(sql);
  }

  /* Metodos da Classe */

  //Adiciona um novo produto ao estoque
  adicionaNovoProdutoAoCardapio(res, cardapio) {
    let values = Object.values(cardapio);
    let sql = `INSERT INTO cardapio (descricao, nome, preco) VALUES (${values.join(
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
  selectProdutosCardapioGeral(res) {
    let sql = "SELECT * FROM cardapio";

    connection.query(sql, (err, result) => {
      if (err) {
        error(res);
      }

      res.status(200).send(result);
    });
  }

  //Select por ID
  selectProdutoCardapioPorId(res, id) {
    let sql = `SELECT * FROM cardapio WHERE id_pk = ${id}`;

    connection.query(sql, (err, result) => {
      if (err) {
        error(res);
      }

      res.status(200).send(result);
    });
  }

  editarCardapio(res,valores,id){
    let sql = `UPDATE cardapio SET ? WHERE id_pk = ${id}`

    connection.query(sql, valores, (err, result) => {
      if (err) {
        error(res);
      }

      res.status(200).send(result);
    });
  }

}

export default new Cardapio();
