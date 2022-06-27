//Lib imports
import moment from "moment";

//Project imports
import * as StringFunctions from "../../utils/string";
import * as DoubleFunction from "../../utils/double";
import Pedidos from "../../tables/pedidos/index";

module.exports = (app) => {
  /* Adiciona um pedido */
  app.post("/pedidos/adicionar", (req, res) => {
    //Retira os valores da request
    let {
      body: { produtos, quantidade, observacao, valor, tempoEntrega, frete },
    } = req;

    const email_fk = StringFunctions.convertToString("leo@teste");

    //Criando a data atual
    let data = StringFunctions.convertToString(
      moment().format("yyyy-MM-DD HH:mm:ss")
    );

    produtos = StringFunctions.convertToString(produtos);

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
      produtos,
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

  /* Lista todos os pedidos */
  app.get("/pedidos/listar", (_req, res) => {
    Pedidos.selectPedidoGeral(res);
  });

  /* Lista todos os pedidos de um usuário */
  app.get("/pedidos/listar/:email", (req, res) => {
    const { email } = req.params;

    Pedidos.selectPedidoPorEmail(res, email);
  });

  app.post("/pedidos/editar", (req, res) => {
    console.log(req.body);

    Pedidos.editarPedido(res, req.body);
  });
};
