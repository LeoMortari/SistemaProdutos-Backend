//Libs imports
import moment from "moment";

//Project imports
import connection from "../../database/connection";

//Constantes
const ERROR_DATABASE = { error: "Falha na comunicação com o Banco de Dados" };

//Funções externas
const error = (res) => res.status(400).send(ERROR_DATABASE);

//Função que gera a String SQL
const stringData = (arr) => {
  let txt = "";

  //Iteração sobre o array para a construção do values
  arr.map((item, index) => {
    if (index != arr.length - 1) {
      txt += `${item}, `;
    } else {
      txt += item;
    }
  });

  return txt;
};

//Função que converte as datas pro padrão brasileiro
const formatData = (arr) =>
  arr.map((obj) => ({
    ...obj,
    data: moment(obj.data).format("DD/MM/yyyy HH:mm"),
  }));

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
      "produtos VARCHAR(255)," +
      "quantidade INT NOT NULL," +
      "observacao VARCHAR(255) DEFAULT NULL," +
      "valor DOUBLE NOT NULL," +
      "frete DOUBLE NOT NULL," +
      "tempoEntrega INT NOT NULL," +
      "data DATETIME," +
      "email_fk VARCHAR(100) NOT NULL," +
      "PRIMARY KEY(id_pk)," +
      "FOREIGN KEY (email_fk) REFERENCES usuario(email)," +
      "CONSTRAINT email_fk FOREIGN KEY (email_fk) REFERENCES usuario(email))";

    connection.query(sql);
  }

  /* Metodos da Classe */

  //Adiciona um novo pedido
  adicionaNovoPedido(res, pedido) {
    let values = Object.values(pedido);
    console.log(pedido)
    let sql = `INSERT INTO pedido (produtos,
      quantidade,
      observacao,
      valor,
      frete,
      tempoEntrega,
      data,
      email_fk)
     VALUES (${stringData(values)})`;

    connection.query(sql, (err) => {
      if (err) {
        console.log(err);
        error(res);
      }

      res.status(200).send({ sucess: true });
    });
  }

  //Select geral
  selectPedidoGeral(res) {
    let sql = "SELECT * FROM pedido";

    connection.query(sql, (err, result) => {
      if (err) {
        error(res);
      }

      let newValues = formatData(result);

      res.status(200).send(newValues);
    });
  }

  //Select por Email
  selectPedidoPorEmail(res, email) {
    let sql = `SELECT * FROM pedido WHERE email_fk = '${email}'`;

    connection.query(sql, (err, result) => {
      if (err) {
        error(res);
      }

      let newValues = formatData(result);

      res.status(200).send(newValues);
    });
  }

  editarPedido(res, pedido) {
    let select = `SELECT id_pk FROM pedido ORDER BY id_pk DESC limit 1`;

    connection.query(select, (err, result) => {
      if (err) error(res);

      let update = `UPDATE pedido SET quantidade = ${pedido.quantidade} WHERE id_pk = ${result[0].id_pk}`;
      connection.query(update, (erro, _result) => {
        if (erro) error(res);

        res.send({ sucess: true });
      });
    });
  }

  //Select de algum atributo

  /* Exemplo de value param: 
  Quando NÃO FOR string: objValue = {value: 1, isString: false}
  Quando FOR uma string: objValue = {value: '1', isString: true}
  */

  selectPedidoPorAtributo(res, field, objValue) {
    //Caso o valor for uma string, atribui aspas ao SQL
    let value = objValue.isString ? `'${objValue.value}'` : objValue.value;

    let sql = `SELECT * FROM pedido WHERE ${field} = ${value}`;

    connection.query(sql, (err, result) => {
      if (err) {
        this.error(res);
      }

      let newValues = formatData(result);

      res.status(200).send(newValues);
    });
  }
}

export default new Pedidos();
