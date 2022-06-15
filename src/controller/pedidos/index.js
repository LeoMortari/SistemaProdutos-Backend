//Lib imports
import moment from "moment";

//Project imports
import * as StringFunctions from "../../utils/string";
import * as DoubleFunction from "../../utils/double";
import Pedidos from "../../tables/pedidos/index";

module.exports = (app) => {
  app.post("/pedidos/adicionar", (req, res) => {
    //Retira os valores da request
    let {
      body: { quantidade, observacao, valor, tempoEntrega, frete },
    } = req;

    const email_fk = StringFunctions.convertToString("leo@teste");

    //Criando a data atual
    let data = StringFunctions.convertToString(
      moment().format("yyyy-MM-DD HH:mm:ss")
    );

    try {
      //Valida os dados
      if (!quantidade || !valor) {
        throw new Error("Todos os campos devem ser preenchidos");
      }

      //Atribuição dos valores convertidos
      observacao = !!observacao
        ? StringFunctions.convertToString(observacao)
        : null;
      valor = DoubleFunction.convertToDouble(valor);
    } catch (e) {
      return res.status(400).send(e.message);
    }

    //Cria um objeto com o par de atributo e valor;
    let obj = {
      quantidade,
      observacao,
      valor,
      frete,
      tempoEntrega,
      data,
      email_fk,
    };

    Pedidos.adicionaNovoPedido(res, obj);
  });

  app.get("/pedidos/listar", (req, res) => {
    Pedidos.selectPedidoGeral(res);
  });
};
