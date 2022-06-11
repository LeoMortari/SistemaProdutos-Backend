//Imports
import connection from "../../database/connection";

//Constantes
const ERROR_DATABASE = { error: "Falha na comunicação com o Banco de Dados" };

//Funções externas
const error = (res) => res.status(400).send(ERROR_DATABASE);

class Pedidos {
  //Inicialização da Classe
  init() {
    this.criarTablePedido();
  }

  //Criação da tabela, caso não tenha
  criarTablePedido() {
    let sql =
      "CREATE TABLE IF NOT EXISTS pedido" +
      "(id_pk INT NOT NULL AUTO_INCREMENT," +
      "quantidade INT NOT NULL," +
      "observacao VARCHAR(255) NOT NULL," +
      "valor DOUBLE NOT NULL," +
      "id_cardapio_fk INT," +
      "PRIMARY KEY(id_pk)," +
      "CONSTRAINT fk_id FOREIGN KEY (id_cardapio_fk) REFERENCES cardapio(id))";
    connection.query(sql);
  }

  /* Metodos da Classe */

  //Adiciona um novo pedido
  adicionaNovoPedido(res, pedido) {
    let values = Object.values(pedido);
    let sql = `INSERT INTO pedido (quantidade, observacao, valor) VALUES (${values.join(
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
  selectPedidoGeral(res) {
    let sql = "SELECT * FROM pedido";

    connection.query(sql, (err, result) => {
      if (err) {
        error(res);
      }

      res.status(200).send(result);
    });
  }

  //Select por ID
  selectPedidoPorId(res, id) {
    let sql = `SELECT * FROM pedido WHERE id = ${id}`;

    connection.query(sql, (err, result) => {
      if (err) {
        error(res);
      }

      res.status(200).send(result);
    });
  }

  //Select de algum atributo
  SelectPedidoPorAtributo(res, field, objValue) {
    //Caso o valor for uma string, atribui aspas ao SQL
    let value = objValue.isString ? `'${objValue.value}'` : objValue.value;

    let sql = `SELECT * FROM pedido WHERE ${field} = ${value}`;

    connection.query(sql, (err, result) => {
      if (err) {
        this.error(res);
      }

      res.status(200).send(result);
    });
  }
}

export default new Pedidos();
